<template class="text-center">
  <p class="mt-20 text-center">Tables for</p>
  <div v-for="(item, index) in tableArray" :key="index" class="text-center">
    {{ item }}
  </div>
</template>
<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted } from "vue";

const tables = ref("");
const tableArray = ref([]);
const email = ref("");

onMounted(() => {
  sessionData();
});

async function sessionData() {
  const { data, error } = await supabase.auth.getSession();
  email.value = data.session.user.email;
  console.log(email.value);

  getData();
}
async function getData() {
  console.log("in data " + email.value);
  const { data } = await supabase.from("boards").select("tableName").eq("email", email.value);
  //   tables.value = data[0].tableName;
  //   tableArray.value = tables.value.split(",");
  console.log(data[0]);
}
</script>
