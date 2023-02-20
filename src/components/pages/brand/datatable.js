import React from 'react'
import {Table, Space, Image} from 'antd'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import DeleteConfirm from '../../shared/deleteConfirm'
import {deleteBrand} from '../../api/brandSlice'
import Loader from '../../shared/loader';
import { FcCheckmark,  } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";


export default function Datatable({data,loading}) {

    const dispatch = useDispatch()

const confirm = (e, id) => {
  dispatch(deleteBrand(id))
 
}

const cancel = (e) =>{
    return null
  }
  

    const columns = [

        {
            title:"Brand Name",
            dataIndex:"name",
            render: (name)=>{

                return <h6 className="m-0 text-capitalize">
                  {name}
                    </h6>

            }
        },
       
        {
            title:"Image",
            dataIndex:"image",
            render:(image)=>{

        return <Image    
        preview={false}               
        style={{margin:'0px', width:"50px", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
        src={image}
        // placeholder={ }
        className="bg-dark"
      />   

            }
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
                  
                <h5>
                  <Link to={`/admin/brand/${record._id}`}>
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