import React,{useState} from 'react'
import Modal from '../../shared/modal'
import {Form,  Button, Input,Switch, Upload, Image,InputNumber, Row, Col, Select} from 'antd'
import {MdCardGiftcard} from 'react-icons/md'
import {createBrand} from '../../api/brandSlice'
import {useDispatch} from 'react-redux'
import {showModal} from '../../api/modalSlice'
import storage from '../../shared/storage'
import Loader from '../../shared/loaderImg';
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';

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


export default function AddBrand() {
  const [form] = Form.useForm();
  const [imgurl, setImgurl] = useState([])
  const [loading1, setLoading1] = useState(false)
  const [fileList, setFileList] = useState([])
  const [checked, setChecked] = useState();
  const [terms, setTerms] = useState('');
  const { Option } = Select;

    const dispatch = useDispatch();


    const onFinish = (values) => {
      console.log(values);
        const data={
          name:values.name,
          category:values.category,
          image: imgurl[0],
          status:values.status,
          hasPriority:values.hasPriority,
          priority:values.priority,
          description:values.description,
     
          terms:values.terms,
          
        }
        dispatch(createBrand(data))
        dispatch(showModal(false))
        form.resetFields()
        setImgurl([])
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
      <Modal  width="40%"  btitle="Create Brand" mtitle="Create Brand" >
      <FormWrap>

      <Form
      {...layout}
  
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >


      <Form.Item
        label="Brand Name"
        name="name"
      >
        <Input className=" text-capitalize"  />

      </Form.Item>


      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please input amount!',
          },
        ]}
      >
            <Select  
              mode="multiple"
              allowClear
              >
            <Option value="apparel & accessories">Apparel & Accessories</Option>
            <Option value="baby products">Baby Products</Option>
            <Option value="books">Books</Option>
            <Option value="e-commerce / online shopping vouchers">E-Commerce / Online Shopping </Option>
            <Option value="electronics & gadgets">Electronics & Gadgets</Option>
            <Option value="entertainment">Entertainment</Option>
            <Option value="fashion & lifestyle">Fashion & Lifestyle</Option>
            <Option value="food & beverages">Food & Beverages</Option>
            <Option value="grocery">Grocery</Option>
            <Option value="health & beauty">Health & Beauty</Option>
            <Option value="home needs">Home Needs</Option>
            <Option value="home furnishings">Home Furnishings</Option>
            <Option value="hospitality">Hospitality</Option>
            <Option value="jewellery">Jewellery</Option>
            <Option value="pharmacy">Pharmacy</Option>  
            <Option value="spa">Spa</Option>    
            <Option value="sportsware & footwear">Sportsware & Footwear</Option>
            <Option value="restaurants">Restaurants</Option> 
            <Option value="travel">Travel</Option>
            {/* <Option value="new moms & new borns">New Moms & New Borns</Option>
            <Option value="health & fitness">Health & Fitness</Option> */}

          </Select>
      </Form.Item>


      <Form.Item
        name="image"
        label="Image"
      >
      

          <Row gutter={10}>
            <Col span={10}>
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
      >
         {/* <Input.TextArea rows={2}/> */}
         <ReactQuill theme="snow" value={terms} onChange={setTerms}/>

      </Form.Item>


      <Form.Item
        label="active status"
        name="status"
      >
       <Switch defaultChecked={false}/>
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
        </Modal>
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