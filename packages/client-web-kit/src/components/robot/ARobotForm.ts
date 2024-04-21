/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import useVuelidate from '@vuelidate/core';
import type {
    PropType,
    VNodeArrayChildren,
} from 'vue';
import {
    computed,
    defineComponent,
    h,
    reactive,
    ref,
    watch,
} from 'vue';
import {
    maxLength, minLength, required,
} from '@vuelidate/validators';
import type { Realm, Robot } from '@authup/core-kit';
import { DomainType, createNanoID } from '@authup/core-kit';
import {
    buildFormGroup,
    buildFormInput,
} from '@vuecs/form-controls';
import {
    SlotName,
} from '@vuecs/list-controls';
import { useIsEditing, useUpdatedAt } from '../../composables';
import {
    TranslatorTranslationDefaultKey,
    TranslatorTranslationGroup,
    VuelidateCustomRule,
    VuelidateCustomRuleKey,
    buildFormSubmitWithTranslations,
    createEntityManager,
    createFormSubmitTranslations,
    defineEntityManagerEvents,
    initFormAttributesFromSource,
    renderEntityAssignAction, useTranslationsForGroup, useTranslationsForNestedValidation,
} from '../../core';
import { ARealms } from '../realm';

export const ARobotForm = defineComponent({
    props: {
        name: {
            type: String,
            default: undefined,
        },
        entity: {
            type: Object as PropType<Robot>,
            default: undefined,
        },
        realmId: {
            type: String,
            default: undefined,
        },
    },
    emits: defineEntityManagerEvents<Robot>(),
    setup(props, ctx) {
        const busy = ref(false);
        const form = reactive({
            name: '',
            realm_id: '',
            secret: '',
        });

        const $v = useVuelidate({
            name: {
                [
                VuelidateCustomRuleKey.ALPHA_UPPER_NUM_HYPHEN_UNDERSCORE
                ]: VuelidateCustomRule[VuelidateCustomRuleKey.ALPHA_UPPER_NUM_HYPHEN_UNDERSCORE],
                minLength: minLength(3),
                maxLength: maxLength(128),
            },
            realm_id: {
                required,
            },
            secret: {
                minLength: minLength(3),
                maxLength: maxLength(256),
            },
        }, form);

        const manager = createEntityManager({
            type: `${DomainType.ROBOT}`,
            setup: ctx,
            props,
        });

        const isEditing = useIsEditing(manager.data);
        const updatedAt = useUpdatedAt(props.entity);

        const isNameFixed = computed(() => !!props.name && props.name.length > 0);
        const isRealmLocked = computed(() => !!props.realmId);
        const isSecretHashed = computed(
            () => manager.data.value && manager.data.value.secret === form.secret && form.secret.startsWith('$'),
        );

        const generateSecret = () => {
            form.secret = createNanoID('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_!.', 64);
        };

        function initForm() {
            if (props.name) {
                form.name = props.name;
            }

            if (props.realmId) {
                form.realm_id = props.realmId;
            }

            initFormAttributesFromSource(form, manager.data.value);

            if (form.secret.length === 0) {
                generateSecret();
            }
        }

        watch(updatedAt, (val, oldVal) => {
            if (val && val !== oldVal) {
                manager.data.value = props.entity;

                initForm();
            }
        });

        initForm();

        const submit = async () => {
            if ($v.value.$invalid) {
                return;
            }

            await manager.createOrUpdate({
                ...form,
                secret: isSecretHashed.value ? '' : form.secret,
            });
        };

        const translationsValidation = useTranslationsForNestedValidation($v.value);
        const translationsSubmit = createFormSubmitTranslations();

        const translationsDefault = useTranslationsForGroup(
            TranslatorTranslationGroup.DEFAULT,
            [
                { key: TranslatorTranslationDefaultKey.GENERATE },
                { key: TranslatorTranslationDefaultKey.HASHED },
                { key: TranslatorTranslationDefaultKey.NAME },
                { key: TranslatorTranslationDefaultKey.DESCRIPTION },
                { key: TranslatorTranslationDefaultKey.SECRET },
            ],
        );

        const render = () => {
            const name = buildFormGroup({
                validationMessages: translationsValidation.name.value,
                dirty: $v.value.name.$dirty,
                label: true,
                labelContent: translationsDefault[TranslatorTranslationDefaultKey.NAME].value,
                content: buildFormInput({
                    value: $v.value.name.$model,
                    onChange(input) {
                        $v.value.name.$model = input;
                    },
                    props: {
                        disabled: isNameFixed.value,
                    },
                }),
            });

            let id : VNodeArrayChildren = [];

            if (manager.data.value) {
                id = [
                    buildFormGroup({
                        label: true,
                        labelContent: 'ID',
                        content: buildFormInput({
                            value: manager.data.value.id,
                            props: {
                                disabled: true,
                            },
                        }),
                    }),
                ];
            }

            const secret = buildFormGroup({
                validationMessages: translationsValidation.secret.value,
                dirty: $v.value.secret.$dirty,
                label: true,
                labelContent: [
                    translationsDefault[TranslatorTranslationDefaultKey.SECRET].value,
                    isSecretHashed.value ? h('span', {
                        class: 'text-danger font-weight-bold ps-1',
                    }, [
                        translationsDefault[TranslatorTranslationDefaultKey.HASHED].value,
                        ' ',
                        h('i', { class: 'fa fa-exclamation-triangle ps-1' }),
                    ]) : '',
                ],
                content: buildFormInput({
                    value: $v.value.secret.$model,
                    onChange(input) {
                        $v.value.secret.$model = input;
                    },
                }),
            });

            const secretInfo = h('div', [
                h('button', {
                    class: 'btn btn-dark btn-xs',
                    onClick($event: any) {
                        $event.preventDefault();

                        generateSecret.call(null);
                    },
                }, [
                    h('i', { class: 'fa fa-wrench' }),
                    ' ',
                    translationsDefault[TranslatorTranslationDefaultKey.GENERATE].value,
                ]),
            ]);

            const submitForm = buildFormSubmitWithTranslations({
                busy: busy.value,
                submit,
                isEditing: isEditing.value,
                invalid: $v.value.$invalid,
            }, translationsSubmit);

            const leftColumn = h('div', { class: 'col' }, [
                id,
                name,
                secret,
                secretInfo,
                h('hr'),
                submitForm,
            ]);

            let rightColumn : VNodeArrayChildren = [];

            if (
                !isRealmLocked.value
            ) {
                const realm = h(ARealms, {}, {
                    [SlotName.ITEM_ACTIONS]: (
                        props: { data: Realm, busy: boolean },
                    ) => renderEntityAssignAction({
                        item: form.realm_id === props.data.id,
                        busy: props.busy,
                        add() {
                            form.realm_id = props.data.id;
                        },
                        drop() {
                            form.realm_id = '';
                        },
                    }),
                });

                rightColumn = [
                    h('div', {
                        class: 'col',
                    }, [
                        realm,
                    ]),
                ];
            }

            return h('form', {
                onSubmit($event: any) {
                    $event.preventDefault();

                    return submit.apply(null);
                },
            }, [
                h('div', { class: 'row' }, [
                    leftColumn,
                    rightColumn,
                ]),
            ]);
        };

        return () => render();
    },
});

export default ARobotForm;
