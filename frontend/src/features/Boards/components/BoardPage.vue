<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import { useBoardStore } from '../stores/boards';
import { useListStore } from '../stores/lists';
import ListCard from './ListCard.vue';
import AddListForm from './AddListForm.vue';

const route = useRoute();
const boardStore = useBoardStore();
const listStore = useListStore();

const { getBoardById } = storeToRefs(boardStore);
const { getListsByBoardId } = storeToRefs(listStore);

const boardId = parseInt(route.params.id as string);
const board = getBoardById.value(boardId);
</script>

<template>
  <q-toolbar class="bg-grey-9 text-white">
    <q-btn :to="{ name: 'index' }" flat icon="arrow_back" />
    <q-toolbar-title>
      {{ board?.name }}
    </q-toolbar-title>
  </q-toolbar>
  <q-page
    padding
    class="board-page"
    :style="
      board?.backgroundUrl
        ? `background-image: url(${board.backgroundUrl})`
        : ''
    "
  >
    <div class="q-pa-md row items-start q-gutter-md">
      <list-card
        class="col-1 col-md-2 col-sm-3 col-xs-12"
        v-for="list in getListsByBoardId(boardId)"
        :list="list"
        :key="list.id"
      />
      <add-list-form
        :board-id="boardId"
        class="col-1 col-md-2 col-sm-3 col-xs-12"
      />
    </div>
  </q-page>
</template>

<style scoped>
.board-page {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
