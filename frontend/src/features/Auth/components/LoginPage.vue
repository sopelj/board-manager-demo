<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '../stores/user';
import { checkRequiredString } from '@/features/Global/validation';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const username = ref<string>('');
const password = ref<string>('');
const isPasswordVisible = ref<boolean>(false);

const handleLogin = () => {
  // TODO: Actual login login when backend is created.
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'login',
    message: 'Logged in!',
  });
  userStore.user = userStore.users.get('9d4dd4b8-47f9-4cfd-98f4-bba4fc27f545');
  const nextPage = route.query.next;
  router.push(
    (nextPage instanceof Array ? nextPage[0] : nextPage) || { name: 'index' }
  );
};
</script>

<template>
  <q-page padding class="flex flex-center row">
    <div class="col col-xs-12 col-sm-6 col-md-4" style="max-width: 450px">
      <q-form @submit="handleLogin" class="q-gutter-md q-pa-md">
        <h1 class="text-h4 text-center">Login</h1>
        <q-input
          v-model="username"
          label="Username *"
          autocapitalize="off"
          lazy-rules
          :rules="[checkRequiredString]"
        />
        <q-input
          v-model="password"
          label="Password *"
          :type="isPasswordVisible ? 'text' : 'password'"
          lazy-rules
          :rules="[checkRequiredString]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPasswordVisible = !isPasswordVisible"
            />
          </template>
        </q-input>
        <div class="row flex-center">
          <q-btn
            label="Log in"
            type="submit"
            color="primary"
            class="col-12 col-sm-4"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
