import React, { useContext } from "react";
import { UserContext } from "../context/user.jsx";
import Loader from "../../pages/Loader.jsx";
import style from "./profile.module.css";
import { Link, Outlet } from "react-router-dom";

function Profile() {
  const { userData, loading } = useContext(UserContext);
  if (loading) return <Loader />;
  return (
    <div className="row pt-5">
      <nav className="nav flex-column col-lg-2 text-center">
        <Link
          className="nav-link text-black active fs-5"
          aria-current="page"
          to={''}
        >
          Personal Info
        </Link>
        <Link className="nav-link text-black fs-5" to={'contact'}>
          Contact Info
        </Link>
        <Link className="nav-link text-black fs-5" to={'orders'}>
          Orders
        </Link>
      </nav>
      <div className="col-lg-10 row pt-1">
        <div className={`col-lg-8`}><Outlet /></div>
        <div className={`${style.userImage} col-lg-4`}>
          <img
            src={userData != null ? userData.user.image.secure_url : ""}
            alt="personal image"
            className="img-fluid w-75 rounded-circle"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
