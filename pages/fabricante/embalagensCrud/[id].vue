<template>
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 mb-3">
        <div class="grid grid-cols-12 border-b border-s-white ">
            <div class="col-span-12 md:col-span-1 sm:col-span-2">
                <NuxtLink to="/fabricante/embalagens">
                    <button type="button"
                        class="mb-2 py-1.5 px-3 inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                        </svg>
                    </button>
                </NuxtLink>
            </div>
            <div class="col-span-12 md:col-span-11 sm:col-span-10">
                <!-- Card header -->
                <div class="items-center justify-between lg:flex">
                    <div class="mb-4 lg:mb-0">
                        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{{ embalagem.nome }}</h3>
                    </div>
                </div>
                
            </div>
        </div>
        {{ embalagem.altura }}
                {{ embalagem.largura }}
    </div>
    <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Sensores Associados</h3>
            <p class="text-xs" v-show="embalagem.sensores == ''">Sem sensores Associados</p>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pt-4 pb-4" v-for="sensor in embalagem.sensores">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                                <path
                                    d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                                {{ sensor.nome }}
                            </p>
                            <p class="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                {{ sensor.descricao }}
                            </p>
                        </div>
                        <div class="inline-flex items-center">
                            <a href="#" @click="desassociar(sensor.id)"
                                class="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-white-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-red-600 dark:text-white-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Desasociar </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Sensores Disponiveis</h3>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pt-4 pb-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                                <path
                                    d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                                {{ sensor.nome }}
                            </p>
                            <p class="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                {{ sensor.descricao }}
                            </p>
                        </div>
                        <div class="inline-flex items-center">
                            <a href="#" @click="desassociar(sensor.id)"
                                class="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-white-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-green-600 dark:text-white-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> Associar </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div> -->
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

const { data: embalagem, error, refresh } = await useFetch(`${api}/embalagensProduto/${id}`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

const desassociar = async (sensorID) => {
    await useFetch(`${api}/embalagensProduto/${id}/sensor/${sensorID}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${authStore.token}` }
    }).then(() => {
        toast.success('Sensor desassociado com sucesso!')
        refresh()
    }).catch(() => {
        toast.error('Erro ao desassociar sensor!')
    })
}

definePageMeta({
    layout: 'fabricante',
    middleware: 'fabricante',
})
</script>
