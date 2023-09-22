<script setup>
import { MEASURES } from '@/constants'
import DTTButtonDelete from '@/components/dttComponents/DTTButtonDelete.vue'
defineProps({
  house: {
    type: Object,
    required: true
  }
})

const DESCRIPTION = 'Are you sure you want to delete this listing? This action cannot be undone.'
</script>

<template>
  <div class="card" @click.prevent="$router.push(`/houses/${house.id}`)">
    <img class="cardImg" :src="house.image" :alt="house.location?.street" />
    <div class="cardContent listing">
      <div class="title">
        <h2>{{ house.location?.street }}</h2>
        <div v-if="house.madeByMe" class="actions">
          <button class="icon-button" @click.stop="$router.push(`/houses/edit/${house.id}`)">
            <img class="icon" src="@/static/ic_edit@3x.png" alt="location icon" />
          </button>
          <DTTButtonDelete
            title="Delete listing"
            :description="DESCRIPTION"
            @onConfirm="$emit('onDelete', house.id)"
          />
        </div>
      </div>
      <p>${{ house.price }}</p>
      <p>{{ house.location?.zip }} {{ house.location?.city }}</p>
      <div class="additionalInfo">
        <img class="icon" src="@/static/ic_bed@3x.png" alt="Bedroom icon" />{{
          house.rooms?.bedrooms
        }}
        <img class="icon" src="@/static/ic_bath@3x.png" alt="Bathroom icon" />{{
          house.rooms?.bathrooms
        }}
        <img class="icon" src="@/static/ic_size@3x.png" alt="Size icon" />{{ house.size }}
        {{ MEASURES.squareMeter }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: $background2;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 1rem;
  height: 180px;
  .cardImg {
    object-fit: cover;
    object-position: left;
    border-radius: 10px;
    width: 180px;
  }
  .cardContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    gap: 10px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .actions {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
  }
  .additionalInfo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

@media (max-width: 767px) {
  .card {
    height: 100px;
    padding: 1rem 10px;
    .cardContent {
      padding: 0 0 0 10px;
      gap: 0;
      .title {
        .actions {
          gap: 10px;
        }
      }
    }
    .additionalInfo {
      margin-top: 15px;
    }
    .cardImg {
      width: 100px;
    }
  }
}
</style>
