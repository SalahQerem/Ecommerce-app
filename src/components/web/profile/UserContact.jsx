import React, { useContext } from "react";
import { UserContext } from "../context/user.jsx";

function UserContact() {
    const {userData} = useContext(UserContext);
  return (
    <div>
      <h2>{userData != null ? userData.user.email : ""}</h2>
    </div>
  );
}

export default UserContact;
