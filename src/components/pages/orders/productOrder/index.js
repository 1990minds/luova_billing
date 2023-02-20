import React, {useEffect,useState} from 'react'
import {fetchAllProductOrders,productSelector} from '../../../api/productSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../../shared/loader'
import DataTable from './datatable'
import { useDebounce } from "use-debounce";
import {loginSelector,fethFilter} from '../../../api/authSlice'
import { Input } from 'antd'
import { Button } from 'antd'
import { Link } from 'react-router-dom'



// const {FormItem} = Form
export default function Products() {

  const dispatch = useDispatch()
  const {productOrders,  } = useSelector(productSelector)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)
  const {filter} = useSelector(loginSelector)

console.log(productOrders);

useEffect(()=>{

dispatch(fetchAllProductOrders())


}, [dispatch])



const { Search } = Input;

useEffect(()=>{
  dispatch(fethFilter('orderp', debouncedText ))
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

<DataTable loading={loading} data = {(filter.length> 0) ? filter : productOrders}/>

}
    </>
       )
}  







