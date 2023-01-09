import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddUser() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const{name, email, password, role} = user;

    const onInputChange=(e)=>{

        setUser({...user,[e.target.name]:e.target.value});
    };

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8081/user", user);
        navigate("/users");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new user</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Name
                        </label>
                        <input 
                            type={"text"} 
                            className='form-control' 
                            placeholder='ex: Popescu Ion' 
                            name='name' 
                            onChange={(e) => onInputChange(e)}
                            value={name} 
                        />

                        <label htmlFor='Email' className='form-label'>
                            Email
                        </label>
                        <input 
                            type={"text"} 
                            className='form-control' 
                            placeholder='example@yahoo.com' 
                            name='email' 
                            onChange={(e) => onInputChange(e)}
                            value={email} 
                            
                        />

                        <label htmlFor='Password' className='form-label'>
                            Password
                        </label>
                        <input 
                            type={"text"} 
                            className='form-control' 
                            placeholder='use a strong password' 
                            name='password' 
                            onChange={(e) => onInputChange(e)}
                            value={password} 
                            
                        />

                        <label htmlFor='Role' className='form-label'>
                            Role
                        </label>
                        <select className="form-control" 
                            name='role'
                            value={role} 
                            onChange={(e) => onInputChange(e)}>
                        
                            <option value="">Choose role</option>
                            <option>ADMIN</option>
                            <option>USER</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link to={"/users"} className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
