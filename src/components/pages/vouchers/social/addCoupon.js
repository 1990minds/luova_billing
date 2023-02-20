import React,{useState, useEffect} from 'react'
import Modal from '../../../shared/modal'
import {Form, InputNumber,Switch,  Button,Select,Checkbox, Input} from 'antd'
import {MdCardGiftcard} from 'react-icons/md'
import {createCoupons} from '../../../api/sCouponSlice'
import {useDispatch, useSelector} from 'react-redux'
import {showModal} from '../../../api/modalSlice'
import {fetchAllBrands, brandSelector} from '../../../api/brandSlice'
import ReactQuill from 'react-quill';

const { Option } = Select;


const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 15,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };


export default function AddSocialCoupon() {

  const [form] = Form.useForm();
  const { brands, loading } = useSelector(brandSelector)
  const [terms, setTerms] = useState('');

    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);


    useEffect(()=>{

      dispatch(fetchAllBrands())
  
  }, [dispatch])
  

    const onQtyChange = (value) => { 
      return setQty(value.quantity)

    }

    const onFinish = (values) => {
        dispatch(createCoupons(values))
        dispatch(showModal(false))
        form.resetFields()
        setTimeout(() => {
          window.location.href ='/admin/e-vouchers'          
        }, 1000);

      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const handleSelectBrand = (value) =>{
        console.log(`selected ${value}`)
      
      }
      

    return (
      <Modal  width="50%"  btitle="Create E-Voucher Coupon" mtitle="Add E-Voucher Coupon" icon={<MdCardGiftcard className="mr-1" style={{transform:"translateY(-0.1rem)"}}/>}>
      <Form
      {...layout}
  
      name="basic"
      initialValues={{ remember: true }}
      form={form}
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
        <InputNumber min={1}   />

      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        initialValue={1}
        rules={[
          {
            required: true,
            message: 'required!',
          },
        ]}
      >

        <InputNumber min={1}  defaultValue={1} />
        

      </Form.Item>



      {/* <Form.Item
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
         {/* <ReactQuill theme="snow" value={terms} onChange={setTerms}/>

      </Form.Item> */}

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
       <Switch defaultChecked={false}/>
      </Form.Item>


     
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </Modal>
    )
}
