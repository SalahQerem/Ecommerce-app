import React from "react";

function Loader() {
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
        <div className="spinner-grow text-success" role="status"></div>
    </div>
    
  );
}

export default Loader;
