<template>
    <div>
      <NavBar></NavBar>
      <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50  dark:bg-gray-900">
          <main style="height: 100vh;">
            <div class="px-4 pt-6">
              <slot />
            </div>
          </main>
          <!-- footer -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { initFlowbite } from 'flowbite'
  import NavBar from '../components/operadorLayout/topBar.vue'
  onMounted(() => {
    initFlowbite();
  })
  </script>
  