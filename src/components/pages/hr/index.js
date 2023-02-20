import { Button,Input } from 'antd'
import React, {useEffect} from 'react'
import {fetchAllUsers, hrSelector} from '../../api/hrSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import AddHr from './addHr'


// const {FormItem} = Form
export default function Hrindex() {

  const dispatch = useDispatch()
  const {users, loading } = useSelector(hrSelector)

  console.log(users);


useEffect(()=>{

dispatch(fetchAllUsers())


}, [dispatch])

const { Search } = Input;
const onSearch = value => {
  // dispatch(fetchFilterCoupon(value))
  // setstate(value)
  // defaultValue={catagory.length === 1 ? coupons[0].coupon_id : ''}
}

    return (<>
<div className="mb-3 float-right">
{/* <Search placeholder="Search Customer" className="mx-3" onSearch={onSearch} style={{ width: 230 }} enterButton /> */}

  <AddHr />  
</div>
    
  
{

loading? <Loader/> : <DataTable data={users} />

}
    </>
       )
}  







