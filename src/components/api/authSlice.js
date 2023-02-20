import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'
const adminInfo = localStorage.getItem('admin') ?
  JSON.parse(localStorage.getItem('admin')) : null
export const initialState = {
  loading: false,
  hasErrors: false,
  logpopUp: false,
  admin: adminInfo,
  isAdminAuthenticate: adminInfo ? true : false,
  filter:[],
  current:[]
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getLogin: state => {
      state.loading = true
    },
    getAdminLoginSuccess: (state, { payload }) => {
      state.admin = payload
        state.loading = false
      state.isAdminAuthenticate = true
    },
    getLoginFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    logout: state => {
      state.admin = null
      state.loading = false
      state.isAdminAuthenticate = false
      state.logpopUp = false
    },

    // getFilter: (state, {payload}) =>{
    //   console.log(payload);

    //   state.loading = false;
    //   state.current = payload

    // },

    getFilter: (state, {payload}) =>{
        console.log(payload);
      state.loading = false;
      state.filter = payload

    },
  
    showlogpopup: (state, { payload }) => {
      state.logpopUp = payload
    }
  }
})
export const { getLogin, getAdminLoginSuccess, getFilter,showlogpopup, logout,  getLoginFailure } = authSlice.actions
export const loginSelector = state => state.auth
export default authSlice.reducer
const config = {
  headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
  }
};
export const fetchAdminLogin = (logInAdmindata) => async dispatch => {
console.log(logInAdmindata);
  dispatch(getLogin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
    const { data } = await axios.post(keyUri.BACKEND_URI + '/adminAuth', logInAdmindata, config)
    console.log(data);
    data &&  message.success({ content: data.token && "login successfully!" || "Somthing went wrong!", key, duration: 2 });
    dispatch(getAdminLoginSuccess(data))
    localStorage.setItem("admin", JSON.stringify(data))
  } 
    catch ({response}) {
// console.log({response});
      response.data && message.error({content:response?.data?.msg, duration:2, key})
  dispatch(getLoginFailure())
  }
}
export const logouthandler = (data) => async dispatch => {
  localStorage.removeItem(data);
  window.localStorage.removeItem('total');
  window.localStorage.removeItem('cart')
  window.localStorage.removeItem('admin')
  dispatch(logout())
  window.location.reload()
}
export const showModal = (ispopup) => async dispatch => {
  dispatch(showlogpopup(ispopup))
}


export const fethFilter = (value, filter) => async dispatch =>{
  console.log({value});
  console.log(filter.length);

  try {
    if(filter.length > 0){
      const {data} = await axios.get(keyUri.BACKEND_URI + `/${value}?search=${filter}`, config)
      console.log(data);
      dispatch(getFilter(data))
    }
    else{
      dispatch(getFilter([]))
    }

  } catch (error) {

      dispatch(getLoginFailure())
  }

}