# figvue

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Figma](https://img.shields.io/badge/Figma_Plugin-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A boilerplate for creating Figma plugins using Vue 3, TypeScript, and Vite.

Inspired by [figsvelte](https://github.com/thomas-lowry/figsvelte).

## Project Structure

```
src/
  types/
    index.ts                  # Shared types (sandbox + UI)
  sandbox/                    # Figma sandbox (backend)
    code.ts                   # Entry point, message handler
    lib/                      # Utility functions
  ui/                         # Vue app (frontend)
    App.vue                   # Main plugin UI
    main.ts                   # Vue entry point
    components/
      Button.vue              # Example button component
    composables/              # Vue composables
    lib/                      # UI utility functions
    styles/
      global.css              # Global styles & reset
  env.d.ts                    # TypeScript declarations
public/
  manifest.json               # Figma plugin manifest
  index.html                  # [generated] UI (single-file)
  code.js                     # [generated] Sandbox (bundled)
```

### Architecture

The plugin follows Figma's dual-context model:

- **Sandbox** (`src/sandbox/`) runs in Figma's main thread with access to the Figma API. No DOM. Bundled by esbuild (ES2017).
- **UI** (`src/ui/`) runs in an iframe with full DOM/browser access. Built with Vue 3 + Vite (single-file HTML output).
- **Types** (`src/types/`) are shared between both contexts (erased at compile time).

Communication between sandbox and UI uses `postMessage`.

## Getting Started

```bash
# Clone the template
npx degit alexbrndl/figvue my-plugin
cd my-plugin

# Install dependencies
npm install
```

Then connect your plugin to Figma:

1. Open the **Figma desktop app**
2. Go to `Plugins` > `Development` > `Import plugin from manifest...`
3. Select `public/manifest.json`
4. Update the plugin name in `public/manifest.json`

## Development

```bash
npm run dev
```

This starts two watchers in parallel:
- **UI**: Vite watches `src/ui/` and rebuilds `public/index.html`
- **Sandbox**: esbuild watches `src/sandbox/code.ts` and rebuilds `public/code.js`

After each change, re-run your plugin in Figma to see updates.

## Production Build

```bash
npm run build
```

Runs TypeScript type-checking, then builds both the UI and sandbox code with minification.

## How It Works

Figma plugins have two isolated contexts:

### Sending messages from UI to sandbox

```ts
// In a Vue component (<script setup>)
const message: PluginMessage = { type: 'create-shapes', count: 5, shape: 'rectangle' }
parent.postMessage({ pluginMessage: message }, '*')
```

### Receiving messages in the sandbox

```ts
// In src/sandbox/code.ts
figma.ui.onmessage = (msg: unknown) => {
  const message = msg as PluginMessage
  if (message.type === 'create-shapes') {
    // Use the Figma API here
  }
}
```

### Sending messages from sandbox to UI

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


## Tech Stack

- **Vue 3** with `<script setup>` SFCs
- **TypeScript** for both UI and sandbox
- **Vite** + **vite-plugin-singlefile** for UI bundling
- **esbuild** for sandbox bundling
