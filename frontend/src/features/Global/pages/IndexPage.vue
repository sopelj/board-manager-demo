<template>
  <q-page padding>
    <div class="q-pa-md flex flex-center">
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
</script>
