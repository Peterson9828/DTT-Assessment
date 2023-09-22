<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useHouseStore } from '@/stores/house.js'

const houseStore = useHouseStore()
</script>

<template>
  <header class="desktop">
    <img alt="DTT logo" class="logo" src="@/static/img_logo_dtt@3x.png" width="130" />

    <nav>
      <RouterLink class="routerLink" to="/">Houses</RouterLink>
      <RouterLink class="routerLink" to="/about">About</RouterLink>
    </nav>
  </header>
  <nav class="mobile">
    <RouterLink class="routerLink" to="/" v-slot="{ isActive }">
      <img v-if="isActive" src="@/static/ic_mobile_navigarion_home_active@3x.png" alt="Home icon" />
      <img v-if="!isActive" src="@/static/ic_mobile_navigarion_home@3x.png" alt="Home icon" />
    </RouterLink>
    <RouterLink class="routerLink" to="/about" v-slot="{ isActive }">
      <img
        v-if="isActive"
        class="icon"
        src="@/static/ic_mobile_navigarion_info_active@3x.png"
        alt="Home icon"
      />
      <img v-if="!isActive" src="@/static/ic_mobile_navigarion_info@3x.png" alt="Home icon" />
    </RouterLink>
  </nav>
  <div v-if="houseStore.loading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <RouterView v-show="!houseStore.loading" class="routerView" />
</template>

<style scoped lang="scss">
header {
  background-color: $background2;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 20px 10%;
}

nav {
  display: flex;
  align-items: center;
  gap: 60px;
}

.routerView {
  flex: 1;
  padding: 30px 10% 50px 10%;
  position: relative;
}

.routerLink {
  color: $tertiary2;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.routerLink > img {
  display: none;
}

.router-link-exact-active {
  color: $text-primary;
}
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.spinner {
  width: 100px;
  height: 100px;
  border: 4px solid $primary;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 767px) {
  .routerView {
    padding: 30px 15px 80px 15px;
  }
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: $background1;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    z-index: 1;
  }
  .routerLink > img {
    display: block;
    width: 25px;
  }
}
</style>
