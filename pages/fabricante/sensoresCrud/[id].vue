<template>
    <div
        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 pb-2 mb-3">
        <NuxtLink to="/fabricante/sensores">
            <button type="button"
                class="mb-2 py-1.5 px-3 inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                </svg>
            </button>
        </NuxtLink>
        <!-- Card header -->
        <div class="items-center justify-between lg:flex">
            <div class="mb-4 lg:mb-0">
                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Sensores</h3>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-6">
            <div class="col-span-1">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do
                    sensor</label>
                <input type="text" name="nome" v-model="sensor.nome" disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
            <div class="col-span-1">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de
                    sensor</label>
                <input type="text" name="nome" v-model="sensor.descricao" disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
        </div>
    </div>
    <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Observações</h3>
        </div>

        <div v-show="sensor.observacoes == ''">
                    Sem observações
                </div>
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-4" v-for="observacao in sensor.observacoes">
                <div
                    class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-800 dark:bg-gray-700">
                </div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ formatDate(observacao.data) }}</time>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ observacao.observacao }}</h3>
            </li>
        </ol>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from "~/store/auth-store.js"
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const toast = useToast()

const config = useRuntimeConfig()
const api = config.public.API_URL

const route = useRoute()
const id = route.params.id

const { data: sensor, error, refresh } = await useFetch(`${api}/sensores/${id}`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

useFetch(`${api}/sensores/${id}`, { headers: { "Authorization": `Bearer ${authStore.token}` } }).then((response) => {
    if(response.data.value == null){
        toast.error("Sensor não existe")
        navigateTo('/fabricante/sensores')
    }
})
function formatDate(date) {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    const ho = new Intl.DateTimeFormat('pt', { hour: '2-digit' }).format(d)
    const mi = new Intl.DateTimeFormat('pt', { minute: '2-digit' }).format(d)
    const se = new Intl.DateTimeFormat('pt', { second: '2-digit' }).format(d)
    return `${da} ${mo} ${ye} -- ${ho}:${mi}:${se}`
}

definePageMeta({
    layout: 'fabricante',
    middleware: 'fabricante',
})
</script>
