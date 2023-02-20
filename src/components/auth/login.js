import React, {useEffect} from 'react'
import Login from '../shared/login'
import {fetchAdminLogin, loginSelector} from '../api/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Adminlogin({history}) {


    const dispatch = useDispatch()
const {isAdminAuthenticate, loading} = useSelector(loginSelector)



    useEffect(()=>{

        if (!isAdminAuthenticate) {
            history.push('/');
          }
          else{
    
            history.push('/admin/home');
          }
        
    
    }, [isAdminAuthenticate])

    
    const onFinish = values => {
        console.log('Received values of form: ', values);
        dispatch(fetchAdminLogin(values))
      };


    return (
        <div>
            <Login onFinish={onFinish} title="Admin Login Form"/>
        </div>
    )
}
