import React from 'react'
import Add from "./Addproduk";

import Layout from '../../components/Layout'
import {Link} from "react-router-dom"

const Listproduk = () => {
  return (
    <Layout>
    <div className="mb-6 flex items-center ">
        <div className="">
            <h1 className='font-semibold'>List Produk</h1>
            <p className='text-slate-500'>Berikut Adalah Tabel untuk produk yang tersedia</p>
        </div>
       
    </div>
    <table className='border w-full'>
              <thead>
                  <tr>
                      <th className='border-b py-4 text-slate-500 font-semibold w-22'  >No</th>
                      <th className='border-b py-4 text-slate-500 font-semibold w-[150px]' align='start'>Foto Produk</th>
                      <th className='border-b py-4 text-slate-500 font-semibold' align='start'>Nama Produk</th>
                      <th className='border-b py-4 text-slate-500 font-semibold' align='start'>Stok</th>
                      <th className='border-b py-4 text-slate-500 font-semibold' align='start'>Harga</th>
                      <th className='border-b py-4 text-slate-500 font-semibold' align='start'>Aksi</th>
                  </tr>
              </thead>
    </table>
    </Layout>
  )
}

export default Listproduk