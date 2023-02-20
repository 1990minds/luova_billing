
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'
// import {saveAs} from 'file-saver' 

export const initialState = {

    loading: false,
    hasErrors: false,
    banner:[],
    all_banner : []
}

export const bannerSlice = createSlice({
    name:"banner",
    initialState,
    reducers:{

        getbanner: state => {
            state.loading = true;
          },
      
      getAll_banner_success: (state, {payload})  =>{
      
          state.loading = false
          state.all_banner = payload
      
      },
      
      getCurrentSuccess: (state, {payload}) =>{
        console.log(payload);
          state.loading = false
          state.current_banner = payload
        
        },
      
          get_banner_Failure: (state) => {
      
            state.loading = false
            state.hasError = true
          },
      
        },
      })
 
export const { getbanner ,getAll_banner_success, getCurrentSuccess, get_banner_Failure } = bannerSlice.actions;



export const bannerSelector = state => state.banner;


const config = {
  headers: {
      Accept: "application/json",
  }
};



export const fetchAllBanner = () => async dispatch => {

  dispatch(getbanner())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/banner`)
   console.log(data);
   
   dispatch(getAll_banner_success(data));
    
  } catch (error) {
 
 dispatch(get_banner_Failure())
 
    
  }
 };




 export const deleteBanner = (id) => async dispatch => {

  dispatch(getbanner())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/banner/${id}`)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllBanner());
    
  } catch (error) {

 dispatch(get_banner_Failure())
 
  }
 };





 export const createBanner = (values) => async dispatch => {

  dispatch(getbanner())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/banner`, values, config)
   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllBanner());
    
  } catch (error) {

 dispatch(get_banner_Failure())
 
  }
 };

 export const fetchOneBanner = (id) => async dispatch => {

  dispatch(getbanner())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/banner/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_banner_Failure())
  }
 };


 export const  updateBanner = (id, values) => async dispatch =>{
  const key = "banner"
  dispatch(getbanner())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/banner/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllBanner())

} catch ({response}) {

    dispatch(get_banner_Failure())
    response.data && message.error({ content: response.data.msg, key, duration: 2 });

}
}

export default bannerSlice.reducer;