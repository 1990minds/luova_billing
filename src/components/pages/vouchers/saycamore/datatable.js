import React, {useState}  from 'react'
import { Table, Space } from 'antd';
import moment from 'moment'
import {timeformateDate, timeExpiterDate} from '../../../shared/timeFormate'
import DeleteConfirm from '../../../shared/deleteConfirm'
import { FcCheckmark,  } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import styled from 'styled-components'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import EditCoupon from './editVoucher'
import Toolbar from './toolbar'
import {deleteCoupon} from '../../../api/couponSlice'
import {Link} from 'react-router-dom'
import { Descriptions } from 'antd';

export default function Datatable({data}) {

const [ids, setIds] = useState([])

const dispatch = useDispatch()

const confirm = (e, id) => {

  console.log(id);

  dispatch(deleteCoupon(id))
 
}

const cancel = (e) =>{
  return null
}



  const columns = [
    {
        title: 'Coupon',
      dataIndex: 'coupon_id',
      render: text => <p className="text-secondary m-0">{text}</p>,
    },
    {
      title: 'CVV',
    dataIndex: 'cvv',
    
    },
    {

        title:'Activated Date',
        dataIndex:'activateDate',
        render : record =>{
        if(record){
          return <small className="text-secondary m-0">{record}</small>

        }
        <small className="text-secondary m-0">not yet active</small>
        }
    },
    {
      title: 'Value',
      dataIndex: 'amount',
    render: value => <p className="text-secondary m-0">&#x20B9;{value}</p>,
    
    filters: [
        {
          text: '100',
          value: 500,
        },
        {
          text: '250',
          value: 500,
        },
        {
          text: '500',
          value: 500,
        },
        {
          text: '1000',
          value: 1000,
        },
      ],
      filterMultiple: false,
    onFilter: (value, record) => value === record.amount,
    },
    {
      title: 'Validity',
      dataIndex: 'expiry_date',
    render: (record, data) =>{        
   if(data.isactive){
    return(<small className="text-secondary m-0">{ moment(record).format("MMM Do YYYY")}</small>)
   }
   return <small className="text-secondary m-0">not activated</small>

    }
    },
    {
      title: 'Issued status',
      dataIndex: 'issued',
    render: record =>{ 

     return(<small className="text-secondary m-0">{record?  <FcCheckmark/>: <AiOutlineClose/>}</small>)

    },
    filters: [
        {
          text: 'issued',
          value: true,
        },
        {
          text: 'not issued',
          value: false,
        },
      ],
      filterMultiple: false,
    onFilter: (value, record) => value === record.issued,
    },
    {
      title: 'Active status',
      dataIndex: 'isactive',
    render: record =>{ 

     return(<small className="text-secondary m-0">{record? <FcCheckmark/>: <AiOutlineClose/>}</small>)

    }
    },

    
    // {
    //     title:'User',
    //     dataIndex:'user',
    //     render: record =>{
    //         return(<>  
    //         <p className="text-secondary m-0">{record ?  <span>assigned to <b className="text-success">{record.email}</b></span> : <span className="text-secondary">Anonmyous</span>}</p>           
    //         </>)
    //     },
    
    // },
    {
      title:'User',
      dataIndex:'assignedTo',
      render: record =>{
          return(<>  
          <p className="text-secondary m-0">{record ? <span>Assigned to <b className="text-success">{record}</b></span> : <span className="text-secondary">Anonmyous</span>}</p>           
          </>)
      },
  
  },
    {

        title:'Action',
        key:"_ac",
        render: record =>{

         
            return <Space size="middle">
              
            <h5 className="m-0">
              <Link to={`/admin/luova-gift-card/${record._id}`}>
            <FaRegEdit/>
            </Link>
              
              </h5>
          <h5 className="text-danger m-0">
              <DeleteConfirm confirm={(e)=>confirm(e, record._id)} title="blog" 
               cancel={cancel} >
                  <FaRegTrashAlt style={{cursor:"pointer"}} />
              </DeleteConfirm>
          </h5>

          </Space>
        },

        
    },
    
  ];

 


  const rowSelection = {
    onChange: (selectedRowKeys) => {

    
        setIds(selectedRowKeys)

    }
  };



    return (
     <DataTableWrap>

<Toolbar ids={ids} data={data}/>

<div>

 {data &&  <Table dataSource={data}
            style={{overflowY:'auto', height:'77vh', overflowX:'hidden' }}
            columns={columns}
            rowSelection={rowSelection}
            rowKey = {(record => record._id)}
            expandable={{
              expandedRowRender: record => {

                return <div class="container">
                  <div class="row">

<Descriptions title="USER INFO"  >

<div style={{width:"100%"}} class="col-12">    <p className="pl-5" >User Name : <b>{record.user.user_name || "null"}</b></p>
    <p className="pl-5" >Email : <b>{record.user.email || "null"}</b></p>
    <p className="pl-5" >Phone : <b>{record.user.phone_number || "null"}</b></p> 
    <p className="pl-5" >Number of orders : <b>{record.user.orders.length || "null"}</b></p>
    </div>
  
  </Descriptions>
  </div>
  
  

    {/* <div class="container">
    <div class="row">
    <div class="col-4">
    <p><b className="pl-5">Item</b></p>
    </div>
    <div class="col-4">
    <p className="pl-5"><b>Quantity</b></p>
    </div>
    <div class="col-4">
    <p className="pl-5"><b>Price</b></p>
    </div>

    </div>
    </div> */}
    

</div>    


              },
              rowExpandable: record => record.user  !== null,
            }}
            />}
</div>
            
        </DataTableWrap>
    )
}


const DataTableWrap = styled.div`

svg{

    font-size:1.2rem;
    text-align:center;
}
.ant-descriptions-title{

padding-left:2rem;
font-size:1rem;
color:grey;

}
`