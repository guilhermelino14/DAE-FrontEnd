<template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
    <!-- Card header -->
    <div class="items-center justify-between lg:flex">
      <div class="mb-4 lg:mb-0">
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Embalagens dos produtos</h3>
      </div>
    </div>



    <NewEmbalagem @refresh="refresh"></NewEmbalagem>

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
                    Nome
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    altura
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                    largura
                  </th>
                  <th scope="col"
                    class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-white">
                    ações
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800">
                <tr v-show="embalagens == ''">
                  <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white" colspan="3">
                    Não existem embalagens de produto
                  </td>
                </tr>
                <tr v-for="(embalagem, index) in embalagens">
                  <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                    {{ embalagem.nome }}
                  </td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {{ embalagem.altura }}
                  </td>
                  <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                    {{ embalagem.largura }}
                  </td>
                  <td class="p-4 whitespace-nowrap text-center">
                    <NuxtLink :to="`/fabricante/embalagensCrud/${embalagem.id}`">
                      <button type="button" :data-tooltip-target="index"
                        class="py-1.5 px-3 inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
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
                    <button type="button" :data-tooltip-target="index + 'eliminar'" :data-modal-target="`delete-modal-`+embalagem.id"
                      :data-modal-toggle="`delete-modal-`+embalagem.id"
                      class="ml-2 py-1.5 px-3 inline-flex items-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-700">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                      </svg>
                    </button>

                    <DeleteUserModal :message="'Tens a certeza de que deseja eliminar esta encomenda?'"
                     :id="embalagem.id" @confirmedDelete="deleteEmbalagem" />

                    <div :id="index + 'eliminar'" role="tooltip"
                      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                      Eliminar Embalagem
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
import NewEmbalagem from '~/pages/fabricante/embalagensCrud/new-embalagem.vue'
import DeleteUserModal from '~/components/delete-modal.vue'
import { useToast } from 'vue-toastification'
import { initFlowbite } from 'flowbite'
const authStore = useAuthStore()
const toast = useToast()

const config = useRuntimeConfig()
const api = config.public.API_URL
const { data: embalagens, error, refresh } = await useFetch(`${api}/embalagensProduto/`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

const deleteEmbalagem = async (id) => {
  try {
    const response = await useFetch(`${api}/embalagensProduto/${id}`, {
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
  initFlowbite();
})

onMounted(() => {
  initFlowbite()
})

definePageMeta({
  layout: 'fabricante',
  middleware: 'fabricante',
})
</script>