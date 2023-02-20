import React from 'react';
import styled from 'styled-components'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function MonthGraph({data})  {
  
  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload) {
  
      return (
        <div className=" bg-light shadow-sm px-3  rounded">
          {/* <p style={{color:"#8884D8"}} className="label mb-1">total sales : <b> ₹{payload[0].value}</b></p> */}
          {/* <p className="intro">{label}</p> */}
          <p   style={{color:"#82CA9D"}}>total orders : <b>{payload[0].payload.orders}</b> </p>
        </div>
      );
    }
  
    return null;
  }
  


    return (
      <GraphWrap>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 1, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {/* <Bar dataKey="totalSale" fill="#8884d8" /> */}
          <Bar dataKey="orders" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </GraphWrap>
    );
  }

  const GraphWrap = styled.div`


  `