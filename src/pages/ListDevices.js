import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ListDevices() {

    const [devices, setDevices] = useState([])

    const {id} = useParams();

    useEffect(()=>{
        loadDevices();
    }, []);

    const loadDevices = async()=>{
        const result = await axios.get("http://localhost:8081/devices");
        console.log(result.data);
        setDevices(result.data);
    }

    const deleteDevice = async (id) => {
        await axios.delete(`http://localhost:8081/device/${id}`);
        loadDevices();
    }

  return (
    <div className='containter'>
        <br></br>
        <Link className='btn btn-outline-primary' to="/adddevice">Add device</Link>
        <br></br>
        <div className='py-4'>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Maximum Hourly Energy Consumption</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    devices.map((device) => (
                        <tr>
                            <th scope="row" key={device.deviceId}>{device.deviceId}</th>
                            <td>{device.address}</td>
                            <td>{device.description}</td>
                            <td>{device.maximumHourlyEnergyConsumption}</td>
                            <td>
                                <Link to={`/viewdevice/${device.deviceId}`} className='btn btn-primary mx-2'>View</Link>
                                <Link to={`/editdevice/${device.deviceId}`} className='btn btn-outline-primary mx-2'>Edit</Link>
                                <button onClick={() => deleteDevice(device.deviceId)} className='btn btn-danger mx-2'>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Link to={"/admin"} className='btn btn-outline-danger mx-2'>Back</Link>
        </div>
    </div>
  )
}
