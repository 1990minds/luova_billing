import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import scouponsReducer from './sCouponSlice';
import couponSlice from './couponSlice'
import modalSlice from './modalSlice'
import hrSlice from './hrSlice'
import productSlice from './productSlice'

import bannerSlice from './bannerSlice'
import brandrSlice from './brandSlice'

import customerSlice from './customer'
import templateSlice from './template'


export default configureStore({
  reducer: {

    auth:authReducer,
    scoupons:scouponsReducer,
    coupons:couponSlice,
    modal:modalSlice,
    users:hrSlice,
    products:productSlice,

    banner:bannerSlice,
    brand:brandrSlice,

    customers:customerSlice,
    template:templateSlice,


  },
});
