import React,{useState, useEffect} from 'react'
import {Form, InputNumber,Switch,  Button,Select,Checkbox, Input} from 'antd'
import {fetchOneScoupons, updateSCoupons, scouponsSelector} from '../../../api/sCouponSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../../shared/loader';
import {fetchAllBrands, brandSelector} from '../../../api/brandSlice'
import ReactQuill from 'react-quill';

const { Option } = Select;


export default function EditSVoucher() {

    const dispatch = useDispatch()
const {currentScoupon, loading} = useSelector(scouponsSelector)
const [form] = Form.useForm();
const { brands } = useSelector(brandSelector)
const [terms, setTerms] = useState('');

const {id} = useParams()


useEffect(()=>{

    dispatch(fetchOneScoupons(id))
    dispatch(fetchAllBrands())

  }, [dispatch])

console.log(currentScoupon);

    useEffect(()=>{

        form.setFieldsValue({
            brand: currentScoupon && currentScoupon.brand,
            name: currentScoupon && currentScoupon.name,
            validity: currentScoupon && currentScoupon.validity,
            value: currentScoupon && currentScoupon.value,
            quantity: currentScoupon && currentScoupon.quantity,
            description: currentScoupon && currentScoupon.description,
            terms: currentScoupon && currentScoupon.terms,
            status: currentScoupon && currentScoupon.status || false,
            code: currentScoupon && currentScoupon.code || false,

          });
    }, [currentScoupon])



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
        // console.log(values);
        dispatch(updateSCoupons(id, values))
        
        };
        
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };


        const handleSelectBrand = (value) =>{
          console.log(`selected ${value}`)
        
        }

    // const dispatch = useDispatch()
    return (
        <>      

         
  {
      loading ? <Loader/> : 
      <div>
              <h5 >Update Coupon</h5>
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
    label={<p className=" w-32 text-left m-0">Brand Name</p>}
      name="brand"
      rules={[{ required: true , message: 'required!'}]}
    >

          <Select 
          placeholder="Select Brand"   
          onChange={handleSelectBrand}
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          > 
              {
                brands && brands.map((item, i)=>{ 
                return  <Option key={i} value={item._id}>{item.name}</Option>
                })
              }
  </Select>
  </Form.Item>


  <Form.Item
        label="Coupon Name"
        name="name"
        rules={[{ required: true , message: 'required!'}]}

      >
        <Input className=" text-capitalize"  />

      </Form.Item>




      <Form.Item
        label="Validity"
        name="validity"
        rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Value"
        name="value"
        rules={[
          {
            required: true,
            message: 'required!',
          },
        ]}
      >
        <InputNumber min={1}  defaultValue={1} />

      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: 'required!',
          },
        ]}
      >
        <InputNumber min={1}  defaultValue={1} />

      </Form.Item>

{/* 
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'required!',
          },
        ]}
      >
         <Input.TextArea rows={2}/>

      </Form.Item>

      <Form.Item
        label="terms and conditions"
        name="terms"
        rules={[
          {
            required: true,
            message: 'required!',
          },
        ]}
      > */}
         {/* <Input.TextArea rows={2}/> */}
         {/* <ReactQuill theme="snow" value={terms} onChange={setTerms}/> */}

      {/* </Form.Item> */}

      <Form.Item 
      label="code "
       name="code" 
       valuePropName="checked">
       <Checkbox ></Checkbox>
      </Form.Item>


      <Form.Item
        label="active status"
        name="status"
      >
       <Switch defaultChecked={currentScoupon && currentScoupon.status}/>

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
