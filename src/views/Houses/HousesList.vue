<script setup>
import Card from '@/components/houses/HousesListCard.vue'
import DTTSearch from '@/components/dttComponents/DTTSearch.vue'
import DTTToggleSelection from '@/components/dttComponents/DTToggleSelection.vue'
import { useHouseStore } from '@/stores/house.js'
import DTTButton from '@/components/dttComponents/DTTButton.vue'

const houseStore = useHouseStore()
houseStore.$reset()
// fetch houses
houseStore.getList()

const TOGGLE_OPTIONS = [
  { label: 'Price', value: 'price' },
  { label: 'Size', value: 'size' }
]
const filter = (text) => {
  houseStore.text = text
  houseStore.filterList()
}

const handleButtonSelection = (option) => {
  if (option) {
    houseStore.sortBy = option?.value
  }
  houseStore.sortList()
}

const handleOnDelete = async (id) => {
  await houseStore.deleteItem(id)
  await houseStore.getList()
}
</script>

<template>
  <div>
    <div class="title">
      <h1>Houses</h1>
      <RouterLink to="/houses/create" class="routerLink">
        <DTTButton class="createBtn desktop" label="Create new" backgroundColor="primary" icon="ic_plus_white@3x" />

        <button class="icon-button mobile">
          <img class="icon" src="@/static/ic_plus_grey@3x.png" alt="location icon" />
        </button>
      </RouterLink>
    </div>

    <div class="options">
      <DTTSearch class="search" placeholder="Search for a house" @inputSearch="filter" />
      <DTTToggleSelection v-if="houseStore.list.length > 0" class="toggleSelection" :options="TOGGLE_OPTIONS"
        @onSelect="handleButtonSelection" />
    </div>
    <div v-if="houseStore.list.length">
      <h2 v-if="houseStore.text" class="results">{{ houseStore.totalHouses }} results found</h2>
      <div class="cardList">
        <Card v-for="house in houseStore.list" :key="house.id" :house="house" class="card" @onDelete="handleOnDelete" />
      </div>
    </div>
    <div v-else class="empty">
      <img class="emptyImg" src="@/static/img_empty_houses@3x.png" alt="loading" />
      <p class="emptyText">No results found <br />Please try another keyword.</p>
    </div>
  </div>
</template>

<style scoped>
.cardList {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}

.search {
  width: 500px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .createBtn {
    padding: 25px;
  }
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;

  .toggleSelection {
    width: 350px;
  }
}

.routerLink {
  text-decoration: none;
}

.card {
  cursor: pointer;
}

.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .emptyImg {
    width: 400px;
    margin-bottom: 40px;
  }
}

.results {
  margin-bottom: 20px;
}

@media (max-width: 767px) {
  .title>h1 {
    flex-grow: 1;
    text-align: center;
  }

  .options {
    flex-direction: column;
    margin-bottom: 15px;
    gap: 15px;

    .search {
      width: 100%;
      box-sizing: border-box;
    }

    .toggleSelection {
      width: 100%;
    }
  }

  .empty {
    .emptyImg {
      width: 250px;
    }
  }
}
</style>
