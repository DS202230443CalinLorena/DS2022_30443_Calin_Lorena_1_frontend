import React from 'react'
import { Link } from 'react-router-dom'

export default function Administrator() {
  return (
    <div className='containter'>
        <h1 className='text-center m-4'>Welcome to Administrator page!</h1>
        <Link to={'/devices'} className='btn btn-primary mx-2'>Devices page</Link>
        <Link to={'/users'} className='btn btn-primary mx-2'>Users page</Link>
    </div>
  )
}
