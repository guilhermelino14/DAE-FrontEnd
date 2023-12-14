import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { ref, computed } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const token = ref("")
    const userLocalStorage = useStorage('user', null)
    const tokenLocalStorage = useStorage('token', null)


    // Login
    function login(user1, token1) {
        user.value = user1
        token.value = token1
        //add to localStorage
        userLocalStorage.value = user1
        tokenLocalStorage.value = token1
    }

    // Logout
    function logout() {
        user.value = {}
        token.value = ""
        //remove from localStorage
        userLocalStorage.value = null;
        tokenLocalStorage.value = null;
    }

    // Check is authentifcated
    const isAuthenticated = computed(() => {
        return user.value?.role
    })

    // Check is a Fabricante
    const isFabricante = computed(() => {
        return user.value.role == "Fabricante"
    })

    return {
        login,
        logout,
        isAuthenticated,
        isFabricante,
        user,
        token
    }
})