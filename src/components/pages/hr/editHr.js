import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import {fetchAllUsers, fetchCurrentUser, hrSelector, updateHr} from '../../api/hrSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';

export default function EditHr() {

    const dispatch = useDispatch()
const {currentUser, loading} = useSelector(hrSelector)
const [form] = Form.useForm();

const {id} = useParams()

useEffect(()=>{

    dispatch(fetchCurrentUser(id))
    
    
    }, [dispatch])




    useEffect(()=>{

        form.setFieldsValue({
          company_name:currentUser && currentUser.company_name,
          email: currentUser && currentUser.email,
          hr_name: currentUser && currentUser.hr_name,
          phone_number: currentUser && currentUser.phone_number,
      
          });


    }, [currentUser])



    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 4,
          span: 16,
        },
      };



      const onFinish = (values) => {

        dispatch(updateHr(id, values))
        
        
        
        };
        
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };


    // const dispatch = useDispatch()
    return (
        <>      

         
  {
      loading ? <Loader/> : 
      <div>
              <h5 className="">Update User</h5>
              <hr style={{height:"0.1rem"}} className="mb-5 mt-3 bg-light border-0"/>

              <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="hr_name"
        rules={[
          {
            required: true,
            message: 'Please input username!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
      
        label="E-mail"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
     
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


  

      <Form.Item
        label="Company Name"
        name="company_name"
        rules={[
          {
            required: true,
            message: 'Please input Company Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input phone number!' }]}
      >
        <Input addonBefore={'+91'} style={{ width: '100%' }} />
      </Form.Item>



 

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
}   
                 
        </>
    )
}
