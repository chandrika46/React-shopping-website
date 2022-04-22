import { useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './Login.css';

export default function Login(props) {
    const [enteredEmail,setEnteredEmail]=useState('');
    const [enteredPassword,setEnteredPassword]=useState('');
    const [isEmailValid,setIsEmailValid]=useState(true);
    const [isPasswordValid,setIsPasswordValid]=useState(true);
    const navigate=useNavigate();

    function handleInputEmail(event){
        setEnteredEmail(event.target.value);
    }
    function handleInputPass(event){
        setEnteredPassword(event.target.value); 
    }

    function handleSubmit(event){
        event.preventDefault();
        const loggedInUser= JSON.parse(localStorage.getItem('loginUser'));
        if( enteredEmail.trim()===''){
            setIsEmailValid(false);
            return;
        }
        if( enteredPassword.trim() === '' ||  enteredPassword.length < 6 ){
            setIsPasswordValid(false);
            return;
        }
        setIsPasswordValid(true);
        setIsEmailValid(true);
        const registered= loggedInUser.some(val=>{
              if(val.email===enteredEmail && val.password===enteredPassword){
                val['loggedInUser']=true;
                localStorage.setItem('loggedIn',JSON.stringify(val));
                return {...val};   
              }    
         } )
         if(registered){
             const loggedUser=JSON.parse(localStorage.getItem('loggedIn'));
            props.handleLoggedInUser(loggedUser);
         }
         setEnteredEmail('');
         setEnteredPassword('');
         navigate('/itemExlporer');        
    }

    return (
        <div className="Login-form">
        <form onSubmit={handleSubmit} >  
            <h3>Login Form</h3>
            <div>
               <label htmlFor="email">Email :</label>
               <input id="email" type="email" onChange={handleInputEmail} value={enteredEmail}  />
               {!isEmailValid && <p className='error-msg'>Field should not be empty!!!</p>}
            </div>
            <div>
               <label htmlFor="password">Password:</label>
               <input id="password" type="password" onChange={handleInputPass} value={enteredPassword}  />
               {!isPasswordValid && <p className='error-msg'>Field should not be empty!!! and should have 6 or more characters!!!</p> }
            </div>
            <button className='Login-button' type="submit" onClick={handleSubmit}>Login</button>
        </form>
        </div>
    )
}