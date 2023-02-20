import React, {useState} from 'react'
import { Layout , Affix} from 'antd';

import styled from 'styled-components'
import {  Route, Switch, useRouteMatch } from 'react-router-dom';
import SideMenu from './sidebar'
import SocialCoupon from './pages/vouchers/social'
import SYCVoucher from './pages/vouchers/saycamore'
import Products from './pages/products'
import Header from './header'
import EditSYCVoucher from './pages/vouchers/saycamore/editVoucher';
import EditSocialCoupon from './pages/vouchers/social/editScoupon';
import Users from './pages/hr';
import EditUser from './pages/hr/editHr';
import CreateProducts from './pages/products/createProduct'
import EditProducts from './pages/products/editProduct'
import couponOrder from './pages/orders/couponOrder'
import productOrder from './pages/orders/productOrder'
import Home from './pages/dashboard'
import Customer from './pages/customer'
import Brand from './pages/brand'
import EditBrand from './pages/brand/editBrand'

import Banner from './pages/banner'

import Template from './pages/template'
import CreateTemplate from './pages/template/createTemplate'
import EditTemplate from './pages/template/editTemplate'
import PdfTemplate from './pages/pdf'


// import CreateBanner from './pages/banner/editBanner'

const {  Content } = Layout;

export default function Dashboard() {

const [collapsed, setCollapsed] = useState(false)
const [theme, setTheme] = useState(true)



  let { path } = useRouteMatch();
  console.log(path)


const toggle = () =>{

    setCollapsed(!collapsed)
}


const changeTheme = () =>{

    setTheme(!theme)

}

return (
  <DashboardWrap color={theme}>

<Layout>
  <Affix  offsetTop={0}>
 <SideMenu collapsed={collapsed} color={theme} click={changeTheme}/>
 </Affix>
  <Layout className="site-layout">

    <Header click={toggle} collapsed={collapsed}/>

    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >

<Switch>
<Route  exact path={`${path}/home`}  component={Home} />

{/* <Route  exact path={`${path}/luova-gift-card`}  component={SYCVoucher} />
<Route  exact path={`${path}/luova-gift-card/:id`}  component={EditSYCVoucher} />
<Route exact path = {`${path}/e-vouchers`} component={SocialCoupon}/>
<Route exact path = {`${path}/e-vouchers/:id`} component={EditSocialCoupon}/> */}
<Route exact path = {`${path}/users`} component={Users}/>
<Route exact path = {`${path}/users/:id`} component={EditUser}/>

{/* <Route  exact path={`${path}/products/:id`}  component={EditProducts} />

<Route  exact path={`${path}/products`}  component={Products} />
<Route  exact path={`${path}/create-product`}  component={CreateProducts} />


<Route  exact path={`${path}/coupon-Orders`}  component={couponOrder} />
<Route  exact path={`${path}/product-Orders`}  component={productOrder} />


<Route  exact path={`${path}/banner`}  component={Banner} />

<Route  exact path={`${path}/customers`}  component={Customer} />

<Route  exact path={`${path}/brand`}  component={Brand} />

<Route  exact path={`${path}/brand/:id`}  component={EditBrand} />

<Route  exact path={`${path}/template`}  component={Template} />
<Route  exact path={`${path}/create-template`}  component={CreateTemplate} />
<Route  exact path={`${path}/template/:id`}  component={EditTemplate} />


<Route  exact path={`${path}/templatepdf/:id`}  component={PdfTemplate} /> */}


</Switch>

          </Content>
        </Layout>
      </Layout>
            
        </DashboardWrap>
    )
}


const DashboardWrap = styled.div`



.ant-layout {

    .ant-layout-sider{
        height: 100vh;
        /* height: 100vh; */

        background:${props => props.color ? "#001529" : "#ffffff"};
    }
}



.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}



#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
`