<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <board-card
      class="col-1 col-md-2 col-sm-3 col-xs-12 cursor-pointer"
      v-for="board in boards"
      :board="board"
      :key="board.id"
      @click="router.push({ name: 'board', params: { id: board.id } })"
    />
    <add-board class="col-1 col-md-2 col-sm-3 col-xs-12" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBoardStore } from '../stores/boards';
import BoardCard from './BoardCard.vue';
import AddBoard from './AddBoard.vue';

const router = useRouter();
const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);
</script>
