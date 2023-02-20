import React from 'react'
import { Layout } from 'antd';
import styled from 'styled-components'
import {useLocation} from 'react-router-dom'
import LastWord from './shared/lastword'
import Dropdown from './shared/dropdown'
import { MenuUnfoldOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {UserOutlined  } from '@ant-design/icons';

const { Header } = Layout;

export default function HeaderMenu({collapsed, click}) {

  const  path = useLocation()

    return (
         <HeaderMenuWrap>
        <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="d-flex flex-end">
        {collapsed ?
         <MenuUnfoldOutlined className="trigger" onClick={()=>click()}/>
          :<MenuFoldOutlined className="trigger" onClick={()=>click()}/>}  
           
   <span className="lastword">
  {LastWord(path.pathname.split('-').join(' ')) }
  </span>

  <div className="n">
{/* <Badge size="small" className="notification" count={0}>
   <Link to="/admin/experts" style={{color:"grey"}}><MdNotifications style={{cursor:"pointer"}}/></Link> 
  </Badge> */}
<span className="mx-3 ">

  <Dropdown 
  username='admin'
  userIcon={<LogoutOutlined style={{fontSize:"1.2rem", transform:"translateY(-3px)", fontWeight:"bold"}}/>}
  icon={< UserOutlined style={{fontSize:"1.2rem",  fontWeight:"bold"}}/>}/> 
      </span>
</div>
</div>
          </Header>
         </HeaderMenuWrap>
    )
}

const HeaderMenuWrap = styled.div`


.lastword {
  font-size:1.6rem;
  width:50%;
  text-transform:capitalize;
}


.trigger {
  font-size: 20px;
  line-height: 64px;
  padding: 0 24px  ;
  cursor: pointer;
  transition: color 0.3s;

  &:hover{

      color: #1890ff; 
  }
}


#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  // line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover{

      color: #1890ff;
  }
}

.n{

display:flex;
justify-content:flex-end;
line-height:64px;

width:100%;

button{

  margin: auto;
}
}

`
