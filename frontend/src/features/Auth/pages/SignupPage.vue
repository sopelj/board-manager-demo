<template>
  <q-page padding class="flex flex-center row">
    <div class="col col-xs-12 col-sm-6 col-md-4" style="max-width: 450px">
      <q-form @submit="handleSignup" class="q-gutter-md q-pa-md">
        <h1 class="text-h4 text-center">Create an account</h1>
        <q-input
          v-model="username"
          label="Username *"
          lazy-rules
          :rules="[checkRequired]"
        />
        <q-input
          v-model="displayName"
          label="Display Name *"
          lazy-rules
          :rules="[checkRequired]"
        />
        <q-input
          v-model="email"
          label="Email *"
          lazy-rules
          type="email"
          :rules="[checkRequired, checkEmail]"
        />
        <q-input
          v-model="password"
          label="Password *"
          :type="isPasswordVisible ? 'password' : 'text'"
          lazy-rules
          :rules="[checkRequired]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPasswordVisible = !isPasswordVisible"
            />
          </template>
        </q-input>
        <q-input
          v-model="confirmPassword"
          label="Confirm Password *"
          :type="isPasswordVisible ? 'password' : 'text'"
          lazy-rules
          :rules="[checkRequired, checkPasswordConfirmation]"
        />
        <div class="row flex-center">
          <q-btn
            label="Sign up"
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

import { useRouter } from 'vue-router';
const $q = useQuasar();
const router = useRouter();

const email = ref(null);
const displayName = ref(null);
const username = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const isPasswordVisible = ref(false);

const checkRequired = (val: string | null) =>
  (val && val.length > 0) || 'Cannot be empty';
const checkEmail = (val: string) =>
  /(.+)@(.+){2,}\.(.+){2,}/.test(val) || 'Invalid email address';
const checkPasswordConfirmation = (val: string | null) =>
  val === password.value || 'Passwords do not match';

const handleSignup = () => {
  // TODO: Actually create account when backend exists.
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'person_add',
    message: 'Account created. Please login.',
  });
  router.push({ name: 'auth-login' });
};
</script>
