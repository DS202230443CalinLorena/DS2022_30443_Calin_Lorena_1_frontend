import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const {userId} = useParams();

    useEffect(() => {
        loadUser();
    },[]);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8082/user/${userId}`);
        setUser(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>User details</h2>
                <div className='card'>
                    <div className='card-header'>
                        Details of user with id: {user.userId}
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Name: </b>
                                {user.name}
                            </li>

                            <li className='list-group-item'>
                                <b>Email: </b>
                                {user.email}
                            </li>

                            <li className='list-group-item'>
                                <b>Password: </b>
                                {user.password}
                            </li>

                            <li className='list-group-item'>
                                <b>Role: </b>
                                {user.role}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/users"}>Back</Link>
            </div>
        </div>
    </div>
  )
}
