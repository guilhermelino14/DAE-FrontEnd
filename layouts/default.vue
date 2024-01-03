<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logoWhite.png" class="h-8" alt="Logo" />
        </NuxtLink>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <button id="dropdownNotificationButton2" v-show="authStore.isAuthenticated"
            data-dropdown-toggle="dropdownNotification2"
            class="relative inline-flex items-center p-2 text-gray-500 rounded-lg sm:flex hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            type="button">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 14 20">
              <path
                d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
            <div v-if="notificacaoNotLidaCount > 0"
              class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {{ notificacaoNotLidaCount }}</div>
          </button>

          <!-- Dropdown menu -->
          <div id="dropdownNotification2"
            class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
            aria-labelledby="dropdownNotificationButton2">
            <div
              class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Notificações
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700" v-if="notificacoes == ''">
              <a class="flex px-4 py-3 dark:bg-gray-700">
                <div class="w-full ps-3">
                  <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">Sem notificações</div>
                </div>
              </a>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700" v-for="notificacao in notificacoes">
              <a href="#" class="flex px-4 py-3 dark:bg-gray-700 hover:dark:bg-gray-500" v-if="!notificacao.lida"
                @click="setNotificacaoToLida(notificacao.id)">
                <div class="w-full ps-3">
                  <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{{ notificacao.mensagem }}</div>
                  <div class="text-xs text-blue-600 dark:text-blue-500">{{ convertDate(notificacao.data) }}</div>
                </div>
              </a>
              <a href="#" class="flex px-4 py-3  hover:dark:bg-gray-500" v-if="notificacao.lida">
                <div class="w-full ps-3">
                  <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{{ notificacao.mensagem }}</div>
                  <div class="text-xs text-blue-600 dark:text-blue-500">{{ convertDate(notificacao.data) }}</div>
                </div>
              </a>
            </div>
          </div>

          <button type="button" v-show="authStore.isAuthenticated" data-dropdown-toggle="dropdownNotification"
            class="relative inline-flex items-center p-2 text-gray-500 rounded-lg sm:flex hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 18 21">
              <path
                d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            <span class="sr-only">Cart</span>
            <div v-if="cartItemsTotal > 0"
              class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {{ cartItemsTotal }}</div>
          </button>




          <!-- Dropdown -->
          <div id="dropdownNotification"
            class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
            aria-labelledby="dropdownNotificationButton">
            <div
              class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Os seus produtos
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              <div class="w-full ps-3" v-show="cartItems == ''">
                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400" style="    text-align-last: center;">
                  Sem produtos no carrinho
                </div>
              </div>
              <a href="#" class="flex px-4 py-3 " v-for="(item, index) in cartItems">
                <div class="flex-shrink-0">
                  <img class="rounded-full w-11 h-11"
                    src="https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg" alt="Jese image">
                  <div
                    class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                    <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 18 18">
                      <path
                        d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                      <path
                        d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                    </svg>
                  </div>
                </div>
                <div class="w-full ps-3">
                  <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    {{ item.nome }}
                  </div>
                </div>
                <div class="w-20 ps-3" style="    align-self: center;">
                  <button type="button" @click="removeFromCart(index)"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Remove from cart</span>
                  </button>
                </div>
              </a>
            </div>
            <nuxt-link to="/consumidor/cart">
              <a href="#"
                class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <div class="inline-flex items-center ">
                  <svg class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path
                      d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                  Ir para o carrinho
                </div>
              </a>
            </nuxt-link>
          </div>
          <!-- dropdown end -->

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
              <nuxt-link to="/consumidor/encomendas">
                <li>
                  <a href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Encomendas</a>
                </li>
              </nuxt-link>
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

const { data: notificacoes, error, refresh } = await useFetch(`${api}/consumidor/${authStore.user.username}/notificacoes`, { headers: { "Authorization": `Bearer ${authStore.token}` } })

const notificacaoNotLidaCount = computed(() => {
  if (notificacoes.value == null) {
    return 0
  }
  else {
    return notificacoes.value.filter(notificacao => !notificacao.lida).length

  }
})
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

function setNotificacaoToLida(id) {
  fetch(`${api}/consumidor/${authStore.user.username}/notificacoes/${id}/lida`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authStore.token}`
    },
    body: JSON.stringify({
      lida: true
    })
  }).then(() => {
    refresh()
  })
} 
</script>