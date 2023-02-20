import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";
import { DownloadOutlined  } from '@ant-design/icons';
import moment from 'moment'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportExcel({data}) {
    console.log(data);
    return (
        <ExcelFile filename="Sycamore  Vouchers" element={<Button icon={<DownloadOutlined  style={{transform:"translateY(2px)" }}/>} className="mx-4" type="primary">Download Report </Button>}>
               
        <ExcelSheet data={data} name="Sycamore  Vouchers" >

            <ExcelColumn label="Coupon" value="coupon_id"/> 
            <ExcelColumn label="CVV" value="cvv"/> 
            <ExcelColumn label="Generated Date" value={col =>  moment(col.createdAt).format("DD-MM-yyyy")}/> 

            <ExcelColumn label="Activated Date" value={col => col.activateDate ?  col.activateDate :"not yet active" }/>     
            <ExcelColumn label="Value" value="amount"/>     
            <ExcelColumn label="Validity" value={col => col.isactive ? col.expiry_date : 'not activated' }/>       
           
            <ExcelColumn label="Issued status" value="issued"/>     
            <ExcelColumn label="Active status" value="isactive"/>     
            <ExcelColumn label="User" value={col => col.user ? col.user.email : "Anonmyous"}/>     

        </ExcelSheet>
   
    </ExcelFile>
    )
}


