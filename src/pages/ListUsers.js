import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function ListUsers() {

    const [users, setUsers] = useState([])

    const {id} = useParams();

    useEffect(()=>{
        loadUsers();
    }, []);

    const loadUsers = async()=>{
        const result = await axios.get("http://localhost:8082/users");
        console.log(result.data);
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8082/user/${id}`);
        loadUsers();
    }

  return (
    <div className='containter'>
        <br></br>
        <Link className='btn btn-outline-primary' to="/adduser">Add user</Link>
        <br></br>
        <div className='py-4'>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => (
                        <tr>
                            <th scope="row" key={user.userId}>{user.userId}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/viewuser/${user.userId}`} className='btn btn-primary mx-2'>View</Link>
                                <Link to={`/edituser/${user.userId}`} className='btn btn-outline-primary mx-2'>Edit</Link>
                                <button onClick={() => deleteUser(user.userId)} className='btn btn-danger mx-2'>Delete</button>
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
