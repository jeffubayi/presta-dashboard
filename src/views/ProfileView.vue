<script setup lang="ts">
import { supabase } from "../supabase";
import { onMounted, ref, toRefs, reactive } from "vue";
import { Alert } from "flowbite-vue";
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();
const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail,
});
const props = defineProps(["session"]);
const { session } = toRefs<any>(props);
const loading = ref<boolean>(true);
const username = ref<string>("Dickson Kibe");
const userEmail = ref<string | undefined>("");
const website = ref<string>("");
const isError = ref<boolean>(false);
const errorMessage = ref<string>("");
const isSuccess = ref<boolean>(false);
const successMessage = ref<string>("");

onMounted(() => {
  getProfile();
  getSession();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session?.value;

    let { data, error, status } = await supabase
      .from("profile")
      .select(`username, website`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
    }
  } catch (error: any) {
    isError.value = true;
    errorMessage.value = error.message;
    setTimeout(() => {
      isError.value = false;
    }, 3000);
  } finally {
    loading.value = false;
  }
}

async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    userEmail.value = data?.session?.user?.email;
    if (error) throw error;
  } catch (error: any) {
    isError.value = true;
    errorMessage.value = error.message;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profile").upsert(updates);
    isSuccess.value = true;
    successMessage.value = "profile updated successfully";
    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
    mainStore.setUser({
      name: username.value,
      email: "",
    });
    if (error) throw error;
  } catch (error: any) {
    isError.value = true;
    errorMessage.value = error.message;
    setTimeout(() => {
      isError.value = false;
    }, 3000);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container m-auto">
    <Alert v-if="isError" type="danger" class="mb-2">
      {{ errorMessage }}
    </Alert>
    <Alert v-if="isSuccess" type="success">{{ successMessage }}</Alert>
    <div
      class="w-full max-w-md bg-white rounded-lg shadow md:mt-0 xl:p-0 dark:bg-gray-800"
    >
      <div class="w-full p-6 sm:p-8">
        <div class="flex space-x-4">
          <img
            class="w-8 h-8 rounded-full"
            src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
            alt="Bonnie image"
          />
          <h2 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {{ username }}
          </h2>
        </div>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          {{ userEmail }}
        </p>
        <form class="mt-8 space-y-6" @submit.prevent="updateProfile">
          <div>
            <label
              for="profile-lock"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your name</label
            >
            <input
              type="text"
              v-model="profileForm.name"
              name="name"
              id="profile-lock"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name"
              required
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              v-model="profileForm.email"
              id="email"
              disabled
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              for="profile-lock"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your password</label
            >
            <input
              v-model="website"
              name="website"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
