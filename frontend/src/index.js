import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Kategori from './admin/kategori/Kategori.js';

import './index.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Listproduk from './admin/listproduk/Listproduk.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Mengelola Routing atau navigasi pada halaman
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/kategori" element={ <Kategori/>} />
            <Route path="/listproduk" element={ <Listproduk/>} />
        </Routes>
    </BrowserRouter>
);

