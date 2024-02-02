<script setup lang="ts">
import UserAvatar from '@/features/Auth/components/UserAvatar.vue';
import { formatTimeSince } from '@/features/Dates/datetime';
import { useFeathersService } from '@/feathers-client';
import { computed } from 'vue';
import { useAuthStore } from '@/features/Auth/store';
const props = defineProps<{ board }>();

const auth = useAuthStore();
const Board = useFeathersService('boards');

const ownerName = computed(() => {
  const owner = props.board.owner;
  return owner._id === auth.user._id ? 'You' : owner.displayName;
});
</script>

<template>
  <div>
    <q-card>
      <q-img :src="board.backgroundUrl" :ratio="4 / 3">
        <div class="absolute-top text-h6 bg-transparent">
          {{ board.name }}
        </div>
      </q-img>
      <q-card-section class="q-pa-sm row vertical-middle">
        <div class="col flex items-center vertical-middle">
          <user-avatar
            :user="board.owner"
            :size="20"
            style="font-size: 1.5em"
            class="q-mr-sm"
          />
          <span class="owner">{{ ownerName || 'unknown' }}</span>
          <span>{{ formatTimeSince(board.created) }}</span>
        </div>
        <q-btn
          flat
          round
          color="red"
          icon="delete"
          @click.stop="Board.remove(props.board._id)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.owner:after {
  content: ' - ';
}
</style>
