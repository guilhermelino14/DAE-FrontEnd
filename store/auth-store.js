import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { ref, computed } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const user = useStorage('user', ref({}))
    const token = useStorage('token', ref(""))


    // Login
    function login(user1, token1) {
        user.value = user1
        console.log(toRaw(user.value))
        token.value = token1
    }

    // Logout
    function logout() {
        user.value = {}
        token.value = ""
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