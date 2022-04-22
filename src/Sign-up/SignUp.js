import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import { useState } from 'react';

const SignupSchema=Yup.object({
    name:Yup.string().required('Required'),
    age:Yup.number().min(0,'Age cant be negative numbere').required('Required'),
    email:Yup.string().email('Invalid Email').min(6,'Your Password is TOO short').required('Required'),
    password:Yup.string().min(6,'Should contain min of 6 characters').required('Required'),
    address:Yup.string().required('Required'),
});

export default function SignUp(){
    const [isPasswordUpdate,setIsPasswordUpdate]=useState(false);
    let navigate = useNavigate();
    return(
        <div>
            <Formik
            initialValues={{name:'',age:0 , email:'',password:'',address:''}}
            validationSchema={SignupSchema}
            onSubmit={(values,{resetForm})=>{
                let registered =[];
                registered=JSON.parse(localStorage.getItem('loginUser'));
                registered.push(values);
                localStorage.setItem('loginUser',JSON.stringify(registered));
                resetForm({values:''});
                navigate('/itemExlporer');
            }}
            >
                <Form className='SignUp-form'>
                     <h2>Sign-Up</h2>
                    <label htmlFor='name'>Name</label>
                    <Field className='Input-field' name='name' type='text'/>
                    <div className='Error-msg'>
                    <ErrorMessage  name='name'/>
                    </div>

                    <label htmlFor='age'>Age</label>
                    <Field className='Input-field' name='age' type='number' />
                    <div className='Error-msg'>
                    <ErrorMessage  name='age'/>
                    </div>

                    <label htmlFor='email'>Email</label>
                    <Field className='Input-field' name='email' type='email' />
                    <div className='Error-msg'>
                    <ErrorMessage  name='email'/>
                    </div>

                    <label htmlFor='password'>Password</label>
                    <Field className='Input-field' name='password' type='password' />
                    <div className='Error-msg'>
                    <ErrorMessage  name='password'/>
                    </div>

                    <label htmlFor='address'>Address</label><br/>
                    <Field className='Input-field' name='address'  as="textarea" />
                    <div className='Error-msg'>
                    <ErrorMessage  name='address'/>
                    </div>

                    <button className='Register-button' type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}