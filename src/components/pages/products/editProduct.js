import React, { useEffect,useState } from 'react'
import {Form, InputNumber,Switch,  Button, Input, Upload, Image, Row, Col} from 'antd'
import {updateProduct, productSelector, fetchOneProduct} from '../../api/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loaderImg';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function EditProduct() {

const dispatch = useDispatch()
const {currentProduct, loading} = useSelector(productSelector)
const [form] = Form.useForm();
const [imgurl, setImgurl] = useState([])
const [loading1, setLoading1] = useState(false)
const [fileList, setFileList] = useState([])
const [checked, setChecked] = useState();
const {id} = useParams()
console.log(currentProduct);

useEffect(()=>{

    dispatch(fetchOneProduct(id))
    
    }, [dispatch])



    useEffect(()=>{
            currentProduct && setImgurl([ currentProduct && currentProduct.product.image])

        form.setFieldsValue({
            name:currentProduct && currentProduct.product.name,
            // image:currentProduct && currentProduct.product.image,
            quantity: currentProduct && currentProduct.product.quantity,
            description: currentProduct && currentProduct.product.description,

            price: currentProduct && currentProduct.product.value,

            priority:currentProduct && currentProduct.product.priority,
            hasPriority:currentProduct && currentProduct.product.hasPriority

      
          });


    }, [currentProduct])



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

        const imgdata = {

            name:values.name,
            description:values.description,
            // image:(values.image === undefined) ? currentProduct && currentProduct.product.image  : values.image[0].response.imgname,
            image: imgurl.length>=1 ? imgurl[0] : null,
            quantity:values.quantity,

            value:values.price,

            hasPriority:values.hasPriority,
            priority:values.priority


        }

        dispatch(updateProduct(id, imgdata))
        
        
        
        };
        
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

     

        const handleChange = info => {
          setLoading1(true)
             
              storage
              .ref("images/" + info.file.name)
              .put(info.file.originFileObj)
              .then(snapshot => {
                return snapshot.ref.getDownloadURL();
              })
              .then(url => {
                console.log(url);
                setImgurl([...imgurl, url])
                setLoading1(false)
          
              })
              .catch(error => {
                console.log(error);
              });
          
            };
          
        
            const remove = (e, url) =>{
        
              setImgurl(prev => prev.filter(item => item !== url))
              
              }
        
              const uploadButton = (
                  <div>
                    { loading1 ? <LoadingOutlined  /> : <PlusOutlined />}
                    <div style={{ marginTop: 8, fontSize:"14px" }}>{loading1 ? "uploading" :""}</div>
                  </div>
                );

                const onChange=(value)=>{
                  console.log(`selected ${value}`)
                  setChecked(value)
                }

    return (
        <FormWrap>      

         
  {
      loading ? <Loader/> : 
      <div>
              <h5 className="">Update Product</h5>
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
        label="Product title"
        name="name"
      >
        <Input className=" text-capitalize"  />

      </Form.Item>



      <Form.Item
        label="price"
        name="price"
        rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
      >
      

          <Row gutter={10}>
            <Col span={5}>
                {

                imgurl.map((img, i)=>{

                  return <div className=" imglist " style={{height:"100px"}}>
                   
                  <Image    
                   preview={false}               
                   key={i}
                   style={{height:"100%", width:"100%", borderRadius: '0.25rem', display:'block', objectFit:'cover'}}
                   src={img}
                   placeholder={<Loader/> }              
                 />   

                  <h2 onClick={(e)=>remove(e, img)} className=" text-white  "> <MdDelete/></h2> 

                    </div>
                })
              }
              </Col>

                <Upload       
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        multiple={true}
                        style={{marginLeft:'0.5rem'}}
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                </Row>

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

      
      <Form.Item
        label="Priority"
        name="hasPriority"
      >
       <Switch defaultChecked={currentProduct && currentProduct?.product?.hasPriority} onChange={onChange} />
      </Form.Item>


        <Form.Item
        label="Priority Number"
        name="priority"
      >
       <InputNumber min={1} max={8}/>
      </Form.Item>

     
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
}   
                 
</FormWrap>
    )
}



const FormWrap = styled.div`
position: relative;

.imglist {
overflow: hidden;
background-color: #f1f1f1;
text-align: center;


h2 { opacity : 0;
display:none;
position: absolute;
margin: 0;
bottom: 1%;
background-color: rgba(0,0,0,0.5);
cursor: pointer;
transition: 0.1s;

&:hover {

font-size: 1.5rem;
}

}

&:hover h2 {

opacity : 1;
display:block
}
}

`