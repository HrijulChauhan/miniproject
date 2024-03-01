<template>
  <div class="text-center mt-20">
    <p>welcome back {{ user }}</p>
    <button class="bg-blue-600 text-sm font-medium text-white px-6 text-center rounded py-2 m-2" @click="logoutUser">logout</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import {useRouter} from "vue-router"

const email = ref("");
const user = ref("");
const router = useRouter();


async function sessionData() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    email.value = data.session.user.email;
    getName();
  }
}
async function getName() {
  const { data } = await supabase.from("users").select().eq("email", "hrijulchauhan@gmail.com");
  user.value = data[0].name;
  console.log(user.value);
}

async function logoutUser() {
const { error } = await supabase.auth.signOut();
if(error){

}
else{
    router.push('/login');
}
}

onMounted(() => {
  sessionData();
});
</script>
