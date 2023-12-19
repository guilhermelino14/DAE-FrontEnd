import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { ref, computed } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const user = useStorage('user', ref({}))
    const token = useStorage('token', ref(""))


    // Login
    function login(user1, token1) {
        user.value = user1
        token.value = token1
    }

    // Logout
    function logout() {
        user.value = {}
        token.value = ""
    }

    // Check is authentifcated
    const isAuthenticated = computed(() => {
        if (token.value != "") {
            return true
        }
        return false
    })

    // Check is a Fabricante
    const isFabricante = computed(() => {
        return user.value.role == "Fabricante"
    })

    // Check is a Consumidor
    const isConsumidor = computed(() => {
        return user.value.role == "Consumidor"
    })

    return {
        login,
        logout,
        isAuthenticated,
        isFabricante,
        isConsumidor,
        user,
        token
    }
})