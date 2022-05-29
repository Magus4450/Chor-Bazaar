import axios from 'axios'
import {
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

} from '../constants/productConstants'

export const createProduct = (name,category,price,tags,discount,quantity,description) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.access}`
            },
        }
   
        const { data } = await axios.post(`http://localhost:8000/api/shop/product/create/`, {name,category,price,tags,discount,quantity,description}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}