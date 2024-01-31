<script setup lang="ts">
import { useRouter } from 'vue-router';
import AddBoardForm from './AddBoardForm.vue';
import BoardCard from './BoardCard.vue';

import { useFeathers } from '@/feathers-client';
import { computed } from 'vue';

const router = useRouter();
const { api } = useFeathers();

const params = computed(() => ({ query: {} }));
const { allLocalData: boards, isProcessing } =  api.service('boards').useFind(params, { paginateOn: 'hybrid'});
</script>

<template>
  <div class="q-pa-md row items-start q-col-gutter-md">
      <div v-if="isProcessing">
        <q-card class="col-1 col-md-2 col-sm-3 col-xs-12" v-for="i in [1, 2, 3, 4]" :key="`shadow-board-${i}`">
          <q-skeleton style="padding-top: 100%" square />
          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QAvatar" />
            <q-skeleton type="QBtn"/>
          </q-card-actions>
        </q-card>
      </div>
      <board-card
        v-else
        v-for="board in boards" :key="`board-${board.id}`"
        class="col-1 col-md-2 col-sm-3 col-xs-12 cursor-pointer"
        :board="board"
        @click="router.push({ name: 'board', params: { id: board._id } })"
      />
      <add-board-form class="col-1 col-md-2 col-sm-3 col-xs-12" />
  </div>
</template>
