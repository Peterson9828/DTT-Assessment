<script setup lang="ts">
import { ref } from 'vue'
import DTTButton from '../dttComponents/DTTButtonDelete.vue'

defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  width: {
    type: String,
    default: '500px',
    required: false
  }
})

const emit = defineEmits<{
  onConfirm: []
}>()
const showDialog = ref(false)

const confirm = () => {
  emit('onConfirm')
  showDialog.value = false
}
const cancel = () => {
  showDialog.value = false
}
</script>

<template>
  <div>
    <button class="icon-button" @click.stop="showDialog = true">
      <img class="icon" src="@/static/ic_delete@3x.png" alt="location icon" />
    </button>

    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog" :style="{ width }">
        <div class="dialog-content">
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>

          <DTTButton class="button" label="YES, DELETE" @click.stop="confirm" />
          <DTTButton
            class="button"
            label="GO BACK"
            backgroundColor="secondary"
            @click.stop="cancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  display: grid;
  place-items: center;
  background: white;
  padding: 20px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: 10px;
  height: 300px;
}

.dialog-content {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialog button {
  margin: 10px;
}

.button {
  width: 100%;
}

@media (max-width: 767px) {
  .dialog {
    height: 200px;
  }
}
</style>
