import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

const initialValues ={
    name:'',
    email:'',
    channel:''
};

const onSubmit=values=>{
    console.log('Values',values);
}

const validationSchema = Yup.object({
   name:Yup.string().required('This is Required!'),
   email:Yup.string().email('Please Enter Valid Email').required('This is Required'),
   channel:Yup.string().required('This is Required')
})


function NewYouTubeForm() {
  
   
  return (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}>

    <div className='mt-5'>
        <Form>

          <div className='mb-4'>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name' name='name' />
            <ErrorMessage name='name' />
          </div> 

          <div className='mb-4'>
            <label htmlFor='email'>E-Mail</label>
            <Field type='email' id='email' name='email' />
            <ErrorMessage name='email' />
          </div>

          <div className='mb-4'>
            <label htmlFor='channel'>Channel</label>
            <Field type='text' id='channel' name='channel' />
            <ErrorMessage name='channel' />
          </div>

          <button className='btn btn-primary' type='submit'>Submit</button>
          
        </Form>
    </div>
  </Formik>
  );
}

export default NewYouTubeForm;
