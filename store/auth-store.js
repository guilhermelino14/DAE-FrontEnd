import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore({
    id: 'auth',
    state:() => ({
        user: useStorage('user',{}),
        token: useStorage('token',""),
    }),
    actions:{
        login(user,token){
            this.user = user
            this.token = token
        },
        isAuthenticated(){
            return this.user != undefined
        },
        isFabricante(){
            return this.isAuthenticated() && this.user.role == "Fabricante"
        },
    }
})