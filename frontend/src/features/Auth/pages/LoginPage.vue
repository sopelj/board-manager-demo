<template>
  <q-page padding class="flex flex-center row">
    <div class="col col-xs-12 col-sm-6 col-md-4" style="max-width: 450px">
      <q-form @submit="handleLogin" class="q-gutter-md q-pa-md">
        <h1 class="text-h4 text-center">Login</h1>
        <q-input
          v-model="username"
          label="Username *"
          lazy-rules
          :rules="[requiredStringRule]"
        />
        <q-input
          v-model="password"
          label="Password *"
          :type="isPasswordVisible ? 'password' : 'text'"
          lazy-rules
          :rules="[requiredStringRule]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
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

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const username = ref(null);
const password = ref(null);
const isPasswordVisible = ref(false);

const requiredStringRule = (val: string | null) =>
  (val && val.length > 0) || 'Cannot be empty';

const handleLogin = () => {
  // TODO: Actual login login when backend is created.
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'login',
    message: 'Logged in!',
  });
  userStore.user = userStore.getUserById(1);
  const nextPage = route.query.next;
  router.push(
    (nextPage instanceof Array ? nextPage[0] : nextPage) || { name: 'index' }
  );
};
</script>
