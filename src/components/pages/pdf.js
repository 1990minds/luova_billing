
import React, {useEffect, useState} from 'react'
import {FetchTempletePdf, templateSelector} from '../api/template'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
export default function Pdf() {
    console.log("testinggggg222222????");
    const dispatch = useDispatch()
    const { pdfTemplate } = useSelector(templateSelector)
    const {id} = useParams()

console.log(pdfTemplate);
    useEffect(()=>{

        dispatch(FetchTempletePdf(id))
        
        }, [dispatch])


  const pdf =`${pdfTemplate}.pdf`
 
     return (
      <div>
        <h1>pdf page</h1>

       
          <iframe src={`http://docs.google.com/gview?url=${pdf}&embedded=true`}  width="800" height="800" ></iframe>

      </div>
  )
}






