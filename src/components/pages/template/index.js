import React, {useEffect,useState} from 'react'
import {fetchAllTemplate, templateSelector} from '../../api/template'
import {loginSelector,fethFilter} from '../../api/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import AddTemplate from './createTemplate'
import DataTable from './datatable'
import { Input ,Button } from 'antd';
import {Link} from 'react-router-dom'
import {SearchOutlined} from '@ant-design/icons'
import styled from 'styled-components'
import axios from 'axios'
import key from '../../key'
import { useDebounce } from "use-debounce";
// const {FormItem} = Form



export default function Template() {

  const dispatch = useDispatch()
  const { template } = useSelector(templateSelector)
  const {filter} = useSelector(loginSelector)
  console.log(filter);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000);
  const [visible, setVisible] = useState(false)
console.log(template);

  useEffect(()=>{

      dispatch(fetchAllTemplate())

  }, [dispatch])


  const { Search } = Input;


  // useEffect(()=>{
  //     dispatch(fethFilter('brand-admin', debouncedText ))
  //   setLoading(false)
  //    }, [dispatch, debouncedText])
  
  

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

  <Search placeholder="Search Template" className="mx-3"  onChange={onSearch} style={{ width: 230 }} enterButton />
  <Link to="/admin/create-template">
            <Button onClick={()=>setVisible(true)}  type="primary" >
             Add Template</Button>
  </Link> 

</div>
{

 <DataTable loading={loading}
  data ={(filter.length> 0) ? filter : template}/>

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





