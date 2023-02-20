import React, {useEffect,useState} from 'react'
import {fetchAllSCoupons, scouponsSelector} from '../../../api/sCouponSlice'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../../shared/loader'
import AddSCoupon from './addCoupon'
import DataTable from './datatable'
import ExcelBtn from './exportExcel'
import { Input  } from 'antd';
import { useDebounce } from "use-debounce";
import {loginSelector,fethFilter} from '../../../api/authSlice'


// const {FormItem} = Form
export default function SVouchers() {

  const dispatch = useDispatch()
  const {sAllCoupons } = useSelector(scouponsSelector)
  const {filter} = useSelector(loginSelector)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [debouncedText] = useDebounce(search, 1000)
  
console.log(filter);
console.log(sAllCoupons);

      useEffect(()=>{
      dispatch(fetchAllSCoupons())
      }, [dispatch])



      const { Search } = Input;

      
      useEffect(()=>{
        dispatch(fethFilter('admin-socialcoupons', debouncedText ))
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
  <div className="mb-3 float-right">
  <Search placeholder="Search Voucher"  onChange={onSearch} style={{ width: 230 }} enterButton />
  <ExcelBtn  data={sAllCoupons} />
  <AddSCoupon />  

</div>
{

 <DataTable loading={loading}
 data ={(filter.length> 0) ? filter : sAllCoupons}/>

}
    </>
       )
}  







