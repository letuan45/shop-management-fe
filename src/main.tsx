import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/auth/login";
import { ThemeProvider } from "./context/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/utils";
import Layout from "./components/shared/Layout";
import Home from "./pages/home";
import { RecoilRoot } from "recoil";
import Employee from "./pages/employee";
import Product from "./pages/product";
import Receipt from "./pages/receipt";
import Supplier from "./pages/supplier";
import Customer from "./pages/customer";
import Selling from "./pages/selling";
import Transaction from "./pages/transaction";
import PrivateRoutes from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <AdminRoute />,
        children: [
          {
            path: "/employee",
            element: (
              <Layout>
                <Employee />
              </Layout>
            ),
          },
          {
            path: "/product",
            element: (
              <Layout>
                <Product />
              </Layout>
            ),
          },
          {
            path: "/receipt",
            element: (
              <Layout>
                <Receipt />
              </Layout>
            ),
          },
          {
            path: "/supplier",
            element: (
              <Layout>
                <Supplier />
              </Layout>
            ),
          },
        ],
      },
      {
        path: "/home",
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: "/customer",
        element: (
          <Layout>
            <Customer />
          </Layout>
        ),
      },
      {
        path: "/selling",
        element: (
          <Layout>
            <Selling />
          </Layout>
        ),
      },
      {
        path: "/transaction",
        element: (
          <Layout>
            <Transaction />
          </Layout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router}></RouterProvider>
        </RecoilRoot>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
);
