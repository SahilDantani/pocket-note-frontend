import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
const Login = () => {
    const host = "http://127.0.0.1:8070"
    console.log(host)
    const[credential,setCredential] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
             },
             body: JSON.stringify({email:credential.email,password:credential.password})
         });
         const json = await response.json();
         if(json.success){
          // redirect
          localStorage.setItem("token",json.token)
          navigate("/")
        }
         else{
          alert("Invalid Credentials");
         }
    }

    const onChange = (e) => {
      setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div className='mt-2'>
      <h2 className='my-2'>Login Page</h2>
      <form className="container" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" onChange={onChange} className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} className="form-control" value={credential.password} id="password" name='password' />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
