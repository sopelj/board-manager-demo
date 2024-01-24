<template>
  <q-avatar>
    <img :src="avatarUrl" :alt="`${user.displayName}'s profile picture`" />
    <slot />
  </q-avatar>
</template>

<script setup lang="ts">
import md5 from 'md5';
import { computed } from 'vue';
import type { User } from '../types';

const props = withDefaults(defineProps<{ user: User; size?: number }>(), {
  size: 80,
});
const avatarUrl = computed<string>(() => {
  const hash = md5(props.user.email.toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${props.size}`;
});
</script>
