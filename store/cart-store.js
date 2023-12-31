import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { ref, computed } from "vue"
import { useToast } from 'vue-toastification'
const toast = useToast()

export const useCartStore = defineStore('cart', () => {
    const cart = useStorage('cart', ref([]))
    const total = useStorage('total', ref(0))

    function addToCart(item) {
        const exists = cart.value.find(i => i.id === item.id)
        if (exists) {
            toast.error("Já existe no carrinho")
            return
        }
        cart.value.push(item)
        toast.success("Adicionado ao carrinho")
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