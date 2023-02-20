
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'


export const initialState = {

    loading: false,
    hasErrors: false,
    customer:[],
    exist_customer:[],

}

export const customerSlice = createSlice({
    name:"customer",
    initialState,
    reducers:{

        getCustomer: state =>{
            state.loading = true
        },

        getExistCustomer: state =>{
            state.loading = true
        },

        getCustomerSuccess: (state, {payload}) =>{

            state.customer = payload.users
            state.loading = false
            state.hasErrors = false         
        },

        getExistCustomerSuccess: (state, {payload}) =>{

            state.exist_customer = payload.user
            state.loading = false
            state.hasErrors = false         
        },

        getCustomerFailure : state =>{
            state.loading = false
            state.hasErrors = true 
        }

    }
})

export const {getCustomer, getCustomerSuccess, getCustomerFailure,
    getExistCustomerSuccess, getExistCustomer} = customerSlice.actions
      
export const customerSelector = state => state.customers
export default customerSlice.reducer

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


export const  fetchAllCustomers = () => async dispatch =>{
    dispatch(getCustomer())

    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/users`);
        dispatch(getCustomerSuccess(data))


    } catch (error) {
        dispatch(getCustomerFailure())

    }

}


export const  fetchAllExistCustomers = () => async dispatch =>{
    dispatch(getCustomer())

    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/existUsers`);
        dispatch(getExistCustomerSuccess(data))


    } catch (error) {
        dispatch(getCustomerFailure())

    }

}


