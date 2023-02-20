import React, {useState} from 'react'
import {Form, InputNumber, Switch, Button, Input, Upload, Image, Row, Col} from 'antd'
import {createProduct} from '../../api/productSlice'
import {useDispatch} from 'react-redux'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import Loader from '../../shared/loaderImg';
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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


export default function AddSocialCoupon() {

    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [imgurl, setImgurl] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [fileList, setFileList] = useState([])
    const [checked, setChecked] = useState();

    const onQtyChange = (value) => { 
      return setQty(value.quantity)

    }



    const onFinish = (values) => {

    const imgdata = {

        name:values.name,
        description:values.description,
        image: imgurl[0],
        quantity:values.quantity ,
        value:values.price
    }

    console.log(imgdata);
        dispatch(createProduct(imgdata))
      
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

               <Form
      {...layout}
  
      name="basic"
      initialValues={{ remember: true }}
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="mt-4"
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
        label="Quantity"
        name="quantity"
      
      >

        <InputNumber min={1}  value={qty} onChange={onQtyChange} />
        

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
       <Switch defaultChecked={false} onChange={onChange} />
      </Form.Item>


     { checked &&   <Form.Item
        label="Priority Number"
        name="priority"
      >
       <InputNumber min={1} max={8}/>
      </Form.Item>
}
     
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
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