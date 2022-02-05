# evcc docs

Official documentation repository of [evcc](https://evcc.io).

## General

- The content of the folder `evcc-config` may not be changed. The content is pushed from the [evcc config repository](https://github.com/evcc-io/config)
- The content of the folder `templates` is currently not used and may also not be changed. This will replace the folder `evcc-config` in the future and it's source is the `templates/docs` folder in the [evcc repository](https://github.com/evcc-io/evcc)
- We recommend to test changes locally, use the instructions below to run the documentation page locally as you can see how the changes will look like on the web page while you make changes.

## Local setup

First clone the repository, then follow with the following steps.

### Installation

```sh
$ npm ci
```

### Local Development

```sh
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service. It should be run before any changes are committed, as it also includes link checking.
