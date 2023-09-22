<script setup>
import HousesForm from '@/components/houses/HousesForm.vue'
import DTTBackNavigation from '@/components/dttComponents/DTTBackNavigation.vue'

import { useHouseStore } from '@/stores/house.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const houseStore = useHouseStore()

const onsubmit = async ({ formData, image }) => {
  await houseStore.createItem(formData).then((res) => {
    if (image) {
      houseStore.postImage(res.id, image)
    }

    if (res.id) {
      router.push(`/`)
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="title">
      <DTTBackNavigation text="Back to overview" />
      <h1>Create new listing</h1>
    </div>

    <HousesForm :house="houseStore.item" submitLabel="Post" @submit="onsubmit" class="housesForm" />
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
