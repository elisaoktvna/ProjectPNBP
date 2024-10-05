import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.js";
import Loading from "./components/Loading";
import Login from "./auth/Login.jsx";
import Protected from "./Protected.js";

// Lazy load the components
const Kategori = lazy(() => import("./admin/kategori/Kategori.js"));
const Produk = lazy(() => import("./admin/listproduk/Produk.js"));
const Dashboard = lazy(() => import("./admin/dashboard/Dashboard.js"));
const Laporan = lazy(() => import("./admin/laporan/Laporan.jsx"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalContextProvider>
    <Toaster />
    {/* Manage Routing or navigation with Suspense for loading fallback */}
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/kategori"
            element={
              <Protected>
                <Kategori />
              </Protected>
            }
          />
          <Route
            path="/listproduk"
            element={
              <Protected>
                <Produk />
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/laporan"
            element={
              <Protected>
                <Laporan />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </GlobalContextProvider>
);
