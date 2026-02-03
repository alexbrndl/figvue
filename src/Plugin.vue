<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button.vue'

const count = ref(5)
const shape = ref('rectangle')

function create() {
  parent.postMessage(
    {
      pluginMessage: {
        type: 'create-shapes',
        count: count.value,
        shape: shape.value,
      },
    },
    '*'
  )
}

function cancel() {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
</script>

<template>
  <div class="plugin">
    <h2>Create Shapes</h2>
    <div class="field">
      <label for="shape">Shape</label>
      <select id="shape" v-model="shape">
        <option value="rectangle">Rectangle</option>
        <option value="triangle">Triangle</option>
        <option value="ellipse">Ellipse</option>
      </select>
    </div>
    <div class="field">
      <label for="count">Count</label>
      <input id="count" type="number" v-model.number="count" min="1" />
    </div>
    <div class="actions">
      <Button label="Create" variant="primary" @click="create" />
      <Button label="Cancel" @click="cancel" />
    </div>
  </div>
</template>

<style scoped>
.plugin {
  padding: 16px;
}

h2 {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
}

.field {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.field label {
  width: 60px;
  font-weight: 500;
}

.field select,
.field input {
  flex: 1;
  height: 30px;
  padding: 0 8px;
  border: 1px solid var(--figma-color-border, #e5e5e5);
  border-radius: 6px;
  font-size: 12px;
  background: var(--figma-color-bg, #fff);
  color: var(--figma-color-text, #333);
}

.field select:focus,
.field input:focus {
  outline: none;
  border-color: var(--figma-color-border-brand, #18a0fb);
  box-shadow: inset 0 0 0 1px var(--figma-color-border-brand, #18a0fb);
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.actions .btn {
  flex: 1;
}
</style>
