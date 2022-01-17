import cartTypes from './cart.types'

export const setProductsToCart = products => ({
   type: cartTypes.SET_PRODUCT_TO_CART,
   payload: products
})

export const setTotalPrice = price => ({
   type: cartTypes.SET_TOTAL_PRICE,
   payload: price
})