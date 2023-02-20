import React, { useEffect,useState } from 'react'
import {Form, InputNumber, Switch, Button, Input, Upload, Image,DatePicker, Row, Col, Select} from 'antd'
import {updateTemplate, templateSelector, fetchOneTemplate} from '../../api/template'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loaderImg';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import moment from 'moment'

export default function EditTemplete() {

const dispatch = useDispatch()
const {currentTemplate, loading} = useSelector(templateSelector)
const [form] = Form.useForm();
const [imgurl, setImgurl] = useState([])
const [imgurl1, setImgurl1] = useState([])
const [loading1, setLoading1] = useState(false)
const [loading2, setLoading2] = useState(false)
const [fileList, setFileList] = useState([])
const [fileLists, setFileLists] = useState([])
const {id} = useParams()
const [terms, setTerms] = useState('');

const [status, setStatus] = useState(null)


const { Option } = Select;


useEffect(()=>{

    dispatch(fetchOneTemplate(id))
    
    }, [dispatch])

     console.log(currentTemplate);

    useEffect(()=>{
      currentTemplate && setImgurl([ currentTemplate && currentTemplate.banner])
      currentTemplate && setImgurl1([ currentTemplate && currentTemplate.logo])
      
        form.setFieldsValue({
            user_name: currentTemplate && currentTemplate.user_name,   
            cvv: currentTemplate && currentTemplate.cvv,    
            expiry_date: currentTemplate && moment(currentTemplate.expiry_date),
            value:currentTemplate && currentTemplate.value,
            gift_code: currentTemplate && currentTemplate.gift_code,
            message: currentTemplate && currentTemplate.message,
            hyperlink:currentTemplate && currentTemplate.hyperlink,
            team:currentTemplate && currentTemplate.team
          })

    }, [currentTemplate])


    console.log({s: currentTemplate});
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
          gift_code:values.gift_code,
          cvv:values.cvv,
          banner: imgurl[0],
          logo:imgurl1[0],
          expiry_date:values.expiry_date,
          value:values.value,
          user_name:values.user_name,
          message:values.message,
          hyperlink:values.hyperlink,
          team:values.team
        }

        dispatch(updateTemplate(id, imgdata))
        
        
        
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
          
  
            const handleChanges = info => {
              setLoading1(true)
                 
                  storage
                  .ref("images/" + info.file.name)
                  .put(info.file.originFileObj)
                  .then(snapshot => {
                    return snapshot.ref.getDownloadURL();
                  })
                  .then(url => {
                    console.log(url);
                    setImgurl1([...imgurl1, url])
                    setLoading2(false)
              
                  })
                  .catch(error => {
                    console.log(error);
                  });
              
                };
              
        
        
            const remove = (e, url) =>{
        
              setImgurl(prev => prev.filter(item => item !== url))
              setImgurl1(prev => prev.filter(item => item !== url))
  
              }
        
              const uploadButton = (
                  <div>
                    { loading1 ? <LoadingOutlined  /> : <PlusOutlined />}
            
                    <div style={{ marginTop: 8, fontSize:"14px" }}>{loading1 ? "uploading" :""}</div>
                  </div>
                );
  
        
              const uploadButton1 = (
                <div>
                  { loading2 ?  <LoadingOutlined  /> : <PlusOutlined />}
          
                  <div style={{ marginTop: 8, fontSize:"14px" }}>{loading2 ? "uploading" :""}</div>
                </div>
              );
               

    return (
        <FormWrap>             
    {
      loading ? <Loader/> : 
      <div>
              <h5 className="">Update Template</h5>
              <hr style={{height:"0.1rem"}} className="mb-5 mt-3 bg-light border-0"/>

              <Form
      {...layout}
  
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

<Form.Item
        label="Gift Code"
        name="gift_code"
        rules={[  { required: true, message: 'Please input gift code!' } ]}
      >
          <Input style={{width:'70%'}}/>
      </Form.Item>

      <Form.Item
        label="CVV"
        name="cvv"
        rules={[{required: true, message: 'required!'  },
        ]}
      >
        <Input style={{width:'20%'}}/>
      </Form.Item>



      <Form.Item
        label="Expiry date"
        name="expiry_date"
        rules={[{ required: true, message: 'required!' }]}
      >
          <DatePicker style={{width:'20%'}}  />
      </Form.Item>

      <Form.Item
        label="Value"
        name="value"
        rules={[ { required: true, message: 'required!'} ]}
      >
         <InputNumber style={{width:'20%'}} />
      </Form.Item>


      <Form.Item
        label="User name"
        name="user_name"
        rules={[{required: true, message: 'required!'  },
        ]}
      >
         <Input className=" text-capitalize" style={{width:'70%'}} />
      </Form.Item>


      <Form.Item
        label="message"
        name="message"
        rules={[{required: true, message: 'required!'  },
        ]}
      >
        <Input.TextArea rows={2} style={{width:'70%'}}/>
      </Form.Item>

      <Form.Item
        label="HR Team"
        name="team"
        rules={[{required: true, message: 'required!'  },
        ]}
      >
         <Input className=" text-capitalize" style={{width:'70%'}} />
      </Form.Item>

      <Form.Item
        label="Hyperlink"
        name="hyperlink"
        rules={[{required: true, message: 'required!'  },
        ]}
      >
         <Input className="" style={{width:'70%'}} />
      </Form.Item>

      <Form.Item
        name="Banner"
        label={<p>banner <br/> <small>Image size (2483*888) pixels</small> <br/> <small>File type - PNG</small></p>}
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
        name="Logo"
        label={<p>logo <br/> <small>Image size (740*205) pixels</small> <br/> <small>File type - PNG</small></p>}
      >
      
      <Row gutter={10}>
            <Col span={5}>
                {
                imgurl1.map((img, i)=>{

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
                        fileList={fileLists}
                        onChange={handleChanges}
                        multiple={true}
                        style={{marginLeft:'0.5rem'}}
                        >
                        {imgurl1.length >= 1 ? null : uploadButton1}
                   </Upload>
                </Row>

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