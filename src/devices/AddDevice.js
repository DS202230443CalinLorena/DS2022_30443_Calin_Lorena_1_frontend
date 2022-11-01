import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddDevice() {

    let navigate = useNavigate();

    const [device, setDevice] = useState({
        address: '',
        description: '',
        maximumHourlyEnergyConsumption: 0,
    });

    const [userEmailList, setEmailList] = useState([{'email':'','userId':''}]);
    const [userEmail, setUserEmail] = useState('');

    const{address, description, maximumHourlyEnergyConsumption} = device;

    useEffect(() =>{
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:8081/userrole`);
            const newData = await response.json();
            setEmailList(newData);
        };
        fetchData();
    }, [])

    const onInputChange=(e)=>{

        setDevice({...device,[e.target.name]:e.target.value});
        setUserEmail(e.target.value);
    };

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8081/device", device);
        console.log(device.address);
        console.log(userEmail);
        navigate("/devices");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new device</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Address' className='form-label'>
                            Address
                        </label>
                        <input 
                            type={"text"} 
                            className='form-control' 
                            placeholder='Cluj-Napoca, B-dul Muncii 14 ...' 
                            name='address' 
                            onChange={(e) => onInputChange(e)}
                            value={address} 
                            
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Description' className='form-label'>
                            Description
                        </label>
                        <input type={"text"} className='form-control' placeholder='Describe the device' name='description' onChange={(e) => onInputChange(e)} value={description}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Maximum Hourly Energy Consumption' className='form-label'>
                            Maximum Hourly Energy Consumption
                        </label>
                        <input type={"number"} className='form-control' placeholder='0' name='maximumHourlyEnergyConsumption' onChange={(e) => onInputChange(e)} value={maximumHourlyEnergyConsumption}/>
                    </div>


                    <label htmlFor='User' className='form-label'>
                            User
                    </label>
                    <select className="form-control" 
                            name='userEmail'
                            value={userEmail} 
                            onChange={(e) => onInputChange(e)}>
                        
                        <option value="">Choose User</option>

                        {userEmailList.map(email => (
                            <option value={email.email} key={email.userId} >{email.email}</option>
                            ))
                        }
                    </select>

                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link to={"/devices"} className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
