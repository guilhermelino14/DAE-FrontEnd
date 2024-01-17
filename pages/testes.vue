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
                                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Criar Observações</h3>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path
                                            d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" v-model="sensor_id"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Sensor id" required>
                            </div>
                            <button @click="searchSensor()"
                                class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </div>
                        <div v-if="sensorNotFound">
                            Sensor não encontrado
                        </div>
                        <div v-if="sensor != ''" class="pt-3">
                            <div class="col-span-12">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo
                                    de sensor</label>
                                <input type="text" name="nome" disabled :value="sensor.data.typeOfSensor"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            </div>

                            <div
                                class="mt-10 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
                                <div class=" marker:flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Observações</h3>
                                </div>

                                <div v-show="sensor.data.observacoes == ''">
                                    Sem observações
                                </div>
                                <ol class="relative border-l border-gray-200 dark:border-gray-700">
                                    <li class="mb-10 ml-4" v-for="observacao in sensor.data.observacoes">
                                        <div
                                            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-800 dark:bg-gray-700">
                                        </div>
                                        <time
                                            class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{
                                                formatDate(observacao.data) }}</time>
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{
                                            observacao.observacao }}</h3>
                                    </li>
                                </ol>
                            </div>
                            <div class="flex items-center pt-4">
                                <label for="simple-search" class="sr-only">Create nova observacao</label>
                                <div class="relative w-full">
                                    <input type="text" id="simple-search" v-model="new_observacao"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Escrever uma nova observação" required>
                                </div>
                                <button @click="createObservacao()"
                                    class="p-2.5 ms-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                    <span class="sr-only">Search</span>
                                </button>
                            </div>
                        </div>


                    </div>

                    <div
                        class="p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <!-- Card header -->
                        <div class="items-center justify-between lg:flex">
                            <div class="mb-4 lg:mb-0">
                                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Criar Nova Encomenda</h3>
                            </div>
                        </div>


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

const sensor_id = ref('')
const sensor = ref('')
const sensorNotFound = ref(false)
const new_observacao = ref('')
definePageMeta({
    layout: ''
})

onMounted(() => {
    initFlowbite();
})

// const { data: sensor, error, refresh } = await useFetch(`${api}/sensores/`+sensor_id.value, { headers: { "Authorization": `Bearer ${authStore.token}` } })

// on click search sensor with id
const searchSensor = async () => {
    const data = await useFetch(`${api}/sensores/` + sensor_id.value, { headers: { "Authorization": `Bearer ${authStore.token}` } })
    if (data.data.value == null) {
        sensorNotFound.value = true
        sensor.value = ''
    } else {
        sensorNotFound.value = false
        sensor.value = data
    }
}

const createObservacao = async () => {
    await useFetch(`${api}/observacoes/`, { headers: { "Authorization": `Bearer ${authStore.token}` } })
    const response = await useFetch(`${api}/observacoes/`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${authStore.token}` },
            body: {
                "observacao": new_observacao.value,
                "sensor": sensor_id.value},
        });
    if (response.status.value === "success") {
        searchSensor()
    }
}

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


</script>