import { useAuthStore } from '../store/auth-store'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (to.path === '/fabricante' && !authStore.isFabricante()) {
      return navigateTo('/login')
    }
  })