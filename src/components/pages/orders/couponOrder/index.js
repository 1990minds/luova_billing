import React, {useEffect,useState} from 'react'
import {fetchAllCouponOrders, couponsSelector} from '../../../api/couponSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../../shared/loader'
import DataTable from './datatable'
import { useDebounce } from "use-debounce";
import { Input } from 'antd'
import {loginSelector,fethFilter} from '../../../api/authSlice'
import { Button } from 'antd'
import { Link } from 'react-router-dom'


// const {FormItem} = Form
export default function Products() {

  const dispatch = useDispatch()
  const {couponOrders } = useSelector(couponsSelector)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)
  const {filter} = useSelector(loginSelector)
  
console.log(couponOrders);

useEffect(()=>{

dispatch(fetchAllCouponOrders())


}, [dispatch])

const { Search } = Input;

useEffect(()=>{
  dispatch(fethFilter('order', debouncedText ))
setLoading(false)
 }, [dispatch, debouncedText])



useEffect(()=>{     
if(filter.length < 1) {
  setSearch('')
}
 }, [filter])

const onSearch = (e) => {
setLoading(true)
setSearch(e.target.value)

}

    return (<>

<div className="mb-2 float-right">
        <Search placeholder="Search Orders" className="m-0" onChange={onSearch} style={{ width: 230 }} enterButton />
  
    </div>


{

 <DataTable loading={loading} data = {(filter.length> 0) ? filter : couponOrders} />

}
    </>
       )
}  







