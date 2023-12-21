import { useAuthStore } from '../store/auth-store'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  console.log(authStore.isAuthenticated)
    if (authStore.isAuthenticated) {
        if (authStore.isFabricante) {
            return navigateTo('/fabricante')
        } else {
            return navigateTo('/')
        }
    }

    
})