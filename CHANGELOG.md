# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.32.0](https://github.com/authup/authup/compare/v0.31.3...v0.32.0) (2023-04-03)


### Bug Fixes

* token verfifier redis cache ([ad396dc](https://github.com/authup/authup/commit/ad396dc084d4657a9a4a22d8c8ee9714de38f363))


### Features

* move token-creator & http interceptor to global core package ([3824f86](https://github.com/authup/authup/commit/3824f86799003de2f4fc3602522fcbfbafa4d13c))
* use core token-interceptor for ui token session management ([33ec6e0](https://github.com/authup/authup/commit/33ec6e0ad835c7203d3d848f074a2210507e0ad3))





## [0.31.3](https://github.com/authup/authup/compare/v0.31.2...v0.31.3) (2023-04-03)


### Bug Fixes

* config database option validator ([82afa32](https://github.com/authup/authup/commit/82afa3286fbd84cce8a9bdedc29fcbb84aa92962))





## [0.31.2](https://github.com/authup/authup/compare/v0.31.1...v0.31.2) (2023-04-03)


### Bug Fixes

* mounting of http interceptor + better struct for verification data ([0ee1e40](https://github.com/authup/authup/commit/0ee1e403752e5576ae2d22a1b840ce05ae452c10))





## [0.31.1](https://github.com/authup/authup/compare/v0.31.0...v0.31.1) (2023-04-03)


### Bug Fixes

* define userinfo endpoint for userinfo api ([106a3f7](https://github.com/authup/authup/commit/106a3f703c6b49523418a89e816f8501e00be3db))





# [0.31.0](https://github.com/authup/authup/compare/v0.30.1...v0.31.0) (2023-04-03)


### Features

* add user-info domain api + renamed useHTTPClientAPI ([22d1cdc](https://github.com/authup/authup/commit/22d1cdce326bb7a0549d28b04b0157840b3f7623))





## [0.30.1](https://github.com/authup/authup/compare/v0.30.0...v0.30.1) (2023-04-03)


### Bug Fixes

* cleanup exports and bump min peer version ([a639294](https://github.com/authup/authup/commit/a639294b906b2c3e9358ab08223929acb7950fcf))





# [0.30.0](https://github.com/authup/authup/compare/v0.29.0...v0.30.0) (2023-04-03)


### Bug Fixes

* move vault configuration to server-api package from server-core package ([4783326](https://github.com/authup/authup/commit/4783326e2c0984bb10615d25d76e5cddff936e94))


### Features

* add socket/req object as argument to token verifier handler ([9ebd664](https://github.com/authup/authup/commit/9ebd664f3803ee93dfdc07087b922e8236c39167))
* allow passing token-verfiier instance beside option variant ([831e16a](https://github.com/authup/authup/commit/831e16a9f3a67fa6f13500e885e7c72565f67614))
* complete refactor of adapter + new sub-modules craetor, interceptor & verifier ([9940741](https://github.com/authup/authup/commit/99407417372c0b73ab6bbdfe84d9af177c8785e2))
* decouple http middleware from routup ([759529e](https://github.com/authup/authup/commit/759529ea9ddd5a20fdabf77eab5c84dbc02ef8b7))
* support interceptor mounting on client and client driver instance ([a26dafe](https://github.com/authup/authup/commit/a26dafe8174cf9c6de0bf85c294baf8e32d6261a))





# [0.29.0](https://github.com/authup/authup/compare/v0.28.0...v0.29.0) (2023-04-01)


### Bug Fixes

* adjusted README.md, package.json files + renamed http client ([fcf8423](https://github.com/authup/authup/commit/fcf8423228fa73aa2a61ba8de96c0af51dfb0c5f))
* better naming for checking database options ([b2ff0a2](https://github.com/authup/authup/commit/b2ff0a28173fd79d87cbd2e303fa2438e08ff2fb))
* enhance executorÂ ([31624c1](https://github.com/authup/authup/commit/31624c1a6a91c33a0fd29a9e33f451e9133d5cf1))
* vue-layout preset usage for production build ([368a6c7](https://github.com/authup/authup/commit/368a6c774ccade2fcf7c51bc912b1262174c51ae))


### Features

* add realm & identity-provider selection to login form ([5678540](https://github.com/authup/authup/commit/5678540256e7fb59443548e5fe4eb4705d9346f1))
* renamed database-option to db-option ([ce9c2a1](https://github.com/authup/authup/commit/ce9c2a1e793637a392725996ebedacd96d2507ad))
* restructured & renamed packages ([dd587a8](https://github.com/authup/authup/commit/dd587a8102f375b56c6c64cd09b13c92b624a6e1))





# [0.28.0](https://github.com/authup/authup/compare/v0.27.0...v0.28.0) (2023-04-01)


### Bug Fixes

* resolve http controller path for swagger generation ([4612cc5](https://github.com/authup/authup/commit/4612cc55e4531d9b4fe3d1e91302802304f13cc4))


### Features

* allow database configuration via config file ([077cd11](https://github.com/authup/authup/commit/077cd1124f37c116cedd1dbafb4d9d685c8a7e50))





# [0.27.0](https://github.com/authup/authup/compare/v0.26.0...v0.27.0) (2023-04-01)


### Bug Fixes

* cleanup cli commands ([8a37cde](https://github.com/authup/authup/commit/8a37cdeb3b4eba59dc006e4336ad0f1a55133ffc))
* **deps:** bump redis-extension from 1.2.3 to 1.3.0 ([#992](https://github.com/authup/authup/issues/992)) ([2ac9ede](https://github.com/authup/authup/commit/2ac9ede2692c9d3cd19a2c7fc201f993b5a35cce))
* swagger look-up path for controllers ([ea75c11](https://github.com/authup/authup/commit/ea75c11363785365a03f1fba5c1015322c53b927))
* use constants for env variable names ([3122698](https://github.com/authup/authup/commit/3122698db86acc38729e74bd0bc546c41201882f))


### Features

* extended README.md file ([aefa1ee](https://github.com/authup/authup/commit/aefa1eed4267cf1667198ac08c3a1e4036e0d2ce))
* load config file for frontend ui if present ([7776430](https://github.com/authup/authup/commit/7776430963d6bc469887fa1261ccc8b65c49fd0a))
* load config file from cwd and writable directory ([54f324d](https://github.com/authup/authup/commit/54f324dbf51716461c7b164a15a4f06b2a36a8d5))





# [0.26.0](https://github.com/authup/authup/compare/v0.25.0...v0.26.0) (2023-03-30)


### Features

* explicit exclude sub folder files for docker build ([79cffe1](https://github.com/authup/authup/commit/79cffe151d27449420c9c6122206b0540c536acb))





# [0.25.0](https://github.com/authup/authup/compare/v0.24.0...v0.25.0) (2023-03-30)


### Bug Fixes

* move domains from database sub-folder to root src folder ([5e0d9b6](https://github.com/authup/authup/commit/5e0d9b610994f8ce83568cfd5d3df461d22e422c))
* remove console.log for config logging ([e39eb34](https://github.com/authup/authup/commit/e39eb34e8e3e23f8e17bb8ebfeded5327612c709))
* remove vault client check ([d336145](https://github.com/authup/authup/commit/d336145e69613de98852957ef3c366a535557ca5))


### Features

* add https proxy tunnel support for identity providers ([6a7b859](https://github.com/authup/authup/commit/6a7b859e31bad6f10dd2fde22cdc6dfab3da2285))





# [0.24.0](https://github.com/authup/authup/compare/v0.23.1...v0.24.0) (2023-03-30)


### Bug Fixes

* only start api application by default in docker container ([3e41a4e](https://github.com/authup/authup/commit/3e41a4ebd8ee1b6231d6944bbc716f452a2009e9))


### Features

* dynamic config getter for public-url ([5e17b05](https://github.com/authup/authup/commit/5e17b055c4e29fe43938fda90e465eccc7157d8e))





## [0.23.1](https://github.com/authup/authup/compare/v0.23.0...v0.23.1) (2023-03-30)


### Bug Fixes

* config validation for redis-,smtp- & vault-config ([19dd368](https://github.com/authup/authup/commit/19dd368cc833a1592676df2e1387f0699cc72f0f))





# [0.23.0](https://github.com/authup/authup/compare/v0.22.0...v0.23.0) (2023-03-30)


### Bug Fixes

* adjusted docker entrypoint + typos + cli start script ([f63296c](https://github.com/authup/authup/commit/f63296ce48e3ce20d8926fd5473f140379b89a02))
* **deps:** bump continu from 1.0.5 to 1.1.0 ([#982](https://github.com/authup/authup/issues/982)) ([91d901d](https://github.com/authup/authup/commit/91d901d1200cacf140dbda407813db5ad1a1f2b3))
* **deps:** bump locter from 1.0.10 to 1.1.0 ([#971](https://github.com/authup/authup/issues/971)) ([f778cd2](https://github.com/authup/authup/commit/f778cd2c240484ac4cef357db93afd3a7b02514e))
* set ability-manager also for unauthorized reuests/sockets ([99b0662](https://github.com/authup/authup/commit/99b0662190f0d0991f44a5551e7f5617fa267700))


### Features

* add support for docker image to run multiple apps simultanously ([dfae6d5](https://github.com/authup/authup/commit/dfae6d54539a2d14620eed4d97aec56f6817b50f))
* cleanup cli package & prefix node built-in module imports ([1ee269f](https://github.com/authup/authup/commit/1ee269f085e221f078adfa51cf87ddabde05715f))
* merge server-{,http,database} packages ([488070d](https://github.com/authup/authup/commit/488070dd73f8ba972fc5e01433b935d48e77bccd))
* refactored config loading & building ([07de0e3](https://github.com/authup/authup/commit/07de0e38542f2760d00ba3df77c76d673f76b6a8))
* replaced manual proxy parsing with http client detection ([18c3751](https://github.com/authup/authup/commit/18c3751f3dd3defdd9dfa34ec41522ac14d3b476))





# [0.22.0](https://github.com/Tada5hi/authup/compare/v0.21.0...v0.22.0) (2023-03-26)


### Bug Fixes

* removed redundancy for applying token introspection response ([4ca4e18](https://github.com/Tada5hi/authup/commit/4ca4e18f3944e866e549e7bde78a9ffb55e0889d))


### Features

* add oauth2 client as http-client property ([ab5c260](https://github.com/Tada5hi/authup/commit/ab5c2609fe7e88b63bc75b4077846f1875ba0571))





# [0.21.0](https://github.com/Tada5hi/authup/compare/v0.20.1...v0.21.0) (2023-03-26)


### Bug Fixes

* allow robot integrity check by name ([d6b2a6e](https://github.com/Tada5hi/authup/commit/d6b2a6e82de12c4c4980f0bd5db498398c86e9e7))
* remove logging for successfull token access ([a71dc3f](https://github.com/Tada5hi/authup/commit/a71dc3f78fd7c797ebdca17a17a259b9dbe34168))
* replaced migration generate utility fn ([73a6e4a](https://github.com/Tada5hi/authup/commit/73a6e4a83092009956540a9e165bdcfbfcd12d38))
* soft robot credentials save on startup ([0340dd5](https://github.com/Tada5hi/authup/commit/0340dd50f7144247dc8aed22b0f02b859db2c603))


### Features

* explicit endpoint to check/reset robot account ([4fe0e14](https://github.com/Tada5hi/authup/commit/4fe0e14e5b824506fa0231ab6dc7fb308bcbe2ae))





## [0.20.1](https://github.com/Tada5hi/authup/compare/v0.20.0...v0.20.1) (2023-03-25)


### Bug Fixes

* **deps:** bump vitepress from 1.0.0-alpha.60 to 1.0.0-alpha.61 ([#951](https://github.com/Tada5hi/authup/issues/951)) ([aa54c6c](https://github.com/Tada5hi/authup/commit/aa54c6ccbab057665cd29ba6df0dfcd600cb9045))
* vault config load/apply + error middleware + http user-attributes reading ([411df82](https://github.com/Tada5hi/authup/commit/411df829439a0a52982a78048858e80ae745ebe7))





# [0.20.0](https://github.com/Tada5hi/authup/compare/v0.19.0...v0.20.0) (2023-03-24)


### Features

* add integrity check for robot credentials in vault ([5700c80](https://github.com/Tada5hi/authup/commit/5700c8077329ca7a01b0f4dee919c7749b304e60))





# [0.19.0](https://github.com/Tada5hi/authup/compare/v0.18.0...v0.19.0) (2023-03-23)


### Features

* extend socket-/http-request env context ([56819ea](https://github.com/Tada5hi/authup/commit/56819ea4bd0fe79806fc0f620b384af1b497d851))





# [0.18.0](https://github.com/Tada5hi/authup/compare/v0.17.2...v0.18.0) (2023-03-23)


### Bug Fixes

* **deps:** bump @ebec/http from 0.2.2 to 1.0.0 ([#953](https://github.com/Tada5hi/authup/issues/953)) ([4786cd2](https://github.com/Tada5hi/authup/commit/4786cd2e7a8d849b6ec6a164c4bfc1c48e469851))
* **deps:** bump smob from 0.1.0 to 1.0.0 ([#952](https://github.com/Tada5hi/authup/issues/952)) ([363fc69](https://github.com/Tada5hi/authup/commit/363fc6902848a16982626f4fbe3cb7e5c1afd053))


### Features

* add realm- & scope-subscriber + minor cleanup + enum referencing ([dc4f1ba](https://github.com/Tada5hi/authup/commit/dc4f1ba167259f6c7c8f381a8569fe255646e85d))
* add vault client support for robot credentials syncing ([66b2300](https://github.com/Tada5hi/authup/commit/66b23007fdfa4221c48f2d66f5524fdb5b4f3ed3))
* adjusted lerna config ([215b3a5](https://github.com/Tada5hi/authup/commit/215b3a55916d8c923f404434985a68826650c136))
* broadcast redis events for changed domain entities ([4b2fd5e](https://github.com/Tada5hi/authup/commit/4b2fd5e44aa94a2d43d6c8b872bb0f298e0b4da2))
* support direct & socket domain events ([b9225c2](https://github.com/Tada5hi/authup/commit/b9225c21b5437ced4c6d0a02b75de3f35f1f64a3))





## [0.17.2](https://github.com/Tada5hi/authup/compare/v0.17.1...v0.17.2) (2023-03-20)


### Bug Fixes

* authorization for provider - role mapping ([00d518c](https://github.com/Tada5hi/authup/commit/00d518c510734095222bc53e507cb193ec1ffc28))
* **deps:** bump hapci/** to v1.3.0 ([2e7068a](https://github.com/Tada5hi/authup/commit/2e7068ae21e5a4d0dae0b9cde90a308efbc247de))
* **deps:** bump locter from 1.0.9 to 1.0.10 ([#948](https://github.com/Tada5hi/authup/issues/948)) ([72db115](https://github.com/Tada5hi/authup/commit/72db11574cf1ee630f476bdc5a952dcc2cbaec41))
* **deps:** bump vitepress from 1.0.0-alpha.56 to 1.0.0-alpha.58 ([#938](https://github.com/Tada5hi/authup/issues/938)) ([3444bcb](https://github.com/Tada5hi/authup/commit/3444bcb982156713dfd5604b0a53c9d8eb6a7e1e))
* **deps:** bump vitepress from 1.0.0-alpha.58 to 1.0.0-alpha.60 ([#940](https://github.com/Tada5hi/authup/issues/940)) ([860557b](https://github.com/Tada5hi/authup/commit/860557b2c05f543cff34436e7ce8f447c954ba81))
* revert oauth2 protocol validation changes ([7d8fd5d](https://github.com/Tada5hi/authup/commit/7d8fd5d5ed42db07fefc656be7a38bbc843b59d2))





## [0.17.1](https://github.com/Tada5hi/authup/compare/v0.17.0...v0.17.1) (2023-03-14)


### Bug Fixes

* **deps:** bump better-sqlite3 from 8.1.0 to 8.2.0 ([#935](https://github.com/Tada5hi/authup/issues/935)) ([29908c1](https://github.com/Tada5hi/authup/commit/29908c1b774c951166232940add6933700103b90))
* **deps:** bump pg from 8.9.0 to 8.10.0 ([#934](https://github.com/Tada5hi/authup/issues/934)) ([3e5d857](https://github.com/Tada5hi/authup/commit/3e5d857888f071e6bf5593872b94ff107df7fd66))
* **deps:** bump typeorm-extension from 2.5.2 to 2.5.3 ([#927](https://github.com/Tada5hi/authup/issues/927)) ([376e352](https://github.com/Tada5hi/authup/commit/376e352a62c711416776bd301b39e10390f9184e))
* **deps:** bump typeorm-extension from 2.5.3 to 2.5.4 ([#929](https://github.com/Tada5hi/authup/issues/929)) ([7884f49](https://github.com/Tada5hi/authup/commit/7884f49b200ad90717ed165ab817e569dfaa6b25))
* **deps:** bump typeorm-extension to v2.5.3 ([abe31c1](https://github.com/Tada5hi/authup/commit/abe31c18fbd2ecf61a7681f0812fea7b23560f44))
* **deps:** bump vitepress from 1.0.0-alpha.48 to 1.0.0-alpha.56 ([#933](https://github.com/Tada5hi/authup/issues/933)) ([3726cc4](https://github.com/Tada5hi/authup/commit/3726cc49875292646dacff52634c96772e3145d5))





# [0.17.0](https://github.com/Tada5hi/authup/compare/v0.16.0...v0.17.0) (2023-03-13)


### Bug Fixes

* **deps:** bump @routup/* dependencies ([c1e8cfe](https://github.com/Tada5hi/authup/commit/c1e8cfed9ac8a16d11682640446b6ad6654abbdc))
* **deps:** bump zod from 3.20.6 to 3.21.4 ([#919](https://github.com/Tada5hi/authup/issues/919)) ([e24a5ef](https://github.com/Tada5hi/authup/commit/e24a5efcc7201aba2b747d9352927a648d88e954))
* hash user password on registration endpoint ([bd3bc18](https://github.com/Tada5hi/authup/commit/bd3bc1855e735e7d36d742952fe14b8d43bb1609))


### Features

* enhanced swagger generation ([50a171f](https://github.com/Tada5hi/authup/commit/50a171f5b070f1faf22ee5a81913c908365571c7))





# [0.16.0](https://github.com/Tada5hi/authup/compare/v0.15.4...v0.16.0) (2023-02-28)


### Bug Fixes

* **deps:** bump locter from 1.0.5 to 1.0.6 ([#902](https://github.com/Tada5hi/authup/issues/902)) ([626900d](https://github.com/Tada5hi/authup/commit/626900de382aca81ed6f25e14fca693bffeeb28b))
* **deps:** bump vitepress from 1.0.0-alpha.47 to 1.0.0-alpha.48 ([#897](https://github.com/Tada5hi/authup/issues/897)) ([e2cd682](https://github.com/Tada5hi/authup/commit/e2cd6823c3aa52c6cbf56de58ae47919b8a3a5af))


### Features

* add support to lock/unlock user name manipulation ([2fcb2c5](https://github.com/Tada5hi/authup/commit/2fcb2c5e50c62aa727b0109dd1dff0647b699231))
* **server-adapter:** restructured package structure + enhanced logging ([f01ad48](https://github.com/Tada5hi/authup/commit/f01ad4872031199bd90e85f4913c3a0d01a29722))





## [0.15.4](https://github.com/Tada5hi/authup/compare/v0.15.3...v0.15.4) (2023-02-24)


### Bug Fixes

* allow dot character in user name ([e430b4c](https://github.com/Tada5hi/authup/commit/e430b4c6b54dee72303bceeb33dcc8692abde73a))
* allow filtering by drop_able realm attribute ([5cd20a3](https://github.com/Tada5hi/authup/commit/5cd20a39f63436c6550f2b1fb1e50c7cb862798e))





## [0.15.3](https://github.com/Tada5hi/authup/compare/v0.15.2...v0.15.3) (2023-02-23)


### Bug Fixes

* bum routup dependencies + adjusted docs url in star command ([cdd7f5a](https://github.com/Tada5hi/authup/commit/cdd7f5acde04155d3fd4d694583265bd5724dcba))
* **deps:** bump @ucast/mongo2js from 1.3.3 to 1.3.4 ([#863](https://github.com/Tada5hi/authup/issues/863)) ([baee990](https://github.com/Tada5hi/authup/commit/baee990378cc7fe613042ebae66b80f0139fe713))
* **deps:** bump express-validator from 6.14.3 to 6.15.0 ([#864](https://github.com/Tada5hi/authup/issues/864)) ([653f5d7](https://github.com/Tada5hi/authup/commit/653f5d7c4fd3bbe5b2f5b32d0a824cc340fed43b))
* **deps:** bump locter from 1.0.1 to 1.0.2 ([#853](https://github.com/Tada5hi/authup/issues/853)) ([e593ab6](https://github.com/Tada5hi/authup/commit/e593ab6df880294d1d1d4ed81d05910ac20be706))
* **deps:** bump locter from 1.0.3 to 1.0.5 ([#867](https://github.com/Tada5hi/authup/issues/867)) ([37de7af](https://github.com/Tada5hi/authup/commit/37de7afb2eccaf830f8567959f34e91492fe3689))
* **deps:** bump typeorm-extension from 2.5.0 to 2.5.2 ([#884](https://github.com/Tada5hi/authup/issues/884)) ([7689aea](https://github.com/Tada5hi/authup/commit/7689aea07323e28fac7f97e692fb3c11e44d3f80))
* **deps:** bump undici from 5.16.0 to 5.19.1 ([#866](https://github.com/Tada5hi/authup/issues/866)) ([bfcfaa5](https://github.com/Tada5hi/authup/commit/bfcfaa53ae26d4da012d2d29a46b9f76f34ee801))
* **deps:** bump vitepress from 1.0.0-alpha.45 to 1.0.0-alpha.46 ([#852](https://github.com/Tada5hi/authup/issues/852)) ([32bc42d](https://github.com/Tada5hi/authup/commit/32bc42d359788f0b89bcad439ca3ffa7640d1745))
* **deps:** bump vitepress from 1.0.0-alpha.46 to 1.0.0-alpha.47 ([#882](https://github.com/Tada5hi/authup/issues/882)) ([535ddbb](https://github.com/Tada5hi/authup/commit/535ddbb8dcf4c894f6907d8bfc7cf39c4129a5ab))
* **deps:** bump yargs from 17.6.2 to 17.7.0 ([#874](https://github.com/Tada5hi/authup/issues/874)) ([e1aa371](https://github.com/Tada5hi/authup/commit/e1aa371bf833a255dfa07da33ce88fd7f1ee61ff))
* **deps:** bump yargs from 17.7.0 to 17.7.1 ([#890](https://github.com/Tada5hi/authup/issues/890)) ([2035fd8](https://github.com/Tada5hi/authup/commit/2035fd8fe70bbbdc4fbf51f646b9c5344790cf4b))
* **deps:** updated typeorm-extension ([fc74f4a](https://github.com/Tada5hi/authup/commit/fc74f4ad114904a74d0e46416aa564306ec32082))





## [0.15.2](https://github.com/Tada5hi/authup/compare/v0.15.1...v0.15.2) (2023-02-14)


### Bug Fixes

* **deps:** bump zod from 3.20.2 to 3.20.6 ([#843](https://github.com/Tada5hi/authup/issues/843)) ([b94e056](https://github.com/Tada5hi/authup/commit/b94e056c8d4fe100845bb446019da381a61322e5))
* **server-database:** readable/writable query resources ([a542df1](https://github.com/Tada5hi/authup/commit/a542df174c9810766a5463099ca313c8c7f8d966))





## [0.15.1](https://github.com/Tada5hi/authup/compare/v0.15.0...v0.15.1) (2023-02-08)


### Bug Fixes

* **deps:** bump better-sqlite3 from 8.0.1 to 8.1.0 ([#837](https://github.com/Tada5hi/authup/issues/837)) ([74879e9](https://github.com/Tada5hi/authup/commit/74879e9d69c49bc5dbc14ae69d5022d9ac955d0d))
* **deps:** bump typeorm from 0.3.11 to 0.3.12 ([#838](https://github.com/Tada5hi/authup/issues/838)) ([ead58dd](https://github.com/Tada5hi/authup/commit/ead58dd35f18659d7a2df6f244d40919ec78b167))
* restructured middlewares + increased allowed requests per windwoMs ([ed62026](https://github.com/Tada5hi/authup/commit/ed62026d06ad30220066ccc3947d477d6e2053af))





# [0.15.0](https://github.com/Tada5hi/authup/compare/v0.14.1...v0.15.0) (2023-02-07)


### Bug Fixes

* **deps:** bump locter from 0.8.0 to 0.8.2 ([#813](https://github.com/Tada5hi/authup/issues/813)) ([719de90](https://github.com/Tada5hi/authup/commit/719de90521c4878714fed3b2911e2c94d0a0872a))
* **deps:** bump locter to v1 ([bcd53ac](https://github.com/Tada5hi/authup/commit/bcd53acad4a9591a2aa1f7676d6baa4d4416bef5))
* **deps:** bump redis-extension from 1.2.2 to 1.2.3 ([#824](https://github.com/Tada5hi/authup/issues/824)) ([914fe7e](https://github.com/Tada5hi/authup/commit/914fe7e6c72989eeaf4c5b0134e419340c5c964a))
* **deps:** bump vitepress from 1.0.0-alpha.43 to 1.0.0-alpha.45 ([#811](https://github.com/Tada5hi/authup/issues/811)) ([539abca](https://github.com/Tada5hi/authup/commit/539abca2a05e56d93444b3f4fadd3283ac02dc4f))
* **deps:** bump vue from 3.2.45 to 3.2.47 ([#825](https://github.com/Tada5hi/authup/issues/825)) ([69d44a6](https://github.com/Tada5hi/authup/commit/69d44a62684e980225cb5c416d4ccb4d5e5f902d))
* oauth2 code flow with open-id or access-token response type ([0ccb3e5](https://github.com/Tada5hi/authup/commit/0ccb3e5c0a1c869eb2235101e4d98445f77c3b0a))
* **server-database:** use default database options as fallback ([3fdc229](https://github.com/Tada5hi/authup/commit/3fdc2298d161324459bca957b7d3a227776728a6))


### Features

* error response payload builder ([7c92967](https://github.com/Tada5hi/authup/commit/7c92967f1c3fa1fb706927626d286cbb50a5846e))
* renamed process env handling ([4fbdef2](https://github.com/Tada5hi/authup/commit/4fbdef2a661948969a8bfad5bfced5a4289ed465))
* **server-http:** restructured & optimized oauth2 sub module ([8d8802d](https://github.com/Tada5hi/authup/commit/8d8802d002616880e289b9eacc3ad60df5d3e2b6))





## [0.14.1](https://github.com/Tada5hi/authup/compare/v0.14.0...v0.14.1) (2023-01-30)


### Bug Fixes

* **server:** bump locter dependency ([d0d0ad2](https://github.com/Tada5hi/authup/commit/d0d0ad2ea29c7d6ab0a64beb37835f4df40afde5))
* **server:** saving seeder result on setup command ([d75f9ba](https://github.com/Tada5hi/authup/commit/d75f9ba82a76d07f3d337d45ca8877f41c3c810d))





# [0.14.0](https://github.com/Tada5hi/authup/compare/v0.13.0...v0.14.0) (2023-01-29)


### Features

* minor code cleanup + fixed redis caching strategy ([a5286b7](https://github.com/Tada5hi/authup/commit/a5286b716e6432bd872cda2e06def8f0c3ab9111))





# [0.13.0](https://github.com/Tada5hi/authup/compare/v0.12.1...v0.13.0) (2023-01-28)


### Features

* reverted server-* packages back to cjs to strange behaviour ([9cc9c36](https://github.com/Tada5hi/authup/commit/9cc9c360447b9ca39f04cda93ecb7e9eeb7966f7))





## [0.12.1](https://github.com/Tada5hi/authup/compare/v0.12.0...v0.12.1) (2023-01-28)


### Bug Fixes

* peer-dependency version + updated license information ([f693215](https://github.com/Tada5hi/authup/commit/f69321538afbd2923287209593cdebcedaa29637))





# [0.12.0](https://github.com/Tada5hi/authup/compare/v0.11.1...v0.12.0) (2023-01-28)


### Features

* use tsc for transpiling of decorator packages ([2c41385](https://github.com/Tada5hi/authup/commit/2c41385201f6555b0bacaf09af5ad9779ab2a6c5))





## [0.11.1](https://github.com/Tada5hi/authup/compare/v0.11.0...v0.11.1) (2023-01-27)


### Bug Fixes

* **deps:** bump ilingo to v2.2.1 ([eebc902](https://github.com/Tada5hi/authup/commit/eebc902495debf127679f8c2619deef00249b041))
* **deps:** bump nodemailer from 6.9.0 to 6.9.1 ([#808](https://github.com/Tada5hi/authup/issues/808)) ([bb240b3](https://github.com/Tada5hi/authup/commit/bb240b33d87fc1eeaab5ee55c1dc9f8a4da50bb4))
* **deps:** bump pg from 8.8.0 to 8.9.0 ([#807](https://github.com/Tada5hi/authup/issues/807)) ([9b607d6](https://github.com/Tada5hi/authup/commit/9b607d6c170fb79e35300c8e074a5cbac4353ec8))
* **deps:** updated dependencies ([b3d221c](https://github.com/Tada5hi/authup/commit/b3d221c862c4f4dbd0ccf018566ef00796fcd591))
* **server-http:** relative path resolving ([4f8d3e6](https://github.com/Tada5hi/authup/commit/4f8d3e60d69907d1982d0bd32b542512e10c3bdc))





# [0.11.0](https://github.com/Tada5hi/authup/compare/v0.10.1...v0.11.0) (2023-01-27)


### Bug Fixes

* **deps:** bump cookiejar from 2.1.3 to 2.1.4 ([#777](https://github.com/Tada5hi/authup/issues/777)) ([3aa1a41](https://github.com/Tada5hi/authup/commit/3aa1a414a971d3f13c28388df0c2ff0fc6fe71a9))
* **deps:** bump express-validator from 6.14.2 to 6.14.3 ([#772](https://github.com/Tada5hi/authup/issues/772)) ([632a942](https://github.com/Tada5hi/authup/commit/632a94288fa5f7017cf6e0731647c0517f4dc058))
* **deps:** bump rc9 from 2.0.0 to 2.0.1 ([#789](https://github.com/Tada5hi/authup/issues/789)) ([943df77](https://github.com/Tada5hi/authup/commit/943df77563c2d282ff1fc716179409fd41e30036))
* **deps:** bump redis-extension from 1.2.0 to 1.2.1 ([#795](https://github.com/Tada5hi/authup/issues/795)) ([17afd4e](https://github.com/Tada5hi/authup/commit/17afd4e3ffaaf4320d1f5847a91ef160a5acbafe))
* **deps:** updated nuxt to v3.1.1 ([8070cf0](https://github.com/Tada5hi/authup/commit/8070cf083b7efe2a21b4fd2e8106a612eaba5de4))
* prefix node module imports with node: ([e866876](https://github.com/Tada5hi/authup/commit/e866876f6a64f50946ca7fd9945fce0958ebd6d9))
* **ui:** add nav toggling + add additional nesting layer header/sidebar ([07ea051](https://github.com/Tada5hi/authup/commit/07ea051a5226a266699d1e849a21b6c5c85d0613))
* **vue:** replaced esbuild with swc core ([a59a667](https://github.com/Tada5hi/authup/commit/a59a667fb5ca580464703311b776159f91bbc91a))


### Features

* **ui:** add initial head meta tags ([536cb08](https://github.com/Tada5hi/authup/commit/536cb08fad8e887ec7b334d577dd40bfe685f310))





## [0.10.1](https://github.com/Tada5hi/authup/compare/v0.10.0...v0.10.1) (2023-01-23)


### Bug Fixes

* **deps:** bump vitepress from 1.0.0-alpha.38 to 1.0.0-alpha.40 ([#771](https://github.com/Tada5hi/authup/issues/771)) ([47b8f94](https://github.com/Tada5hi/authup/commit/47b8f944ea4b8d1062c2dec9986c0893a0d0849a))
* **deps:** reverted minimatch version to v5 ([7385d0d](https://github.com/Tada5hi/authup/commit/7385d0d25b729087000f81d2d04c2033f7464958))





# [0.10.0](https://github.com/Tada5hi/authup/compare/v0.9.0...v0.10.0) (2023-01-20)


### Features

* bump (peer-) dependency version ([f2faacb](https://github.com/Tada5hi/authup/commit/f2faacb0f19b81251bb063dd49a2d91539e4e39d))





# [0.9.0](https://github.com/Tada5hi/authup/compare/v0.8.0...v0.9.0) (2023-01-20)


### Bug Fixes

* **deps:** bump locter from 0.6.2 to 0.7.1 ([9e1d44b](https://github.com/Tada5hi/authup/commit/9e1d44b580826202f8e210c7e4f2e45531398b22))
* **deps:** bump minimatch from 5.1.2 to 6.1.5 ([#763](https://github.com/Tada5hi/authup/issues/763)) ([179226c](https://github.com/Tada5hi/authup/commit/179226cc1c312cc7c95c2fe1711164df15b1dfe1))
* **deps:** bump vitepress from 1.0.0-alpha.36 to 1.0.0-alpha.38 ([#757](https://github.com/Tada5hi/authup/issues/757)) ([327b220](https://github.com/Tada5hi/authup/commit/327b220512f789d014092274d34347b8fadd8d6d))
* **deps:** updated typeorm-extension ([3b0aee9](https://github.com/Tada5hi/authup/commit/3b0aee95c23fbe619b611f67c11f77832c2a582e))
* **server-common:** use logger for env loading error ([985bee9](https://github.com/Tada5hi/authup/commit/985bee9ae0842aa8c2583561fe971b04d5376d0c))


### Features

* lazy password grant + minor entity management ui guards ([127ec1c](https://github.com/Tada5hi/authup/commit/127ec1c13f108f2a032aba67dd3b662d35251dc7))
* **server-http:** increase max requests per minute ([9e82df4](https://github.com/Tada5hi/authup/commit/9e82df4399be7b295163a06694c6d147cf34dc33))
* **ui:** fix store usage + implemented realm state ([4384c55](https://github.com/Tada5hi/authup/commit/4384c55d66dcc7919df3508e4f96b5189cbc3a60))
* **ui:** implemented realm switching in admin area ([d902af7](https://github.com/Tada5hi/authup/commit/d902af78d85c270f75425eef01e191a1cc7504ac))





# [0.8.0](https://github.com/Tada5hi/authup/compare/v0.7.0...v0.8.0) (2023-01-16)


### Bug Fixes

* **deps:** bump @types/jsonwebtoken from 9.0.0 to 9.0.1 ([f2ef31c](https://github.com/Tada5hi/authup/commit/f2ef31c46eae74a9d8b8d219a3bcb418d2d48bb0))
* **deps:** bump continu from 1.0.4 to 1.0.5 ([069a816](https://github.com/Tada5hi/authup/commit/069a81689500f95d0e32542b9eb2e0493c18ce43))
* **deps:** bump nodemailer from 6.8.0 to 6.9.0 ([fb374e4](https://github.com/Tada5hi/authup/commit/fb374e42faa4443876c28a91ffd78b51d9276f5c))
* **deps:** bump smob from 0.0.6 to 0.0.7 ([535685c](https://github.com/Tada5hi/authup/commit/535685cfb55e58dfa88635d1f08c0e3909d417dd))
* **deps:** bump vitepress from 1.0.0-alpha.35 to 1.0.0-alpha.36 ([aeaf9f2](https://github.com/Tada5hi/authup/commit/aeaf9f2bdcf195fffa411c00632837fc7cba7a36))


### Features

* replaced ts-jest & partially rollup with swc ([bf2b1aa](https://github.com/Tada5hi/authup/commit/bf2b1aa7ed4f0ee9e63fabf0d1d38754bbfa3310))





# [0.7.0](https://github.com/Tada5hi/authup/compare/v0.6.3...v0.7.0) (2023-01-11)


### Bug Fixes

* **deps:** bump @routup/static from 0.2.1 to 0.4.0 ([3cd7461](https://github.com/Tada5hi/authup/commit/3cd7461fb0a36221c5db1e8d34ad9930a8cc1b68))
* **deps:** bump locter from 0.6.1 to 0.6.2 ([b50a892](https://github.com/Tada5hi/authup/commit/b50a892101f677a91d8661c1d74627310c8d54c6))
* **server-http:** expire date creation for authorization code ([07ba21a](https://github.com/Tada5hi/authup/commit/07ba21ae9227068b1618c65012f47ae2da0a616a))
* **server-http:** expire date creation for refresh token ([3cd443c](https://github.com/Tada5hi/authup/commit/3cd443c559c45d901c613e946470dd4aabb3a916))


### Features

* unified entity columns for sqlite, mysql & postgres ([f379caa](https://github.com/Tada5hi/authup/commit/f379caac7b7f95145629734b692a7d38a472c9b2))





## [0.6.3](https://github.com/Tada5hi/authup/compare/v0.6.2...v0.6.3) (2023-01-10)


### Bug Fixes

* **common:** peer-dependency version ([76902ca](https://github.com/Tada5hi/authup/commit/76902ca1aadbcf9f96de147f428c2e322bfee916))





## [0.6.2](https://github.com/Tada5hi/authup/compare/v0.6.1...v0.6.2) (2023-01-10)


### Bug Fixes

* **deps:** bump json5 from 1.0.1 to 1.0.2 ([8f9e305](https://github.com/Tada5hi/authup/commit/8f9e30537e934fd9d0e871224b019ea60d92191d))
* **deps:** bump luxon from 1.28.0 to 1.28.1 ([b7cde23](https://github.com/Tada5hi/authup/commit/b7cde236b60b5042c0ccda66671f52b8b2b275b6))
* **deps:** updated peer-dependencies + oauth2 client library ([d91981e](https://github.com/Tada5hi/authup/commit/d91981e7cafe0def6fef26e5daa3042524c9a3e0))





## [0.6.1](https://github.com/Tada5hi/authup/compare/v0.6.0...v0.6.1) (2023-01-08)


### Bug Fixes

* robot secret env parsing ([19e81cb](https://github.com/Tada5hi/authup/commit/19e81cb3efb20d92101f39b5feff4c0b3ab5fc39))





# [0.6.0](https://github.com/Tada5hi/authup/compare/v0.5.0...v0.6.0) (2023-01-08)


### Bug Fixes

* oauth2 authorization code grant flow ([6422a9b](https://github.com/Tada5hi/authup/commit/6422a9b207474596363b3d48ce12e0c8e184ae8d))


### Features

* add prometheus + rate-limit support ([5b1a9cd](https://github.com/Tada5hi/authup/commit/5b1a9cdb7edafa7b1e696a2b68d41bef5ae2c397))





# [0.5.0](https://github.com/Tada5hi/authup/compare/v0.4.0...v0.5.0) (2023-01-08)


### Bug Fixes

* **deps:** bump @routup/static from 0.1.2 to 0.2.0 ([61ebacb](https://github.com/Tada5hi/authup/commit/61ebacba1d9f4a7eb6e882d0e3096b6e79c1eedd))
* **deps:** bump @routup/static from 0.2.0 to 0.2.1 ([39296ff](https://github.com/Tada5hi/authup/commit/39296fff669071757c777cdb6c32b9e7556ea713))
* **deps:** bump @types/jsonwebtoken from 8.5.9 to 9.0.0 ([17bc27b](https://github.com/Tada5hi/authup/commit/17bc27b85466a34a61b0d4c89e516760d549d42e))
* **deps:** bump @types/morgan from 1.9.3 to 1.9.4 ([389ee97](https://github.com/Tada5hi/authup/commit/389ee97c0a02710797bfaf35a08a82d857d86671))
* **deps:** bump jsonwebtoken from 8.5.1 to 9.0.0 ([34e9209](https://github.com/Tada5hi/authup/commit/34e9209d27899f6cf7a0be72676290ba2a62ebed))
* **deps:** bump typeorm-extension from 2.4.0 to 2.4.1 ([406b70b](https://github.com/Tada5hi/authup/commit/406b70b95ee7be043ca09b5b2c2057422f1d33dc))
* **deps:** bump vitepress from 1.0.0-alpha.33 to 1.0.0-alpha.35 ([77acc30](https://github.com/Tada5hi/authup/commit/77acc3076084140fb7be4cad23a3a576778b1264))
* **server-database:** enable/disable robot depending on config value ([080cd83](https://github.com/Tada5hi/authup/commit/080cd8375cb151dde656bb3fdda3666351a1d1a1))
* **server:** reset migrations + run migration transaction individually ([82d70a5](https://github.com/Tada5hi/authup/commit/82d70a56250bb18a29d32832571db6e13c1652a5))


### Features

* add healthcheck cli command ([208c62f](https://github.com/Tada5hi/authup/commit/208c62fbde68da0c1ae63378e47692d9a889d3cc))
* add robot/user renaming constraints + non owned permission assign ([ea12e73](https://github.com/Tada5hi/authup/commit/ea12e7309c6d539ec005cc5460ef50a2ebe8c931))
* **server-database:** updated indexes + realmified resources ([cb5e19e](https://github.com/Tada5hi/authup/commit/cb5e19ef1e49cdde6c0e63c6e59167638a9f79d6))
* **server-http:** allow name/slug identifier for fetching resource ([c05a69f](https://github.com/Tada5hi/authup/commit/c05a69f46da14e08966acd636644e65addc83370))





# [0.4.0](https://github.com/Tada5hi/authup/compare/v0.3.1...v0.4.0) (2022-12-21)


### Bug Fixes

* **deps:** bump @types/nodemailer from 6.4.6 to 6.4.7 ([148e5fe](https://github.com/Tada5hi/authup/commit/148e5fe574a26b940be0de43a950852a832ae7dc))
* **deps:** bump locter from 0.6.0 to 0.6.1 ([236bf62](https://github.com/Tada5hi/authup/commit/236bf627fc338e670671615c2a6b036811aff086))
* **deps:** bump minimatch from 5.1.1 to 5.1.2 ([c656530](https://github.com/Tada5hi/authup/commit/c656530601d987367e957a917b11e28bf09868c4))
* **deps:** bump typeorm-extension from 2.3.1 to 2.4.0 ([17b1307](https://github.com/Tada5hi/authup/commit/17b1307b5d466cdf95523dec42688f6564fb8069))
* **deps:** bump vitepress from 1.0.0-alpha.30 to 1.0.0-alpha.31 ([1f8fbc1](https://github.com/Tada5hi/authup/commit/1f8fbc1f4241affcf0753f61369c3b933f331f02))
* **deps:** bump vitepress from 1.0.0-alpha.31 to 1.0.0-alpha.32 ([3363cc3](https://github.com/Tada5hi/authup/commit/3363cc3af8f9faa72ec7b50ee7a26a04cef9a695))
* **deps:** bump zod from 3.19.1 to 3.20.1 ([8c7075e](https://github.com/Tada5hi/authup/commit/8c7075e27f7105f89dddf7bec2c341e146788771))
* **deps:** bump zod from 3.20.1 to 3.20.2 ([4477c61](https://github.com/Tada5hi/authup/commit/4477c6160da7a579db589e49f81c22aaca4e414c))
* updated routup dependency ([94f6797](https://github.com/Tada5hi/authup/commit/94f6797b51f4dff18e88e6a54836f5f131936802))


### Features

* add scope management (http-endpoint, db-entity, ...) ([2ab4236](https://github.com/Tada5hi/authup/commit/2ab42364e44f032cb93c9946c40a9fd71f287c44))
* further enhancement for client & scope management ([29d1f3e](https://github.com/Tada5hi/authup/commit/29d1f3ee5ecde14afa0b692dd9589887bc2df54e))
* only pre-parse cookie & query if options are set ([528c414](https://github.com/Tada5hi/authup/commit/528c414756e6f6fddf362d12c37e4b0a549f92b0))
* **ui:** add oauth2 authorization modal ([858e972](https://github.com/Tada5hi/authup/commit/858e9723dc3bd319b5b05f4a29f5c1a6d1e690fd))
* use continu for config management ([88b057d](https://github.com/Tada5hi/authup/commit/88b057dd6f15fb77c6a25197b51e6e0765e4fbe5))





## [0.3.1](https://github.com/Tada5hi/authup/compare/v0.3.0...v0.3.1) (2022-12-12)


### Bug Fixes

* **ui:** minor enahcenement to auth store & middleware ([80b97d0](https://github.com/Tada5hi/authup/commit/80b97d02977795ece02d60d4daff5eae58d03028))





# [0.3.0](https://github.com/Tada5hi/authup/compare/v0.2.2...v0.3.0) (2022-12-12)


### Bug Fixes

* **server-database:** better constraints for robot-,client-&role-entity ([d519cfd](https://github.com/Tada5hi/authup/commit/d519cfd90b4ce0f7f7b0cf5f1af1f48cbe4b2c64))
* **server-http:** enhance {user,role,robot} endpoint validation ([842afcc](https://github.com/Tada5hi/authup/commit/842afccee90a0c3f7510ba61edf1cfe9f7840033))
* **server-http:** minor issue with user validation ([1bc4a65](https://github.com/Tada5hi/authup/commit/1bc4a655e6f3ed6b9dca5679a13db32d1978da9b))
* **ui:** minor fixes (list-builder,{client,permission}-form,...) ([666b41f](https://github.com/Tada5hi/authup/commit/666b41f2fccc370815046087a621882f0159f1cc))


### Features

* add client/application management ([5327e9b](https://github.com/Tada5hi/authup/commit/5327e9bf411dfeeadef60d8f28ea81e0bc638f38))
* allow non realm assigned clients ([3be4011](https://github.com/Tada5hi/authup/commit/3be401106c5b03f1151c182e63eae0a0d543fa36))
* enhanced & extended permission management ([3c33bd0](https://github.com/Tada5hi/authup/commit/3c33bd0e0dcf1035d546fce375a76bb1c1312a05))
* refactored db schema - uuid as primary key for realm & perms ([9f9d10e](https://github.com/Tada5hi/authup/commit/9f9d10e5e1e2fc739f9f3c26a0eb0b4449097d19))
* **server-http:** set realm_name in token payload ([b6a5783](https://github.com/Tada5hi/authup/commit/b6a578329d77b240d4117fb626065512dcfcef2c))





## [0.2.2](https://github.com/Tada5hi/authup/compare/v0.2.1...v0.2.2) (2022-12-09)


### Bug Fixes

* **deps:** bump typeorm-extension from 2.3.0 to 2.3.1 ([aaccef7](https://github.com/Tada5hi/authup/commit/aaccef744d37f10146c9905611d9b819bc080a30))
* **routup-http:** updated rotuup dependencies ([da6a6a7](https://github.com/Tada5hi/authup/commit/da6a6a7ebd75fc20f05db9b7540070e6fea2d187))





## [0.2.1](https://github.com/Tada5hi/authup/compare/v0.2.0...v0.2.1) (2022-12-09)


### Bug Fixes

* **server-http:** add missing type export ([5c0a994](https://github.com/Tada5hi/authup/commit/5c0a994116655e091d847d99d291b817b6ff02db))





# [0.2.0](https://github.com/Tada5hi/authup/compare/v0.1.6...v0.2.0) (2022-12-09)


### Bug Fixes

* **server-http:** expose use-request-env util ([201fdab](https://github.com/Tada5hi/authup/commit/201fdabe29eeec7faadeb52b11db419ce4129119))


### Features

* **server-database:** add migration generate fn ([7a5b364](https://github.com/Tada5hi/authup/commit/7a5b364eebf5f0e0da0c9bc3e51fed89b2a2e547))





## [0.1.6](https://github.com/Tada5hi/authup/compare/v0.1.5...v0.1.6) (2022-12-08)


### Bug Fixes

* **authup:** better process output parsing ([edc3ca4](https://github.com/Tada5hi/authup/commit/edc3ca471821d2ef7f122e8cdc86452364d56a69))





## [0.1.5](https://github.com/Tada5hi/authup/compare/v0.1.4...v0.1.5) (2022-12-08)


### Bug Fixes

* **ui:** make output file executable ([ba21fad](https://github.com/Tada5hi/authup/commit/ba21fadd4ff062091283ca5ff632bb5279f1655b))





## [0.1.4](https://github.com/Tada5hi/authup/compare/v0.1.3...v0.1.4) (2022-12-08)


### Bug Fixes

* use package-name for npx execution ([401dd26](https://github.com/Tada5hi/authup/commit/401dd267ea556ba86c126ffb3ba4a16388c04475))





## [0.1.3](https://github.com/Tada5hi/authup/compare/v0.1.2...v0.1.3) (2022-12-08)


### Bug Fixes

* **authup:** reading config for ui & server ([605d8ee](https://github.com/Tada5hi/authup/commit/605d8eecc70a63ff2ad0a5267aaef56525c98759))





## [0.1.2](https://github.com/Tada5hi/authup/compare/v0.1.1...v0.1.2) (2022-12-08)


### Bug Fixes

* **server:** add shebang to cli entrypoint ([f77eb85](https://github.com/Tada5hi/authup/commit/f77eb85a55d4becdcd996a634a4fbcc463b2cba4))





## [0.1.1](https://github.com/Tada5hi/authup/compare/v0.1.0...v0.1.1) (2022-12-08)


### Bug Fixes

* **authup:** use module path only as fallback for execution ([e0ddcb0](https://github.com/Tada5hi/authup/commit/e0ddcb09c04a9b5c6a4e12c95a618d527fbc4a30))
* **server-http:** make local package.json existence optional ([d6105fa](https://github.com/Tada5hi/authup/commit/d6105fa9213cde311bf6238b35b381cc5832320b))





# 0.1.0 (2022-12-08)


### Bug Fixes

* applying default web-url ([02435bb](https://github.com/Tada5hi/authup/commit/02435bb9667d1450a0800ea883ed8e7297312458))
* bump typeorm-extension & rapiq version ([a980f80](https://github.com/Tada5hi/authup/commit/a980f80c35cb6a581886d398e3e3317815507e3b))
* bump typeorm-extension, rapiq & routup version ([e37b993](https://github.com/Tada5hi/authup/commit/e37b993bfbf3d11b24c696d59f1382cc4379a72c))
* **deps:** bump @ebec/http from 0.0.4 to 0.1.0 ([016baa2](https://github.com/Tada5hi/authup/commit/016baa22fd25390b0320e90d77a0fb870716c294))
* **deps:** bump @vue-layout/core from 0.1.0 to 0.1.1 ([1284918](https://github.com/Tada5hi/authup/commit/1284918cf1efcc2af98066f65ad2d58f72630ac2))
* **deps:** bump bcrypt from 5.0.1 to 5.1.0 ([be88eee](https://github.com/Tada5hi/authup/commit/be88eee35a09780120df3870e40888ec608ba711))
* **deps:** bump better-sqlite3 from 7.6.2 to 8.0.0 ([0a0a3b4](https://github.com/Tada5hi/authup/commit/0a0a3b4075c60864d55ac3e7f163b0c18c092e5a))
* **deps:** bump bootstrap from 5.2.1 to 5.2.2 ([84e13eb](https://github.com/Tada5hi/authup/commit/84e13ebc5a3e302efce9d350f001b30389349379))
* **deps:** bump dotenv from 16.0.2 to 16.0.3 ([19ac616](https://github.com/Tada5hi/authup/commit/19ac6162d463bf70a5b39ddfc606f09c78bf8692))
* **deps:** bump locter from 0.2.2 to 0.3.1 ([17a44c0](https://github.com/Tada5hi/authup/commit/17a44c0774a6ddf8824405f19167ec2486e857ec))
* **deps:** bump locter from 0.3.1 to 0.3.2 ([e636ef7](https://github.com/Tada5hi/authup/commit/e636ef75df4eca677a39da94ec351eee9125070c))
* **deps:** bump nodemailer from 6.7.8 to 6.8.0 ([3826392](https://github.com/Tada5hi/authup/commit/38263920d2a7691d9c6214b1c5b0f006225a1d71))
* **deps:** bump regenerator-runtime from 0.13.9 to 0.13.10 ([a84c0db](https://github.com/Tada5hi/authup/commit/a84c0db55f9033baa8bbb2d1cd1106b66bf80256))
* **deps:** bump swagger-ui-express from 4.5.0 to 4.6.0 ([1c1e416](https://github.com/Tada5hi/authup/commit/1c1e4161cf6523ad416c7981f36bb12bd56207a9))
* **deps:** bump typeorm-extension from 2.1.10 to 2.1.11 ([31adcd3](https://github.com/Tada5hi/authup/commit/31adcd30d6aa06512374c8e87b1f5e3e6674209b))
* **deps:** bump typeorm-extension from 2.1.11 to 2.1.12 ([d26000f](https://github.com/Tada5hi/authup/commit/d26000f7242283259bb63a8b3b44c43194014199))
* **deps:** bump typeorm-extension from 2.1.12 to 2.1.14 ([4351470](https://github.com/Tada5hi/authup/commit/4351470990f88b7f2c5c46236369a3d96360271d))
* **deps:** bump typeorm-extension from 2.1.14 to 2.1.15 ([1edfaba](https://github.com/Tada5hi/authup/commit/1edfabae3a95fec9073806494ae673574f682c04))
* **deps:** bump typeorm-extension from 2.2.10 to 2.2.11 ([2659666](https://github.com/Tada5hi/authup/commit/26596666b0eb690494bc5299b3e437da7f14ea95))
* **deps:** bump typeorm-extension from 2.2.11 to 2.2.12 ([9b9d5b5](https://github.com/Tada5hi/authup/commit/9b9d5b5692527aa4ed4fe357c5d6e0c5be513a5e))
* **deps:** bump typeorm-extension from 2.2.12 to 2.2.13 ([329d26b](https://github.com/Tada5hi/authup/commit/329d26b8772966d887ddffdc9998c619444441da))
* **deps:** bump typeorm-extension from 2.2.8 to 2.2.9 ([9d2a7a2](https://github.com/Tada5hi/authup/commit/9d2a7a24500b055a44c0894edb08666994127109))
* **deps:** bump typeorm-extension from 2.2.9 to 2.2.10 ([fde1bcd](https://github.com/Tada5hi/authup/commit/fde1bcd60ec597fd7f842d8465478000591225eb))
* **deps:** bump vitepress from 1.0.0-alpha.16 to 1.0.0-alpha.17 ([3f7cf8f](https://github.com/Tada5hi/authup/commit/3f7cf8f7ea8260ef8bb811635b294b6d59cbbd19))
* **deps:** bump vitepress from 1.0.0-alpha.17 to 1.0.0-alpha.19 ([2d6d968](https://github.com/Tada5hi/authup/commit/2d6d9686e4e1c1f7087b432214bd8621c20d2c0d))
* **deps:** bump vitepress from 1.0.0-alpha.19 to 1.0.0-alpha.20 ([61651d2](https://github.com/Tada5hi/authup/commit/61651d2ae4bcf104083e8f6b275c7e77de18f586))
* **deps:** bump vitepress from 1.0.0-alpha.20 to 1.0.0-alpha.21 ([c0ca022](https://github.com/Tada5hi/authup/commit/c0ca022c78d5454b4a8703bdc44443f3dcd870b8))
* **deps:** bump vitepress from 1.0.0-alpha.21 to 1.0.0-alpha.22 ([4e7be2f](https://github.com/Tada5hi/authup/commit/4e7be2fc4609f9197c7405ce60e67db1d2264676))
* **deps:** bump vitepress from 1.0.0-alpha.25 to 1.0.0-alpha.26 ([4e5cd53](https://github.com/Tada5hi/authup/commit/4e5cd53dc925c3415e459b9d69fdc218ba81575b))
* **deps:** bump vitepress from 1.0.0-alpha.26 to 1.0.0-alpha.28 ([f0bf20b](https://github.com/Tada5hi/authup/commit/f0bf20b4357bcca8f22301dfe5bcff696261cd3f))
* **deps:** bump vitepress from 1.0.0-alpha.28 to 1.0.0-alpha.29 ([4236bef](https://github.com/Tada5hi/authup/commit/4236befc9f148ec822137b0a40f248ff66d328d6))
* **deps:** bump vitepress from 1.0.0-alpha.29 to 1.0.0-alpha.30 ([8f25c6c](https://github.com/Tada5hi/authup/commit/8f25c6c51c511d9c9d30b38faf12c5cf2a2f57f4))
* **deps:** bump vue from 3.2.39 to 3.2.40 ([e878b09](https://github.com/Tada5hi/authup/commit/e878b09808b7bda6abef052c5b9b67ecb687b14e))
* **deps:** bump vue from 3.2.40 to 3.2.41 ([8009eb1](https://github.com/Tada5hi/authup/commit/8009eb103df2f96bbd222c1640ff113d78abb02e))
* **deps:** bump vue from 3.2.41 to 3.2.44 ([219a272](https://github.com/Tada5hi/authup/commit/219a27243bbe0a1b31bbcb3a1f7204c8557669c6))
* **deps:** bump vue from 3.2.44 to 3.2.45 ([fda7de1](https://github.com/Tada5hi/authup/commit/fda7de10263b8df071ff9b79081ccebc11d98ce9))
* **deps:** bump yargs from 17.5.1 to 17.6.0 ([e6b70e2](https://github.com/Tada5hi/authup/commit/e6b70e218b5bbb685e59eaad1ecc093d5484c0cb))
* **deps:** bump yargs from 17.6.0 to 17.6.2 ([621c7bc](https://github.com/Tada5hi/authup/commit/621c7bcb14e478dc98a780a45bab92f4077a1d14))
* **deps:** increased swagger lib version ([a986e1a](https://github.com/Tada5hi/authup/commit/a986e1a2b387bb6f30d42578ac8a98182493127d))
* **deps:** updated dependencies ([1a3e934](https://github.com/Tada5hi/authup/commit/1a3e93407c9fbf1fa8fdbeecb7bf20bbbe4170de))
* **deps:** updated dependencies ([6518175](https://github.com/Tada5hi/authup/commit/6518175b0a827bdd91eb63a7fd36740dbc8e23b1))
* **deps:** updated hapic-* ([e6bc7b9](https://github.com/Tada5hi/authup/commit/e6bc7b9d388a4dda2d9f194a23b8ab37cf05e2b6))
* **deps:** updated routup ( & decorators) ([c3c0aba](https://github.com/Tada5hi/authup/commit/c3c0aba7d11e9075821f536e16fe2167dc8a5e7d))
* http endpoints with query relations ([47141a1](https://github.com/Tada5hi/authup/commit/47141a1a5f41875b1469d537b2d2ccb1442931be))
* nginx reverse proxy + add query sort for permissions ([b939cfa](https://github.com/Tada5hi/authup/commit/b939cfa1f94fb38450c0fa388688c71bf4a4d795))
* run database-seed for integrity on upgrade ([80c6e48](https://github.com/Tada5hi/authup/commit/80c6e483dbc0a436589b012633621fe73d9893ef))
* **server-adapter:** replaced express with routup ([1e44e1f](https://github.com/Tada5hi/authup/commit/1e44e1f4e918578e4fb79fb9442d6adc7fbb46c9))
* **server-core:** added missing realm_id filter for roles endpoint ([6186aa1](https://github.com/Tada5hi/authup/commit/6186aa1c827578e04780c6d9adad8a03594790a2))
* **server-core:** adjustment for response status-codes & test suite ([e575b7b](https://github.com/Tada5hi/authup/commit/e575b7b4d9cc1d39f06813bf1052bf69ac66a295))
* **server-core:** keep subscribers during upgrade ([8239763](https://github.com/Tada5hi/authup/commit/823976326e2629ab55e7b7f8ca5980dd58294943))
* **server-core:** replaced swagger-ui serve middleware ([bf096a2](https://github.com/Tada5hi/authup/commit/bf096a2e7c11fd5e25977eedceab98fa29bbce17))
* **server-core:** swagger generation ([a660de5](https://github.com/Tada5hi/authup/commit/a660de5b1a99dee7a300853f10c00282fef52a07))
* **server-core:** swagger generation ([d91cd5f](https://github.com/Tada5hi/authup/commit/d91cd5fbb55607036dace944f1ac25cf52da338d))
* **server-core:** use option of core build output for swagger options ([e68d978](https://github.com/Tada5hi/authup/commit/e68d978479ed6e90f7443984a04096ac11375f15))
* **server-utils:** ensure token payload is decoded ([eecb656](https://github.com/Tada5hi/authup/commit/eecb6566e922a2e0ba917e028531fdc72c89391c))
* **server:** add migration file ([40a1e08](https://github.com/Tada5hi/authup/commit/40a1e08c87b527d6bf046c0d55a6b408f5e5b72b))
* updated typeorm-extension & smob dependency ([50ea810](https://github.com/Tada5hi/authup/commit/50ea810b4ffae39291ec29317e6f7da371dc875d))
* **vue:** exports + restructrure file structure ([2bfc512](https://github.com/Tada5hi/authup/commit/2bfc512989b46a57877957f10991e351fa544d60))
* **vue:** extendend submit handler create context ([af26051](https://github.com/Tada5hi/authup/commit/af260513f7ced8373eac9355e7a5b778feb72535))


### Features

* add global cli & enhanced config handling ([95a1549](https://github.com/Tada5hi/authup/commit/95a1549c70ed18e9bc58e2f4fb5734712ab20a35))
* add void logger ([14a321e](https://github.com/Tada5hi/authup/commit/14a321ec4f39559da156ebc592fa8118dc5d5be0))
* better config handling ([b1582b7](https://github.com/Tada5hi/authup/commit/b1582b798174c2c44e06271f3250db637a159bfd))
* enhance check for readable & writable realm resources ([a048358](https://github.com/Tada5hi/authup/commit/a048358f3e6bc1ddfbffe2ec76148b1ebee276ed))
* only allow robot/role permission assignment for owned permissions ([9dfd9d3](https://github.com/Tada5hi/authup/commit/9dfd9d39ed4420f5d42b4fa9e03e88f04f840189))
* prepare global cli ([ed4539c](https://github.com/Tada5hi/authup/commit/ed4539c0b736f8b522e7a1af716ff6e3ab2d8200))
* renamed server-utils to server-common package ([f3b50e8](https://github.com/Tada5hi/authup/commit/f3b50e8021c4d3fd8ed78d1de33266ddc5714aa7))
* **server-core:** replaced http framework ([6273ae6](https://github.com/Tada5hi/authup/commit/6273ae680f82a4e27ba527b9eb260bb81ee75d20))
* **ui:** add identity-provider management + explicit import NuxtPage ([2cca37b](https://github.com/Tada5hi/authup/commit/2cca37b666cbece3c2b212a9787d5f3f49866144))
* **ui:** added domain list event management + minor fixes ([b5062db](https://github.com/Tada5hi/authup/commit/b5062dbe940c9cf7f29713864a7ddb5b08cfddf5))


### Performance Improvements

* enhanced swagger generation ([84113ad](https://github.com/Tada5hi/authup/commit/84113ad10c3c1a8164772216cf455cf7700e46bf))
* optimized http endpoints + merged github workflows ([cba2de4](https://github.com/Tada5hi/authup/commit/cba2de47c9ecce74c42be21ae951f90264b982df))
* **server-core:** further http endpoint optimization for request query ([31997e5](https://github.com/Tada5hi/authup/commit/31997e5b3ccb19ceb708037ad87ae1e13c77601f))
