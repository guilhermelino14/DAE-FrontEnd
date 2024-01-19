<template>
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <!-- Card header -->
        <div class="items-center justify-between lg:flex">
            <div class="mb-4 lg:mb-0">
                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Sensores</h3>
            </div>
        </div>



        <div class="items-center justify-between block sm:flex " style="justify-content: right;">
            <div>
                <button @click="importSensorCSV()"
                    class="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button">
                    <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                    </svg>
                    Importar Sensores CSV
                </button>
            </div>
            <div>
                <button @click="exportSensorCSV()"
                    class="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button">
                    <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                    </svg>
                    Exportar Sensores CSV
                </button>
            </div>
            <div class="pl-2">
                <NuxtLink to="/fabricante/sensoresCrud/new-sensor">
                    <button
                        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button">
                        <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 1v16M1 9h16" />
                        </svg>
                        Criar Sensor
                    </button>
                </NuxtLink>
            </div>
        </div>

        <!-- Table -->
        <div class="flex flex-col mt-6">
            <div class="overflow-x-auto rounded-lg">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden shadow sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col"
                                        class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                        id
                                    </th>
                                    <th scope="col"
                                        class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                        Tipo de Sensor
                                    </th>
                                    <th scope="col"
                                        class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-white">
                                        ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800">
                                <tr v-show="sensores == ''">
                                    <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white"
                                        colspan="3">
                                        Não existem sensores
                                    </td>
                                </tr>
                                <tr v-for="(sensor, index) in sensores">
                                    <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ sensor.id }}
                                    </td>
                                    <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        {{ sensor.typeOfSensor }}
                                    </td>
                                    <td class="p-4 whitespace-nowrap text-center">
                                        <NuxtLink :to="`/fabricante/sensoresCrud/${sensor.id}`">
                                            <button type="button" :data-tooltip-target="index"
                                                class="py-1.5 px-3 inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
                                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                    viewBox="0 0 20 14">
                                                    <path
                                                        d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                </svg>
                                            </button>
                                        </NuxtLink>
                                        <div :id="index" role="tooltip"
                                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                            Ver Detalhes
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button type="button" :data-tooltip-target="index + 'eliminar'"
                                            :data-modal-target="`delete-modal-` + sensor.id"
                                            :data-modal-toggle="`delete-modal-` + sensor.id"
                                            class="ml-2 py-1.5 px-3 inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
                                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                                            </svg>
                                        </button>

                                        <DeleteUserModal :message="'Tens a certeza de que deseja eliminar este sensor?'"
                                            :id="sensor.id" @confirmedDelete="deleteSensor" />

                                        <div :id="index + 'eliminar'" role="tooltip"
                                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                            Eliminar Sensor
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from "~/store/auth-store.js"
import { useToast } from 'vue-toastification'
import DeleteUserModal from '~/components/delete-modal.vue'
import { initFlowbite } from 'flowbite';
const authStore = useAuthStore()
const toast = useToast()

const config = useRuntimeConfig()
const api = config.public.API_URL
const { data: sensores, error, refresh } = await useFetch(`${api}/sensores/`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

const deleteSensor = async (id) => {
    try {
        const response = await useFetch(`${api}/sensores/${id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${authStore.token}` },
        });
        if (response.status.value === "success") {
            toast.success("Sucesso")
            refresh()
        }
        if (response.status.value === "error") {
            toast.error("Erro")
        }
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    initFlowbite()
})

definePageMeta({
    layout: 'fabricante',
    middleware: 'fabricante',
})

const exportSensorCSV = async () => {
    const response = await useFetch(`${api}/csv/sensores`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${authStore.token}` },
    });
    if (response.status.value !== "success") {
        toast.error("Erro ao exportar sensores")
        return
    }
    const string = await response.data.value
    const link = document.createElement('a');
    const file = new Blob([string], { type: 'text/csv' });
    link.href = URL.createObjectURL(file);
    link.download = 'sensores.csv';
    link.click();
    URL.revokeObjectURL(link.href);
}

const importSensorCSV = async () => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.csv';
    file.click();
    file.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const lines = text.split('\n');
            lines.shift();
            const csv = lines.join('\n');
            const newFile = new Blob([csv], { type: 'text/csv' });
            const response = await useFetch(`${api}/csv/sensores`, {
                method: 'POST',
                headers: { 
                    "Authorization": `Bearer ${authStore.token}`,
                    "Content-Type": "text/plain"},
                body: newFile
            });
            if (response.status.value !== "success") {
                toast.error("Erro ao importar sensores")
                return
            }
            toast.success("Sucesso")
            refresh()
        };
        reader.readAsText(file);
    });
    
}
</script>