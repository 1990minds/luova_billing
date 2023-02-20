import React,{useState} from 'react'
import {Table, Space,Button } from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux'
import {createProductOrderPdf, couponsSelector} from '../../../api/productSlice'

export default function Datatable({data,loading}) {


    const dispatch = useDispatch()
    const [loadings,setLoading] =useState(false)
    const [item,setItem] =useState(null)

    // dispatch(createProductOrderPdf(value))

  
    const handlechange = (value) =>{
        dispatch(createProductOrderPdf(value))
        setLoading(true)
            setItem(value._id)
        setTimeout(()=>{
            setLoading(false)
            setItem(null)
        },3000)
        }

    const columns = [
        {
            title:"Name",
            render: (value)=>{

                if(value.user){

                return <p>{value.user.email}</p>
                  
                }
                
               if(value.existUser) {
                    
                  return   <p>{value.existUser.email}</p>

                }

                // value && value.user ? value.user.email : value.existUser.email
                return null
            }
            
            
        },

        {
            title:"Order ID",
            dataIndex:"sycOrderId",

        },
        {
            title:"Razorpay Order ID",
            dataIndex:"orderId",

        },
        
        {
            title:'Invoice',
            render: (value)=>  
            <Button type="primary" onClick={()=>handlechange(value)}>
               {(loadings && item === value._id) ? 'Loading': 'Download'}
            </Button>
        }
    ]

    return (
        <SDataModelWrap>
             <Table
             loading={loading} 
             dataSource={data}
            columns={columns}
            style={{overflowY:'auto', height:'79vh', overflowX:'hidden' }}

            rowKey = {(record => record._id)}
            expandable={{
                expandedRowRender: record => {
                
                   
                    return <div >   
                
    
  
      <div class=" text-left" >
      <div class="row">
      <div class="col-2 ">
      <p><b className="pl-4">Sl.No</b></p>
      </div>
      <div class="col-2">
      <p><b className="">Item</b></p>
      </div>
      <div class="col-2">
      <p className=""><b>Quantity</b></p>
      </div>
      <div class="col-2">
      <p className=""><b>Unit Price</b></p>
      </div>
      <div class="col-2">
      <p className=""><b>Total Price : {record.total }</b></p>
      </div>
      </div>
      </div>
      
      {
          record?.products?.map((item,i)=>{
           return <div key={i} class=" text-left">
            <div class="row">
            <div class="col-2">
            <p className=" pl-4">{i+1}</p>
            </div>
            <div class="col-2">
            <p className="">{item.name}</p>
            </div>
            <div class="col-2">
            <p className="">{item.qty}</p>
            </div>
            <div class="col-2">
            <p className="">{item.value }</p>
            </div>
          
            </div>
            </div>


          })
      }

  </div>    
  
  
                },
                rowExpandable: record => record.user  !== null,
              }}
         

            /> 
         
        </SDataModelWrap>
    )
}


const SDataModelWrap = styled.div`

`