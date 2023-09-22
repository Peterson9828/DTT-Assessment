<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  backgroundColor: {
    type: String,
    default: 'primary',
    required: false
  },
  icon: {
    type: String,
    required: false
  }
})

const getImageUrl = () => {
  return new URL(`../../static/${props.icon}.png`, import.meta.url).href
}
</script>

<template>
  <button :class="[backgroundColor, { btn: true, disabled }]" :type="type">
    <img v-if="icon" :src="getImageUrl()" alt="Create house" width="20" />
    <span>{{ label.toUpperCase() }}</span>
  </button>
</template>

<style scoped lang="scss">
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
