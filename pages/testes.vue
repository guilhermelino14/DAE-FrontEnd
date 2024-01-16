<template>
    <div>
        <div class="flex pt-5 overflow-hidden bg-gray-50 dark:bg-gray-900">
            <div id="main-content"
                class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-10 lg:mr-10 dark:bg-gray-900">
                <main style="height: 120vh;">
                    <div
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <!-- Card header -->
                        <div class="items-center justify-between lg:flex">
                            <div class="mb-4 lg:mb-0">
                                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Testes</h3>
                            </div>
                        </div>
                        {{ sensoresInUse }}

                    </div>
                </main>
                <!-- footer -->
            </div>
        </div>

    </div>
</template>
<script setup>
import { useAuthStore } from "~/store/auth-store.js"
import { initFlowbite } from 'flowbite'
const authStore = useAuthStore()
const config = useRuntimeConfig()
const api = config.public.API_URL
definePageMeta({
    layout: ''
})

onMounted(() => {
    initFlowbite();
})

const { data: sensoresInUse, error, refresh } = await useFetch(`${api}/sensores/inUse`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

</script>