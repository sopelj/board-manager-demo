<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ user; size?: number }>(), {
  size: 80,
});
const avatarUrl = computed<string>(() => {
  return `${props.user.avatarUrl}?s=${props.size}`;
});
</script>

<template>
  <q-avatar>
    <img :src="avatarUrl" :alt="`${user.displayName}'s profile picture`" />
    <slot />
  </q-avatar>
</template>
