import React, {useEffect,useState} from 'react'
import {fetchAllBrands, brandSelector} from '../../api/brandSlice'
import {loginSelector,fethFilter} from '../../api/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import AddBrand from './createBrand'
import DataTable from './datatable'
import { Input  } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import styled from 'styled-components'
import axios from 'axios'
import key from '../../key'
import { useDebounce } from "use-debounce";
// const {FormItem} = Form
export default function SVouchers() {

  const dispatch = useDispatch()
  const { brands } = useSelector(brandSelector)
  const {filter} = useSelector(loginSelector)
  console.log(filter);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000);

console.log(brands);

useEffect(()=>{

    dispatch(fetchAllBrands())

}, [dispatch])


const { Search } = Input;


  useEffect(()=>{
      dispatch(fethFilter('brand-admin', debouncedText ))
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
  <div className="mb-3 float-right ">

  <Search placeholder="Search Brand" className="mx-3"  onChange={onSearch} style={{ width: 230 }} enterButton />
  <AddBrand />  

</div>
{

 <DataTable loading={loading}
  data ={(filter.length> 0) ? filter : brands}/>

}
    </>
       )
}  



const SearchWrap = styled.div`
width:100%;
transition:0.3s ease-in-out;
.ant-input-affix-wrapper > input.ant-input {
box-shadow: none !important;
&:focus{
    border-color:white !important;
}
&:hover{
    border-color:white !important;
}
}

`





