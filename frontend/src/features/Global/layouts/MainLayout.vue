<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Board Manager</q-toolbar-title>
        <div v-if="user">
          <user-avatar :user="user" :size="80">
            <q-menu auto-close>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section @click="handleLogout">
                    Logout
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </user-avatar>
        </div>
        <q-tabs v-else indicator-color="transparent">
          <q-route-tab :to="{ name: 'auth-login' }">Login</q-route-tab>
          <q-route-tab :to="{ name: 'auth-signup' }">Signup</q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/features/Auth/stores/user';
import { useQuasar } from 'quasar';
import UserAvatar from 'src/features/Auth/components/UserAvatar.vue';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const handleLogout = () => {
  userStore.user = undefined;
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'logout',
    message: 'Logged out!',
  });
  router.push({ name: 'index' });
};
</script>
