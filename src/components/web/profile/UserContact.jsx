import React, { useContext } from "react";
import { UserContext } from "../context/user.jsx";

function UserContact() {
    const {userData} = useContext(UserContext);
  return (
    <div>
      <h4>{userData != null ? userData.user.email : ""}</h4>
    </div>
  );
}

export default UserContact;
