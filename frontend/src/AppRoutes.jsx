import { Route, Routes } from "react-router-dom";
import Store from "./store_pages/Store.jsx";
import ManagementProducts from "./store_pages/managment/ManagementProducts.jsx";
import Home from "./store_pages/Home.jsx";
import ManagementMenu from "./store_pages/managment/ManagementMenu.jsx";
import ManagementOferts from "./store_pages/managment/ManagementOferts.jsx";
import ManagementSecurity from "./store_pages/managment/ManagementSecurity.jsx";
import ManagementContact from "./store_pages/managment/ManagementContact.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import Login from "./store_pages/Login.jsx";
import ChangePassword from "./store_pages/ChangePassword.jsx";
import Bye from "./store_pages/Bye.jsx";
import { ProductDetailPage } from "@/store_pages/ProductDetailPage.jsx";
import { Page404 } from "./store_pages/Page404.jsx";
import ManagementCategories from "./store_pages/managment/ManagementCategories.jsx";

function AppRoutes() {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route
              path="/store/product/:productId"
              element={<ProductDetailPage />}
            />
            <Route
              path="/management-menu"
              element={
                <ProtectedRoute>
                  <ManagementMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/products"
              element={
                <ProtectedRoute>
                  <ManagementProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/categories"
              element={
                <ProtectedRoute>
                  <ManagementCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/oferts"
              element={
                <ProtectedRoute>
                  <ManagementOferts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/security"
              element={
                <ProtectedRoute>
                  <ManagementSecurity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/contact"
              element={
                <ProtectedRoute>
                  <ManagementContact />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/bye" element={<Bye />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
     );
}

export default AppRoutes;