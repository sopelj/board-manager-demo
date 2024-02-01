<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ListCard from './ListCard.vue';
import AddListForm from './AddListForm.vue';
import { useFeathers } from '@/feathers-client';

const route = useRoute();
const { api } = useFeathers();

const boardId = route.params.id as string;
const { data: board, isPending: isBoardPending } = api
  .service('boards')
  .useGet(boardId);

const listParams = computed(() => ({ query: { boardId } }));
const { allLocalData: lists, isPending: isListPending } = api
  .service('lists')
  .useFind(listParams, { paginateOn: 'hybrid' });
</script>

<template>
  <q-toolbar class="bg-grey-9 text-white">
    <q-btn :to="{ name: 'index' }" flat icon="arrow_back" />
    <q-toolbar-title>
      <q-skeleton type="text" v-if="isBoardPending" />
      <template v-else>{{ board?.name }}</template>
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
    <div class="row items-start q-col-gutter-md">
      <template v-if="isListPending">
        <div
          class="col-1 col-md-2 col-sm-3 col-xs-12"
          v-for="i in [1, 2, 3, 4]"
          :key="`shadow-board-${i}`"
        >
          <div>
            <q-card>
              <q-item class="flex">
                <q-skeleton type="text" class="col text-h6" />
                <q-skeleton type="QBtn" size="2rem" class="q-ml-sm" />
              </q-item>
              <q-item>
                <q-card class="shadow-1 full-width">
                  <q-card-section class="q-pa-sm">
                    <q-skeleton type="text" />
                  </q-card-section>
                </q-card>
              </q-item>
              <q-card-actions class="q-gutter-md">
                <q-skeleton type="QBtn" class="width-100" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </template>
      <list-card
        class="col-1 col-md-2 col-sm-3 col-xs-12"
        v-for="list in lists"
        :list="list"
        :key="list._id"
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
