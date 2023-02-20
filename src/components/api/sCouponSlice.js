import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'

export const initialState = {

    loading: false,
    hasErrors: false,
    scoupons:[],
    scatgoryCoupon:[],
    sAllCoupons:[],
    currentScoupon:null

}

export const scouponSlice = createSlice({
    name:"scoupon",
    initialState,
    reducers:{

        getSCoupons: state =>{

            state.loading = true
        },

        getSCouponsSuccess: (state, {payload}) =>{

            state.scoupons = payload
            state.loading = false
            state.hasErrors = false
        
            
        },

        getCurrentCatagory : (state, {payload})=>{

            state.loading = false
            state.hasErrors = false
            state.scatgoryCoupon = payload

        },

      getAllScoupons : (state, {payload}) =>{

            state.loading = false
            state.sAllCoupons = payload
        },

        getCurrentSCoupon: (state, {payload}) =>{
     
            state.loading = false
        state.currentScoupon= payload

        },

        getUpdateScoupon : state =>{
                state.loading = false
        },
        getScouponsFailure : state =>{

            state.loading = false
            state.hasErrors = true 
        }

    }
})

export const {getScouponsFailure,
    getCurrentCatagory,
     getSCouponsSuccess,
     getAllScoupons,
     getCurrentSCoupon,
      getSCoupons,
      getUpdateScoupon} = scouponSlice.actions
      
export const scouponsSelector = state => state.scoupons
export default scouponSlice.reducer

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };



export const  fetchScoupons = () => async dispatch =>{

    dispatch(getSCoupons())
    try {

  
    const {data} = await axios.get(keyUri.BACKEND_URI +'/socialcoupons');
    dispatch(getSCouponsSuccess(data.getcoupon))

    } catch (error) {

        dispatch(getScouponsFailure())
 
    }
    
}

export const  fetchCurrentScoupons = (id) => async dispatch =>{
    dispatch(getSCoupons())

    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/socialcoupon/${id}`);
     
        dispatch(getCurrentCatagory(data))


    } catch (error) {
        dispatch(getScouponsFailure("Somthing went wrong"))

    }

}


export const  fetchAllSCoupons = (id) => async dispatch =>{
    dispatch(getSCoupons())
    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/admin-socialcoupons`);
        dispatch(getAllScoupons(data))


    } catch (error) {
        dispatch(getScouponsFailure())

    }

}


export const deleteSCoupon = (id) =>async dispatch =>{
    const key = 'create';
    dispatch(getSCoupons())
    message.loading({ content: 'loading...', key })
try {
    
const {data} = await axios.delete(keyUri.BACKEND_URI +`/socialcoupon/${id}`);
setTimeout(() => {
    message.success({ content: data.msg, key, duration: 2 });
  }, 500) 

 dispatch(fetchAllSCoupons())

} catch (error) {
    
    dispatch(getScouponsFailure())
}
} 



export const  fetchOneScoupons = (id) => async dispatch =>{
    dispatch(getSCoupons())

    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/sone-coupon/${id}`);
     console.log(data);
        dispatch(getCurrentSCoupon(data))


    } catch (error) {
        dispatch(getScouponsFailure("Somthing went wrong"))

    }

}

export const  updateSCoupons = (id, values) => async dispatch =>{
    const key = 'create';
    dispatch(getSCoupons())
    message.loading({ content: 'loading...', key })

    try {
        const {data} = await axios.put(keyUri.BACKEND_URI +`/socialcoupon/${id}`, values, config );

          data && message.success({ content: data.msg, key, duration: 2 });
          window.location.reload();
          dispatch(getUpdateScoupon())
  

    } catch (error) {
        dispatch(getScouponsFailure("Somthing went wrong"))

    }

}


export const createCoupons = (values) => async dispatch =>{
    const key = 'create';
    dispatch(getSCoupons())

    message.loading({ content: 'loading...', key })
try {
   
    const {data} = await axios.post(keyUri.BACKEND_URI +'/socialcoupons', values, config);

    setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
    dispatch(fetchAllSCoupons())

} catch (error) {
    
    dispatch(getScouponsFailure())
}
}
