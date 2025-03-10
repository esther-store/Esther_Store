import React, { Suspense } from "react";
import { Route, Routes} from "react-router-dom";
const ManagementProducts = React.lazy(() =>
  import("./store_pages/managment/ManagementProducts.jsx")
);
const Home = React.lazy(() => import("./store_pages/Home.jsx"));

const ManagementPromotions = React.lazy(() =>
  import("./store_pages/managment/ManagementPromotions.jsx")
);
const ManagementSecurity = React.lazy(() =>
  import("./store_pages/managment/ManagementSecurity.jsx")
);
const ManagementContact = React.lazy(() =>
  import("./store_pages/managment/ManagementContact.tsx")
);
const Login = React.lazy(() => import("./store_pages/Login.jsx"));
const ChangePassword = React.lazy(() =>
  import("./store_pages/ChangePassword.jsx")
);
const ProductDetailPage = React.lazy(() =>
  import("@/store_pages/ProductDetailPage.jsx")
);
const Page404 = React.lazy(() => import("./store_pages/Page404.jsx"));
const Bye = React.lazy(() => import("./store_pages/Bye.jsx"));
const ProtectedRoute = React.lazy(() =>
  import("./components/ProtectedRoute.tsx")
);
const ManagementCategories = React.lazy(() =>
  import("./store_pages/managment/ManagementCategories.jsx")
);
const Store = React.lazy(() => import("./store_pages/Store"));

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/store"
          element={
            <Suspense>
              <Store />
            </Suspense>
          }
        />
        <Route
          path="/store/product/:productId"
          element={
            <Suspense>
              <ProductDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/management/products"
          element={
            <Suspense>
              <ProtectedRoute>
                <ManagementProducts />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/management/categories"
          element={
            <Suspense>
              <ProtectedRoute>
                <ManagementCategories />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/management/promotions"
          element={
            <Suspense>
              <ProtectedRoute>
                <ManagementPromotions />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/management/users"
          element={
            <Suspense>
              <ProtectedRoute>
                <ManagementSecurity />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/management/contact"
          element={
            <Suspense>
              <ProtectedRoute>
                <ManagementContact />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/change-password"
          element={
            <Suspense>
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/bye"
          element={
            <Suspense>
              <Bye />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <Page404 />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
