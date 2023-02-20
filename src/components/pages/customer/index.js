import React, {useEffect,useState} from 'react'
import {fetchAllCustomers, fetchAllExistCustomers, customerSelector} from '../../api/customer'
import {useDispatch, useSelector} from 'react-redux'
import {loginSelector,fethFilter} from '../../api/authSlice'
import Loader from '../../shared/loader'
import DataTable from './customerTable'
import ExcelCustomerBtn from './exportCustomerExcel'
import { Input } from 'antd'
import { useDebounce } from "use-debounce";

export default function Customerindex() {

  const dispatch = useDispatch()
  const {customer, exist_customer, } = useSelector(customerSelector)
  const {filter} = useSelector(loginSelector)
  console.log(customer);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)

useEffect(()=>{

dispatch(fetchAllCustomers())
dispatch(fetchAllExistCustomers())

}, [dispatch])


const { Search } = Input;

useEffect(()=>{
  dispatch(fethFilter('users', debouncedText ))
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


    <div className="d-flex justify-content-end">

    <div className="mb-2 float-right">
        <Search placeholder="Search Products" className="m-0" onChange={onSearch} style={{ width: 230 }} enterButton />
    <ExcelCustomerBtn data={customer} />
    </div>

    </div>
   <DataTable loading={loading}
 data ={(filter.length> 0) ? filter : customer} />

{/*   
        <div className="d-flex justify-content-end">
          <ExcelExistCustomerBtn  data={exist_customer} />
      </div>
     {loading? <Loader/> : <ExistDataTable data={exist_customer} />} */}
 
    </>
       )
}  







