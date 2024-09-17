import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import Kategori from "./admin/kategori/Kategori.js";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalContextProvider>
    <Toaster />
    {/* // Mengelola Routing atau navigasi pada halaman */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kategori" element={<Kategori />} />
      </Routes>
    </BrowserRouter>
  </GlobalContextProvider>
);
