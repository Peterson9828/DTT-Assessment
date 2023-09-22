<script setup>
import HousesViewData from '@/components/houses/HousesViewData.vue'
import DTTBackNavigation from '@/components/dttComponents/DTTBackNavigation.vue'

import { useRoute, useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/house.js'
import { ref, watchEffect } from 'vue'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id
const houseStore = useHouseStore()
// fetch house
houseStore.getItem(houseId)

const handleOnDelete = (id) => {
  houseStore.deleteItem(id)
  router.push('/')
}
const icon = ref('')

const getIcon = () => {
  if (window.innerWidth >= 768) {
    icon.value = 'ic_back_grey@3x'
  } else {
    icon.value = 'ic_back_white@3x'
  }
}

watchEffect(() => {
  getIcon()
})

window.addEventListener('resize', () => {
  getIcon()
})
</script>

<template>
  <div>
    <DTTBackNavigation text="Back to overview" :icon="icon" />
    <HousesViewData :house="houseStore.item" @onDelete="handleOnDelete" />
  </div>
</template>

<style scoped></style>
