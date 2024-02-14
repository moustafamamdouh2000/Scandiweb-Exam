import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ProductAdd() {
   const [productType, setProductType] = useState("Dvd");
   const [backendResponse, setBackendResponse] = useState();
   const nav = useNavigate();
   const [formData, setFormData] = useState({
      sku: "",
      name: "",
      price: "",
      size: "",
      weight: "",
      height: "",
      width: "",
      length: "",
      dimensions: "",
      type: "",
   });
   const [errors, setErrors] = useState({
      sku: "",
      name: "",
      price: "",
      size: "",
      weight: "",
      dimensions: "",
   });
   const switchType = (e) => {
      setProductType(e.target.value);
   };
   const handleSubmit = () => {
      if (Object.keys(errors).length === 0) {
         switch (productType) {
            case "Book":
               formData.weight += "KG";
               formData.type = "Book";
               break;
            case "Furniture":
               formData.type = "Furniture";
               break;
            case "Dvd":
               formData.size += "MB";
               formData.type = "Dvd";
               break;
            default:
         }
         formData.dimensions =
            formData.height + "x" + formData.width + "x" + formData.length;
         console.log(formData);
         fetch("http://64.227.113.89/", {
            method: "POST",
            body: JSON.stringify(formData),
         })
            .then((res) => {
               return res.text();
            })
            .then((data) => {
               setBackendResponse(data);
               if (data === "Success") {
                  nav("/");
               }
            });
      }
   };
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      formValidation({ ...formData, [name]: value });
   };
   const formValidation = (formData) => {
      let newErrors = {};
      if (!formData) {
         return;
      }
      if (formData.sku !== formData.sku.toUpperCase()) {
         newErrors.sku = "SKU must be all capital letters";
      }
      if (!formData.sku) {
         newErrors.sku = "SKU is required";
      }
      if (!formData.name) {
         newErrors.name = "Name is required";
      }
      if (!parseFloat(formData.price)) {
         newErrors.price = "Price must be a number";
      }
      if (formData.price < 0) {
         newErrors.price = "Price must be a positive number";
      }
      if (!formData.price) {
         newErrors.price = "Price is required";
      }
      if (productType === "Book" && !isNumber(formData.weight)) {
         newErrors.weight = "Weight must be a number";
      }
      if (productType === "Book" && formData.weight < 0) {
         newErrors.weight = "Weight must be a positive number";
      }
      if (productType === "Book" && !formData.weight) {
         newErrors.weight = "Weight is required";
      }
      if (
         productType === "Furniture" &&
         (!isNumber(formData.height) ||
            !isNumber(formData.length) ||
            !isNumber(formData.width))
      ) {
         newErrors.dimensions =
            "Error in the dimension fields, please check the format and input only positive numbers";
      }
      if (
         productType === "Furniture" &&
         (!formData.height || !formData.length || !formData.width)
      ) {
         newErrors.dimensions =
            "Height and Width and Length fields are required";
      }
      if (productType === "Dvd" && !isNumber(formData.size)) {
         newErrors.size = "Size must be a number";
      }
      if (productType === "Dvd" && formData.size < 0) {
         newErrors.size = "Size must be a positive number";
      }
      if (productType === "Dvd" && !formData.size) {
         newErrors.size = "Size is required";
      }
      setErrors(newErrors);
   };
   const isNumber = (value) => {
      return /^\d+$/.test(value);
   };
   const checkInputFields = () => {
      formValidation();
   };
   const leftBtn = () => {
      return (
         <input
            className="save-button"
            type="button"
            value="Save"
            onClick={handleSubmit}
         />
      );
   };
   const rightBtn = () => {
      return (
         <Link to="/">
            <input type="button" value="Cancel" className="link-button" />
         </Link>
      );
   };
   return (
      <div className="container">
         <Navbar leftBtn={leftBtn} rightBtn={rightBtn} title="Product Add" />
         <form id="product_form" action="" method="POST">
            <label htmlFor="sku">SKU</label>
            <input
               onFocus={checkInputFields}
               onChange={handleChange}
               className="input-field"
               type="text"
               name="sku"
               id="sku"
            />
            {errors.sku && <h3 className="error-message">{errors.sku}</h3>}
            <br />
            <label htmlFor="name">Name</label>
            <input
               onFocus={checkInputFields}
               onChange={handleChange}
               className="input-field"
               type="text"
               name="name"
               id="name"
            />
            {errors.name && <h3 className="error-message">{errors.name}</h3>}
            <br />
            <label htmlFor="price">Price ($)</label>
            <input
               onFocus={checkInputFields}
               onChange={handleChange}
               className="input-field"
               type="text"
               name="price"
               id="price"
            />
            {errors.price && <h3 className="error-message">{errors.price}</h3>}
            <br />
            <label htmlFor="">Type</label>
            <select
               className="input-field"
               onChange={switchType}
               name="typeSwitcher"
               id="productType"
            >
               <option value="Dvd" id="Dvd">
                  DVD
               </option>
               <option value="Furniture" id="Furniture">
                  Furniture
               </option>
               <option value="Book" id="Book">
                  Book
               </option>
            </select>
            {productType === "Dvd" ? (
               <>
                  <h3>Please Enter the DVD size</h3>
                  <label htmlFor="size">Size (MB)</label>
                  <input
                     onFocus={checkInputFields}
                     onChange={handleChange}
                     className="input-field"
                     name="size"
                     type="text"
                     id="size"
                  />
                  {errors.size && (
                     <h3 className="error-message">{errors.size}</h3>
                  )}
               </>
            ) : (
               <></>
            )}
            {productType === "Furniture" ? (
               <>
                  <h3>Please Enter the dimensions in HxWxL format</h3>
                  <label htmlFor="height">Height (CM)</label>
                  <input
                     onFocus={checkInputFields}
                     onChange={handleChange}
                     className="input-field"
                     name="height"
                     type="text"
                     id="height"
                  />{" "}
                  <br />
                  <label htmlFor="width">Width (CM)</label>
                  <input
                     onFocus={checkInputFields}
                     onChange={handleChange}
                     className="input-field"
                     name="width"
                     type="text"
                     id="width"
                  />
                  <br />
                  <label htmlFor="length">Length (CM)</label>
                  <input
                     onFocus={checkInputFields}
                     onChange={handleChange}
                     className="input-field"
                     name="length"
                     type="text"
                     id="length"
                  />
                  <br />
                  {errors.dimensions && (
                     <h3 className="error-message">{errors.dimensions}</h3>
                  )}
               </>
            ) : (
               <></>
            )}
            {productType === "Book" ? (
               <>
                  <h3>Please Enter the weight of the book</h3>
                  <label htmlFor="weight">Weight (KG)</label>
                  <input
                     onFocus={checkInputFields}
                     onChange={handleChange}
                     className="input-field"
                     name="weight"
                     type="text"
                     id="weight"
                  />
                  {errors.weight && (
                     <h3 className="error-message">{errors.weight}</h3>
                  )}
               </>
            ) : (
               <></>
            )}
            {backendResponse && (
               <h3 className="error-message">{backendResponse}</h3>
            )}
         </form>
      </div>
   );
}
