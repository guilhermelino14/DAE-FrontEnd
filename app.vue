<template>
  <NuxtLayout class="dark:bg-gray-900 dark:text-white">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from "~/store/auth-store.js"
import { useCartStore } from "./store/cart-store";
const authStore = useAuthStore()
const cartStore = useCartStore()
const config = useRuntimeConfig()
const api = config.public.API_URL

onMounted(async () => {
  if (authStore.token != "") {
    const resposnse = await useFetch(`${api}/auth/token/` + authStore.token)
    if(resposnse.status.value == "success"){
      return
    }
    if (resposnse.error.value.statusCode == 500) {
      authStore.logout()
      cartStore.clearCart()
      navigateTo("/login")
    }
  }
})
</script>