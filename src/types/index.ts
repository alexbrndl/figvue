// Shared types between sandbox and UI
// These are erased at compile time, so both esbuild (sandbox) and Vite (UI) can import them.

/** Message types sent from UI to sandbox via postMessage */
export interface CreateShapesMessage {
  type: 'create-shapes';
  count: number;
  shape: 'rectangle' | 'triangle' | 'ellipse';
}

export interface CancelMessage {
  type: 'cancel';
}

export type PluginMessage = CreateShapesMessage | CancelMessage;
