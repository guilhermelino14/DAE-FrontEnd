<template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
    <!-- Card header -->
    <div class="items-center justify-between lg:flex">
      <div class="mb-4 lg:mb-0">
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Encomendas</h3>
      </div>
    </div>

    <div class="items-center justify-between block sm:flex" >
      <div>
        <select id="default" @change="changeEncomendas" v-model="encomendaFilter"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="ALL" selected>ALL</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="PARA_RECOLHA">A ESPERA DE RECOLHA</option>
          <option value="RECOLHIDA">RECOLHIDA</option>
          <option value="EM_TRANSITO">EM TRANSITO</option>
          <option value="ENTREGUE">ENTREGUE</option>
          <option value="CANCELADA">CANCELADA</option>
        </select>
      </div>
      <div class="pl-2" style="justify-content: right;">
        <button @click="exportEncomendaCSV()"
          class="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button">
          <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
          </svg>
          Exportar Encomendas CSV
        </button>
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <div class="overflow-x-auto rounded-lg">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden shadow sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    Numero da encomenda
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    Date & Time
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    Amount
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    Localização
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    Status
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800">
                <tr v-show="encomendas == ''">
                  <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white" colspan="3">
                    Não existem encomendas
                  </td>
                </tr>
                <tr v-for="(encomenda, index) in encomendas">
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
                    style="text-align-last: center;">
                    {{ encomenda.id }}
                  </td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {{ formatDate(encomenda.data) }}
                  </td>
                  <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                    $2300
                  </td>

                  <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                    {{ encomenda.localizacao }}
                  </td>
                  <td class="p-4 whitespace-nowrap">
                    <span
                      class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500"
                      v-show="encomenda.status == 'ENTREGUE'">{{ encomenda.status }}</span>
                    <span
                      class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500"
                      v-show="encomenda.status == 'PARA_RECOLHA'">A ESPERA DE RECOLHA</span>
                    <span
                      class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400"
                      v-show="encomenda.status == 'RECOLHIDA'">RECOLHIDA</span>
                    <span
                      class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-yellow-100 dark:border-yellow-400 dark:bg-gray-700 dark:text-yellow-400"
                      v-show="encomenda.status == 'EM_TRANSITO'">EM TRANSITO</span>
                    <span
                      class="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-orange-100 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300"
                      v-show="encomenda.status == 'PENDENTE'">{{ encomenda.status }}</span>
                    <span
                      class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-red-100 dark:border-red-400 dark:bg-gray-700 dark:text-red-400"
                      v-show="encomenda.status == 'CANCELADA'">{{ encomenda.status }}</span>
                  </td>
                  <td class="p-4 whitespace-nowrap text-center">
                    <NuxtLink :to="`/fabricante/encomendasCrud/${encomenda.id}`">
                      <button type="button" :data-tooltip-target="index"
                        class="inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
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
import { initFlowbite } from 'flowbite'
const authStore = useAuthStore()
const toast = useToast()
const encomendaFilter = ref('ALL')

const config = useRuntimeConfig()
const api = config.public.API_URL
const { data: encomendas, error, refresh } = await useFetch(`${api}/fabricante/encomendas/`, { headers: { "Authorization": `Bearer ${authStore.token}` } })


onMounted(() => {
  initFlowbite()
})

definePageMeta({
  layout: 'fabricante',
  middleware: 'fabricante',
})

function formatDate(date) {
  const d = new Date(date)
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
  return `${da}/${mo}/${ye}`
}

const exportEncomendaCSV = async () => {
  const response = await useFetch(`${api}/csv/encomendas`, {
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
  link.download = 'encomendas.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

const changeEncomendas = async () => {
    await refresh()
    // get the encomendaFilter
    const filter = encomendaFilter.value
    // if the filter is not all then filter the encomendas
    if (filter != 'ALL') {
        encomendas.value = encomendas.value.filter((encomenda) => encomenda.status == filter)
    }
    else {
        refresh()
    }

}
</script>