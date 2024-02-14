import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.scss";
import ProductList from "./Pages/ProductList/ProductList";
import ProductAdd from "./Pages/ProductAdd/ProductAdd";
import Footer from "./Components/Footer/Footer";
function App() {
   return (
      <div className="body">
         <BrowserRouter>
            <Routes>
               <Route index element={<ProductList />} />
               <Route path="/add-product" element={<ProductAdd />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </div>
   );
}

export default App;
