<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  rules: {
    type: Array,
    default: () => [],
    required: false
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: false
  }
})

const emit = defineEmits(['error'])

const ERRORS = {
  required: (x) => (x !== undefined && String(x).length > 0) || 'Required field missing.',
  positiveOrZero: (x) => Number(x) >= 0 || 'Value must be positive or zero.'
}
const hasError = ref(false)
const errorMsg = ref('')

if (!props.modelValue && props.rules.some((rule) => rule === 'required')) {
  emit('error', 'setError')
}

const computedModelValue = computed(() => props.modelValue)

watch(computedModelValue, (newValue) => {
  props.rules.some((rule) => {
    if (ERRORS[rule] && ERRORS[rule](newValue) !== true) {
      hasError.value = true
      errorMsg.value = ERRORS[rule](newValue)
      return true
    } else {
      hasError.value = false
      errorMsg.value = ''
    }
  })
  if (hasError.value) {
    emit('error', true)
  } else {
    emit('error', false)
  }
})
</script>

<template>
  <div v-if="hasError" class="error-message">{{ errorMsg }}</div>
</template>

<style scoped lang="scss">
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
