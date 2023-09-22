<script setup>
import RadioButton from './DTTRadioButton.vue'
import { ref } from 'vue'

defineProps({
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['onSelect'])

const selectedButton = ref(null)
const handleButtonSelection = (option) => {
  if (option.label === selectedButton.value) {
    selectedButton.value = null
    emit('onSelect', null)
    return
  }

  emit('onSelect', option)
  selectedButton.value = option.label
}
</script>

<template>
  <div class="container">
    <RadioButton
      v-for="(option, index) in options"
      :key="index"
      @update:selected="handleButtonSelection"
      :selected="selectedButton === option.label"
      :option="option"
      class="radioButton"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  text-align: center;
}

.radioButton:first-of-type {
  border-radius: 8px 0 0 8px;
}

.radioButton:last-of-type {
  border-radius: 0 8px 8px 0;
}
</style>
