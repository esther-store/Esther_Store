import PageLoader from "@/components/PageLoader/index.jsx";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const ManagementProducts = React.lazy(() =>
  import("./store_pages/managment/ManagementProducts.jsx")
);
const Home = React.lazy(() => import("./store_pages/Home.jsx"));
const ManagementMenu = React.lazy(() =>
  import("./store_pages/managment/ManagementMenu.jsx")
);
const ManagementOferts = React.lazy(() =>
  import("./store_pages/managment/ManagementOferts.jsx")
);
const ManagementSecurity = React.lazy(() =>
  import("./store_pages/managment/ManagementSecurity.jsx")
);
const ManagementContact = React.lazy(() =>
  import("./store_pages/managment/ManagementContact.jsx")
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
  import("./components/ProtectedRoute/index.jsx")
);
const ManagementCategories = React.lazy(() =>
  import("./store_pages/managment/ManagementCategories.jsx")
);
const Store = React.lazy(() => import("./store_pages/Store"));

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoader/>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/store"
        element={
          <Suspense fallback={<PageLoader/>}>
            <Store />
          </Suspense>
        }
      />
      <Route
        path="/store/product/:productId"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProductDetailPage />
          </Suspense>
        }
      />
      <Route
        path="/management-menu"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ManagementMenu />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/management/products"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ManagementProducts />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/management/categories"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ManagementCategories />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/management/oferts"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ManagementOferts />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/management/security"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ManagementSecurity />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/management/contact"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ManagementContact />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<PageLoader/>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/change-password"
        element={
          <Suspense fallback={<PageLoader/>}>
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/bye"
        element={
          <Suspense fallback={<PageLoader/>}>
            <Bye />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoader/>}>
            <Page404 />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
