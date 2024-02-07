<template>
  <label for="">first name</label>
  <input type="text" class="border border-black" v-model="name">
  <input ref="file" type="file" accept=".jpg,.png,.jpeg" />
  <button @click="handleFileUpload" class="border-black border p-2">submit</button>
  {{ name }}
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";

// Create Supabase client


const file = ref(null);
const name = ref("");

const handleFileUpload = async (e) => {
		const image = file.value.files[0];
		console.log(image)
		const { data, error } = await supabase.storage
			.from('profilePictures')
			// .upload(`public/${image.name}`, image)
			.upload(`public/${name.value}`, image)
	
        if (error) {
            console.log(error.message);
        }

        }

</script>
