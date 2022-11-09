import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    let navigate = useNavigate();

    const [userDto, setUserDto] = useState({
        email: '',
        password: '',
    });

    const{email, password} = userDto;

    const onInputChange=(e)=>{
        setUserDto({...userDto,[e.target.name]:e.target.value});
    };

    const onSubmit= async (e)=>{
        e.preventDefault();
        const result = await axios.post("http://localhost:8082/login", userDto);
        if(result.data.role == 'ADMIN') {
            navigate(`/admin`);
        }
        else if(result.data.role == 'USER') {
            navigate(`/user-devices/${result.data.userId}`);
        }
        
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Login</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
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
                            type={"password"} 
                            className='form-control' 
                            placeholder='use a strong password' 
                            name='password' 
                            onChange={(e) => onInputChange(e)}
                            value={password} 
                            
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}
