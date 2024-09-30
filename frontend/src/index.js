import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.js";
import Loading from "./components/Loading";

// Lazy load the components
const Kategori = lazy(() => import("./admin/kategori/Kategori.js"));
const Listproduk = lazy(() => import("./admin/listproduk/Listproduk.js"));
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
          <Route path="/" element={<App />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/listproduk" element={<Produk />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan" element={<Laporan />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </GlobalContextProvider>
);
