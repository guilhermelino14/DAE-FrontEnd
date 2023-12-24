import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { ref, computed } from "vue"

export const useCartStore = defineStore('cart', () => {
    const cart = useStorage('cart', ref([]))
    const total = useStorage('total', ref(0))

    function addToCart(item) {
        cart.value.push(item)
    }

    function removeFromCart(index) {
        cart.value.splice(index, 1)
    }

    function clearCart() {
        cart.value = []
    }

    const getCart = computed(() => {
        return cart.value
    })

    const getTotal = computed(() => {
        total.value = 0
        cart.value.forEach(item => {
            total.value += item.price
        })
        return total.value
    })

    const getCartCount = computed(() => {
        return cart.value.length
    })

    return {
        cart,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        getCart,
        getTotal,
        getCartCount
    }
})