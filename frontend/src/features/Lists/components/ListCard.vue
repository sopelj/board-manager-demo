<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { colors } from 'quasar';
import { computed, ref } from 'vue';

import { useUserStore } from '@/features/Auth/stores/user';
import { formatTimeSince } from '@/features/Dates/datetime';
import { User } from '@/features/Auth/types';
import { useFeathersService } from '@/feathers-client';
import UserAvatar from '@/features/Auth/components/UserAvatar.vue';
import CardList from '@/features/Cards/components/CardList.vue';

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const List = useFeathersService('lists');
const Card = useFeathersService('cards');
const props = defineProps<{ list }>();

const dragOverActive = ref<boolean>(false);

const headerStyle = computed(() => {
  const bgColor = dragOverActive.value ? '#00ffae' : props.list.color;
  const textColor = colors.luminosity(bgColor) >= 0.5 ? 'black' : 'white';
  return `background-color: ${bgColor}; color: ${textColor}`;
});

const listColor = computed({
  get: () => props.list.color,
  set: (val) => {
    List.patch(props.list._id, { color: val });
  },
});
const owner = computed((): User | undefined =>
  users.value.get(props.list.ownerId)
);

const onDragDrop = async (event: DragEvent) => {
  const cardId = event?.dataTransfer?.getData('text/plain');
  const findQuery = { query: { _id: cardId, listId: { $ne: props.list._id } } };
  if (cardId && (await Card.findOneInStore(findQuery)).value) {
    await Card.patch(cardId, { listId: props.list._id });
    dragOverActive.value = false;
  }
};

const onDragEnter = async (event: DragEvent) => {
  const cardId = event?.dataTransfer?.getData('text/plain');
  const findQuery = { query: { _id: cardId, listId: { $ne: props.list._id } } };
  if (cardId && (await Card.findOneInStore(findQuery)).value) {
    event.preventDefault();
    dragOverActive.value = true;
  }
};
</script>

<template>
  <div>
    <q-card
      @drop="onDragDrop"
      @dragenter.prevent
      @dragover="onDragEnter"
      @dragleave="dragOverActive = false"
    >
      <q-card-section :style="headerStyle" class="q-pa-sm">
        <div class="flex row items-center">
          <div class="text-h7 col">{{ list.name }}</div>
          <q-btn flat dense icon="more_horiz" class="q-pa-none">
            <q-menu anchor="top right" self="top left">
              <q-list style="min-width: 100px">
                <q-item>
                  <user-avatar :user="owner" />
                  <q-item-section class="q-ml-sm">
                    {{ owner?.displayName }}
                    <div class="text-grey-7">
                      {{ formatTimeSince(list.created) }}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item class="q-pa-none">
                  <q-btn class="full-width bg-grey-4">
                    Background Colour
                    <q-icon
                      name="format_color_fill"
                      class="cursor-pointer q-pl-sm"
                    />
                    <q-popup-proxy
                      right
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-color v-model="listColor" />
                    </q-popup-proxy>
                  </q-btn>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-btn
                      icon="remove_circle"
                      flat
                      color="red"
                      align="right"
                      @click="List.remove(list._id)"
                    >
                      Delete List
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <card-list :list-id="list._id" />
      </q-card-section>
    </q-card>
  </div>
</template>
