<template>
  <q-toolbar class="bg-grey-9 text-white">
    <q-btn :to="{ name: 'index' }" flat icon="arrow_back" />
    <q-toolbar-title>
      {{ board?.name }}
    </q-toolbar-title>
  </q-toolbar>
  <q-page class="row items-center justify-evenly">
    <p>Card list: {{ boardId }}</p>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useBoardStore } from '../stores/boards';

const route = useRoute();
const boardStore = useBoardStore();
const boardId = parseInt(route.params.id as string);
const board = boardStore.getBoardById(boardId);
</script>
