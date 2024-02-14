<script setup lang="ts">
import DTTInput from '@/components/dttComponents/DTTInput.vue'
import DTTTextArea from '@/components/dttComponents/DTTTextarea.vue'
import DTTSelect from '@/components/dttComponents/DTTSelect.vue'
import DTTButton from '@/components/dttComponents/DTTButton.vue'
import DTTImgAttach from '@/components/dttComponents/DTTImgAttach.vue'
import { ref } from 'vue'
import { useFormStore } from '@/stores/form'
interface House {
  price: number
  rooms: {
    bedrooms: number
    bathrooms: number
  }
  size: number
  location: {
    street: string
    houseNumber: number
    houseNumberAddition: string
    zip: string
    city: string
  }
  hasGarage: boolean
  constructionYear: number
  description: string
  image: string
}

const props = defineProps<{
  house: House
  submitLabel: string
}>()

const emit = defineEmits(['submit'])
const formStore = useFormStore()
formStore.$reset()
const OPTIONS = [
  { label: 'Yes', value: true },
  { label: 'No', value: false }
]

const formData = ref({
  price: props.house.price,
  bedrooms: props.house.rooms?.bedrooms,
  bathrooms: props.house.rooms?.bathrooms,
  size: props.house.size,
  streetName: props.house.location?.street,
  houseNumber: props.house.location?.houseNumber,
  houseNumberAddition: props.house.location?.houseNumberAddition,
  zip: props.house.location?.zip,
  city: props.house.location?.city,
  hasGarage: props.house.hasGarage,
  constructionYear: props.house.constructionYear,
  description: props.house.description
})

const image = ref(props.house.image)
const submit = () => {
  if (formStore.checkError) return
  const data = { formData: formData.value, image: image.value }
  emit('submit', data)
}

const handleImageUpload = (value) => {
  image.value = value
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <DTTInput
      label="Street name*"
      placeholder="Enter the street name"
      name="streetName"
      :rules="['required']"
      v-model="formData.streetName"
    />
    <div class="form-row">
      <DTTInput
        label="House number*"
        placeholder="Enter house number"
        name="houseNumber"
        type="number"
        :rules="['required', 'positiveOrZero']"
        v-model="formData.houseNumber"
        class="form-col2"
      />
      <DTTInput
        label="Addition (optional)"
        placeholder="e.g. A"
        name="houseNumberAddition"
        v-model="formData.houseNumberAddition"
        class="form-col2"
      />
    </div>

    <DTTInput
      label="Postal code*"
      placeholder="e.g. 1000 AA"
      name="zip"
      :rules="['required']"
      v-model="formData.zip"
    />

    <DTTInput
      label="City*"
      placeholder="e.g Utrecht"
      name="city"
      :rules="['required']"
      v-model="formData.city"
    />

    <DTTImgAttach
      class="imageAttach"
      text="Upload picture (PNG or JPG)*"
      height="150px"
      width="150px"
      name="image"
      :rules="['required']"
      :value="image"
      @onSelect="handleImageUpload"
    />

    <DTTInput
      label="Price*"
      placeholder="e.g $150.000"
      name="price"
      type="number"
      icon="ic_price@3x"
      :rules="['required', 'positiveOrZero']"
      v-model="formData.price"
    />

    <div class="form-row">
      <DTTInput
        label="Size*"
        placeholder="e.g 60m2"
        name="size"
        type="number"
        :rules="['required', 'positiveOrZero']"
        v-model="formData.size"
        class="form-col2"
      />
      <DTTSelect
        label="Garage*"
        placeholder="Select"
        name="hasGarage"
        :rules="['required']"
        :options="OPTIONS"
        v-model="formData.hasGarage"
        class="form-col2"
      />
    </div>
    <div class="form-row">
      <DTTInput
        label="Bedrooms*"
        placeholder="Enter amount"
        name="bedrooms"
        type="number"
        :rules="['required', 'positiveOrZero']"
        v-model="formData.bedrooms"
        class="form-col2"
      />
      <DTTInput
        label="Bathrooms*"
        placeholder="Enter amount"
        name="bathrooms"
        type="number"
        :rules="['required', 'positiveOrZero']"
        v-model="formData.bathrooms"
        class="form-col2"
      />
    </div>

    <DTTInput
      label="Construction date*"
      placeholder="e.g. 1990"
      name="constructionYear"
      type="number"
      :rules="['required', 'positiveOrZero']"
      v-model="formData.constructionYear"
    />
    <DTTTextArea
      label="Description*"
      placeholder="Enter description"
      :rules="['required']"
      name="description"
      v-model="formData.description"
    />
    <DTTButton :label="submitLabel" type="submit" :disabled="formStore.checkError" class="submit" />
  </form>
</template>

<style scoped lang="scss">
.submit {
  float: right;
  padding: 25px;
  min-width: 200px;
  margin-top: 20px;
}
@media (max-width: 767px) {
  .submit {
    padding: 10px;
    width: 100%;
  }
}
</style>
