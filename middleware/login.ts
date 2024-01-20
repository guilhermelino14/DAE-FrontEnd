import { useAuthStore } from '../store/auth-store'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
        if (authStore.isFabricante) {
            return navigateTo('/fabricante')
        }
        if (authStore.isOperador) {
            return navigateTo('/operador')
        }
         else {
            return navigateTo('/')
        }
    }

    
})