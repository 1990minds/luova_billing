
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'
import {saveAs} from 'file-saver' 

export const initialState = {

    loading: false,
    hasErrors: false,
    products:[],
    currentProduct:null,
    currentOrder : [],
    productOrders : []
}

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{

        getProduct: state =>{

            state.loading = true
        },
        getProductSuccess: (state, {payload}) =>{

            state.loading = false
            state.products = payload
            
        },

        getCurrentProduct: (state, {payload}) =>{

            state.loading = false
            state.currentProduct = payload
            
        },
        getProductFailure: (state, {payload}) =>{

            state.loading = false
            state.products = payload
            
        },

        getOrders: state => {

            state.loading = true
        },
        getCurrentOrder: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.currentProduct = payload.order

        },
        getOrderPdf: (state) => {

            state.loading = false
       },

        getOrderSuccess: (state, { payload }) => {

            state.productOrders = payload.order
            state.loading = false
            state.hasErrors = false


        },

       
    }
})

export const {getProduct, 
    getCurrentProduct,
    getProductSuccess,
    getProductFailure,
    getOrders,
    getCurrentOrder,getOrderSuccess, getOrderPdf } = productSlice.actions
      
export const productSelector = state => state.products
export default productSlice.reducer


const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };



export const  fetchAllProducts = () => async dispatch =>{
      const key = "product"
      dispatch(getProduct())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/products');

        dispatch(getProductSuccess(data))

    } catch ({response}) {

        dispatch(getProductFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneProduct = (id) => async dispatch =>{
    const key = "product"
    dispatch(getCurrentProduct())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/products/${id}`);
      dispatch(getCurrentProduct(data))

  } catch ({response}) {

      dispatch(getProductFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}





export const  createProduct = (values) => async dispatch =>{
    const key = "product"
    dispatch(getProduct())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/products', values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(getProductSuccess(data))
      dispatch(fetchAllProducts())
      window.location.reload()

  } catch ({response}) {

      dispatch(getProductFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  deleteProduct = (id) => async dispatch =>{
    const key = "product"
    dispatch(getProduct())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/products/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllProducts())

  } catch ({response}) {

      dispatch(getProductFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateProduct = (id, values) => async dispatch =>{
    const key = "product"
    dispatch(getProduct())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/products/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllProducts())

  } catch ({response}) {

      dispatch(getProductFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const fetchAllProductOrders = () => async dispatch => {
    const key = 'loading';
    dispatch(getOrders())
    try {
        const { data } = await axios.get(keyUri.BACKEND_URI +'/orderp');
        console.log(data);
        dispatch(getOrderSuccess(data))
    } catch (error) {

        console.log(error);

        // response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });
        dispatch(getProductFailure())
    }
}



export const createOrderPdf = (pdfValues) => async dispatch => {
    console.log(pdfValues);
    axios.post(keyUri.BACKEND_URI +'/create-pdf', pdfValues, config)
    .then(() => axios.get(keyUri.BACKEND_URI +'/fetch-pdf', { responseType: 'blob' })) 
    .then((res) => {  
        console.log(res.data);      
        const pdfBlob = new Blob([res.data], 
            { type: 'application/pdf' });
    saveAs(pdfBlob, 'invoice.pdf');      
}
)
}



export const fetchCurrentOrder = (id) => async dispatch => {
    const key = 'loading';

    dispatch(getOrders())
    try {
        const { data } = await axios.get(keyUri.BACKEND_URI + `/orderp/${id}`);
        dispatch(getCurrentProduct(data))

    } catch ({ response }) {
        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });
        dispatch(getProductFailure())

    }
}




export const createProductOrderPdf = (pdfValues) => async dispatch => {
    console.log(pdfValues);
    axios.post(keyUri.BACKEND_URI +'/create-p-pdf', pdfValues, config)
    .then(() => axios.get(keyUri.BACKEND_URI +'/fetch-pdf', { responseType: 'blob' })) 
    .then((res) => {  
        console.log(res.data);      
        const pdfBlob = new Blob([res.data], 
            { type: 'application/pdf' });
     saveAs(pdfBlob, 'invoice.pdf');      
}
)
}
