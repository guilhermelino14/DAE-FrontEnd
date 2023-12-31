<template>
    <div
        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 pb-2 mb-3">
        <NuxtLink to="/fabricante/encomendas">
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
                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Encomenda</h3>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-6 pt-2">
            <div class="col-span-12">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
                <input type="text" name="nome" :value="formatDate(encomenda.data)" disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>

            <div class="col-span-12">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <input type="text" name="nome" v-model="encomenda.status" disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
        </div>
        <div class="grid grid-cols-12 pt-4">
            <div class="col-span-12  md:col-span-6 p-1">
                <button @click="cancelarEncomenda(encomenda.id)" type="button" class="h-full w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar Encomenda</button>
            </div>
            <div class="col-span-12 md:col-span-6 p-1">
                <button @click="confirmarEncomenda(encomenda.id)" type="button" class="h-full w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Confirmar Encomenda</button>
            </div>
        </div>
    </div>
    <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Produtos</h3>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pt-4 pb-6" v-for="produto in encomenda.produtosFisicos">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 10h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H17M1 10v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M1 10l2-9h12l2 9" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                                Referencia: {{ produto.referencia }}
                            </p>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                                Nome: {{ produto.produto.nome }}
                            </p>
                        </div>
                        <div class="flex-1 min-w-0">
                            <EditEmbalagemModal :id="id"></EditEmbalagemModal>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from "~/store/auth-store.js"
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import EditEmbalagemModal from '~/pages/fabricante/encomendasCrud/edit-embalagens.vue'
const authStore = useAuthStore()
const toast = useToast()

definePageMeta({
    middleware: 'fabricante',
    layout: 'fabricante'
})
const data = ref(null)
const config = useRuntimeConfig()
const api = config.public.API_URL

const route = useRoute()
const id = route.params.id

const { data: encomenda, error, refresh } = await useFetch(`${api}/encomendas/${id}`, { headers: { "Authorization": `Bearer ${authStore.token}` } })
console.log(encomenda)

function formatDate(date) {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${da}/${mo}/${ye}`
}

const confirmarEncomenda = async (id) => {
    const { data, error } = await useFetch(`${api}/encomendas/${id}/status/CONFIRMACAO`, {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${authStore.token}` }
    })
    if (data) {
        toast.success('Encomenda confirmada com sucesso!')
        refresh()
    }
}

const cancelarEncomenda = async (id) => {
    const { data, error } = await useFetch(`${api}/encomendas/${id}/status/CANCELADA`, {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${authStore.token}` }
    })
    if (data) {
        toast.success('Encomenda cancelada com sucesso!')
        refresh()
    }
}
</script>