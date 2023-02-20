import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd'
import { getUpdateScoupon } from './sCouponSlice';
import keyUri from '../key'
import {saveAs} from 'file-saver' 


export const initialState = {

    loading: false,
    hasErrors: false,
    coupons: [],
    currentCoupon: null,
    currentOrder : [],
    couponOrders : []
}

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {

        getCoupons: state => {

            state.loading = true
        },

        getCouponsSuccess: (state, { payload }) => {
console.log(payload);
            state.coupons = payload
            state.loading = false
            state.hasErrors = false


        },
        getCurrentCoupon: (state, { payload }) => {
            state.loading = false
            state.currentCoupon = payload

        },

        getCouponsFailure: state => {

            state.loading = false
            state.hasErrors = true
        },

        getOrders: state => {

            state.loading = true
        },
        getCurrentOrder: (state, { payload }) => {
            console.log(payload);
            state.loading = false
            state.currentCoupon = payload.order

        },
        getOrderPdf: (state) => {

            state.loading = false
       },

        getOrderSuccess: (state, { payload }) => {

            state.couponOrders = payload.order
            state.loading = false
            state.hasErrors = false


        },
        getFilterCoupon : (state, {payload}) => {
            console.log(payload);
            state.coupons = payload
            state.loading = false


        }
       

    }
})

export const { getCouponsFailure,
    getCouponsSuccess,
    getCurrentCoupon,
    getCoupons,
    getOrders,
    getFilterCoupon,
    getCurrentOrder,getOrderSuccess, getOrderPdf } = couponSlice.actions

export const couponsSelector = state => state.coupons
export default couponSlice.reducer

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const fetchCoupons = () => async dispatch => {
    const key = 'loading';
    dispatch(getCoupons())
    try {

        const { data } = await axios.get(keyUri.BACKEND_URI +'/coupon');

        dispatch(getCouponsSuccess(data))

    } catch ({ response }) {

        // response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getCouponsFailure())

    }
}

export const issueCoupons = (ids) => async dispatch => {

    const key = 'issue';

    dispatch(getCoupons())
    message.loading({ content: 'loading...', key })

    try {


        const { data } = await axios.post(keyUri.BACKEND_URI +'/issued_coupons', { ids }, config);



        data && message.success({ content: data.msg, key, duration: 2 });

        dispatch(fetchCoupons())

    } catch ({ response }) {

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getCouponsFailure())

    }
}



export const generateCoupons = (values) => async dispatch => {
    const key = 'create';
    dispatch(getCoupons())

    message.loading({ content: 'loading...', key })

    try {

        const { data } = await axios.post(keyUri.BACKEND_URI + '/coupon', values, config);

        data && message.success({ content: data.msg, key, duration: 2 });

        dispatch(fetchCoupons())

    } catch ({ response }) {

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getCouponsFailure())

    }

}

export const fetchCurrentCoupon = (id) => async dispatch => {
    const key = 'loading';

    dispatch(getCoupons())
    try {
        const { data } = await axios.get(keyUri.BACKEND_URI + `/coupon/${id}`);
        dispatch(getCurrentCoupon(data))


    } catch ({ response }) {

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getCouponsFailure())

    }

}


export const fetchFilterCoupon = (id) => async dispatch => {
    const key = 'loading';

    dispatch(getCoupons())
    try {
        const { data } = await axios.get(keyUri.BACKEND_URI + `/filter_coupon/${id}`);
        console.log(data);
        dispatch(getFilterCoupon(data))

    } catch ({ response }) {

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getCouponsFailure())

    }

}


export const deleteCoupon = (id) => async dispatch => {
    const key = 'create';
    dispatch(getCoupons())
    message.loading({ content: 'loading...', key })

    try {

        const { data } = await axios.delete(keyUri.BACKEND_URI + `/coupon/${id}`);

        data && message.success({ content: data.msg, key, duration: 2 });

        dispatch(fetchCoupons())


    } catch ({ response }) {

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });
        dispatch(getCouponsFailure())

    }


}

export const updateCoupon = (id, values) => async dispatch => {

    const key = 'update';
    dispatch(getCoupons())
    message.loading({ content: 'loading...', key })

    try {
        const { data } = await axios.put(keyUri.BACKEND_URI + `/coupon/${id}`, values, config);

        data && message.success({ content: data.msg, key, duration: 2 });
        window.location.reload();
        dispatch(getUpdateScoupon())


    } catch ({ response }) {

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

        dispatch(getCouponsFailure())
    }

}

export const assignCouponManuel = (values) => async dispatch => {

    const key = 'assign';
    dispatch(getCoupons())
    message.loading({ content: 'loading...', key })

    try {
        
        const { data } = await axios.post(keyUri.BACKEND_URI +'/assign_coupons_manuel', values, config)

        data && message.success({ content: data.msg, key, duration: 2 });
        window.location.reload();

        dispatch(fetchCoupons())

    } catch ({ response }) {

        dispatch(getCouponsFailure())

        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });

    }
}



export const fetchAllCouponOrders = () => async dispatch => {
    const key = 'loading';
    dispatch(getOrders())
    try {
        const { data } = await axios.get(keyUri.BACKEND_URI +'/order');
        dispatch(getOrderSuccess(data))
    } catch (error) {

        console.log(error);

        // response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });
        dispatch(getCouponsFailure())
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
        const { data } = await axios.get(keyUri.BACKEND_URI + `/order/${id}`);
        dispatch(getCurrentCoupon(data))

    } catch ({ response }) {
        response.data.msg && message.error({ content: response.data.msg, key, duration: 2 });
        dispatch(getCouponsFailure())

    }

}