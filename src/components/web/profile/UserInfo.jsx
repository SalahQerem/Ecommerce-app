import React, { useContext } from "react";
import { UserContext } from "../context/user.jsx";

function UserInfo() {
    const {userData} = useContext(UserContext);
  return (
    <div>
      <h2 className="fs-4">{userData != null ? userData.user.role : ""}</h2>
      <p
        className={`${
          userData != null
            ? userData.user.status == "Active"
              ? "text-success"
              : "text-danger"
            : ""
        } fs-4`}
      >
        {userData != null ? userData.user.status : ""}
      </p>
    </div>
  );
}

export default UserInfo;
