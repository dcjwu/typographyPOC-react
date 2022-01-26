import cartTypes from "./cart.types"

export const setProductsToCart = products => ({
   type: cartTypes.SET_PRODUCT_TO_CART,
   payload: products
})

export const removeProductFromCart = id => ({
   type: cartTypes.REMOVE_PRODUCT_FROM_CART,
   payload: id
})

export const clearCart = () => ({ type: cartTypes.CLEAR_CART })