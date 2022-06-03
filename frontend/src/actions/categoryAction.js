import axios from "axios";

import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    CATEGORY_DETAIL_REQUEST,
    CATEGORY_DETAIL_SUCCESS,
    CATEGORY_DETAIL_FAIL,

    CATEGORY_PRODUCTS_FAIL,
    CATEGORY_PRODUCTS_REQUEST,
    CATEGORY_PRODUCTS_SUCCESS

} from "../constants/categoryConstants"

export const listCategory = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })

        const { data } = await axios.get('http://localhost:8000/api/shop/category/list/')

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const getCategoryDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAIL_REQUEST })

        const { data } = await axios.get(`http://localhost:8000/api/shop/category/${id}/`)

        dispatch({
            type: CATEGORY_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const getCategoryProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_PRODUCTS_REQUEST })

        const { data } = await axios.get(`http://localhost:8000/api/shop/category/${id}/products/`)

        dispatch({
            type: CATEGORY_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}