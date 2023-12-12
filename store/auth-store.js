import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { ref, computed } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const token = ref("")

    // Setup localstorage

    function storageAuth(){
        useStorage('user',user.value)
        useStorage('token',token.value)
    }

    // Login
    function login(user_1,token_1){
        user.value = user_1
        token.value = token_1
        storageAuth()
    }

    // Logout
    function logout(){
        user.value = {}
        token.value = ""
        storageAuth()
    }

    // Check is authentifcated
    function isAuthenticated(){
        return this.user.value != null
    }

    // Check is a Fabricante
    function isFabricante(){
        return this.isAuthenticated() && this.user.role == "Fabricante"
    }

    return {
        login,
        logout,
        isAuthenticated,
        isFabricante,
        user,
        token
    }
})