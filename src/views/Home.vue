<script setup>
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted } from "vue";

const todo = ref([]);
const progress = ref([]);
const review = ref([]);
const archive = ref([]);

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
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden">
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

    <section>
      <div class="px-8 py-4 pt-8 w-[85vw]">
        <div class="text-gray-600">Projects / Grand Budapest</div>
        <h2 class="text-gray-700 font-semibold text-3xl">Board</h2>
      </div>

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
                  <div class= "text-sm  pt-4 font-semibold" :class="{'text-green-600' : task.severity=='easy', 'text-orange-400': task.severity === 'medium', 'text-red-500': task.severity=='severe' }">{{ task.severity }}</div>
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
                  <div class= "text-sm  pt-4 font-semibold" :class="{'text-green-600' : task.severity=='easy', 'text-orange-400': task.severity === 'medium', 'text-red-500': task.severity=='severe' }">{{ task.severity }}</div>

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
                  <div class= "text-sm  pt-4 font-semibold" :class="{'text-green-600' : task.severity=='easy', 'text-orange-400': task.severity === 'medium', 'text-red-500': task.severity=='severe' }">{{ task.severity }}</div>

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
                  <div class= "text-sm  pt-4 font-semibold" :class="{'text-green-600' : task.severity=='easy', 'text-orange-400': task.severity === 'medium', 'text-red-500': task.severity=='severe' }">{{ task.severity }}</div>

                  <img src="https://imgur.com/F5iA6w0.png" alt="" class="mt-1 h-8 rounded-full" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </section>
  </div>
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
