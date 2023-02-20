import React, {useState} from 'react'
import {Table, Space} from 'antd'
import {MdCardGiftcard} from 'react-icons/md'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import { AiOutlineClose } from "react-icons/ai";
import DeleteConfirm from '../../../shared/deleteConfirm'
import {deleteSCoupon} from '../../../api/sCouponSlice'
import { FcCheckmark,  } from "react-icons/fc";


export default function Datatable({data,loading}) {

    const dispatch = useDispatch()

const confirm = (e, id) => {

  console.log(id);
  dispatch(deleteSCoupon(id))
    setTimeout(() => {
        window.location.href ='/admin/e-vouchers'          
    }, 1000);
    }

const cancel = (e) =>{
    return null
  }
  

    const columns = [

        {
            title:"Coupon Name",
            dataIndex:"name",
            render: (text)=>{

                return <h6 className="m-0">
                    <MdCardGiftcard className="bg-dark voucher"/>
                    <small className="mx-3 text-capitalize">{text}</small>
                    </h6>

            }
        },

        {
            title:"Brand",
            dataIndex:"brand",
            render: (text)=>{

                return <h6 className="m-0">
                    <small className="text-capitalize">{text?.name}</small>
                    </h6>

            }
        },
        {
            title:"Value",
            dataIndex:"value",
        render: (value)=> <p className="m-0">&#x20B9;{value}</p>   

        },
        {
            title:"validity",
            dataIndex:"validity"
        },
        {
            title:"Quantity",
            dataIndex:"quantity",
            render: (value)=> <p className="pl-2">{value}</p>   
                    
        },
        {
            title: 'Active status',
            dataIndex: 'status',
          render: record =>{ 
      
           return(<small className="text-secondary m-0">{record? <FcCheckmark/>: <AiOutlineClose/>}</small>)
      
          }
        },
        {

            title:'Action',
    
            render: record =>{
    
             
                return <Space size="middle">
                  
                <h5 className="m-0">
                <Link to={`/admin/e-vouchers/${record._id}`}>
                <FaRegEdit/>
                </Link>
                  
                  </h5>
              <h5 className="text-danger m-0">
                  <DeleteConfirm confirm={(e)=>confirm(e, record._id)} title="blog" cancel={cancel} >
                      <FaRegTrashAlt style={{cursor:"pointer"}} />
                  </DeleteConfirm>
              </h5>
    
              </Space>
            }
        }
    ]


    return (
        <SDataModelWrap>
             <Table 
             loading={loading}
             dataSource={data}
            columns={columns}
            style={{overflowY:'auto', height:'77vh', overflowX:'hidden' }}

            rowKey = {(record => record._id)}
            /> 
         
        </SDataModelWrap>
    )
}


const SDataModelWrap = styled.div`

.voucher{

font-size:2.2rem;
padding:0.3rem ;
color:orange;
border-radius:5px;
}
small {

    font-size:1rem;
}

.ant-table-thead > tr > th {
  text-align: left !important;
  padding-left: 50px !important;
}

.ant-table-tbody > tr > td {
  text-align: left !important;
  padding-left: 50px !important;

}

svg{

font-size:1.2rem;
text-align:center;
}
`