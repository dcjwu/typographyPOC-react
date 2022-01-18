import orderTypes from './order.types'
import {firestore} from '../../firebase/utils'

export const createOrder = (currentProducts, timestamp, id) => async dispatch => {
   await firestore
      .collection('orders')
      .doc()
      .set({
         ...currentProducts,
         dateCreated: timestamp,
         orderId: id
      })
      .then(dispatch(setCreateOrder(currentProducts)))
}

const setCreateOrder = products => ({
   type: orderTypes.CREATE_ORDER,
   payload: products
})

export const getOrdersFromDB = () => async dispatch => {
   await firestore.collection('orders').orderBy('dateCreated')
      .get()
      .then(products => {
         let readyData = []
         products.docs.forEach(product => {
            readyData.push(product.data())
         })
         dispatch(setOrdersFromDB(readyData))
      })
}

const setOrdersFromDB = orders => ({
   type: orderTypes.GET_ORDERS,
   payload: orders
})