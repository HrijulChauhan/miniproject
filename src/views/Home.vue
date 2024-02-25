<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted } from "vue";

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

const todo = ref([]);
const progress = ref([]);
const review = ref([]);
const archive = ref([]);

const open = ref(false);

async function getTodo() {
  const { data } = await supabase.from("tasks").select().eq("tag", "todo");
  todo.value = data;

  todo.value.forEach((element) => {
    var regexDate = new Date(element.created_at).toString();
    regexDate = regexDate.match(/\b[A-Za-z]{3}\s([A-Za-z]{3}\s\d{2})\b/);

    element.created_at = regexDate[1];
  });
}

async function getProgress() {
  const { data } = await supabase.from("tasks").select().eq("tag", "progress");
  progress.value = data;

  progress.value.forEach((element) => {
    var regexDate = new Date(element.created_at).toString();
    regexDate = regexDate.match(/\b[A-Za-z]{3}\s([A-Za-z]{3}\s\d{2})\b/);

    element.created_at = regexDate[1];
  });
}

async function getReview() {
  const { data } = await supabase.from("tasks").select().eq("tag", "review");
  review.value = data;

  review.value.forEach((element) => {
    var regexDate = new Date(element.created_at).toString();
    regexDate = regexDate.match(/\b[A-Za-z]{3}\s([A-Za-z]{3}\s\d{2})\b/);

    element.created_at = regexDate[1];
  });
}

async function getArchive() {
  const { data } = await supabase.from("tasks").select().eq("tag", "archive");
  archive.value = data;

  archive.value.forEach((element) => {
    var regexDate = new Date(element.created_at).toString();
    regexDate = regexDate.match(/\b[A-Za-z]{3}\s([A-Za-z]{3}\s\d{2})\b/);

    element.created_at = regexDate[1];
  });
}

onMounted(() => {
  getTodo();
  getProgress();
  getReview();
  getArchive();
});

const title = ref("");
const tag = ref("");
const severity = ref("");

async function newIssue() {
  const { error } = await supabase.from("tasks").insert({ title: title.value, tag: tag.value, severity: severity.value });
  if (error) {
    console.log(error);
  } else {
    open.value = false;
    title.value = "";
    tag.value = "";
    severity.value = "";
    getTodo();
    getProgress();
    getReview();
    getArchive();
  }
}
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <!-- left side bar -->
    <section class="w-[15vw] border-r bg-slate-100 px-8 py-4 pt-8">
      <img src="https://imgur.com/euNkdrX.png" alt="" class="w-12" />
      <nav class="mt-8">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-600">Issues</h2>

        <div class="-mx-3 mt-2">
          <a href="#" class="py-2 flex items-center justify-between rounded-md bg-gray-200 px-3">
            <span class="text-sm font-medium">All</span>
            <span class="text-xs font-semibold text-gray-900">36</span>
          </a>
        </div>

        <div class="-mx-3 mt-2">
          <a href="#" class="py-2 flex items-center justify-between rounded-md px-3 text-gray-700">
            <span class="text-sm font-medium">Assigned to me</span>
            <span class="text-xs font-semibold">2</span>
          </a>
        </div>

        <div class="-mx-3 mt-2">
          <a href="#" class="py-2 flex items-center justify-between rounded-md px-3 text-gray-700">
            <span class="text-sm font-medium">Created by me</span>
            <span class="text-xs font-semibold">4</span>
          </a>
        </div>

        <div class="-mx-3 mt-2">
          <a href="#" class="py-2 flex items-center justify-between rounded-md px-3 text-gray-700">
            <span class="text-sm font-medium">Archived</span>
          </a>
        </div>
      </nav>
    </section>

    <section class="w-[85vw]">
      <div class="text-gray-600 pl-8 pt-8">Projects / Grand Budapest</div>
      <main class="flex justify-between pb-4">
        <h2 class="text-gray-700 font-semibold text-3xl pl-8">Board</h2>
        <!-- weird thing I found -->
        <!-- if a button is not wrapped around another parent container, in flex it will take up the height of parent component -->
        <button class="bg-blue-600 text-sm font-medium text-white px-6 rounded mr-8" @click="open = true">+ New Issue</button>
      </main>
      <!-- tasks -->

      <!-- {{ todo }} <br />
      {{ progress }} <br />
      {{ review }} <br />
      {{ archive }} -->
      <main class="px-8 flex w-full">
        <div class="p-3 w-[20vw] bg-gray-100 h-screen rounded overflow-auto todo">
          <h3 class="font-semibold text-gray-900 text-sm">To do</h3>

          <ul class="mt-2">
            <li class="pb-3" v-for="task in todo">
              <a href="#" class="block p-3 bg-white rounded shadow">
                <div class="flex justify-between">
                  <p class="text-sm">{{ task.title }}</p>
                  <p class="text-base -mt-2">...</p>
                </div>

                <div class="text-xs text-gray-500 pt-1">{{ task.created_at }}</div>

                <div class="flex justify-between">
                  <div
                    class="text-sm pt-4 font-semibold"
                    :class="{
                      'text-green-600': task.severity == 'easy',
                      'text-orange-400': task.severity === 'medium',
                      'text-red-500': task.severity == 'severe',
                    }"
                  >
                    {{ task.severity }}
                  </div>
                  <img src="https://imgur.com/F5iA6w0.png" alt="" class="mt-1 h-8 rounded-full" />
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="ml-6 p-3 w-[20vw] bg-gray-100 h-screen rounded overflow-auto todo">
          <h3 class="font-semibold text-gray-900 text-sm">In progress</h3>

          <ul class="mt-2">
            <li class="pb-3" v-for="task in progress">
              <a href="#" class="block p-3 bg-white rounded shadow">
                <div class="flex justify-between">
                  <p class="text-sm">{{ task.title }}</p>
                  <p class="text-base -mt-2">...</p>
                </div>

                <div class="text-xs text-gray-500 pt-1">{{ task.created_at }}</div>

                <div class="flex justify-between">
                  <div
                    class="text-sm pt-4 font-semibold"
                    :class="{
                      'text-green-600': task.severity == 'easy',
                      'text-orange-400': task.severity === 'medium',
                      'text-red-500': task.severity == 'severe',
                    }"
                  >
                    {{ task.severity }}
                  </div>

                  <img src="https://imgur.com/F5iA6w0.png" alt="" class="mt-1 h-8 rounded-full" />
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="ml-6 p-3 w-[20vw] bg-gray-100 h-screen rounded overflow-auto todo">
          <h3 class="font-semibold text-gray-900 text-sm">to be reviewed</h3>

          <ul class="mt-2">
            <li class="pb-3" v-for="task in review">
              <a href="#" class="block p-3 bg-white rounded shadow">
                <div class="flex justify-between">
                  <p class="text-sm">{{ task.title }}</p>
                  <p class="text-base -mt-2">...</p>
                </div>

                <div class="text-xs text-gray-500 pt-1">{{ task.created_at }}</div>

                <div class="flex justify-between">
                  <div
                    class="text-sm pt-4 font-semibold"
                    :class="{
                      'text-green-600': task.severity == 'easy',
                      'text-orange-400': task.severity === 'medium',
                      'text-red-500': task.severity == 'severe',
                    }"
                  >
                    {{ task.severity }}
                  </div>

                  <img src="https://imgur.com/F5iA6w0.png" alt="" class="mt-1 h-8 rounded-full" />
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="ml-6 p-3 w-[20vw] bg-gray-100 h-screen rounded overflow-auto todo">
          <h3 class="font-semibold text-gray-900 text-sm">In archived</h3>

          <ul class="mt-2">
            <li class="pb-3" v-for="task in archive">
              <a href="#" class="block p-3 bg-white rounded shadow">
                <div class="flex justify-between">
                  <p class="text-sm">{{ task.title }}</p>
                  <p class="text-base -mt-2">...</p>
                </div>

                <div class="text-xs text-gray-500 pt-1">{{ task.created_at }}</div>

                <div class="flex justify-between">
                  <div
                    class="text-sm pt-4 font-semibold"
                    :class="{
                      'text-green-600': task.severity == 'easy',
                      'text-orange-400': task.severity === 'medium',
                      'text-red-500': task.severity == 'severe',
                    }"
                  >
                    {{ task.severity }}
                  </div>

                  <img src="https://imgur.com/F5iA6w0.png" alt="" class="mt-1 h-8 rounded-full" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </section>
  </div>

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
              <h2 class="text-center mb-2 text-lg">New Issue</h2>

              <label for="" class="text-xs text-black font-medium">Title</label> <br />
              <input type="text" v-model="title" name="name" placeholder="Bug Fix #1148a" id="" class="border-gray-300 border-2 w-full rounded text-sm px-2 py-2 mb-2" /> <br />

              <label for="" class="text-xs text-black font-medium mt-4">Tag</label> <br />
              <select v-model="tag" class="border-2 border-gray-300 w-full px-2 py-2 rounded mb-2">
                <option disabled value="">please select one</option>
                <option>todo</option>
                <option>progress</option>
                <option>review</option>
                <option>archive</option>
              </select>

              <label for="" class="text-xs text-black font-medium mt-4">Severity</label> <br />
              <select v-model="severity" class="border-2 border-gray-300 w-full px-2 py-2 rounded mb-2">
                <option disabled value="">please select one</option>
                <option>easy</option>
                <option>medium</option>
                <option>severe</option>
              </select>

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
                  @click="newIssue()"
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
</template>

<style>
.todo::-webkit-scrollbar {
  display: none;
}
/* 
.left{
  flex: 1 2 auto
} */
</style>
