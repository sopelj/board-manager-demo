<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { checkRequiredString } from '@/features/Global/validation';
import {
  defaultBackgroundUrl,
  useBoardStore,
} from '@/features/Boards/stores/boards';
import { vClickOutside } from '@/features/Global/directives/click-outside';
import type { QField, QForm } from 'quasar';

const boardStore = useBoardStore();
const morphState = ref('btn');
const formRef = ref<QForm | null>(null);
const formFields = ref<QField[]>([]);
const boardName = ref<string>('');
const backgroundUrl = ref(defaultBackgroundUrl);

const handleSubmit = () => {
  boardStore.addBoard(boardName.value, backgroundUrl.value);
  closeForm();
};

const closeForm = () => {
  morphState.value = 'btn';
  boardName.value = '';
  backgroundUrl.value = defaultBackgroundUrl;
  formRef.value?.reset();
};

onMounted(async () => {
  await nextTick();
  formFields.value = formRef.value?.getValidationComponents() as QField[];
});
const formHasErrors = computed(() =>
  formFields.value.some((v) => v.hasError || !v.modelValue)
);
</script>

<template>
  <div class="flex column">
    <q-btn
      flat
      no-caps
      align="left"
      class="col text-btn bg-grey-2 text-grey-6"
      id="add-board-btn"
      @click="morphState = 'card'"
      v-morph:btn:add-board:300="morphState"
    >
      Add a board...
    </q-btn>
    <q-card
      v-morph:card:add-board:300="morphState"
      v-click-outside:add-board-btn="closeForm"
    >
      <q-card-section>
        <q-form ref="formRef" @submit="handleSubmit">
          <q-input
            v-model="boardName"
            label="Name"
            lazy-rules
            :rules="[checkRequiredString]"
          />
          <q-input
            v-model="backgroundUrl"
            label="Background URL"
            lazy-rules
            :rules="[checkRequiredString]"
          />
          <q-btn type="submit" color="primary" :disabled="formHasErrors">
            Add
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.text-btn:hover {
  text-decoration: underline;
}
</style>
