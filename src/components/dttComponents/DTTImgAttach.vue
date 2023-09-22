<script setup>
import { ref } from 'vue'
import DTTFormError from '@/components/dttComponents/DTTFormError.vue'
import { useFormStore } from '@/stores/form'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '300px',
    required: false
  },
  rules: {
    type: Array,
    required: false
  },
  height: {
    type: String,
    default: '300px',
    required: false
  },
  value: {
    type: [String, Number, File],
    required: false
  }
})
const emit = defineEmits(['onSelect'])
const formStore = useFormStore()

const imageInput = ref(null)
const imageUrl = ref(props.value)
const selectImage = () => {
  imageInput.value.click()
}

const displayImage = () => {
  const selectedFile = imageInput.value.files[0]
  if (selectedFile) {
    imageUrl.value = URL.createObjectURL(selectedFile)
    emit('onSelect', selectedFile)
  }
}

const deleteImage = () => {
  imageUrl.value = ''
  imageInput.value = ''
}

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
    <label class="inputTitle">{{ text }}</label>
    <div
      v-if="!imageUrl"
      class="image-default"
      @click="selectImage"
      :style="{ height: height, width: width }"
      :class="{ 'image-default': true, error: hasError }"
    >
      <input
        type="file"
        ref="imageInput"
        accept="image/*"
        @change="displayImage"
        style="display: none"
      />
      <img
        :class="{ 'plus-icon': true, red: hasError }"
        src="@/static/ic_upload@3x.png"
        alt="Plus icon"
        width="40"
      />
    </div>

    <div v-if="imageUrl" class="image-container" :style="{ height: height, width: width }">
      <img class="img" :src="imageUrl" alt="Imagen seleccionada" />
      <button class="icon-button delete-button" @click.stop="deleteImage">
        <img src="@/static/ic_clear_white@3x.png" alt="img" width="40" />
      </button>
    </div>

    <DTTFormError :modelValue="imageUrl" :rules="rules" @error="handleError" />
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 5px 0 15px 0;
}
.image-default {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  margin-top: 8px;
}
.error {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='red' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}
.image-container {
  cursor: pointer;
  position: relative;
  margin-top: 8px;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.plus-icon {
  font-size: 24px;
}
.red {
  filter: invert(20%) sepia(92%) saturate(7450%) hue-rotate(0deg) brightness(100%) contrast(100%);
}
.delete-button {
  position: absolute;
  top: -10px;
  right: -15px;
}
</style>
