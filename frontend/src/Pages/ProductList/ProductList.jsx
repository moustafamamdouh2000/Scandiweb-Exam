import React, { useEffect } from "react";
import Product from "../../Components/Product/Product";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function ProductList() {
   //get products here then pass the items to the product component
   const [productLists, setProductLists] = useState([]);
   const [checkElements, setCheckElements] = useState([]);
   const location = useLocation();
   useEffect(() => {
      console.log(location.state);
   }, [location.state]);
   useEffect(() => {
      fetchData();
   }, [location]);
   const fetchData = () => {
      fetch("http://46.101.205.247/v1/index.php")
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setProductLists(data);
         });
   };
   const check = (sku) => {
      if (checkElements.includes(sku)) {
         setCheckElements(checkElements.filter((id) => id !== sku));
      } else {
         setCheckElements([...checkElements, sku]);
      }
   };
   const deleteProducts = () => {
      if (checkElements.length > 0) {
         fetch("http://46.101.205.247/v1/index.php", {
            method: "DELETE",
            body: JSON.stringify(checkElements),
         })
            .then((res) => {
               return res.text();
            })
            .then((text) => {
               fetchData();
            });
      }
   };
   const leftBtn = () => {
      return (
         <Link to="/add-product">
            <input type="button" value="Add" className="link-button" />
         </Link>
      );
   };
   const rightBtn = () => {
      return (
         <input
            id="delete-product-btn"
            type="button"
            value="Mass delete"
            onClick={deleteProducts}
         />
      );
   };
   return (
      <div className="container">
         <Navbar leftBtn={leftBtn} rightBtn={rightBtn} title="Product List" />
         {location.state && <h3>{location.state.message}</h3>}
         <div className="row">
            {productLists.map((item) => {
               return <Product key={item.id} item={item} check={check} />;
            })}
         </div>
      </div>
   );
}
