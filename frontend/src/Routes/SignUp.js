import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate(); // Initialize the navigation function
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();

  async function Signup(event) {
    event.preventDefault();

console.log('signup...');

    let firstname = firstnameRef.current.value;
    let lastname = lastnameRef.current.value;
    let password = passwordRef.current.value;


    if (firstname === 'Super') {
      localStorage.setItem('profile', 'SUPER-ADMIN')
    } else if (firstname === 'Kabute') {
      localStorage.setItem('profile', 'HEADTEACHER')
    } else if (firstname === 'Michael') {
      localStorage.setItem('profile', 'TEACHER')
    }

    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, password }),
  });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);    
      navigate('/login');
    } else {
        alert('signup failed: Role not recognized');
    }
}


  return (
      <div className="login-container">
        <h2>Login</h2>
        <form id="loginForm">
          <label htmlFor="name">firstname</label>
          <input type="text" id="loginName" ref={firstnameRef} required />
          <label htmlFor="name">lastname</label>
          <input type="text" id="loginName" ref={lastnameRef} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="loginPassword" ref={passwordRef} required />
          <button type="submit"  className='login-btn' onClick={Signup}>Login</button>
        </form>
      </div>
  );

  
}

export default SignUp