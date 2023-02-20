import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";
import { DownloadOutlined  } from '@ant-design/icons';
import moment from 'moment'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportExcel({data}) {
    return (
        <ExcelFile filename="Online Customers" element={<Button icon={<DownloadOutlined  style={{transform:"translateY(2px)" }}/>} className=" ml-3  mb-3" type="primary">Download Report </Button>}>
               
        <ExcelSheet data={data} name="Online Customers" >

            <ExcelColumn label="Name" value="user_name"/> 
            <ExcelColumn label="Email" value="email"/>     
            <ExcelColumn label="Phone No." value="phone_number"/>     
            <ExcelColumn label="Balance" value={col =>{ return col.coupons.reduce((balance,num) =>{
                                                    return  balance = balance + num.amount        
                                                },0 ) }}/>     

        </ExcelSheet>
   
    </ExcelFile>
    )
}


