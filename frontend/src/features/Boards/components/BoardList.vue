<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFeathers } from '@/feathers-client';
import AddBoardForm from './AddBoardForm.vue';
import BoardCard from './BoardCard.vue';

const router = useRouter();
const { api } = useFeathers();

const params = computed(() => ({ query: {} }));
const { allLocalData: boards, isPending } = api
  .service('boards')
  .useFind(params, { paginateOn: 'hybrid' });
</script>

<template>
  <div class="q-pa-md row items-start q-col-gutter-md">
    <template v-if="isPending">
      <div
        class="col-1 col-md-2 col-sm-3 col-xs-12"
        v-for="i in [1, 2, 3, 4]"
        :key="`shadow-board-${i}`"
      >
        <q-card>
          <q-skeleton style="aspect-ratio: 4/3" square />
          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QAvatar" />
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </div>
    </template>
    <board-card
      v-else
      v-for="board in boards"
      :key="`board-${board._id}`"
      class="col-1 col-md-2 col-sm-3 col-xs-12 cursor-pointer"
      :board="board"
      @click="router.push({ name: 'board', params: { id: board._id } })"
    />
    <add-board-form class="col-1 col-md-2 col-sm-3 col-xs-12" />
  </div>
</template>
