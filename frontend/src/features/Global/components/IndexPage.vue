<template>
  <q-page>
    <board-list v-if="isAuthenticated" />
    <div class="q-pa-md flex flex-center" v-else>
      <div class="container text-center">
        <h1 class="text-h4">Welcome to a demo board manager app built with</h1>
        <div class="row flex-center">
          <div class="col-4">
            <q-img
              :src="quasarLogoUrl"
              width="50%"
              :ratio="1"
              fit="contain"
              alt=""
            />
            <div class="text-h5">Quasar</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import quasarLogoUrl from '@/assets/images/logos/quasar.svg';
import BoardList from '@/features/Boards/components/BoardList.vue';
import { useAuthStore } from '@/features/Auth/store';

const { isAuthenticated } = useAuthStore();
</script>
