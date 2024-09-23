import React from 'react'
import Layout from '../../components/Layout'

const Dashboard = () => {
  return (
    <Layout>

      {/* //keuntugan penjualan */}
    <div class="container mx-auto p-6">
    <div class= "grid grid-cols-1 lg:grid-cols-2 gap-4 ">  
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-700">Total Penjualan</h2>
        <p class="text-gray-500 mt-1">Periode Bulan Ini</p>
        <div class="flex items-center mt-4">
          <span class="text-3xl font-semibold text-blue-600">Rp 250.000.000</span>
        </div>
        <div class="text-green-500 font-semibold mt-2">
          <span>+10% dari bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-700">Total Keuntungan</h2>
        <p class="text-gray-500 mt-1">Periode Bulan Ini</p>
        <div class="flex items-center mt-4">
          <span class="text-3xl font-semibold text-green-600">Rp 50.000.000</span>
        </div>
        <div class="text-red-500 font-semibold mt-2">
          <span>-5% dari bulan lalu</span>
        </div>
      </div>
  </div>

    {/* tabel dan pie chart */}
  </div>
  <div class="container mx-auto p-6">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Tabel Produk Terlaris</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">No</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Nama Produk</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Jumlah Terjual</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border-b border-gray-200">1</td>
              <td class="py-2 px-4 border-b border-gray-200">Produk A</td>
              <td class="py-2 px-4 border-b border-gray-200">100</td>
              <td class="py-2 px-4 border-b border-gray-200">Rp 100.000</td>
            </tr>
            <tr>
              <td class="py-2 px-4 border-b border-gray-200">2</td>
              <td class="py-2 px-4 border-b border-gray-200">Produk B</td>
              <td class="py-2 px-4 border-b border-gray-200">75</td>
              <td class="py-2 px-4 border-b border-gray-200">Rp 150.000</td>
            </tr>
            <tr>
              <td class="py-2 px-4 border-b border-gray-200">3</td>
              <td class="py-2 px-4 border-b border-gray-200">Produk C</td>
              <td class="py-2 px-4 border-b border-gray-200">50</td>
              <td class="py-2 px-4 border-b border-gray-200">Rp 200.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Penjualan Produk (Pie Chart)</h2>
        <canvas id="myPieChart"></canvas>
      </div>
    </div>
  </div>
    </Layout>
    
  )
}

export default Dashboard