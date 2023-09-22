<script setup>
import { ref } from 'vue'

defineProps({
  placeholder: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['inputSearch'])

const inputValue = ref('')

const handleInput = (event) => {
  inputValue.value = event.target.value
  setTimeout(() => {
    emit('inputSearch', inputValue.value)
  }, 500)
}

const clearInput = () => {
  inputValue.value = ''
  emit('inputSearch', inputValue.value)
}
</script>

<template>
  <div class="input-container">
    <div class="search-icon">
      <img class="icon" src="@/static/ic_search@3x.png" alt="search" />
    </div>
    <input
      class="input"
      type="text"
      v-model="inputValue"
      @input="handleInput"
      :placeholder="placeholder"
    />
    <div class="clear-icon" v-if="inputValue">
      <img class="icon" src="@/static/ic_clear@3x.png" alt="clear" @click="clearInput" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  align-items: center;
  display: flex;
  background-color: $tertiary1;
  border-radius: 8px;
  padding: 0 15px;
}

.search-icon,
.clear-icon {
  display: flex;
  align-items: center;
  padding: 5px;
}

.clear-icon {
  cursor: pointer;
}

.input {
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
}
</style>
