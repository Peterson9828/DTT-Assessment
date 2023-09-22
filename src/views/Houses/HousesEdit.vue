<script setup>
import HousesForm from '@/components/houses/HousesForm.vue'
import DTTBackNavigation from '@/components/dttComponents/DTTBackNavigation.vue'
import { RESPONSE_STATUS } from '@/constants'
import { useRoute, useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/house.js'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id
const houseStore = useHouseStore()

// fetch house
houseStore.getItem(houseId)

const onsubmit = async ({ formData, image }) => {
  const res = await houseStore.updateItem(houseId, formData)
  await houseStore.postImage(houseId, image)

  if (res.status === RESPONSE_STATUS.EDIT_OK) {
    await router.push(`/houses/${houseId}`)
  }
}
</script>

<template>
  <div class="container">
    <div class="title">
      <DTTBackNavigation text="Back to detail page" />
      <h1>Edit listing</h1>
    </div>

    <HousesForm
      v-if="!houseStore.loading"
      :house="houseStore.item"
      submitLabel="Save"
      @submit="onsubmit"
      class="housesForm"
    />
  </div>
</template>

<style scoped>
.container {
  background-image: url('../../static/img_background@3x.png');
  background-repeat: no-repeat;
  height: 100%;
  background-size: cover;
  background-position: right;

  .title {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  .housesForm {
    width: 500px;
  }
}

@media (max-width: 767px) {
  .title {
    flex-direction: row !important;
  }
  .title > h1 {
    flex-grow: 1;
    text-align: center;
  }
  .container {
    background-image: url('../../static/img_background@3x.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    .housesForm {
      width: 100% !important;
    }
  }
}
</style>
