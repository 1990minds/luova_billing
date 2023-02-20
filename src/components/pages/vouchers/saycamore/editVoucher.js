import React, { useEffect } from 'react'
import { Form, Input, Button,Switch, InputNumber, Select } from 'antd';
import {fetchCurrentCoupon, assignCouponManuel, updateCoupon, couponsSelector} from '../../../api/couponSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../../shared/loader';

const { Option } = Select;

export default function EditVoucher() {

    const dispatch = useDispatch()
const {currentCoupon, loading} = useSelector(couponsSelector)
const [form] = Form.useForm();

const {id} = useParams()

useEffect(()=>{

    dispatch(fetchCurrentCoupon(id))   
    
    }, [dispatch])


    useEffect(()=>{
      let d = new Date().toISOString() 

        form.setFieldsValue({
            email: currentCoupon?.coupon?.assignedTo ? currentCoupon?.coupon?.assignedTo : '',
            // user: currentCoupon && currentCoupon.coupon.user ? currentCoupon.coupon.user.user_name : '',
            isactive: currentCoupon && currentCoupon.coupon.isactive || false,
            coupon_id: currentCoupon && currentCoupon.coupon.coupon_id || '',
            validity_days: currentCoupon && currentCoupon.coupon.validity_days,
            // emp_id: currentCoupon && currentCoupon.coupon.user ? currentCoupon.coupon.user.emp_id : '',
            // company_name: currentCoupon && currentCoupon.coupon.user ? currentCoupon.coupon.user.company_name : '',
            // phone_number: currentCoupon && currentCoupon.coupon.user ? currentCoupon.coupon.user.phone_number : '',
            // user_name: currentCoupon && currentCoupon.coupon.user ? currentCoupon.coupon.user.user_name : '',
            // hr_email: currentCoupon && currentCoupon.coupon.user ? currentCoupon.coupon.user.hr.email : '',
            amount: currentCoupon && currentCoupon.coupon ? currentCoupon.coupon.amount : '',
            // activateDate: currentCoupon && currentCoupon.coupon ? currentCoupon.coupon.isactive ? d : 'not yet active' : 'not yet active' ,

          });

      
    }, [currentCoupon])



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

        currentCoupon && currentCoupon.coupon.user ?
         dispatch(updateCoupon(id, values))  :  
         
         dispatch(assignCouponManuel(values))
                  
        };
        

        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

    // const dispatch = useDispatch()
    return (
        <>       
  {
      loading ? <Loader/> : 
      <div >
              <h5 className="">{ currentCoupon && currentCoupon.coupon.user? "Update Coupon" : "Assign Coupon"}</h5>
              <hr style={{height:"0.1rem"}} className="mb-4 mt-3 bg-light border-0"/>

             <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      style={{overflowY:'auto', height:'75vh', overflowX:'hidden' }} 
      
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >


<Form.Item
        label="Coupon Id"
        name="coupon_id"
        rules={[
          {
            required: true,
            message: 'Please input Coupon Id!',
          },
        ]}
      >
        <Input disabled className="text-success"/>

      </Form.Item>

      <Form.Item
                label="Expiry Date in days"
                name="validity_days"
                rules={[{ required: true,  message: 'is Required!' }]}

              >
               <InputNumber className="w-100" min={1}  />
        
       </Form.Item>


      <Form.Item
        label="Email"
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
        <Input  disabled={currentCoupon?.coupon?.user ? true : null}/>
      </Form.Item>

     

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Please input amount!',
          },
        ]}
      >
       {/* <InputNumber min={1}/> */}
            <Select  >
            <Option value={100}>100</Option>
            <Option value={250}>250</Option>
            <Option value={500}>500</Option>
            <Option value={1000}>1000</Option>
            <Option value={2500}>2500</Option>

          </Select>
      </Form.Item>




      <Form.Item
        label="issued status"
        name="issued"
        initialValue={true}
        required = {[
          {required:true, message:'required'}
        ]}
      >
       <Switch disabled={currentCoupon && currentCoupon.coupon.user ? true : false}  defaultChecked={true}/>
       
      </Form.Item>

      <Form.Item
        label="active status"
        name="isactive"
      
      >
       <Switch defaultChecked={currentCoupon && currentCoupon.coupon.isactive}/>
       
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
