<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  Button,
  Navbar,
  NavbarLogo,
  NavbarCollapse,
  NavbarLink,
} from "flowbite-vue";
import { onMounted, ref, computed, reactive } from "vue";
import router from "../router";

import { supabase } from "../supabase";
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();
const session = ref();
const route = useRoute();
const loading = ref<boolean>(true);
const profile = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail,
});

const currentRouteName = computed(() => route.name);
console.log(`route`, currentRouteName);

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
//log out user
async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push("/");
  } catch (error) {
    alert(error);
  } finally {
    loading.value = false;
  }
}

const signUp = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: "kibe@presta.co.ke",
      password: "12345678",
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Navbar>
    <template #logo>
      <NavbarLogo
        link="/"
        alt="Presta"
        image-url="https://www.presta.co.ke/assets/logo-7ca6d1fb.svg"
      >
        Presta Capital
      </NavbarLogo>
    </template>
    <template v-if="session" #default="{ isShowMenu }">
      <NavbarCollapse :isShowMenu="isShowMenu">
        <NavbarLink link="/">Home</NavbarLink>
        <NavbarLink link="/customers">Customers</NavbarLink>
        <NavbarLink link="/profile">Profile</NavbarLink>
      </NavbarCollapse>
    </template>

    <template #right-side>
      <div v-if="session" class="flex items-center space-x-2 mx-2">
        <img
          class="w-9 h-9 rounded-full"
          src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
          alt=""
        />
        <div class="font-medium dark:text-white">
          <div>{{ profile.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ profile.email || "Not signed in" }}
          </div>
        </div>
      </div>
      <Button v-if="session" size="xs" @click="signOut"> Sign out </Button>
      <Button v-else size="md" @click="signUp"> Get started</Button>
    </template>
  </Navbar>
</template>
