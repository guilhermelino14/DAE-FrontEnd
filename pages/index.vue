<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            v-for="produto in produtos">
            <a href="#">
                <img class="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ produto.nome }}</h5>
                    <h6 class="text-xs">{{ produto.descricao }}</h6>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                    <a href="#" @click="addToCart(produto)"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        to cart</a></div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart-store';
import { useAuthStore } from "~/store/auth-store.js"
const authStore = useAuthStore()
const cartStore = useCartStore()

definePageMeta({
    middleware: 'consumidor',
})

const addToCart = (item) => {
    cartStore.addToCart(item)
}

const config = useRuntimeConfig()
const api = config.public.API_URL

const { data: produtos, error, refresh } = await useFetch(`${api}/produtos`, { headers: { "Authorization": `Bearer ${authStore.token}` } })


</script>