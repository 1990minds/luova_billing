import React, {useEffect,useState} from 'react'
import {fetchAllProducts, productSelector} from '../../api/productSlice'
import {loginSelector,fethFilter} from '../../api/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Input  } from 'antd';
import { useDebounce } from "use-debounce";


// const {FormItem} = Form
export default function Products() {

  const dispatch = useDispatch()
  const {products } = useSelector(productSelector)
  const {filter} = useSelector(loginSelector)
  console.log(filter);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)


useEffect(()=>{

dispatch(fetchAllProducts())


}, [dispatch])

const { Search } = Input;


  useEffect(()=>{
      dispatch(fethFilter('products', debouncedText ))
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
<div className="mb-4 float-right ">
    <div className="mx-3">

<Search placeholder="Search Products" className="mx-3" onChange={onSearch} style={{ width: 230 }} enterButton />
    <Button type="primary">
        <Link to="/admin/create-product">Add Product</Link>
    </Button> 
</div>
</div>
{

 <DataTable loading={loading}
 data ={(filter.length> 0) ? filter : products}/>

}
    </>
       )
}  







