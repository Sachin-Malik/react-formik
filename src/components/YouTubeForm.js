import React from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'

const initialValues ={
    name:'',
    email:'',
    channel:''
};

const onSubmit=values=>{
    console.log('Values',values);
}

//or We can use Yup for form validation.
const validationSchema = Yup.object({
   name:Yup.string().required('This is Required!'),
   email:Yup.string().email('Please Enter Valid Email').required('This is Required'),
   channel:Yup.string().required('This is Required')
})

const validate= values=>{

    let errors={};

    if(!values.name){
        errors.name='Required'
    }

    if(!values.email){
        errors.email='Required'
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email=`${values.email} is Not a Valid E-Mail`
    }

    if(!values.channel){
        errors.channel='Required'
    }

    return errors;
}


function YouTubeForm() {
  

  const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema,
  })
   
  return (
  <div className='mt-5'>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name'>Name</label>
          <input 
            type='text' 
            id='name' 
            name='name' 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.name} 
          />
          {formik.touched.name && formik.errors.name?<div className='form-error'>{formik.errors.name}</div>:null}
        </div> 

        <div className='mb-4'>
          <label htmlFor='email'>E-Mail</label>
          <input 
            type='email' 
            id='email' 
            name='email' 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.email}
          />
           {formik.errors.email&&formik.touched.email?<div className='form-error'>{formik.errors.email}</div>:null}
        </div>

        <div className='mb-4'>
          <label htmlFor='channel'>Channel</label>
          <input 
            type='text' 
            id='channel' 
            name='channel' 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.channel}
          />
           { formik.touched.channel && formik.errors.channel?<div className='form-error'>{formik.errors.channel}</div>:null}
        </div>
        
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
  </div>);
}

export default YouTubeForm;
