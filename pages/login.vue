<template>
    <div class="flex flex-col items-center justify-center px-6 mx-auto md:h-screen pt:mt-0 ">
        <!-- Card -->
        <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to platform
            </h2>
            <form class="mt-8 space-y-6">
                <div>
                    <label for="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input v-model="loginForm.username" type="text" name="username" id="username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        password</label>
                    <input v-model="loginForm.password" type="password" name="password" id="password" placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required>
                </div>
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" name="remember" type="checkbox"
                            class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="remember" class="font-medium text-gray-900 dark:text-white">Remember me</label>
                    </div>
                    <a href="#" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost
                        Password?</a>
                </div>
                <button @click="login"
                    class=" w-full px-5 py-3 text-base font-medium text-center bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '../store/auth-store'
import { useToast } from 'vue-toastification'

definePageMeta({
    middleware: 'login',
})

const toast = useToast()

const storeAuth = useAuthStore();

const loginForm = ref({
    username: '',
    password: ''
})

onMounted(() => {
    document.getElementById("user-dropdown").classList.add("hidden")
})


const login = async (event) => {
    event.preventDefault();
    await useFetch('http://localhost:8080/smartPackage/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm.value)
    }).then(response => {
        if (response.status.value == "error") {
            toast.error("Username or password incorrect")
            return
        }
        storeAuth.login(response.data.value.user, response.data.value.token)
        if (response.data.value.user.role == "Fabricante")
            navigateTo("/fabricante")
        if (response.data.value.user.role == "Consumidor")
            navigateTo("/")
        if (response.data.value.user.role == "Operador")
            navigateTo("/operador")
    }).catch(error => {
        toast.error("Username or password incorrect")
    })
}
const addDataToLocalStorafe = (user, token) => {
    const storeAuth = useAuthStore();
    storeAuth.login(user, token)
}

</script>