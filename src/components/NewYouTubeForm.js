import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError';

const initialValues ={
    name:'',
    email:'',
    channel:'',
    comments:'',
    social:{
      facebook:'',
      twitter:'',
    },
    phoneNumbers:['',''],
    phNumbers:[''],
};

const savedValues ={
  name:'sachin',
  email:'v@gmail.com',
  channel:'mychannel',
  comments:'welcome to formik',
  social:{
    facebook:'',
    twitter:'',
  },
  phoneNumbers:['',''],
  phNumbers:[''],
};

const onSubmit=(values,onSubmitProps)=>{
    console.log('Values',values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
}

const validationSchema = Yup.object({
   name:Yup.string().required('This is Required!'),
   email:Yup.string().email('Please Enter Valid Email').required('This is Required'),
   channel:Yup.string().required('This is Required')
})

const validateComments = (value)=>{
    let error
    if(!value){
      error="Required"
    }
    return error;
}

function NewYouTubeForm() {
  
  const [formValue, setFormValue] = useState(null);
   
  return (
  <Formik
    initialValues={formValue || initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    validateOnChange={false}
    validateOnBlur={true}
    validateOnMount
    enableReinitialize
    >
    {
      (formik)=>{
        return (
          <Form>
          <div className='mb-4'>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name' name='name' />
            <ErrorMessage name='name' component={TextError}/>
          </div> 

          <div className='mb-4'>
            <label htmlFor='email'>E-Mail</label>
            <Field type='email' id='email' name='email' />
            <ErrorMessage name='email'>
              {
                (error)=>{
                    return <div className='form-error'>{error}</div>
                }
              }
            </ErrorMessage>
          </div>

          <div className='mb-4'>
            <label htmlFor='channel'>Channel</label>
            <Field type='text' id='channel' name='channel' />
            <ErrorMessage name='channel' component={TextError} />
          </div>
          
          {/* Field level validation */}
          <div className='mb-4'>
            <label htmlFor='comments'>Comments</label>
            <Field as='textarea' type='text' id='comments' name='comments' validate={validateComments} />
            <ErrorMessage name='comments' component={TextError} />
          </div>

          <div className='mb-4'>
            <label htmlFor='facebook'>FaceBook</label>
            <Field as='input' id='facebook' type='text' name='social.facebook' />
          </div>

          <div className='mb-4'>
            <label htmlFor='twitter'>Twitter</label>
            <Field as='input' id='twitter' type='text' name='social.twitter' />
          </div>

          <div className='mb-4'>
            <label htmlFor='priNumber'>primary Phone Number</label>
            <Field as='input' id='priNumber' type='text' name='phoneNumbers[0]' />
          </div>

          <div className='mb-4'>
            <label htmlFor='secNumber'>secondary Phone Number</label>
            <Field as='input' id='secNumber' type='text' name='phoneNumbers[1]' />
          </div>
          
          {/* For dynamic field alocation we have to use Render-Props Pattern */}
          <div className='mb-4'>
            <label htmlFor='phNumbers'>Phone Numbers</label>
            <FieldArray name='phNumbers'>
              {
                (fieldArrayProps)=>{
                  const {push, remove, form}=fieldArrayProps
                  const {values} = form;
                  const {phNumbers} = values;

                  return (
                    <div>
                      {
                        phNumbers.map((phNumber,index)=>(
                          <div key={index}>
                           <Field name={`phNumbers[${index}]}`} />
                           <button type='button' onClick={()=>push('')}>Add Numbers</button>
                           <button type='button' onClick={()=>remove(index)} >Remove Number</button>
                          </div> 
                        ))
                      }
                    </div>
                  )
                }
              }
            </FieldArray>
          </div>

          {/* <button className='btn btn-primary' disabled={!(formik.isValid && formik.dirty)} type='submit'>Submit</button> */}
          <button className='btn btn-primary' disabled={formik.isSubmitting} type='submit'>Submit</button>
          <button className='btn btn-primary' type='button' onClick={()=>setFormValue(savedValues)}>Load Saved Values</button>
          <button type='reset'>Reset</button>
      </Form>
        )
      }
    }
      
  </Formik>
  );
}

export default NewYouTubeForm;
