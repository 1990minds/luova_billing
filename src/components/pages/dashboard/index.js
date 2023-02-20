import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { BarChartOutlined, FundOutlined, DiffOutlined, TeamOutlined , CreditCardOutlined} from '@ant-design/icons';
import {fetchAllCouponOrders,fetchCoupons, couponsSelector} from '../../api/couponSlice'
import {fetchAllSCoupons, scouponsSelector} from '../../api/sCouponSlice'
import {fetchAllProductOrders, productSelector} from '../../api/productSlice'
import {fetchAllUsers, hrSelector} from '../../api/hrSlice'

import {Link} from 'react-router-dom'
import {Button,Avatar, Row, Col, notification} from 'antd'
import MonthOrderGraph from './monthOrderGraph'
import MonthSalesGraph from './monthSalesGraph'
import ExportMonthExcel from './monthExcel'
import axios from 'axios'
import keyUri from '../../key';
import moment from 'moment';


export default function DashIndex() {
  const dispatch = useDispatch()

  const {couponOrders } = useSelector(couponsSelector)
  const {productOrders } = useSelector(productSelector)
  const {users } = useSelector(hrSelector)
  const {coupons } = useSelector(couponsSelector)
  const {sAllCoupons } = useSelector(scouponsSelector)

  const [monthChart, setMonthChartData] = useState([])


  useEffect(()=>{
    dispatch(fetchAllProductOrders())
    dispatch(fetchAllCouponOrders())
    dispatch(fetchAllUsers())
    dispatch(fetchAllSCoupons())

    axios.get(keyUri.BACKEND_URI + `/order-month-graph`).then((data=>{
      setMonthChartData(data.data)
  }))
    },[dispatch])
  


    console.log(coupons);
  

let monthCouponsOrder = couponOrders.filter(item=>{
  return moment(item.createdAt).format('MM YYYY') === moment().format('MM YYYY')
})

let monthProductOrder = productOrders.filter(item=>{
  return moment(item.createdAt).format('MM YYYY') === moment().format('MM YYYY')
})

let monthCoupons = sAllCoupons.filter(item=>{
  return moment(item.createdAt).format('MM YYYY') === moment().format('MM YYYY')
})

let monthUsers = users.filter(item=>{
  return moment(item.createdAt).format('MM YYYY') === moment().format('MM YYYY')
})




    let dashcard = [
        {
            title:<span>E-Voucher Orders</span>,
            icon:<BarChartOutlined/>,
            stat:monthCouponsOrder && monthCouponsOrder.length,
            desc:'Total E-Voucher Orders',
            backColor:"#263055",
            link:`coupon-Orders`
        },
        {
          title:<span>Product Orders</span>,
          icon:<DiffOutlined/>,
          stat:monthProductOrder && monthProductOrder.length,
          desc: 'Total Product Orders',
          backColor:"#5383FF",
          link:`product-Orders`
      },
        {
            title:<span>Users</span>,
            icon:<TeamOutlined/>,
            stat: monthUsers && monthUsers.length,
            desc: 'Total Users',
            backColor:"#1BC943",
            link:`users`
        },
        {
            title:<span>E-Vouchers</span>,
            icon:<CreditCardOutlined/>,
            stat: monthCoupons && monthCoupons.length,
            desc: 'Total E-Vouchers Vouchers',
            backColor:"#F83245",
            link:`e-vouchers`
        },
    
    ]


    return (
        <HomwWrap>
  

              <h5 className="mx-2 text-secondary mb-2"><b className="text-info">{moment().format('MMMM')}</b> Month Statistics </h5>

            <Row gutter={20}>          
               {
                 dashcard.map((item, i)=>{
                  return <Col key={i} span={6}>
                  <Link to={item.link}>
                  <div className=" customcard">

                  <div>

                    <h6 className="text-secondary">
                         <Avatar size="large" className="mr-1" style={{backgroundColor:item.backColor}} icon={item.icon} /> {item.title}
                         
                  </h6> 
                  </div>
                    <div className="text-center">
                   <h1 className="mb-2">{item.stat}</h1>
                   <p className="text-secondary">{item.desc}</p>
                  </div>
                  </div>
                  </Link>  
                  </Col>

                 })
               }
            </Row>
            <br/>

   <div className="row  sec2">         
  

              <div className=" col-sm-6  graph">
                <h3 className="mx-3 text-secondary mb-0"> Coupon  Order  </h3>
               <br/>
                <MonthOrderGraph data={monthChart} />
                </div>

                <div className=" col-sm-6    graph">
                <h3 className="mx-3 text-secondary mb-0"> Coupon  Sales </h3>
               <br/>
                <MonthSalesGraph data={monthChart} />
                </div>
               
            </div>


       
        </HomwWrap>

            

    )
}



const HomwWrap =  styled.div`
.sec2{
 .order, .graph {
padding:1rem;
border-radius:0.5rem;
/* box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); */
height: 53vh;
    overflow-y: auto;
    overflow-x: hidden;

    h3{

      font-size: 1.3rem;
    }

  } 

 
}

.customcard {
padding:1rem;
border-radius:0.5rem;
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
h1{
    font-weight:300;
    color:#070919;
}

svg {
    color:white;
    transform:translateY(-6px);
    font-size:1.1rem;
}    
}
`