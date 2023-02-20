import React from 'react'
import {Table, Space} from 'antd'
import DeleteConfirm from '../../shared/deleteConfirm'
import {Link} from 'react-router-dom'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import { deleteUser} from '../../api/hrSlice'

export default function Datatable({data}) {

    const dispatch = useDispatch()

    const confirm = (e, id) => {

        dispatch(deleteUser(id))
       
      }
      
      const cancel = (e) =>{
          return null
        }
        

      const columns = [
       
        {
          title: 'Name',
          dataIndex: 'hr_name',
          key: 'name',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
        {
          title: 'Coupon',
          dataIndex: 'coupon',
          key: 'coupon',
        },
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Billing',
          dataIndex: 'billing',
          key: 'billing',
        },
        {
          title: 'Points',
          dataIndex: 'points',
          key: 'points',
        },
        {
          title: 'Value',
          dataIndex: 'alue',
          key: 'value',
        },
        {

            title:'Action',
    
            render: record =>{
    
             
                return <Space size="middle">
                  
                <h5 className="m-0">
                  <Link to={`/admin/users/${record._id}`}>
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
        <div>
            <Table dataSource={data} 
                        style={{overflowY:'auto', height:'77vh', overflowX:'hidden' }}
                        columns={columns} />
        </div>
    )
}
