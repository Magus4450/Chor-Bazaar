import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer
    
} from './reducers/userReducers.js'
import { productCreateReducer, productListReducer } from './reducers/productReducers.js'
import { categoryDetailReducer, categoryListReducer, categoryProductReducer } from './reducers/categoryReducers.js'



const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    productCreate: productCreateReducer,
    productList: productListReducer,
    userDetails: userDetailsReducer,

    categoryList: categoryListReducer,
    categoryDetail: categoryDetailReducer,
    categoryProduct: categoryProductReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
    
export default store