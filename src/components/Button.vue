<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'primary' | 'secondary'
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="['btn', variant === 'primary' ? 'btn--primary' : 'btn--secondary']"
    @click="$emit('click', $event)"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  height: 32px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--figma-color-border, #e5e5e5);
  transition: background 0.15s;
}

.btn--secondary {
  background: var(--figma-color-bg, #fff);
  color: var(--figma-color-text, #333);
}

.btn--secondary:hover {
  background: var(--figma-color-bg-hover, #f5f5f5);
}

.btn--primary {
  background: var(--figma-color-bg-brand, #18a0fb);
  border-color: var(--figma-color-bg-brand, #18a0fb);
  color: #fff;
}

.btn--primary:hover {
  background: var(--figma-color-bg-brand-hover, #0d8de5);
}
</style>
