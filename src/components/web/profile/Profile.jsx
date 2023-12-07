import React, { useContext } from 'react'
import { UserContext } from '../context/user.jsx'

function Profile() {
    const {userData} = useContext(UserContext);
    console.log(userData);
  return (
    <div className='container'>
        <div className='row mt-5'>
            <div className='col-lg-5'>
                <img src={userData != null? userData.user.image.secure_url : ""} alt="personal image" className='img-fluid w-100'/>
            </div>
            <div className='col-lg-7 text-center'>
                <h2>{userData != null? userData.user.email: ""}</h2>
                <p className='fs-4'>{userData != null? userData.user.role: ""}</p>
                <p className={`${userData != null? (userData.user.status == "Active" ? 'text-success' : "text-danger") : ""} fs-4`}>{userData != null? userData.user.status: ""}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile