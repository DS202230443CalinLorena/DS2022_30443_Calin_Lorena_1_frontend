import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewDevice() {

    const [device, setDevice] = useState({
        address: '',
        description: '',
        maximumHourlyEnergyConsumption: 0
    });

    const {deviceId} = useParams();

    useEffect(() => {
        loadDevice();
    },[]);

    const loadDevice = async () => {
        const result = await axios.get(`http://localhost:8082/device/${deviceId}`);
        setDevice(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Device details</h2>
                <div className='card'>
                    <div className='card-header'>
                        Details of device with id: {device.deviceId}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Address: </b>
                                {device.address}
                            </li>
                            <li className='list-group-item'>
                                <b>Description: </b>
                                {device.description}
                            </li>
                            <li className='list-group-item'>
                                <b>Maximum Hourly Energy Consumption: </b>
                                {device.maximumHourlyEnergyConsumption}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/devices"}>Back</Link>
            </div>
        </div>
    </div>
  )
}
