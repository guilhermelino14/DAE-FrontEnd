<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logoWhite.png" class="h-8" alt="Logo" />
        </NuxtLink>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">



          <button v-show="authStore.isAuthenticated" type="button"
            class=" p-2 text-gray-500 rounded-lg sm:flex hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 14 18">
              <path
                d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
          </button>
          <!-- Dropdown menu -->
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">{{ authStore.user.username }}</span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ authStore.user.email }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <a @click="logout()"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                  out</a>
              </li>
            </ul>
          </div>
          <NuxtLink to="/login" v-show="!(authStore.isAuthenticated)">
            <button type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign
              in</button>
          </NuxtLink>
          <!-- <button data-collapse-toggle="navbar-user" type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button> -->
        </div>
        <!-- <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page">Home</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div> -->
      </div>
    </nav>
    <div class="flex pt-5 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-10 lg:mr-10 dark:bg-gray-900">
        <main style="height: 120vh;">
          <slot />
        </main>
        <!-- footer -->
      </div>
    </div>

  </div>
</template>

<style scoped></style>
<script setup>
import { onMounted, ref, computed } from 'vue'
import { initFlowbite } from 'flowbite'
import { useAuthStore } from '../store/auth-store'
import { useCartStore } from '~/store/cart-store';

const cartStore = useCartStore()
const authStore = useAuthStore()
const config = useRuntimeConfig()
const api = config.public.API_URL



onMounted(() => {
  initFlowbite();
})

const logout = () => {
  authStore.logout()
  cartStore.clearCart()
  navigateTo("/login")
}

const cartItemsTotal = computed(() => {
  return cartStore.getCartCount
})

const cartItems = computed(() => {
  return cartStore.getCart
})

const removeFromCart = (item) => {
  cartStore.removeFromCart(item)
}

// convert the date from the api to a message like "a few moments ago" or "2 days ago" etc
const convertDate = (date) => {
  const now = new Date()
  const dateToConvert = new Date(date)
  const diff = now - dateToConvert
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (seconds < 60) {
    return "a few moments ago"
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else if (days < 30) {
    return `${days} days ago`
  } else if (months < 12) {
    return `${months} months ago`
  } else {
    return `${years} years ago`
  }
}


</script>