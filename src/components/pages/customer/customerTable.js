import React from 'react'
import {Table, Space} from 'antd'
import DeleteConfirm from '../../shared/deleteConfirm'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import { deleteUser} from '../../api/hrSlice'
import DescTable from './couponTable'

export default function Datatable({data,loading}) {

    const dispatch = useDispatch()

        console.log(data);
        const array= data?.map((item)=>{
         return item.orders.concat(item.productorders)

        })     
     
      

      const columns = [
        {
          title: 'Name',
          dataIndex: 'user_name',
          key: 'user_name',
          render: (value)=> <p className="m-0  text-capitalize">{value}</p>   

        },
        
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone No.',
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
        {
          title: 'Coupon Amount',
          dataIndex: 'coupons',
          render: (coupons)=>{
           return coupons.map((item)=>{
             
              return<p>{item?.initial_amount}</p>

            })
            
          }
        },
        {
          title: 'Balance',
          dataIndex: 'coupons',
          key: 'coupons',
          render: (coupons)=>{
         
            const total = coupons?.reduce((balance,num) =>{
              // return  balance = num.isAdded ? balance + num.amount : balance        
              return  balance = balance + num.amount        
         },0 )
            return <p className="m-0  text-capitalize">{total}</p>  } 

        },
        {
          title: 'Total',
          render: (item)=>{
  
         const array = item.orders.concat(item.productorders)
         console.log(array);
          const totalamount = array?.reduce((balance,num) =>{
              
            return  balance = balance + num.total        
       },0 )
       return <p className="m-0  text-capitalize">{totalamount}</p> 
        },

      }
      ]

    return (
        <div>
            <Table 
            loading={loading}
            dataSource={data} 
            style={{overflowY:'auto', height:'77vh', overflowX:'hidden' }}
            columns={columns} 
            rowKey={(record)=>record._id}

            expandable={{
              expandedRowRender: record => {
                return <div className="px-4 py-2 text-sm " style={{width:'100%', color:'grey'}}>       
         
                             <DescTable data = {record} />
 
              </div>
             }, 
           } }
            />
        </div>
    )
}
