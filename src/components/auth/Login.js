import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async ()=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            toast(error.code, { type: "error" });
        }
    };

  return (
    <div className='border p-3 bg-light mx-auto'
    style={{maxWidth:400, marginTop:60}}
    >
        <h1>Login</h1>
        <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Entrer your email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default Login;