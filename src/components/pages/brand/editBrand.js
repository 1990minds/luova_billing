import React, { useEffect,useState } from 'react'
import {Form, InputNumber, Switch, Button, Input, Upload, Image, Row, Col, Select} from 'antd'
import {updateBrand, brandSelector, fetchOneBrand} from '../../api/brandSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loaderImg';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';

export default function EditBrand() {

const dispatch = useDispatch()
const {currentBrand, loading} = useSelector(brandSelector)
const [form] = Form.useForm();
const [imgurl, setImgurl] = useState([])
const [loading1, setLoading1] = useState(false)
const [fileList, setFileList] = useState([])
const [checked, setChecked] = useState();
const {id} = useParams()
const [terms, setTerms] = useState('');

const [status, setStatus] = useState(null)
const [priority, setPriority] = useState(null)



const { Option } = Select;


console.log(currentBrand);
console.log(currentBrand?.image);

useEffect(()=>{

    dispatch(fetchOneBrand(id))
    
    }, [dispatch])


    useEffect(()=>{
      currentBrand && setImgurl([ currentBrand?.image])
    
        form.setFieldsValue({
            name:currentBrand?.name,     
            category:currentBrand?.category,
            priority:currentBrand?.priority,
            description:currentBrand?.description ? currentBrand?.description : null,
            terms:currentBrand?.terms ? currentBrand?.terms : null,
            category:currentBrand?.category.map((item, i)=>{
             return  item
            })
          })

    }, [currentBrand])


    console.log({s: currentBrand});
    // console.log({s: currentBrand?.hasPriority});



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
            name: values.name,
            image: imgurl.length>=1 ? imgurl[0] : null,
            category: values.category,
            status:values.status,
            hasPriority:values.hasPriority,
            priority:values.priority
        }

        dispatch(updateBrand(id, imgdata))
        
        
        
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
                  setPriority(value)
                }


    return (
        <FormWrap>      

         
  {
      loading ? <Loader/> : 
      <div>
              <h5 className="">Update Brand</h5>
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
        label="Brand name"
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
            allowClear  >
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

          </Select>
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
        // rules={[
        //   {
        //     required: true,
        //     message: 'required!',
        //   },
        // ]}
      >
         <Input.TextArea rows={2}/>

      </Form.Item>

      <Form.Item
        label="terms and conditions"
        name="terms"
        // rules={[
        //   {
        //     required: true,
        //     message: 'required!',
        //   },
        // ]}
      >
         {/* <Input.TextArea rows={2}/> */}
         <ReactQuill theme="snow" value={terms} onChange={setTerms}/>

      </Form.Item>

      <Form.Item
        label="active status"
        name="status"
      >
       <Switch defaultChecked={currentBrand && currentBrand.status}/>

      </Form.Item>

      <Form.Item
        label="Priority"
        name="hasPriority"
      >
       <Switch defaultChecked={currentBrand && currentBrand.hasPriority} onChange={onChange} />
      </Form.Item>


  { (currentBrand && currentBrand.hasPriority) &&     <Form.Item
        label="Priority Number"
        name="priority"
      >
       <InputNumber min={1} max={8}/>
      </Form.Item>}
     
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