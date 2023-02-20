import React from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import keyUri from '../key'

const props = {
    name: 'file',
    action: keyUri.BACKEND_URI +'/assign_coupons_excel',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


export default function Toolbar() {
    return (
        <div>
             <Upload {...props}>
    <Button type="primary" icon={<UploadOutlined />}>Upload File</Button>
  </Upload> 

  
        </div>
    )
}
