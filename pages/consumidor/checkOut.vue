<template>
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <!-- Card header -->
        <div class="items-center justify-between lg:flex">
            <div class="mb-4 lg:mb-0">
                <nuxt-link to="/consumidor/cart">
                    <button type="button"
                        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                        <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                        </svg>
                        Editar Carrinho
                    </button>
                </nuxt-link>
                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Confirmar compra</h3>
            </div>
        </div>
        <div class="flex flex-col mt-6">

            <ul class=" divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pb-3 sm:pb-4 pt-2" v-for="product in cartItems">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">

                            </p>
                            <p class="text-sm pl-2 pt-2 text-gray-500 truncate dark:text-gray-400">
                                {{ product.name }}
                            </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $320
                        </div>
                    </div>
                </li>

                <li class="pt-3 pb-0 sm:pt-4">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">

                        </div>
                        <div class="flex-1 min-w-0">

                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            Total:
                            <br>
                            $367
                        </div>
                    </div>
                </li>
            </ul>

        </div>

        <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">A tua Morada</dt>
                <dd class="text-lg font-semibold">Rua do xico esperto</dd>
            </div>
        </dl>

        <div class="items-center pt-4 justify-between block flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
            style="justify-content: right;">
            <nuxt-link to="/consumidor/checkOut">
                <button
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button" aria-controls="default-modal" data-modal-target="default-modal"
                    data-modal-toggle="default-modal">
                    Finalizar Compra
                </button>
            </nuxt-link>
        </div>
    </div>
</template>
<script setup>
import { useCartStore } from '~/store/cart-store';
const cartStore = useCartStore()
definePageMeta({
    middleware: 'consumidor',

})
const cartItems = cartStore.getCart
</script>