import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateDevice() {

    let navigate = useNavigate();

    const {deviceId} = useParams();

    const [device, setDevice] = useState({
        address: '',
        description: '',
        maximumHourlyEnergyConsumption: 0,
    });

    const{address, description, maximumHourlyEnergyConsumption} = device;

    const onInputChange=(e)=>{

        setDevice({...device,[e.target.name]:e.target.value});
    };

    useEffect(() => {
        loadDevice();
    },[]);

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8082/device/${deviceId}`, device);
        navigate("/devices");
    }

    const loadDevice = async () => {
        const result = await axios.get(`http://localhost:8082/device/${deviceId}`);
        setDevice(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Update device</h2>
                
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
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link to={"/devices"} className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
