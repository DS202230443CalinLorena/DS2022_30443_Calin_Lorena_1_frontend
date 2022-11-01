import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateUser() {

    let navigate = useNavigate();

    const {userId} = useParams();

    const [user, setUser] = useState({
        name: ''
    });

    const{name, email, password} = user;

    const onInputChange=(e)=>{

        setUser({...user,[e.target.name]:e.target.value});
    };

    useEffect(() => {
        loadUser();
    },[]);

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8081/user/${userId}`, user);
        navigate("/users");
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8081/user/${userId}`);
        setUser(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Update user</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Name
                        </label>
                        <input 
                            type={"text"} 
                            className='form-control'
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
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link to={"/users"} className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
