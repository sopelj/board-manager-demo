<script setup lang="ts">
import { computed, ref } from 'vue';
import { vClickOutside } from '@/features/Global/directives/click-outside';

const props = defineProps<{ buttonLabel: string; buttonId: string }>();
const emit = defineEmits(['close', 'open']);

const morphGroup = computed(() => `add-form-btn-${props.buttonId}`);
const cardMorphId = computed(() => `card-${props.buttonId}`);
const btnMorphId = computed(() => `btn-${props.buttonId}`);
const morphState = ref<string>(btnMorphId.value);

const open = (): void => {
  morphState.value = cardMorphId.value;
  emit('open');
};

const close = (): void => {
  emit('close');
  morphState.value = btnMorphId.value;
};

defineExpose({ close });
</script>

<template>
  <div class="flex">
    <q-btn
      flat
      no-caps
      align="left"
      class="col text-btn bg-grey-2 text-grey-6 text-weight-regular"
      :id="buttonId"
      @click="open"
      v-morph:[`${btnMorphId}:${morphGroup}:300`]="morphState"
    >
      {{ buttonLabel }}
    </q-btn>
    <q-card
      v-morph:[`${cardMorphId}:${morphGroup}:300`]="morphState"
      v-click-outside:[buttonId]="close"
      class="col"
    >
      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.text-btn:hover {
  text-decoration: underline;
  color: black !important;
}
</style>
