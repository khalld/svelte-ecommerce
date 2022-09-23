# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Requirements

- Node `v16.17.0`

Run Chrome with disabled cors option (OS X)

```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

### Useful links

<ul>
    <li><a href="https://blog.logrocket.com/how-switch-node-js-versions-nvm/">Manage multiple version of Node.js with nvm</a></li>
    <li><a href="https://www.youtube.com/watch?v=wCelDI_rPcY">Run svelte and express in same port</a> (necessario per dopo?)</li>
</ul>


### Database

Using <a href="https://cloud.mongodb.com/">MongoDb Cloud</a> 

#### Models

...



### TODOS:

- Al momento per lavorare più agilmente lavorerai con il run del server e del client su porte separate (hot-reaload abilitato, altrimenti si impazzisce)
- AL MOMENTO hai disabilitato il running unico di client e server quindi puoi usare module.exports ... poi in caso cambi tutto dopo

## Chiarimenti prof

- Conviene runnare sia be che fe sulla stessa porta?
- Conviene non usare module.exports perché bisogna mettere il type = modules per runnare entrambi i progetti su una sola porta? 