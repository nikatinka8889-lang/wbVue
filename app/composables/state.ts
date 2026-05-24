import type { CartItem } from "~/modules/cart.item.module"

export const useViewCart = () => useState<boolean>('viewCart', () => false)

export const useCart = () => useState<CartItem[]>('cart', () => [])
