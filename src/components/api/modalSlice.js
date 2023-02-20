import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios'
// import {message} from 'antd'
import keyUri from '../key'

export const initialState = {

    visible: false,
  

}

export const modalSlice = createSlice({
    name:"coupon",
    initialState,
    reducers:{

        getVisible: (state, {payload}) =>{

            state.visible = payload
        }

       
    }
})

export const {getVisible} = modalSlice.actions
      
export const modalSelector = state => state.modal
export default modalSlice.reducer


export const  showModal = (data) => async dispatch =>{

    
    try {

  dispatch(getVisible(data))
  

    } catch (error) {

    console.log(error);
 
    }
    
}

