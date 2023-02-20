import React from 'react'
import { Modal, Button } from 'antd';
import { showModal, modalSelector } from '../api/modalSlice'
import {useDispatch, useSelector} from 'react-redux'


  
  export default function ModalSec( {children, mtitle, width, icon, btitle }) {


 
    const dispatch = useDispatch()
    const {visible} = useSelector(modalSelector)


      return (
        <>
        <Button type="primary" icon={icon} onClick={()=>dispatch(showModal(true))}>{btitle}</Button>
        <Modal
          title={mtitle}
          width={width}
          visible={visible}
          onCancel={()=>dispatch(showModal(false))}
          footer={null}
        >
        {children}
        </Modal>
      </>
      )
  }
  