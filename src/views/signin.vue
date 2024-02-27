<template>
  <!-- <label for="" class="">first name</label> <br>
    <input type="text" class="border border-black" v-model="name">
    <input ref="file" type="file" accept=".jpg,.png,.jpeg" />
    <button @click="handleFileUpload" class="border-black border p-2">submit</button> -->
  <section class="h-screen flex-col justify-center">
    <div class="mt-28 text-center">
      <img src="https://imgur.com/euNkdrX.png" alt="" class="mx-auto h-10 w-auto mb-5" />
      <h1 class="font-semibold text-2xl tracking-tight">Create an account</h1>
    </div>

      <div class="w-[23%] mx-auto mt-14 text-sm">
        <div class="flex   ">
          <div class="w-1/2 ">
            <label for="" class="tracking-tight font-medium">Username</label> 
            <input type="text" v-model="name" class="block mt-2 mb-4 w-[95%] rounded-md border-0 py-2 p-2 text-gray-900 shadow-sm ring-1  ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />
          </div>
          <div class="w-1/2">
            <label for="" class="tracking-tight font-medium ml-[5%] ">Email</label>
            <input type="email" v-model="email" class="mt-2 mb-4 box-border ml-[5%] rounded-md w-[95%] border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />
          </div>
        </div>
        <label for="" class="tracking-tight font-medium">Upload photo</label>
        <input ref="file" type="file" class="mt-2 mb-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />

        
        <label for="" class="tracking-tight font-medium">Password</label>
        <input type="password" accept=".jpg,.png,.jpeg" class="mt-2 mb-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />

        <label for="" class="tracking-tight font-medium">Confirm password</label>
        <input type="password" class="mt-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 focus:ring-orange-400 focus:ring-2" />

        <button @click="handleFileUpload" class="w-full bg-orange-600 text-sm font-semibold text-white mt-8 py-2 rounded tracking-tight">Create account</button>
        <p class="font-medium tracking-tight text-sm mt-4 text-gray-900">Already a member? Log in <span class="text-orange-600"> here </span></p>
      </div>
  </section>
</template>
<style>
input {
  all: unset;
  box-sizing: border-box;
}
</style>
<script setup>
import {ref} from "vue";
import { supabase } from "../lib/supabaseClient";


const file = ref(null);
const name = ref("");
const email = ref("");

const handleFileUpload = async (e) => {
  const image = file.value.files[0];
  console.log(image);
  const { data, error } = await supabase.storage
    .from("profilePictures")
    .upload(`public/${email.value}`, image);
  if (error) {
    console.log(error.message);
  }
  else{
    console.log("successful")
  }
};
</script>
