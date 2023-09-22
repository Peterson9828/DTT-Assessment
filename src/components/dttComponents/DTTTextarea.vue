<script setup>
import { ref } from 'vue'
import DTTFormError from '@/components/dttComponents/DTTFormError.vue'
import { useFormStore } from '@/stores/form'

const props = defineProps({
  placeholder: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  rules: {
    type: Array,
    required: false
  },
  rows: {
    type: String,
    default: '5',
    required: false
  },
  modelValue: {
    type: [String, Number],
    required: false
  }
})

const formStore = useFormStore()
const hasError = ref(false)

const handleError = (error) => {
  if (error === 'setError') {
    error = true
  } else {
    hasError.value = error
    error = !!error
  }
  formStore.setError({ error, name: props.name })
}
</script>

<template>
  <div class="container">
    <p class="inputTitle" :for="name">{{ label }}</p>
    <textarea
      :id="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      class="textarea"
      :class="{ error: hasError }"
    />
    <DTTFormError :modelValue="modelValue" :rules="rules" @error="handleError" />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .textarea {
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    margin: 8px 0;
    resize: none;
  }
  .textarea:focus {
    outline: none;
  }
  .error {
    border: 2px solid red;
  }
}
</style>
