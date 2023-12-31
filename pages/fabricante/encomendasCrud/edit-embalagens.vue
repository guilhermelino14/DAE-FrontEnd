<template>
    <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
        style="justify-content: right;">

        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button" aria-controls="edit-embalagens-modal" data-modal-target="edit-embalagens-modal"
            data-modal-toggle="edit-embalagens-modal">
            Embalagens
        </button>
    </div>


    <div id="edit-embalagens-modal"
        class="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full">

        <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 class="text-xl font-semibold dark:text-white">
                        Adicionar Embalagem ao Produto Fisico
                    </h3>

                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                        data-modal-toggle="edit-embalagens-modal">
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-12 sm:col-span-6">
                            <label for="countries"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adicionar
                                Embalagem</label>
                        </div>
                        <div class="col-span-12 sm:col-span-3">
                            <select id="countries" v-model="embalagemSelected"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Escolha a embalagem</option>
                                <option v-for="embalagem in embalagensNaoAssociadas" :value="embalagem.id">{{ embalagem.nome }}</option>
                            </select>
                        </div>
                        <div class="col-span-12 sm:col-span-3">
                            <button type="button" @click="associar(embalagemSelected)"
                                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-green">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m-6-4v8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-12 sm:col-span-12">
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                    <thead
                                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Embalagem nome
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Altura
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Largura
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="embalagem in embalagemsAssociads" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {{embalagem.nome}}
                                            </th>
                                            <td class="px-6 py-4">
                                                {{embalagem.altura}}
                                            </td>
                                            <td class="px-6 py-4">
                                                {{embalagem.largura}}
                                            </td>
                                            <td class="px-6 py-4 text-right">
                                                <a href="#" @click="remover(embalagem.id)"
                                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Remover</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, defineProps } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from "~/store/auth-store.js"
const authStore = useAuthStore()


const props = defineProps(['id'])

const emit = defineEmits(['refresh'])
const loading = ref(false)
const toast = useToast()
const config = useRuntimeConfig()
const api = config.public.API_URL

const { data: embalagens, error: error1, refresh: refresh1 } = await useFetch(`${api}/embalagensProduto/`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

const { data: embalagemsAssociads, error, refresh} = await useFetch(`${api}/produtos/${props.id}/embalagens`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

const embalagensNaoAssociadas = computed(()=>{
    return embalagens.value.filter(embalagem => {
        return !embalagemsAssociads.value.some(embalagemAssociada => embalagemAssociada.id === embalagem.id)
    })
})

const embalagemSelected = ref(0)

const associar = async(embalagemId) => {
    if(embalagemId < 1) return
    loading.value = true
    try {
        const response = await useFetch(`${api}/produtos/${props.id}/embalagens/${embalagemId}`, {
            method: 'PATCH',
            headers: { "Authorization": `Bearer ${authStore.token}` }
        });
        if (response.status.value === "success") {
            toast.success("Sucesso")
            refresh()
            refresh1()
        }
        if (response.status.value === "error") {
            toast.error("Erro")
        }
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

const remover = async(embalagemId) => {
    loading.value = true
    try {
        const response = await useFetch(`${api}/produtos/${props.id}/embalagens/${embalagemId}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${authStore.token}` }
        });
        if (response.status.value === "success") {
            toast.success("Sucesso")
            refresh()
            refresh1()
        }
        if (response.status.value === "error") {
            toast.error("Erro")
        }
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

if(!embalagemsAssociads){
    embalagemsAssociads=[];
}
onMounted(() => {
  initFlowbite()
})
</script>