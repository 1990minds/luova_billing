
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'
import {saveAs} from 'file-saver' 
import { logDOM } from '@testing-library/react';

export const initialState = {

    loading: false,
    hasErrors: false,
    brands:[],
    currentBrand:null,
}

export const brandSlice = createSlice({
    name:"brand",
    initialState,
    reducers:{

        getBrand: state =>{

            state.loading = true
        },

        getBrandSuccess: (state, {payload}) =>{
            state.loading = false
            state.brands = payload
            
        },

        getCurrentBrand: (state, {payload}) =>{

            state.loading = false
            state.currentBrand = payload
            
        },
        getBrandFailure: (state, {payload}) =>{

            state.loading = false
            state.brands = payload
            
        },

    }
})

export const {getBrand, getCurrentBrand, getBrandSuccess, getBrandFailure } = brandSlice.actions
      
export const brandSelector = state => state.brand
export default brandSlice.reducer


const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };



export const  fetchAllBrands = () => async dispatch =>{
      const key = "brand"
      dispatch(getBrand())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/brand-admin');
        dispatch(getBrandSuccess(data))

    } catch ({response}) {

        dispatch(getBrandFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneBrand = (id) => async dispatch =>{
    const key = "brand"
    dispatch(getBrand())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/brand/${id}`);
      console.log(data);
      dispatch(getCurrentBrand(data))

  } catch ({response}) {

      dispatch(getBrandFailure())
      console.log(response);
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}





export const  createBrand = (values) => async dispatch =>{
    const key = "brand"
    dispatch(getBrand())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/brand', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllBrands())

  } catch ({response}) {
       dispatch(getBrandFailure())
  }
  
}


export const  deleteBrand = (id) => async dispatch =>{
    const key = "brand"
    dispatch(getBrand())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/brand/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllBrands())

  } catch ({response}) {

      dispatch(getBrandFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateBrand = (id, values) => async dispatch =>{
    const key = "brand"
    dispatch(getBrand())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/brand/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      window.location.reload()
      dispatch(fetchAllBrands())

  } catch ({response}) {

      dispatch(getBrandFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}




