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
  <div class="card">
    <img :src="house.image" alt="house image" class="cardImg" />
    <div class="content">
      <div class="title">
        <h1>{{ house.location?.street }}</h1>
        <div v-if="house.madeByMe" class="icons">
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
      <div class="location">
        <img class="icon" src="@/static/ic_location@3x.png" alt="location icon" />
        <span>{{ house.location?.zip }}</span>
        <span>{{ house.location?.city }}</span>
      </div>
      <div class="infoContainer">
        <span class="info">
          <img class="icon" src="@/static/ic_price@3x.png" alt="Price icon" />{{ house.price }}
        </span>
        <span class="info">
          <img class="icon" src="@/static/ic_size@3x.png" alt="Size icon" />{{ house.size }}
          {{ MEASURES.squareMeter }}
        </span>
        <span class="info">
          <img class="icon" src="@/static/ic_construction_date@3x.png" alt="Date icon" /> Built in
          {{ house.constructionYear }}
        </span>
      </div>

      <div class="roomsContainer">
        <span class="info">
          <img class="icon" src="@/static/ic_bed@3x.png" alt="Bedroom icon" />
          {{ house.rooms?.bedrooms }}
        </span>
        <span class="info">
          <img class="icon" src="@/static/ic_bath@3x.png" alt="Bathroom icon" />{{
            house.rooms?.bathrooms
          }}
        </span>
        <span class="info">
          <img class="icon" src="@/static/ic_garage@3x.png" alt="Size icon" />
          {{ house.hasGarage ? 'Yes' : 'No' }}
        </span>
      </div>
      <p class="description">{{ house.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: $background2;
  .cardImg {
    width: 100%;
    object-fit: cover;
  }
}

.content {
  padding: 30px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icons {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  .location {
    display: flex;
    align-items: center;
    margin-top: 15px;
    gap: 5px;
    img {
      margin-right: 5px;
    }
  }
  .infoContainer {
    display: flex;
    align-items: center;
    margin-top: 15px;
    gap: 20px;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .roomsContainer {
    display: flex;
    align-items: center;
    margin-top: 15px;
    gap: 35px;
  }
  .description {
    margin-top: 20px;
  }
}
@media (max-width: 767px) {
  .card {
    border-radius: 20px 20px 0 0;
    margin: 150px -15px 0 -15px;
  }
  .cardImg {
    position: absolute;
    top: 0;
    left: 0;
    height: 220px;
    z-index: -1;
  }
}
</style>
