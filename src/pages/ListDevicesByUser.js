import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import { toast, ToastContainer } from 'react-toastify';

export default function ListDevicesByUser() {

    const SOCKET_URL = 'http://localhost:8081/stomp';
    const [devices, setDevices] = useState([])
    const [user, setUser] = useState([])
    const [message, setMessage] = useState('');
    const {userId} = useParams();

    useEffect(()=>{
        loadDevices();
        loadUser();
    }, []);

    const loadDevices = async()=>{
        const result = await axios.get(`http://localhost:8081/devicesByUserId/${userId}`);
        console.log(result.data);
        setDevices(result.data);
    }

    const loadUser = async()=>{
        const foundUser = await axios.get(`http://localhost:8081/user/${userId}`);
        setUser(foundUser.data);
    }

    let onMessageReceived = (msg) => {
        if(msg.correspondingUserId == userId ){
            // console.log("backend id: " + userId + " frontend id: " + msg.correspondingUserId);
            notifyExceedDeviceConsumption(msg.message);
        }
        else {
            console.log("Device with id: " + msg.deviceId + " is not associated to this user!");
            // notifyExceedDeviceConsumption("Device with id: " + msg.deviceId + " is not associated to this user!");
        }
    }

    const notifyExceedDeviceConsumption = (message) => {
        toast(message, { position: toast.POSITION.BOTTOM_CENTER })
    }

  return (
    <div className='containter'>
        <ToastContainer />
        <div className='py-4'>
        <h2 className='text-center m-4'>Welcome, {user.name}!</h2>
        <h3 className='text-center m-4'>List of your devices: </h3>
        <br></br>
        <div>
            Do you need help? Start a chat with your administrator: 
            <Link to={'/chat'} className='btn btn-primary mx-2'>Chat</Link>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Maximum Hourly Energy Consumption</th>
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
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Link to={"/"} className='btn btn-outline-danger mx-2'>Logout</Link>
        </div>

        <SockJsClient url={SOCKET_URL}
            topics={['/topic/message']}
            onConnect={console.log("Connected!!")}
            onDisconnect={console.log("Disconnected!")}
            onMessage={msg => 
                {
                    onMessageReceived(msg);
                    console.log(msg);
                }
                }
            debug={false}
        />
    </div>
  )
}