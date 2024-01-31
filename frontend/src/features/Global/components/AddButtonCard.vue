<script setup lang="ts">
import { computed, ref } from 'vue';
import { vClickOutside } from '@/features/Global/directives/click-outside';

const props = withDefaults(
  defineProps<{ buttonLabel: string; buttonId: string; padding?: boolean }>(),
  { padding: true }
);
const emit = defineEmits(['close', 'open']);

const morphGroup = computed((): string => `add-form-btn-${props.buttonId}`);
const cardMorphId = computed((): string => `card-${props.buttonId}`);
const btnMorphId = computed((): string => `btn-${props.buttonId}`);
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
  <div>
    <q-btn
      flat
      no-caps
      align="left"
      class="width-100 col text-btn bg-grey-2 text-grey-6 text-weight-regular text-transition"
      :id="buttonId"
      @click="open"
      v-morph:[`${btnMorphId}:${morphGroup}:300`]="morphState"
    >
      {{ buttonLabel }}
    </q-btn>
    <q-card
      v-morph:[`${cardMorphId}:${morphGroup}:300`]="morphState"
      v-click-outside:[buttonId]="close"
      class="width-100 col"
    >
      <q-card-section :class="padding ? '' : 'no-padding'">
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
