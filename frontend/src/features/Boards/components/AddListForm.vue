<script setup lang="ts">
import { ref } from 'vue';
import { checkRequiredString } from '@/features/Global/validation';
import { useListStore, defaultColor } from '../stores/lists';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';

const props = defineProps<{ boardId: string }>();

const listStore = useListStore();
const addFormRef = ref<InstanceType<typeof AddButtonCard>>();
const listName = ref<string>('');
const handleSubmit = () => {
  listStore.addList(listName.value, defaultColor, props.boardId);
  addFormRef.value?.close();
};
</script>

<template>
  <add-button-card
    button-label="Add List..."
    button-id="add-list-btn"
    ref="addFormRef"
    @close="listName = ''"
  >
    <q-form @submit="handleSubmit">
      <q-input
        v-model="listName"
        label="Name"
        lazy-rules
        :rules="[checkRequiredString]"
      />
      <q-btn type="submit" color="primary" :disabled="!listName"> Add </q-btn>
    </q-form>
  </add-button-card>
</template>
