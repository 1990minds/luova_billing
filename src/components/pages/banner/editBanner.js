import React, { useEffect } from 'react'
import {Form, InputNumber,  Button, Input, Upload} from 'antd'
import {updateBanner, bannerSelector, fetchOneBanner} from '../../api/bannerSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

export default function EditBanner() {

const dispatch = useDispatch()
const {current_banner, loading} = useSelector(bannerSelector)
const [form] = Form.useForm();

const {id} = useParams()

useEffect(()=>{

    dispatch(fetchOneBanner(id))
    
    }, [dispatch])



    useEffect(()=>{

        form.setFieldsValue({
            title:current_banner && current_banner.product.title,
            image:current_banner && current_banner.product.image,
            sub_title: current_banner && current_banner.product.sub_title,
            description: current_banner && current_banner.product.description,
         
      
          });


    }, [current_banner])



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



      const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };


      const onFinish = (values) => {

        const imgdata = {

            title:values.title,
            description:values.description,
            image:(values.image === undefined) ? current_banner && current_banner.banner.image  : values.image[0].response.imgname,
            sub_title:values.sub_title,
           
        }

        dispatch(updateBanner(id, imgdata))
        
        
        
        };
        
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

     
    return (
        <>      

         
  {
      loading ? <Loader/> : 
      <div>
              <h5 className="">Update Banner</h5>
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
        name="image"
        label="Banner Image"
        valuePropName="file"
        getValueFromEvent={normFile}
      >
        <Upload name="image" action="https://sycamoredev.herokuapp.com/api/uploads"  listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Banner title"
        name="title"
      >
        <Input className=" text-capitalize"  />

      </Form.Item>

      <Form.Item
        label="Sub title"
        name="sub_title"
      >
        <Input className=" text-capitalize"  />

      </Form.Item>

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
         <Input.TextArea rows={4}/>

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
