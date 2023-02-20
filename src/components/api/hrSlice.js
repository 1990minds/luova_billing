
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'


export const initialState = {

    loading: false,
    hasErrors: false,
    users:[],
    currentUser:null

}

export const hrSlice = createSlice({
    name:"hr",
    initialState,
    reducers:{

        getUser: state =>{

            state.loading = true
        },

        getUserSuccess: (state, {payload}) =>{

            state.users = payload.hr
            state.loading = false
            state.hasErrors = false
        
            
        },


        getCurrentUser: (state, {payload}) =>{
     
            state.loading = false
        state.currentUser= payload

        },

        getUpdateUser : state =>{
                state.loading = false
        },
        getUserFailure : state =>{

            state.loading = false
            state.hasErrors = true 
        }

    }
})

export const {getUser, getUserSuccess, getUserFailure,
    getCurrentUser, getUpdateUser} = hrSlice.actions
      
export const hrSelector = state => state.users
export default hrSlice.reducer

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


export const  fetchAllUsers = () => async dispatch =>{
    dispatch(getUser())

    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/hr`);
        dispatch(getUserSuccess(data))


    } catch (error) {
        dispatch(getUserFailure())

    }

}

export const deleteUser = (id) =>async dispatch =>{
    const key = 'create';
    dispatch(getUser())
    message.loading({ content: 'loading...', key })
try {
    
const {data} = await axios.delete(keyUri.BACKEND_URI +`/hr/${id}`);

data && message.success({ content: data.msg, key, duration: 2 });

 dispatch(fetchAllUsers())


} catch ({response}) {
    response && message.error({ content: response.data.msg, key, duration: 2 });

    dispatch(getUserFailure())
}


} 

export const  fetchCurrentUser = (id) => async dispatch =>{
    dispatch(getUser())

    try {
        const {data} = await axios.get(keyUri.BACKEND_URI +`/hr/${id}`);
   
        dispatch(getCurrentUser(data))


    } catch (error) {
        dispatch(getUserFailure())

    }

}

export const  updateHr = (id, values) => async dispatch =>{
    const key = 'create';
    dispatch(getUser())
    message.loading({ content: 'loading...', key })

    try {
        const {data} = await axios.put(keyUri.BACKEND_URI +`/hr/${id}`, values, config );

  

        data  &&  message.success({ content: data.msg, key, duration: 2 });

          dispatch(getUpdateUser())

    } catch ({response}) {

        response && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getUserFailure())

    }

}


export const createHr = (values) => async dispatch =>{
    const key = 'create';
    dispatch(getUser())
    message.loading({ content: 'loading...', key })
try {
   
    const {data} = await axios.post(keyUri.BACKEND_URI +'/hr', values, config);
    
    data &&  message.success({ content: data.msg, key, duration: 2 });

    dispatch(fetchAllUsers())

} catch ({response}) {

    response.data &&  message.error({ content: response.data.msg, key, duration: 2 });

    dispatch(getUserFailure())


}


}
