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
        <ExcelFile filename="Social Vouchers" element={<Button icon={<DownloadOutlined  style={{transform:"translateY(2px)" }}/>} className="mx-4" type="primary">Download Report </Button>}>
               
        <ExcelSheet data={data} name="Social Vouchers" >

            <ExcelColumn label="Name" value="name"/> 
            <ExcelColumn label="Brand"  value={col => col.brand ?  col.brand.name :"null" }/> 
            <ExcelColumn label="Value" value="value"/>     
            <ExcelColumn label="validity" value="validity"/>     
            <ExcelColumn label="Quantity" value="quantity"/>       
            <ExcelColumn label="description" value="description"/>  
            <ExcelColumn label="terms" value="terms"/>       
            <ExcelColumn label="code" value="code"/>       
            <ExcelColumn label="status" value="status"/>       

        </ExcelSheet>
   
    </ExcelFile>
    )
}


