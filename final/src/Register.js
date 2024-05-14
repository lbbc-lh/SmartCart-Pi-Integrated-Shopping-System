import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import bcrypt from 'bcryptjs';
import userData from './UserData.js';
import { Navigate } from 'react-router-dom'
import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: "pub-c-dd3b5703-eb03-43f7-bbf2-a58261067c8f",
  subscribeKey: "sub-c-86ec8e7a-ac60-48f6-bbb5-62eb95d3f71d",
  uuid: "tchuilej7253",
});


function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
      pubnub.subscribe({
        channels: ['Quentinchannel'],
      });
  
      pubnub.addListener({
        message: (message) => {
          console.log('Message received:', message);

          const keys = Object.keys(localStorage);
         for (let i = 0; i < keys.length; i++) {
               const storedValue = localStorage.getItem(keys[i]);
               const parsedValue = JSON.parse(storedValue); // Assuming values are stored as JSON
               if (parsedValue && parsedValue.name === message.user) {
                      console.log("Found element:", parsedValue);
                      // Login successful
                     setMessage('Login successful!');
                     setIsLoggedIn(true);
          }
         }
        }
      });
      return () => {
        pubnub.removeListener();
        pubnub.unsubscribeAll();
      };
    }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
          // Hash the password using bcrypt
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Save user data to a JavaScript file
          const user = {
            username,
            password: hashedPassword, // Store hashed password
            email
          };
          localStorage.setItem('userData', JSON.stringify(user));
          setMessage('User registered successfully!');
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred while registering user.');
        }
      };

    const handleLogin = async () => {
        try {
          // Retrieve user data from local storage
         
          const userData = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
            setMessage('User not found. Please register first.');
            return;
          }
    
          // Check if the entered password matches the hashed password using bcrypt
          const isPasswordValid = await bcrypt.compare(password, userData.password);
          if (!isPasswordValid) {
            setMessage('Invalid password. Please try again.');
            return;
          }
    
          // Login successful
          setMessage('Login successful!');
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred while logging in.');
        }
      
    };
    
    
    return(
          <div className=' d-flex p-5 justify-content-center'>          
            <div className='bg-warning p-3 rounded w-25  '>
                 <h2>Sign-up</h2>
                 <form class="form-inline"  onSubmit={handleSubmit} >
                    <div className='mb-3'>
                         <label htmlFor='name'><strong>Name</strong></label>
                         <input type="text" placeholder='Enter Name' name='name'
                         value={username} onChange={(e) => setUsername(e.target.value)} className='form-control rounded-0' required/>
                    </div>
                    <div className='mb-3'>
                         <label htmlFor='email'><strong>Email</strong></label>
                         <input type="email" placeholder='Enter Email' name='email'
                         value={email} onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0' required/>
                    </div>
                    <div className='mb-3'>
                         <label htmlFor='password'><strong>Password</strong></label>
                         <input type="password" placeholder='Enter Password' name='name' 
                         value={password} onChange={(e) => setPassword(e.target.value)}className='form-control rounded-0' required/>
                    </div>
                    <button type='submit' className=' btn-success w-100 rounded-0'  >Create Account</button>
                </form>
                <p>You are agreeing to our terms and policies</p>
                <button className=' btn-default border w-100 bg-light text-decoration-none' onClick={handleLogin}> Log In</button>
                {message && <p>{message}</p>}  
                {isLoggedIn ? <Navigate to="/CartContainer" /> : null} 
            </div>
           </div>
    )
}

export default Register;