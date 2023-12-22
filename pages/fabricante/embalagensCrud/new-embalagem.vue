<template>
    <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700" style="justify-content: right;">
        
        <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button" aria-controls="default-modal" data-modal-target="default-modal" data-modal-toggle="default-modal">
            Adicionar Embalagem
        </button>
    </div>


    <div id="default-modal"
        class="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full">
        
        <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 class="text-xl font-semibold dark:text-white">
                        Adicionar nova embalagem
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                        data-modal-toggle="default-modal">
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <form @submit.prevent="adicionar" action="#">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-12 sm:col-span-6">
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                <input type="text" id="name" name="name" v-model="newEmbalagem.nome"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Embalagem 1" required>
                            </div>
                            <div class="col-span-12 sm:col-span-6">
                                <label for="altura"
                                    class="block text-sm font-medium text-gray-900 dark:text-white" style="margin-bottom: -15px;">Dimensões</label>
                            </div>
                            <div class="col-span-12 sm:col-span-3">
                                <input type="number" id="altura" name="altura" v-model="newEmbalagem.altura"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Altura" required>
                            </div>
                            <div class="col-span-12 sm:col-span-3">
                                <input type="number" id="largura" name="largura" v-model="newEmbalagem.largura"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Largura" required>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="items-center pt-6 pb-2 border-gray-200 rounded-b dark:border-gray-700" style="text-align: right;">
                            <button :disabled="loading"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="submit">
                                <svg v-show="loading" aria-hidden="true" role="status"
                                    class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>
                                Adicionar Embalagem</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>

import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from "~/store/auth-store.js"
const authStore = useAuthStore()

const emit = defineEmits(['refresh'])
const loading = ref(false)
const toast = useToast()
const config = useRuntimeConfig()
const api = config.public.API_URL

const newEmbalagem = ref({
    nome: '',
    altura: null,
    largura: null
})

const adicionar = async () => {
    loading.value = true
    try {
        const response = await useFetch(`${api}/embalagensProduto/`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${authStore.token}` },
            body: JSON.stringify(newEmbalagem.value),
        });
        if (response.status.value === "success") {
            toast.success("Sucesso");
            emit('refresh')
            
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

</script>