<template>
  <div class="dialog-wrapper" v-if="dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        <button @click="closeDialog" class="close-button">X</button>
      </div>
      <div class="dialog-body">
        <p class="alert-text">{{ alertText }}</p>
      </div>
      <div class="dialog-footer">
        <button @click="closeDialog" class="cancel-button">{{ 'def.cancel' }}</button>
        <button @click="deleteItem" class="delete-button">{{ buttonText }}</button>
      </div>
    </div>
  </div>
  <button
    v-else
    class="toggle-dialog-button"
    :class="{ 'icon-button': onlyIcon, 'outlined-button': outlined, 'disabled-button': disabled }"
    @click="dialog = !dialog"
  >
    <span class="icon" v-if="onlyIcon">X</span>
    <span v-else class="button-text">{{ buttonText }}</span>
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  outlined: Boolean,
  buttonText: String,
  alertText: String,
  disabled: Boolean,
  onlyIcon: Boolean
})
const dialog = ref(false)
const emit = defineEmits(['delete'])

const closeDialog = () => {
  dialog.value = false
}

const deleteItem = () => {
  emit('delete')
  closeDialog()
}
</script>
