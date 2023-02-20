import React, {useState} from 'react'
import {Table, Space, Image,Button} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import DeleteConfirm from '../../shared/deleteConfirm'
import Loader from '../../shared/loader';
import { FcCheckmark,  } from "react-icons/fc";
import { AiFillEye } from 'react-icons/ai';
import moment from 'moment'
import { deleteTemplate } from '../../api/template';
import { FetchTempletePdf} from '../../api/template'

export default function Datatable({data,loading}) {

    const dispatch = useDispatch()
    const [item,setItem] =useState(null)
    const [downloadLoading,setDownloadLoading] =useState(false)
    const [loadings,setLoading] =useState(false)

const confirm = (e, id) => {
  dispatch(deleteTemplate(id))
 
}


const createPdf= (value)=> {      
  setDownloadLoading(true)
  setItem(value)
  dispatch(FetchTempletePdf(value))
  
  setTimeout(()=>{
    setDownloadLoading(false)
      setItem(null)
  },3000)

}

console.log(downloadLoading)


const cancel = (e) =>{
    return null
  }
  

    const columns = [

      {
        title:"Username",
        dataIndex:"user_name",
        render: (name)=>{

            return <h6>{name}</h6>

        }
    },

        {
            title:"Gift Code",
            dataIndex:"gift_code",
            render: (name)=>{

                return <h6>{name}</h6>

            }
        },

        {
          title:"CVV",
          dataIndex:"cvv",
          render: (name)=>{

              return <h6>{name}</h6>

          }
      },
       
        {
            title:"Value",
            dataIndex:"value",
            render: (name)=>{

              return <h6>{name}</h6>

          }
        },
 
        {
          title:"Logo",
          dataIndex:"logo",
          render:(imag)=>{
            console.log(imag);

      return <Image    
      preview={false}               
      style={{margin:'0px', width:"50px", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
      src={imag}
      className="bg-dark"
    />   

          }
      },

          {
            title:"Expiry Date",
            dataIndex:"expiry_date",
            render: (expiry_date)=>{

                return <h6>{ moment(expiry_date).format("MMM DD YYYY")}</h6>

            }
        },
       
    

    {
      title:'PDF',
      render: (value)=>  
      <Button type="primary" onClick={()=>createPdf(value._id)}>
      {(downloadLoading && item === value._id) ? 'Loading': 'Download'}
      </Button>
    },

  //   {
  //     title:'PDF',
  //     render: (id)=> (
      
  //       <Space size="middle">
  //      <Link to={`templatepdf/${id._id}`}>         
  //      <h5  style={{color: 'var(--brandColor' }}  className="text-secondary  m-0 ">
  //      <AiFillEye/>
  //       </h5> 
  // </Link>
 
  //     </Space>               
  
  //     )
  //   },
    

        {

            title:'Action',
    
            render: record =>{
    
             
                return <Space size="middle">
                  
                <h5>
                  <Link to={`/admin/template/${record._id}`}>
                <FaRegEdit/>
                </Link>
                  
                  </h5>
              <h5 className="text-danger">
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

svg{

font-size:1.2rem;
text-align:center;
}
`