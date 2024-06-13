<script setup lang="ts">
import type { QField, QForm, QInput } from 'quasar';
import { computed, nextTick, onMounted, ref } from 'vue';

import { checkRequiredString } from '@/features/Global/validation';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';
import { useFeathersService } from '@/feathers-client';

const defaultBackgroundUrl =
  'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

const Board = useFeathersService('boards');
const newBoard = ref(Board.new({ backgroundUrl: defaultBackgroundUrl }));

const formRef = ref<QForm>();
const nameInputRef = ref<QInput>();
const formFields = ref<QField[]>([]);

const handleSubmit = () => {
  newBoard.value.save();
  nameInputRef.value?.focus();
  resetForm();
};

const resetForm = () => {
  newBoard.value = Board.new({ backgroundUrl: defaultBackgroundUrl });
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
      @close="resetForm"
    >
      <q-form ref="formRef" @submit="handleSubmit">
        <q-input
          ref="nameInputRef"
          v-model="newBoard.name"
          label="Name"
          lazy-rules
          :rules="[checkRequiredString]"
        />
        <q-input
          v-model="newBoard.backgroundUrl"
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
