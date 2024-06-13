<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { checkRequiredString, checkEmail } from '@/features/Global/validation';
import { useAuthStore } from '@/features/Auth/store';
import { useFeathersService } from '@/feathers-client';

const $q = useQuasar();
const router = useRouter();

const User = useFeathersService('users');
const authStore = useAuthStore();

const newUser = ref(User.new());
const confirmPassword = ref<string>('');
const isPasswordVisible = ref<boolean>(false);

const checkPasswordConfirmation = (val: string | null) =>
  val === newUser.value.password || 'Passwords do not match';

const handleSignup = async () => {
  await newUser.value.create();
  const { email, password } = newUser.value;
  authStore.clearError();
  await authStore.authenticate({ strategy: 'local', email, password });
  newUser.value = User.new();

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'person_add',
    message: 'Account created!',
  });

  const redirectTo = authStore.loginRedirect || '/';
  authStore.loginRedirect = null;
  await router.push(redirectTo);
};
</script>

<template>
  <q-page padding class="flex flex-center row">
    <div class="col col-xs-12 col-sm-6 col-md-4" style="max-width: 450px">
      <q-form @submit="handleSignup" class="q-gutter-md q-pa-md">
        <h1 class="text-h4 text-center">Create an account</h1>
        <q-input
          v-model="newUser.displayName"
          label="Display Name *"
          lazy-rules
          :rules="[checkRequiredString]"
        />
        <q-input
          v-model="newUser.email"
          label="Email *"
          lazy-rules
          type="email"
          :rules="[checkRequiredString, checkEmail]"
        />
        <q-input
          v-model="newUser.password"
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
        <div v-if="authStore.error">
          {{ authStore.error?.message }}
        </div>
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
