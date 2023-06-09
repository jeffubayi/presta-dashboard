<script setup lang="ts">
import { onMounted, ref } from "vue";

import LoginView from "../components/SignUp.vue";
import { supabase } from "../supabase";
import CustomerView from "./CustomerView.vue";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <main>
    <CustomerView v-if="session" />
    <LoginView v-else />
  </main>
</template>
