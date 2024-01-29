<script setup lang="ts">
import type { QField, QForm } from 'quasar';
import type { ComponentPublicInstance } from 'vue';
import { computed, nextTick, onMounted, ref } from 'vue';

import { checkRequiredString } from '@/features/Global/validation';
import { defaultBackgroundUrl, useBoardStore } from '../stores/boards';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';

const boardStore = useBoardStore();
const addButtonRef = ref<ComponentPublicInstance<typeof AddButtonCard>>();
const formRef = ref<QForm>();
const formFields = ref<QField[]>([]);
const boardName = ref<string>('');
const backgroundUrl = ref<string>(defaultBackgroundUrl);

const handleSubmit = () => {
  boardStore.addBoard(boardName.value, backgroundUrl.value);
  addButtonRef.value?.close();
  closeForm();
};

const closeForm = () => {
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
    <add-button-card
      button-label="Add a board..."
      button-id="add-board-btn"
      @close="closeForm"
      ref="addButtonRef"
    >
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
    </add-button-card>
  </div>
</template>

<style scoped>
.text-btn:hover {
  text-decoration: underline;
}
</style>
