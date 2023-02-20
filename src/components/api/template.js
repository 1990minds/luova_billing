
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import {message} from 'antd'
import keyUri from '../key'
import {saveAs} from 'file-saver' 
import { logDOM } from '@testing-library/react';

export const initialState = {

    loading: false,
    hasErrors: false,
    template:[],
    currentTemplate:null,
    pdfTemplate:null
}

export const templateSlice = createSlice({
    name:"template",
    initialState,
    reducers:{

        getTemplate: state =>{

            state.loading = true
        },

        getTemplateSuccess: (state, {payload}) =>{
            state.loading = false
            state.template = payload
            
        },

        getCurrentTemplate: (state, {payload}) =>{
          console.log(payload);

            state.loading = false
            state.currentTemplate = payload
            
        },
        getpdfTemplate: (state, {payload}) =>{
          console.log({sss:payload});

            state.loading = false
            state.pdfTemplate = payload
            
        },
        getTemplateFailure: (state, {payload}) =>{

            state.loading = false
            state.template = payload
            
        },

    }
})

export const {getTemplate, getTemplateSuccess, getCurrentTemplate, getTemplateFailure,getpdfTemplate } = templateSlice.actions
      
export const templateSelector = state => state.template
export default templateSlice.reducer


const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };



export const  fetchAllTemplate = () => async dispatch =>{
      const key = "template"
      dispatch(getTemplate())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/template');
        dispatch(getTemplateSuccess(data))

    } catch ({response}) {

        dispatch(getTemplateFailure())
        response.data && message.error({ content: response.data.msg, key, duration: 2 });

    }
    
}

export const  fetchOneTemplate = (id) => async dispatch =>{

    dispatch(getTemplate())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/template/${id}`);
      dispatch(getCurrentTemplate(data))

  } catch ({response}) {

      dispatch(getTemplateFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}





export const  createTemplate = (values) => async dispatch =>{
  console.log(values);
    const key = "template"
    dispatch(getTemplate())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/template', values, config);
      setTimeout(() => {

        message.success({ content: data.msg, key, duration: 2 });
      }, 500) 
        dispatch(fetchAllTemplate())

  } catch ({response}) {
       dispatch(getTemplateFailure())
  }
  
}


export const  deleteTemplate = (id) => async dispatch =>{
    const key = "template"
    dispatch(getTemplate())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/template/${id}`);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllTemplate())

  } catch ({response}) {

      dispatch(getTemplateFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  updateTemplate = (id, values) => async dispatch =>{
    const key = "template"
    dispatch(getTemplate())
    message.loading({ content: 'loading...', key })
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/template/${id}`, values, config);
      data && message.success({ content: data.msg, key, duration: 2 });
      window.location.reload()
      dispatch(fetchAllTemplate())

  } catch ({response}) {

      dispatch(getTemplateFailure())
      response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  FetchTempletePdf = (id) => async dispatch =>{
  console.log(id);
console.log("testingg 2???");
  dispatch(getTemplate())
  
try {
 const data= await axios.get(keyUri.BACKEND_URI +`/create-pdf/${id}`, config)
  .then(() => axios.get(keyUri.BACKEND_URI +`/fetch-templetpdf`,{ responseType: 'blob' })
  .then((res) => {  
       console.log(res);
      const pdfBlob = new Blob([res.data], 
          { type: 'application/pdf' });
         saveAs(pdfBlob, 'templet.pdf');  
  
         
         dispatch(getpdfTemplate(pdfBlob)) 
  }, 
 
    )

  )
console.log({kk:data});
  

} catch ({response}) {

    dispatch(getTemplateFailure())
  //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

}

}



