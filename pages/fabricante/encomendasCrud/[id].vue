<template>
    <div
        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 pb-2 mb-3">
        <NuxtLink to="/fabricante">
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
            <div class="col-span-12">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localização</label>
                <input type="text" name="nome" v-model="encomenda.localizacao" disabled
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
        </div>
        <div class="grid grid-cols-12 pt-4">
            <div class="col-span-12  md:col-span-6 p-1" v-if="encomenda.status == 'PENDENTE'">
                <button @click="cancelarEncomenda(encomenda.id)" type="button"
                    class="h-full w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar
                    Encomenda</button>
            </div>
            <div class="col-span-12 md:col-span-6 p-1" v-if="encomenda.status == 'PENDENTE'">
                <button @click="confirmarEncomenda(encomenda.id)" type="button"
                    class="h-full w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Confirmar
                    Encomenda</button>
            </div>
        </div>
    </div>
    <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Embalagens de produto</h3>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pt-4 pb-6" v-for="embalagensProduto in encomenda.embalagensProduto">
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
                                {{ embalagensProduto.nome }}
                            </p>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                                Altura: {{ embalagensProduto.altura }}cm
                            </p>
                        </div>
                        <div class="flex-1 min-w-0">
                            Largura: {{ embalagensProduto.largura }}cm
                        </div>
                        <div class="flex-0 min-w-0">
                            <nuxt-link :to="'/fabricante/embalagensCrud/' + embalagensProduto.id">
                                <button type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                    </svg>
                                    <span class="sr-only">Icon description</span>
                                </button>
                            </nuxt-link>
                        </div>


                        <!-- <div class="flex-1 min-w-0">
                            <EditEmbalagemModal :id="produto.referencia"></EditEmbalagemModal>
                        </div> -->
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800" v-show="encomenda.embalagensTransporte != ''">
        <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Embalagens de Transporte</h3>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pt-4 pb-6" v-for="embalagemTransporte in encomenda.embalagensTransporte">
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
                                {{ embalagemTransporte.nome }}
                            </p>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                                Altura: {{ embalagemTransporte.altura }}cm
                            </p>
                        </div>
                        <div class="flex-1 min-w-0">
                            Largura: {{ embalagemTransporte.largura }}cm
                        </div>
                        <!-- <div class="flex-1 min-w-0">
                            <EditEmbalagemModal :id="produto.referencia"></EditEmbalagemModal>
                        </div> -->
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div
        class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Observações</h3>
        </div>

        <div v-show="observacoes == ''">
                    Sem observações
                </div>
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-4" v-for="observacao in observacoes">
                <div
                    class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-800 dark:bg-gray-700">
                </div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ formatDateObservacoes(observacao.data) }}</time>
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

const { data: observacoes, error:error1, refresh:refresh1 } = await useFetch(`${api}/encomendas/${id}/observacoes`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

useFetch(`${api}/encomendas/${id}`, { headers: { "Authorization": `Bearer ${authStore.token}` } }).then((res) => {
    if (res.data.value == null) {
        toast.error('Essa encomenda não existe!')
        navigateTo('/fabricante/encomendas')
    }
})
onMounted(() => {
})

function formatDate(date) {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${da}/${mo}/${ye}`
}
function formatDateObservacoes(date) {
    const d = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    const ho = new Intl.DateTimeFormat('pt', { hour: '2-digit' }).format(d)
    const mi = new Intl.DateTimeFormat('pt', { minute: '2-digit' }).format(d)
    const se = new Intl.DateTimeFormat('pt', { second: '2-digit' }).format(d)
    return `${da} ${mo} ${ye} -- ${ho}:${mi}:${se}`
}

const confirmarEncomenda = async (id) => {
    const { data, error } = await useFetch(`${api}/encomendas/${id}/status/PARA_RECOLHA`, {
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