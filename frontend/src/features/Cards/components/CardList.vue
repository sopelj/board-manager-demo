<script setup lang="ts">
import { checkRequiredString } from '@/features/Global/validation';
import { computed, ref } from 'vue';
import type { QForm } from 'quasar';
import { useFeathersService } from '@/feathers-client';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';

const props = defineProps<{ listId: string }>();

const Card = useFeathersService('cards');
const newCard = ref(Card.new());

const params = computed(() => ({ query: { listId: props.listId } }));
const { data: cards, isPending } = Card.useFind(params, {
  paginateOn: 'hybrid',
});

const addFormRef = ref<QForm>();
const cardInputRef = ref();
const addCard = () => {
  newCard.value.listId = props.listId;
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
</script>

<template>
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
    :button-id="`add-card-button-list-${listId}`"
    :padding="false"
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
</template>
