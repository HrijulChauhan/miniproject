<template class="text-center tracking-tight">
  <router-link to="/"> <p class="mt-20 text-center text-xl font-semibold tracking-tight mb-5">Tables for</p></router-link>
  <div v-for="(item, index) in tableArray" :key="index" class="text-center">
    {{ item }}
</div>
<div class="flex justify-center mt-10">
<button class="bg-blue-600 text-sm font-medium text-white px-6 text-center rounded py-2" @click="open = true">+ Add table</button>
<TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center text-center items-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all px-10 py-10 w-[22vw]">
              <h2 class="text-center mb-2 text-lg">New Table</h2>

              <label for="" class="text-xs text-black font-medium" >Board name</label> <br />
              <input type="text" v-model="boardName" name="name"  placeholder="Project 4A" id="" class="border-gray-300 border-2 w-full rounded text-sm px-2 py-2 mb-2" /> <br />



              <div class="mx-auto flex justify-end mt-4">
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                  @click="newTable()"
                >
                  Submit
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</div>
</template>

<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted } from "vue";
import { Dialog, DialogPanel, DialogTitle, TabGroup, TransitionChild, TransitionRoot } from "@headlessui/vue";

const tables = ref("");
const tableArray = ref([]);
const email = ref("");
const boardName = ref("");
const open = ref(false);

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
  tables.value = data[0].tableName;
  tableArray.value = tables.value.split(",");
  console.log(tableArray.value.length);
}

async function newTable(){
  tableArray.value.push(boardName.value);
  var string = "";
  for (let i = 0; i < tableArray.value.length; i++) {
  string += tableArray.value[i] + ",";
}

  console.log(string)
  const { error } = await supabase.from("boards").update({tableName: string}).eq("email", email.value);
  boardName.value = "";
  open.value = false;
}
</script>
