<script setup lang="ts">
import type { QForm } from 'quasar';
import type { ComponentPublicInstance } from 'vue';
import type { Card, List } from '../types';

import { storeToRefs } from 'pinia';
import { colors } from 'quasar';
import { computed, ref } from 'vue';

import { checkRequiredString } from '@/features/Global/validation';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';

import { useCardStore } from '../stores/cards';
import { useListStore } from '../stores/lists';
import UserAvatar from '@/features/Auth/components/UserAvatar.vue';
import { useUserStore } from '@/features/Auth/stores/user';
import { formatTimeSince } from '@/features/Dates/datetime';
import { User } from '@/features/Auth/types';

const props = defineProps<{ list: List }>();

const userStore = useUserStore();
const cardStore = useCardStore();
const listStore = useListStore();

const { users } = storeToRefs(userStore);
const { getCardsByListId } = storeToRefs(cardStore);

const addFormRef = ref<QForm>();
const addFormBtnRef = ref<ComponentPublicInstance<typeof AddButtonCard>>();
const newListName = ref<string>('');
const dragOverActive = ref<boolean>(false);

const headerStyle = computed(() => {
  const bgColor = dragOverActive.value ? '#00ffae' : props.list.color;
  const textColor = colors.luminosity(bgColor) >= 0.5 ? 'black' : 'white';
  return `background-color: ${bgColor}; color: ${textColor}`;
});
const listColor = computed({
  get: () => props.list.color,
  set: (val) => {
    listStore.lists.set(props.list.id, {
      ...props.list,
      color: val,
    });
  },
});
const owner = computed((): User | undefined =>
  users.value.get(props.list.ownerId)
);
const listCards = computed((): Card[] => getCardsByListId.value(props.list.id));

const addCard = () => {
  cardStore.addCard(newListName.value as string, props.list.id);
  resetAddCard();
};

const resetAddCard = () => {
  newListName.value = '';
  addFormRef.value?.reset();
};

const startDrag = (event: DragEvent, cardId: string) => {
  if (event.dataTransfer !== null) {
    event.dataTransfer.setData('text/plain', cardId.toString());
    event.dataTransfer.dropEffect = 'move';
  }
};
const onDragDrop = (event: DragEvent) => {
  const cardId = event?.dataTransfer?.getData('text/plain');
  if (cardId && !listCards.value.find((c) => c.id === cardId)) {
    const card = cardStore.cards.get(cardId);
    if (card) {
      cardStore.cards.set(card.id, {
        ...card,
        listId: props.list.id,
      });
      dragOverActive.value = false;
    }
  }
};

const onDragEnter = (event: DragEvent) => {
  const cardId = event?.dataTransfer?.getData('text/plain');
  if (cardId && !listCards.value.find((c) => c.id === cardId)) {
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
                      @click="listStore.deleteList(list.id)"
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
        <q-card
          v-for="card in getCardsByListId(list.id)"
          :key="card.id"
          class="q-mb-sm q-ma-sm"
          draggable="true"
          @dragstart="startDrag($event, card.id)"
        >
          <q-card-section class="q-pa-sm">
            {{ card.content }}
          </q-card-section>
        </q-card>
        <add-button-card
          button-label="Add card"
          :button-id="`add-card-button-list-${list.id}`"
          :padding="false"
          ref="addFormBtnRef"
          @close="resetAddCard"
        >
          <q-form
            @submit="addCard"
            ref="addFormRef"
            class="row items-center shadow-1 q-px-sm q-pb-sm"
          >
            <q-input
              v-model="newListName"
              class="col"
              :rules="[checkRequiredString]"
            />
            <q-btn
              flat
              icon="save"
              type="submit"
              class="q-pa-none q-ml-sm"
              :disable="newListName === ''"
            />
          </q-form>
        </add-button-card>
      </q-card-section>
    </q-card>
  </div>
</template>
