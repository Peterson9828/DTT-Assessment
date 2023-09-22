<script setup>
const props = defineProps({
  text: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    default: 'ic_back_grey@3x',
    required: false
  }
})

const getImageUrl = () => {
  return new URL(`../../static/${props.icon}.png`, import.meta.url).href
}
</script>

<template>
  <p class="backLabel" @click="$router.go(-1)">
    <img class="icon" :src="getImageUrl()" alt="location icon" />
    <span class="desktop">{{ text }}</span>
  </p>
</template>

<style scoped lang="scss">
.backLabel {
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 10px;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 20px;
}

@media (max-width: 767px) {
  .backLabel {
    margin-bottom: 0;
  }
}
</style>
