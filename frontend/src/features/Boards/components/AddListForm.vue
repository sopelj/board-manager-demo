<script setup lang="ts">
import type { QInput } from 'quasar';
import { ref } from 'vue';
import { checkRequiredString } from '@/features/Global/validation';
import AddButtonCard from '@/features/Global/components/AddButtonCard.vue';
import { useFeathers } from '@/feathers-client';

const props = defineProps<{ boardId: string }>();

const { api } = useFeathers();
const defaultColor = '#e0e0e0';

const addFormRef = ref<InstanceType<typeof AddButtonCard>>();
const nameInputRef = ref<QInput>();

const List = api.service('lists');
const newList = ref(List.new({ color: defaultColor }));

const handleSubmit = () => {
  newList.value.boardId = props.boardId;
  newList.value.save();
  newList.value = List.new({ color: defaultColor });
  nameInputRef.value?.focus();
};
</script>

<template>
  <add-button-card
    button-label="Add List..."
    button-id="add-list-btn"
    ref="addFormRef"
    @close="newList.name = ''"
  >
    <q-form @submit="handleSubmit">
      <q-input
        ref="nameInputRef"
        v-model="newList.name"
        label="Name"
        lazy-rules
        :rules="[checkRequiredString]"
      />
      <q-btn type="submit" color="primary" :disabled="!newList.name">Add</q-btn>
    </q-form>
  </add-button-card>
</template>
