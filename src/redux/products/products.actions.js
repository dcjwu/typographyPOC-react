import productsTypes from "./products.types";
import {firestore} from "../../firebase/utils";

export const getProducts = () => async dispatch => {
    dispatch(setLoaded(false))
    await firestore.collection('products').orderBy('title')
        .get()
        .then(products => {
            let readyData = []
            products.docs.map(product => {
                readyData.push(product.data())
            })
            dispatch(setProducts(readyData))
        })
}

const setProducts = products => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
})

export const getFilteredProducts = filter => async dispatch => {
    dispatch(setLoaded(false))
    await firestore.collection('products').orderBy('title').where('category', '==', filter)
        .get()
        .then(products => {
            let readyData = []
            products.docs.map(product => {
                readyData.push(product.data())
            })
            dispatch(setFilteredProducts(readyData))
        })
}

const setFilteredProducts = data => ({
    type: productsTypes.SET_PRODUCTS_BY_CATEGORY,
    payload: data
})

export const getProductById = id => async dispatch => {
    dispatch(setLoaded(false))
    await firestore.collection('products').where('id', '==', id)
        .get()
        .then(product => {
            product.docs.forEach(productById => {
                dispatch(setProductById(productById.data()))
            })
        })
}

const setProductById = product => ({
    type: productsTypes.SET_PRODUCT_BY_ID,
    payload: product
})

export const clearProductById = () => ({
    type: productsTypes.CLEAR_PRODUCT_BY_ID
})

const setLoaded = isLoaded => ({
    type: productsTypes.SET_LOADED,
    payload: isLoaded
})