import React from 'react'
import { Popconfirm  } from 'antd';

export default function DeleteConfirm({children, title="", confirm, cancel}) {

 
      
    return (
        <Popconfirm
        title={`Are you sure delete this entry?`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
          {children}
          </Popconfirm>
    )
}
