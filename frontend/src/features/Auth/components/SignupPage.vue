<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { checkRequiredString, checkEmail } from '@/features/Global/validation';

const $q = useQuasar();
const router = useRouter();

const email = ref<string>('');
const displayName = ref<string>('');
const username = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const isPasswordVisible = ref<boolean>(false);

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

<template>
  <q-page padding class="flex flex-center row">
    <div class="col col-xs-12 col-sm-6 col-md-4" style="max-width: 450px">
      <q-form @submit="handleSignup" class="q-gutter-md q-pa-md">
        <h1 class="text-h4 text-center">Create an account</h1>
        <q-input
          v-model="username"
          label="Username *"
          autocapitalize="off"
          lazy-rules
          :rules="[checkRequiredString]"
        />
        <q-input
          v-model="displayName"
          label="Display Name *"
          lazy-rules
          :rules="[checkRequiredString]"
        />
        <q-input
          v-model="email"
          label="Email *"
          lazy-rules
          type="email"
          :rules="[checkRequiredString, checkEmail]"
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
        <q-input
          v-model="confirmPassword"
          label="Confirm Password *"
          :type="isPasswordVisible ? 'text' : 'password'"
          lazy-rules
          :rules="[checkRequiredString, checkPasswordConfirmation]"
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
