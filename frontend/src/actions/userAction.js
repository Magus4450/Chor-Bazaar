import axios from 'axios'
import { useHistory } from 'react-router-dom'

import{
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post(
            'http://localhost:8000/api/token/',
            { email, password },
            config
        )
        console.log(data,'data');
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log(error,'e');
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const register = (first_name, last_name, phone, email, password, password2, gender, user_type, dob ) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post(
            'http://localhost:8000/api/accounts/register/',
            { first_name, last_name, phone, email, password, password2, gender, user_type, dob },
            config
        )
     

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}