import React from "react";
export default function Product({ item, check }) {
   return (
      <div className="product-container col-2">
         <label className="product-label">
            <input
               type="checkbox"
               name="delte"
               className="delete-checkbox"
               onClick={() => check(item.sku)}
            />
            <div className="product-info">
               <h2 className="item-sku">SKU: {item.sku}</h2>
               <h2 className="item-name">Name: {item.name}</h2>
               <h2 className="item-price">Price: {item.price}</h2>
               {item.size && <h2 className="item-type">Size: {item.size}</h2>}
               {item.weight && (
                  <h2 className="item-type">Weight: {item.weight}</h2>
               )}
               {item.dimensions && (
                  <h2 className="item-type">Dimensions: {item.dimensions}</h2>
               )}
            </div>
         </label>
      </div>
   );
}
