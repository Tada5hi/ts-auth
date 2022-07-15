# Getting started 

This section will help to spin up an authentication- & authorization-server **locally**.
To deploy the server for production, it is recommended to use the docker [image](deploying.md),
which can also be used for local usage. 

## Step. 1: Create a new project

Create and change into a new directory.

```bash
$ mkdir auth-server && cd auth-server
```

Then, initialize with your preferred package manager.

```bash
$ npm init
```

## Step. 2: Installation

Add this package as dependency to the project.

```sh
$ npm install @authelion/server --save
```

## Step. 3: Configuration

::: info Information
In general **no** configuration file is required at all!
All options have either default values or are generated automatically 🔥.
:::

To overwrite the default (generated) config property values,
create a `authelion.config.js` file in the root directory with the following content:

```typescript
module.exports = {
    port: 3010,
    
    admin: {
        username: 'admin',
        password: 'start123'
    },

    selfUrl: 'http://127.0.0.1:3010/',
    webUrl: 'http://127.0.0.1:3000/',
    
    /* ... */
}
```
Another way is e.g. to place an `.env` file in the root-directory or provide these properties
by the system environment.

```text
PORT=3010

ADMIN_USERNAME=admin
ADMIN_PASSWORD=start123

SELF_URL=http://127.0.0.1:3010/
WEB_URL=http://127.0.0.1:3000/
```

## Step. 4: Boot up

Add some scripts to `package.json`.

```json
{
  ...
  "scripts": {
      "setup": "authelion setup",
      "start": "authelion start",
      "upgrade": "authelion upgrade"
  },
  ...
}
```

Setup the authentication & authorization service.

```shell
$ npm run setup
```

The output should be similar, with other values for the `Robot ID` and `Robot Secret`:
```shell
✔ Generated rsa key-pair.
✔ Created database.
✔ Synchronized database schema.
✔ Seeded database.
ℹ Robot ID: 51dc4d96-f122-47a8-92f4-f0643dae9be5
ℹ Robot Secret: d1l33354crj1kyo58dbpflned2ocnw2yez69
```


Finally, start the service:

```shell
$ npm run start
```

It will output the following information on startup:

```shell
ℹ Environment: development
ℹ WritableDirectory: writable
ℹ URL: http://127.0.0.1:3010/
ℹ Docs-URL: http://127.0.0.1:3010/docs
ℹ Web-URL: http://127.0.0.1:3000/
✔ Initialised controllers & middlewares.
✔ Established database connection.
✔ Built & started token aggregator.
✔ Startup completed.
```

The service will spin up at the following address: `http://127.0.0.1:3010`. 
The swagger documentation is available at: `http://127.0.0.1:3010/docs`.
