import React from "react";
import bgStyle from "../../../assets/css/bgImage.module.css";
import Categories from "../categories/Categories.jsx";
import style from "./Home.module.css";

function Home() {
  return (
    <div>
      <div className={`${bgStyle.mainBg}`}>
        <div className={`${bgStyle.overlay}`}>
          <div className="container d-flex justify-content-start align-items-center w-100">
            <div className="w-75">
              <h1 className={`${style.title} text-warning`}>S-Shop</h1>
              <p className={`${style.description}`}>Stay productive and get more work done!</p>
            </div>
          </div>
        </div>
      </div>
      <div id="categories" className="my-5">
        <Categories />
      </div>
    </div>
  );
}

export default Home;
