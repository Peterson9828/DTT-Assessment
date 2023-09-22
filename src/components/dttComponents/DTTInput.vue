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
  type: {
    type: String,
    default: 'text',
    required: false
  },
  modelValue: {
    type: [String, Number],
    required: false
  },
  icon: {
    type: String,
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
    <label :for="name" class="inputTitle">{{ label }}</label>
    <div class="input-container">
      <!--      <img v-if="icon" :src="getImageUrl()" class="icon" alt="price" width="20" />-->
      <input
        :type="type"
        :id="name"
        :placeholder="placeholder"
        class="input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ error: hasError }"
      />
    </div>
    <DTTFormError v-if="rules" :modelValue="modelValue" :rules="rules" @error="handleError" />
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .input-container {
    position: relative;
  }
  .input {
    border: none;
    border-radius: 8px;
    padding-left: 20px;
    margin: 8px 0;
    width: 100%;
    box-sizing: border-box;
  }
  .input:focus {
    outline: none;
  }
  .icon {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 18px;
  }
  .error {
    border: 2px solid red;
  }
  .m2 {
    margin-left: 5px;
    color: #555;
    font-weight: bold;
  }
}
</style>
