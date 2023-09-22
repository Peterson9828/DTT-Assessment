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
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean],
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
    <label class="inputTitle" :for="name">{{ label }}</label>
    <select
      :id="name"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="select"
      :class="{ error: hasError }"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="option in options" :value="option.value" :key="option.label">
        {{ option.label }}
      </option>
    </select>
    <DTTFormError :modelValue="modelValue" :rules="rules" @error="handleError" />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .select {
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    margin: 8px 0;
  }
  .select:focus {
    outline: none;
  }
  .error {
    border: 2px solid red;
  }
}
</style>
