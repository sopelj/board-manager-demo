<script setup lang="ts">
import type { QForm } from 'quasar';

import { storeToRefs } from 'pinia';
import { colors } from 'quasar';
import { computed, ref } from 'vue';

import { checkRequiredString } from '@/features/Global/validation';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';

import UserAvatar from '@/features/Auth/components/UserAvatar.vue';
import { useUserStore } from '@/features/Auth/stores/user';
import { formatTimeSince } from '@/features/Dates/datetime';
import { User } from '@/features/Auth/types';
import { useFeathers } from '@/feathers-client';

const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const { api } = useFeathers();

const List = api.service('lists');
const Card = api.service('cards');
const props = defineProps<{ list }>();

const newCard = ref(Card.new());
const cardParams = computed(() => ({ query: { listId: props.list._id } }));
const { allLocalData: cards, isPending } = Card.useFind(cardParams, {
  paginateOn: 'hybrid',
});

const addFormRef = ref<QForm>();
const cardInputRef = ref();
const addFormBtnRef = ref<InstanceType<typeof AddButtonCard>>();
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

const addCard = () => {
  newCard.value.listId = props.list._id;
  newCard.value.save();
  resetAddCard();
  cardInputRef.value.focus();
};

const resetAddCard = () => {
  newCard.value = Card.new();
  addFormRef.value?.reset();
};

const startDrag = (event: DragEvent, cardId: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', cardId.toString());
    event.dataTransfer.dropEffect = 'move';
  }
};
const onDragDrop = async (event: DragEvent) => {
  const cardId = event?.dataTransfer?.getData('text/plain');
  if (cardId && !cards.value.find((c) => c._id === cardId)) {
    const card = await Card.get(cardId);
    if (card) {
      await Card.patch(card._id, { listId: props.list._id });
      dragOverActive.value = false;
    }
  }
};

const onDragEnter = (event: DragEvent) => {
  const cardId = event?.dataTransfer?.getData('text/plain');
  if (cardId && !cards.value.find((c) => c._id === cardId)) {
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
        <div v-if="isPending">
          <q-card
            class="shadow-1 full-width"
            v-for="i in [1, 2, 3]"
            :key="`shadow-cards-${i}}`"
          >
            <q-card-section class="q-pa-sm">
              <q-skeleton type="text" />
            </q-card-section>
          </q-card>
        </div>
        <q-card
          v-else
          v-for="card in cards"
          :key="card._id"
          class="q-mb-sm q-ma-sm"
          draggable="true"
          @dragstart="startDrag($event, card._id)"
        >
          <q-card-section class="q-pa-sm">
            {{ card.content }}
          </q-card-section>
        </q-card>
        <add-button-card
          button-label="Add card"
          :button-id="`add-card-button-list-${list._id}`"
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
              v-model="newCard.content"
              ref="cardInputRef"
              class="col"
              :rules="[checkRequiredString]"
            />
            <q-btn
              flat
              icon="save"
              type="submit"
              class="q-pa-none q-ml-sm"
              :disable="newCard.content === ''"
            />
          </q-form>
        </add-button-card>
      </q-card-section>
    </q-card>
  </div>
</template>
