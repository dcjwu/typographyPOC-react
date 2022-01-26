import { firestore } from "../../firebase/utils"
import orderTypes from "./order.types"

export const createOrder = (currentProducts, timestamp, id, email, status) => async dispatch => {
   await firestore
      .collection("orders")
      .doc()
      .set({
         ...currentProducts,
         dateCreated: timestamp,
         orderId: id,
         customerEmail: email,
         orderStatus: status
      })
      .then(dispatch(setCreateOrder(currentProducts)))
}

const setCreateOrder = products => ({
   type: orderTypes.CREATE_ORDER,
   payload: products
})

export const clearOrder = () => ({ type: orderTypes.CLEAR_ORDER })

const setDataLoaded = isLoaded => ({
   type: orderTypes.SET_DATA_LOADED,
   payload: isLoaded
})

export const getOrdersFromDB = filter => async dispatch => {
   dispatch(setDataLoaded(false))
   let ref = await firestore.collection("orders").orderBy("dateCreated")
   if (filter) ref = await firestore.collection("orders").orderBy("dateCreated").where("orderStatus", "==", filter)
   ref.get()
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

export const findCollectionId = (id, status) => async dispatch => {
   await firestore.collection("orders").where("orderId", "==", id)
      .get()
      .then(data => data.docs.forEach(currentDoc => {
         updateCollectionOrderStatus(currentDoc.id, status)
            .then(dispatch(getOrdersFromDB()))
      }))
}

const updateCollectionOrderStatus = async (collectionId, status) => {
   await firestore.collection("orders").doc(collectionId).update({ "orderStatus": status })
}