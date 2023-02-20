import React from 'react'
import styled from 'styled-components'
import { Layout, Menu, Switch } from 'antd';
import {
  CreditCardOutlined,
    SettingOutlined,
    SnippetsFilled,
    AppstoreFilled,
    CodeSandboxOutlined,
    CodeSandboxSquareFilled,
    UsergroupAddOutlined,
    ProfileOutlined 

  } from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom'
import Logo from './shared/images/logo1.png'


const {  Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar({click, color, collapsed}) {


  const {pathname} = useLocation()
  console.log(pathname);

    return (
   <SideMenuWrap color={color}>
             <Sider trigger={null} collapsible collapsed={collapsed}>

             <div className="pt-1 my-2" >
            {
              collapsed ? <img src={Logo} className="d-block mx-auto" width="70px" alt="logo"/> :

              <img src={Logo} className="d-block mx-auto" width="130px" alt="logo"/>
            }
            </div>


          <Menu
           theme={color? 'dark' : 'light'}
           mode="inline"
           defaultSelectedKeys={[pathname]}
           className="menu"
          //  selectedKeys={[pathname]}

          >
           
          <Menu.Item key="admin/home" icon={<AppstoreFilled />} >
          <Link to="/admin/home">Dashboard</Link>
            </Menu.Item>

            <Menu.Item key="/admin/users" icon={<UsergroupAddOutlined />} >
            <Link to="/admin/users">Customers</Link> 
            </Menu.Item>

            <Menu.Item key="" icon={<UsergroupAddOutlined />} >
            <Link to="">Billing</Link> 
            </Menu.Item>
       
            <Menu.Item key="" icon={<UsergroupAddOutlined />} >
            <Link to="">Redeem</Link> 
            </Menu.Item>

         
            {/* <Menu.Item icon={<CodeSandboxSquareFilled />} key="/admin/brand">
         <Link to="/admin/brand">Brand</Link> 
          </Menu.Item>

        <SubMenu  key="sub1" icon={<CreditCardOutlined />} title="Vouchers">
 
           <Menu.Item  key="/admin/luova-gift-card" >
           <Link to="/admin/luova-gift-card">Luova Gift Card</Link>
             </Menu.Item>
             
               <Menu.Item  key="/admin/e-vouchers" >
           <Link to="/admin/e-vouchers">E-Vouchers</Link>
             </Menu.Item>

        </SubMenu> */}

 
        {/* <Menu.Item icon={<CodeSandboxOutlined />} key="/admin/products">
         <Link to="/admin/products">Products</Link> 
          </Menu.Item>


          <Menu.Item key="/admin/customers" icon={<UsergroupAddOutlined />} >
            <Link to="/admin/customers">customers</Link> 
            </Menu.Item>

          <Menu.Item key="/admin/users" icon={<UsergroupAddOutlined />} >
            <Link to="/admin/users">Users</Link> 
            </Menu.Item>

            <Menu.Item key="/admin/template" icon={<ProfileOutlined />} >
            <Link to="/admin/template">Template</Link> 
            </Menu.Item>
           

            <SubMenu  key="sub2" icon={<SnippetsFilled />}  title="Invoice">            

              <Menu.Item key="/admin/coupon-Orders" > 
              <Link to="/admin/coupon-Orders">Coupon Orders</Link> 
              </Menu.Item>
              <Menu.Item key="/admin/product-Orders" > 
              <Link to="/admin/product-Orders">Product Orders</Link> 
              </Menu.Item>
            </SubMenu>

            <SubMenu  key="7" icon={<SettingOutlined />}  title="Settings">            

              <Menu.Item key="/admin/banner" > 
              <Link to="/admin/banner">Banner</Link> 
              </Menu.Item>
              
            </SubMenu> */}

      

          </Menu>
          <div className="mode">
         <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={()=>click()} />
          </div>
        </Sider>
        </SideMenuWrap>
      
    )
}


const SideMenuWrap = styled.div`



.menu{


font-size:1rem;
svg{

  font-size:1.1rem;
  transform:translate(-5px, -4px);
}

}

.mode{

position:absolute;
bottom:5%;
left:10%;

.ant-switch{

  background-color:${props=>props.color? "grey":"#1890FF"};
}
}


`