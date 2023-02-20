import React, {useState} from 'react'
import Upload from '../../../shared/toolbar'
import GenrateCouponBtn from '../../../shared/modal'
import { Form,  Button, InputNumber, Input  } from 'antd';
import { showModal } from '../../../api/modalSlice'
import {useDispatch, useSelector} from 'react-redux'
import keyUri from '../../../key'
import axios from 'axios'
import {issueCoupons,couponsSelector, generateCoupons, fetchFilterCoupon} from '../../../api/couponSlice'
import { AudioOutlined } from '@ant-design/icons';
import { DatePicker} from 'antd'
import ExcelBtn from './exportExcel'
const { RangePicker } = DatePicker;


const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


export default function Toolbar({ids, data}) {
  const [form] = Form.useForm();

    const dispatch = useDispatch()
    const [exceldata, setExcelData] = useState(null)
    const {coupons, loading } = useSelector(couponsSelector)

const [state, setstate] = useState('')
console.log(exceldata);

    const onFinish = values => {
        dispatch(generateCoupons(values))
        dispatch(showModal(false))
        form.resetFields()

      };
      
      const onFinishFailed = errorInfo => {
        alert(errorInfo)
      };


      const { Search } = Input;
      const onSearch = value => {

        
        dispatch(fetchFilterCoupon(value))
        setstate(value)
      console.log(value);
      }


      
const onChangeDate = (date, dateString) =>{

  console.log('testtttttttttt');
  
  console.log(date, dateString);
  
  axios.post(keyUri.BACKEND_URI + `/coupon-date`, date).then(({data})=>{
    // console.log(data);

//     const couponarray = [] 

//     data?.coupon.map((item,i) => {
//       console.log(item);
//       couponarray.push(item)

//       const name = item.map(pr=>{

//         return {Coupon: pr.coupon_id, CVV :pr.cvv,GeneratedDate:pr.createdAt,ActivatedDate:pr.isactive,
//           Value:pr.amount,Validity:pr.expiry_date,Issuedstatus:pr.issued,Activestatus:pr.isactive,user:pr.user.name}
//       })

//       couponarray[i].prd = JSON.stringify(name)  
//       console.log(JSON.stringify(name.toString()))

// })
    setExcelData(data.coupon)
     })
}


    
    return (
        <div className="mb-4">
          <div className="d-flex justify-content-between">
        <div className="d-flex mr-3">
           {/* <Upload/> */}
           <Button onClick={()=>dispatch(issueCoupons(ids))} className="mr-3" type="primary" danger>Issue Selected Coupons</Button>
           <Search placeholder="Search Coupon" onSearch={onSearch} style={{ width: 230,paddingRight:"15px" }} enterButton />

           <RangePicker onChange={onChangeDate}/>
           <ExcelBtn  data={(exceldata && exceldata?.length > 0  ) ? exceldata : data} />
        </div>


        <GenrateCouponBtn
        mtitle="Generate Coupons"
        btitle="Generate Coupons"
        width="40%"
        >
        
        <div className="" >
        <Form
        className="pt-3"
              {...layout}
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label=" Number of coupons"
                name="number_gen"
                rules={[{ required: true, message: 'is required!' }]}
                initialValue={1}
              >
               <InputNumber className="w-50" min={1} max={100}  />
               
              </Form.Item>
        
              <Form.Item
                label="Expiry Date in days"
                name="expiry_date"
                rules={[{ required: true,  message: 'is Required!' }]}
                initialValue={365}

              >
               <InputNumber className="w-100" min={1}  />
        
              </Form.Item>
        
        
              <Form.Item {...tailLayout}>
                <Button type="primary" danger htmlType="submit">
                  Genrate coupons
                </Button>
              </Form.Item>
            </Form>
          
        
            </div>
   
        
        </GenrateCouponBtn>
        </div>       
        </div>
    )
}
