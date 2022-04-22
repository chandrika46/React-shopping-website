import { Formik, Field, Form, ErrorMessage} from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import './PassWordUpdate.css';

const PassWordUpdateSchema=Yup.object({
    // currentPass:Yup.string().test([Yup.ref('currentPass')===props.loggedUser.loggedInUser],'Current password does not Match').required('Required'),
    newPass:Yup.string().min(6,'Your Password is TOO short').required('Required'),
    newPassRepeated:Yup.string().oneOf([Yup.ref('newPass')], 'Your passwords do not match.').required('Required')
})

export default function PassWordUpdate(){
    
    return(
        <div className='PassWord-Update-Form'>
        <h2>Rest Password</h2>
        <Formik
        initialValues={{currentPass:'',newPass:'',newPassRepeated:''}}
        validationSchema={PassWordUpdateSchema}
        onSubmit={(values, {resetForm})=>{
            console.log(values);
            const loggedUser = JSON.parse(localStorage.getItem('loggedIn') || '[]');
            if(loggedUser.loggedInUser){
                loggedUser['password']=values.newPass;
                localStorage.setItem('loggedIn',JSON.stringify(loggedUser));
            }
            resetForm({values:''});
        }}
        >
            <Form className='PassWord-Update'>
                {/* <label htmlFor='currentPass' >Current Password</label>
                <Field clsaaName='Input-field' name='currentPass' type='text'></Field>
                <div><ErrorMessage name='currentPass' /></div> */}
                <label htmlFor='newPass'>New Password</label>
                <Field clsaaName='Input-field' name='newPass' type='text'></Field>
                <div><ErrorMessage name='newPass' /></div>
                <label htmlFor='newPassRepeated'>New Password Repeated</label>
                <Field className='Input-field' name='newPassRepeated' type='text'></Field>
                <div><ErrorMessage name='newPassRepeated' /></div>
                <button className='password-change-btn' type='submit'>Change Password</button><br/>
                <Link to='/dashBoard'>Back to DashBoard</Link>
            </Form>
        </Formik>

        </div>
    )
}