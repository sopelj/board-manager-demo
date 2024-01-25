<template>
  <q-card>
    <q-img :src="board.backgroundUrl">
      <div class="absolute-top text-h6 bg-transparent">
        {{ board.name }}
      </div>
    </q-img>
    <q-card-section class="q-pa-sm row vertical-middle">
      <div class="col flex vertical-middle">
        <user-avatar
          :user="owner"
          :size="20"
          style="font-size: 1.5em"
          class="q-mr-sm"
        />
        <span class="owner">{{ ownerName || 'unknown' }}</span>
        <span>{{ formatTimeSince(board.created) }}</span>
      </div>
      <q-btn flat round color="red" icon="delete" @click.stop="removeBoard" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import UserAvatar from '@/features/Auth/components/UserAvatar.vue';
import { useUserStore } from '@/features/Auth/stores/user';
import { useBoardStore } from '../stores/boards';
import { formatTimeSince } from '@/features/Dates/datetime';
import { Board } from '../types';
import { computed } from 'vue';

const props = defineProps<{ board: Board }>();

const userStore = useUserStore();
const boardStore = useBoardStore();
const { user } = storeToRefs(userStore);

const owner = computed(() => userStore.getUserById(props.board.ownerId));
const ownerName = computed(() =>
  user.value?.id === owner.value?.id ? 'you' : user.value?.displayName
);

const removeBoard = () => {
  boardStore.$patch({
    boards: [...boardStore.boards.filter((b) => b.id !== props.board.id)],
  });
};
</script>

<style scoped>
.owner:after {
  content: ' - ';
}
</style>
