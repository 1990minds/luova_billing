import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExportExcel({data}) {

 
    return (
        <ExcelFile element={<Button size="middle" className="mr-2" type="primary">Export </Button>}>
        <ExcelSheet data={data} name="Total Monthly Sale" >

        <ExcelColumn label="Day" value="_id"/>
            <ExcelColumn label="totalSale" value="totalSale"/>
            <ExcelColumn label="orders" value="orders"/>
  

        </ExcelSheet>
   
    </ExcelFile>
    )
}
