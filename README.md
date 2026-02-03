# Figvue

A boilerplate for creating Figma plugins using [Vue 3](https://vuejs.org/) + TypeScript + [Vite](https://vitejs.dev/).

Inspired by [figsvelte](https://github.com/thomas-lowry/figsvelte).

## Features

- **Vue 3** with `<script setup>` SFCs
- **TypeScript** for both the UI and the plugin code
- **Vite** for fast builds with single-file HTML output
- **esbuild** to compile the plugin sandbox code

## Quick start

```bash
npx degit alexbrndl/figvue my-figma-plugin
cd my-figma-plugin
npm install
npm run build
```

Then connect your plugin to Figma:

1. Open the **Figma desktop app**
2. Go to `Plugins` > `Development` > `Import plugin from manifest…`
3. Select the `public/manifest.json` file from this project
4. Update the plugin name in `public/manifest.json`

## Development

```bash
npm run dev
```

This starts two watchers in parallel:
- **UI**: Vite watches `src/` and rebuilds `public/index.html` (single-file)
- **Plugin code**: esbuild watches `src/code.ts` and rebuilds `public/code.js`

After each change, re-run your plugin in Figma to see updates.

## Production build

```bash
npm run build
```

Runs TypeScript type-checking, then builds both the UI and the plugin code with minification.

## Project structure

```
├── src/
│   ├── components/
│   │   └── Button.vue          # Example reusable component
│   ├── styles/
│   │   └── global.css          # Global styles (body reset, Figma fonts)
│   ├── Plugin.vue              # Main plugin UI component
│   ├── code.ts                 # Figma plugin sandbox code (TypeScript)
│   ├── main.ts                 # Vue app entry point
│   └── env.d.ts                # TypeScript declarations for Vite + Vue
├── public/                     # Build output + manifest (link Figma here)
│   ├── manifest.json           # Figma plugin manifest (source file)
│   ├── index.html              # [generated] UI compiled as single-file
│   └── code.js                 # [generated] Plugin sandbox compiled
├── index.html                  # HTML template for Vite
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config (UI)
├── tsconfig.plugin.json        # TypeScript config (plugin sandbox)
├── tsconfig.node.json          # TypeScript config (vite.config.ts)
└── package.json
```

## How it works

Figma plugins have two parts:

1. **Plugin sandbox** (`src/code.ts`) — runs in Figma's main thread with access to the `figma` API. No DOM access.
2. **UI** (`src/Plugin.vue`) — runs in an `<iframe>` with full DOM/browser access. Communicates with the sandbox via `postMessage`.

### Sending messages from UI to plugin

```ts
parent.postMessage({ pluginMessage: { type: 'my-action', data: 42 } }, '*')
```

### Receiving messages in the plugin

```ts
figma.ui.onmessage = (msg) => {
  if (msg.type === 'my-action') {
    // Use the Figma API here
  }
}
```

### Sending messages from plugin to UI

```ts
figma.ui.postMessage({ type: 'result', data: 'hello' })
```

### Receiving messages in the UI (Vue)

```ts
window.onmessage = (event) => {
  const msg = event.data.pluginMessage
  if (msg?.type === 'result') {
    // Update your Vue state here
  }
}
```
