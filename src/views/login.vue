<template>
  <!-- <label for="" class="">first name</label> <br>
  <input type="text" class="border border-black" v-model="name">
  <input ref="file" type="file" accept=".jpg,.png,.jpeg" />
  <button @click="handleFileUpload" class="border-black border p-2">submit</button> -->
  <div class="h-screen flex-col justify-center">
    <div class="mt-28 text-center">
      <img src="https://imgur.com/euNkdrX.png" alt="" class="mx-auto h-10 w-auto mb-5" />
      <h1 class="font-semibold text-2xl tracking-tight">Sign in to your account</h1>
    </div>

    <div class="w-[23%] mx-auto mt-14 text-sm">
      <label for="" class="tracking-tight font-medium">Email</label>
      <input
        type="text"
        v-model="email"
        class="mt-2 mb-4 box-border w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2"
      />

      <div class="mt-1 flex justify-between text-sm">
        <label for="" class="tracking-tight font-medium">Password</label>
        <p class="font-medium tracking-tight text-orange-600">Forgot password?</p>
      </div>
      <input type="password" v-model="password" class="mt-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />

      <button @click="login" class="w-full bg-orange-600 text-sm font-semibold text-white mt-8 py-2 rounded tracking-tight">Sign in</button>

      <p class="font-medium tracking-tight text-sm mt-4 text-gray-900">Not a member? Sign up <router-link to="/signup" class="text-orange-500"> here</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";



const email = ref("");
const password = ref("");
const router = useRouter();

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if(error){
    console.log(error);
  }
  else{
    router.push('/')
  }
}
</script>

<style>
input {
  all: unset;
  box-sizing: border-box;
}
</style>
