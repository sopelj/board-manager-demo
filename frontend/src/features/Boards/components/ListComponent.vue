<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="col-2 board" :key="board.id">
      <q-img :src="list.background_url">
        <div class="absolute-bottom text-h6">
          {{ board.name }}
        </div>
      </q-img>
      <q-card-section class="q-pt-none">
        {{ formatTimeSince(board.created) }}
        <q-btn flat round color="red" icon="delete" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { List } from 'src/features/Boards/models';
import { formatTimeSince } from 'src/features/Dates/datetime';

defineProps<{ lists: List[] }>();
</script>
