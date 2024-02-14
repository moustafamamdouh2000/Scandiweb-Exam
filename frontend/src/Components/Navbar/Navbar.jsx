import React from "react";
export default function Navbar({ leftBtn, rightBtn, title }) {
   return (
      <div className="navbar">
         <h1 className="title">{title}</h1>
         <div className="button-container">
            {leftBtn()}
            {rightBtn()}
         </div>
      </div>
   );
}
