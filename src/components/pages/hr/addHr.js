import React from 'react'
import Modal from '../../shared/modal'
import {Form, Checkbox, Button, Input} from 'antd'
import { UserAddOutlined } from '@ant-design/icons';
import {createHr} from '../../api/hrSlice'
import {showModal} from '../../api/modalSlice'
import {useDispatch} from 'react-redux'

const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };


export default function AddHr() {
    const [form] = Form.useForm();

    const dispatch = useDispatch()


    
    const onFinish = (values) => {
        dispatch(createHr(values));
        dispatch(showModal(false));
        form.resetFields()

      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        form.resetFields()
      };

    return (
        <Modal mtitle="Add Customer" btitle="Add Customer"   width='45%'  >
              <Form
      {...layout}
      form={form}

      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name=""
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
        name="phone_number"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input phone number!' }]}
      >
        <Input addonBefore={'+91'} style={{ width: '100%' }} />
      </Form.Item>



      <Form.Item
        name="email"
        label="E-mail"
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
        label="coupons"
        name=""
        rules={[
          {
            required: true,
            message: 'Please input Company Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="password"
        label="Password"
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
            message: 'Please confirm password!',
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
      </Form.Item> */}


  

      <Form.Item
        label="Bill up"
        name=""
        rules={[
          {
            required: true,
            message: 'Please input Company Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>



 

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Add customer
        </Button>
      </Form.Item>
    </Form>
        </Modal>
    )
}
