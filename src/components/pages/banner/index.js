import React, { useEffect,useState } from 'react'
import {Form, InputNumber,  Button, Input, Upload, Image, Row, Col} from 'antd'
import {updateBanner, bannerSelector, fetchAllBanner} from '../../api/bannerSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import storage from '../../shared/storage'
import {MdClose, MdDelete} from 'react-icons/md'
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import LoaderI from '../../shared/loaderImg';

export default function EditBanner() {

const dispatch = useDispatch()
const {all_banner, loading} = useSelector(bannerSelector)
const [form] = Form.useForm();
const [imgurl, setImgurl] = useState([])
const [loading1, setLoading1] = useState(false)
const [fileList, setFileList] = useState([])

// const {id} = useParams()
console.log(all_banner);

useEffect(()=>{

    dispatch(fetchAllBanner())
    
    }, [dispatch])



    useEffect(()=>{
      all_banner && setImgurl([ all_banner && all_banner.image])

        form.setFieldsValue({
            title:all_banner && all_banner.title,
            // image:all_banner && all_banner.image,
            sub_title: all_banner && all_banner.sub_title,
            description: all_banner && all_banner.description,
         
      
          });


    }, [all_banner])



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

            title:values.title,
            description:values.description,
            image: imgurl.length>=1 ? imgurl[0] : null,
            // image:(values.image === undefined) ? all_banner && all_banner.banner.image  : values.image[0].response.imgname,
            sub_title:values.sub_title,
           
        }

        dispatch(updateBanner(all_banner._id, imgdata))
        
        
        
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

    return (
        <FormWrap>      

         
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
                   placeholder={<LoaderI/> }              
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