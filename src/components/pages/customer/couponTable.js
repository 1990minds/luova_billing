import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
// import { productsSelector} from '../../../api/product'
import { Modal, Button } from 'antd';
// import ProductTable from '../../shared/insidetableview'
import { AiFillEye } from 'react-icons/ai';


export default function Insidetableview({data}) {



   
    const dispatch = useDispatch();


    const array = data.orders.concat(data.productorders)
    console.log({new:array});



    return (
      <div class="" style={{width:"100%"}} >
    <div class="row">
    <div class="col-7 border-right border-dark" >
      <b style={{color:"black"}}>Coupons</b>
    <table class="table table-striped ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Coupon ID</th>
          <th scope="col">CVV</th>
          <th scope="col">Value</th>
          <th scope="col">Activated Date</th>
          <th scope="col">Validity</th>
      
        </tr>
      
      </thead> 
      <tbody>
          {
    data?.coupons?.map((item, i)=>{
    return  <tr>
        <th scope="row">{i+1}</th>
        <td>{item.coupon_id}</td>
        <td> {item.cvv}</td>
        <td> {item.amount}</td>
        <td>{ item.activateDate }</td>
        <td>{ item.isactive ? moment(item.expiry_date).format('DD/MM/YYYY') : 'not activated'}</td>

      </tr>
    })
    
          }
      </tbody>

      
    </table>

    </div>
    <div class="col-5">
    <b style={{color:"black"}}>Orders</b>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">OrderId ID</th>
          <th scope="col">Date</th>
          <th scope="col">amount</th>
         
      
        </tr>
      
      </thead> 
      <tbody>
          {
    array?.map((item, i)=>{
      
      // console.log(item.value);
          return  <tr>
        <th scope="row">{i+1}</th>
        <td>{item.sycOrderId}</td>
        <td>{  moment(item.createdAt).format('DD/MM/YYYY')}</td>
       <td>{ item.total }</td>
     
      </tr>
       
    })
    
          }
      </tbody>

      
    </table>

     </div>
      </div>
      </div>
    


    
    )
}
