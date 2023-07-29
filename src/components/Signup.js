import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host = "http://127.0.0.1:8070"
  const [credential, setCredential] = useState({name:"", email: "", password: "" ,cpassword:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
    method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
    });
    const json = await response.json();
    console.log(json)
      localStorage.setItem("token", json.token)
      navigate("/login")
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container mt-2'>
      <h2 className='my-2'>Sign up</h2>
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" onChange={onChange} className="form-control" value={credential.name} id="name" name='name' aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" onChange={onChange} className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={onChange} className="form-control" value={credential.password} required minLength={5} id="password" name='password' />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" onChange={onChange} className="form-control" value={credential.cpassword} required minLength={5} id="cpassword" name='cpassword' />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup
