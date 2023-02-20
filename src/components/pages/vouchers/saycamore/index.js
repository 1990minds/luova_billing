import React, {useEffect, useState} from 'react'
import {fetchCoupons, couponsSelector} from '../../../api/couponSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../../shared/loader'
import DataTable from './datatable'



export default function Vouchers() {

  const dispatch = useDispatch()
  const {coupons, loading } = useSelector(couponsSelector)

  console.log(coupons);

useEffect(()=>{

dispatch(fetchCoupons())

}, [dispatch])


    return (<>

    
  
{

loading? <Loader/> : <DataTable data = {coupons}/>

}
    </>
       )
}  







