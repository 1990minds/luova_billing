import React from 'react'
import { Spin } from 'antd';
import styled from 'styled-components'

export default function SpinLoading({p="10px 0px 10rem 0px"}) {
    return (
        <SpinWrap padding={p}>
        <Spin className="example" size="large" tip="" />
      </SpinWrap>
    )
}

const SpinWrap  = styled.div`
width:100%;
.example {
   
    display: block;
  text-align: center;
  border-radius: 4px;
  padding: ${props => props.padding};
}


`