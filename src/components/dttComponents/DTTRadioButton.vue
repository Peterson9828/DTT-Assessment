<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  option: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits(['update:selected'])

watch(
  () => props.selected,
  (newValue) => {
    isSelected.value = newValue
  }
)

const isSelected = ref(props.selected)

const selectButton = () => {
  isSelected.value = true
  emit('update:selected', props.option)
}
</script>

<template>
  <div class="radioButton" :class="{ selected: isSelected }" @click="selectButton">
    {{ option.label }}
  </div>
</template>

<style scoped lang="scss">
.radioButton {
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  background-color: $tertiary2;
}

.radioButton.selected {
  background-color: $primary;
}
</style>
