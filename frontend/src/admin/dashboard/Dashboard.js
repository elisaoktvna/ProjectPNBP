import React from "react";
import Layout from "../../components/Layout";
import { useFetch } from "./../../hooks/useFetch";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatRupiah } from "../../helpers/currency";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data: totalPenjualan } = useFetch("/getTotalPenjualan");
  const { data: totalKeuntungan } = useFetch("/getTotalKeuntungan");
  const { data: produkTerlaris } = useFetch("/produkTerlaris");
  const { data: chartData } = useFetch("/getChartData");

  // Format data untuk Bar Chart
  const formattedChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Keuntungan (Rp)",
        data: chartData, // Data dari backend yang sudah di-fetch
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Warna batang
        borderColor: "rgba(75, 192, 192, 1)", // Warna garis batang
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Mulai dari 0
      },
    },
  };

  const printTest = async () => {
    const res = await fetch(process.env.REACT_APP_BASE_URL + "/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [
          {
            id: 1,
            qty: 5,
          },
        ],
      }),
    });
    const data = await res.json();
    console.log(data.data.receipt);
  };
  return (
    <Layout>
      <button onClick={printTest}>Print</button>
      {/* //Keuntungan dan Penjualan */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700">
              Total Penjualan
            </h2>
            <p className="text-gray-500 mt-1">Periode Bulan Ini</p>
            <div className="flex items-center mt-4">
              <span className="text-3xl font-semibold text-blue-600">
                {totalPenjualan.total} Transaksi
              </span>
            </div>
            <div
              className={`${
                totalPenjualan.isProfit ? "text-green-500" : "text-red-500"
              } font-semibold mt-2`}
            >
              <span>{totalPenjualan.comparisonPercentage} dari bulan lalu</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700">
              Total Keuntungan
            </h2>
            <p className="text-gray-500 mt-1">Periode Bulan Ini</p>
            <div className="flex items-center mt-4">
              <span className="text-3xl font-semibold text-green-600">
                {totalKeuntungan.total}
              </span>
            </div>
            <div
              className={`${
                totalKeuntungan.isProfit ? "text-green-500" : "text-red-500"
              } font-semibold mt-2`}
            >
              <span>
                {totalKeuntungan.comparisonPercentage} dari bulan lalu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Produk Terlaris dan Chart Keuntungan Bulanan */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Tabel Produk Terlaris
            </h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Nogiht
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Nama Produk
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Jumlah Terjual
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {produkTerlaris.map((pt, i) => (
                  <tr key={i}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {i + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {pt.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {pt.totalTerjual}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {formatRupiah(pt.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-[400px]">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Keuntungan Bulanan
            </h2>
            <div className="h-full">
              <Bar
                data={formattedChartData}
                options={options}
                height={100}
                className="!h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
