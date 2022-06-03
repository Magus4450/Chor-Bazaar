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

export const categoryListReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, category: [] }
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, category: action.payload }
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const categoryDetailReducer = (state = { categoryDetail: [] }, action) => {
    switch (action.type) {
        case CATEGORY_DETAIL_REQUEST:
            return { loading: true, categoryDetail: [] }
        case CATEGORY_DETAIL_SUCCESS:
            return { loading: false, categoryDetail: action.payload }
        case CATEGORY_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryProductReducer = (state = { categoryProduct: [] }, action) => {
    switch (action.type) {
        case CATEGORY_PRODUCTS_REQUEST:
            return { loading: true, categoryProduct: [] }
        case CATEGORY_PRODUCTS_SUCCESS:
            return { loading: false, categoryProduct: action.payload }
        case CATEGORY_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}