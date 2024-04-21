import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
