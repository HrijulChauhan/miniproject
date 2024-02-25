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

    <form action="#" class="box-border">
      <div class="w-[23%] mx-auto mt-14 text-sm">
        <label for="" class="tracking-tight font-medium">Username</label>
        <div class="mt-2 mb-4 w-full box-border">
          <input type="text" class="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />
        </div>

        <div class="mt-1 flex justify-between text-sm">
          <label for="" class="tracking-tight font-medium">Password</label>
          <p class="font-medium tracking-tight text-orange-600">Forgot password?</p>
        </div>
        <input type="text" class="mt-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />

        <button class="w-full bg-orange-600 text-sm font-semibold text-white mt-8 py-2 rounded tracking-tight">Sign in</button>

        <p class="font-medium tracking-tight text-sm mt-4 text-gray-900">Not a member? Sign up <span class="text-orange-600"> here </span></p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";

// Create Supabase client

const file = ref(null);
const name = ref("");

const handleFileUpload = async (e) => {
  const image = file.value.files[0];
  console.log(image);
  const { data, error } = await supabase.storage
    .from("profilePictures")
    // .upload(`public/${image.name}`, image)
    .upload(`public/${name.value}`, image);

  if (error) {
    console.log(error.message);
  }
};
</script>

<style>
input {
  all: unset;
  box-sizing: border-box;
}
</style>
