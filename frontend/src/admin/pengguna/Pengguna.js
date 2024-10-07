import React from "react";
import Layout from "../../components/Layout";
// import Add from "./Add";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import AddPengguna from "./AddPengguna";


const Pengguna = () => {
  // const { data: kategoris } = useFetch("/kategori");
  return (
    <Layout>
      <div className="mb-6 flex items-center ">
        <div className="">
          <h1 className="font-semibold">List Pengguna</h1>
          <p className="text-slate-500">
            Berikut Adalah Tabel Untuk Pengguna yang tersedia
          </p>
        </div>
        <AddPengguna />
      </div>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border-b py-4 text-slate-500 font-semibold w-16">
              No
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold w-[150px]"
              align="start"
            >
              Nama
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              Username
            </th>
            {/* <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              Password
            </th> */}
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              email
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              role
            </th>
            <th
              className="border-b py-4 text-slate-500 w-[200px] font-semibold"
              align="start"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {kategoris.length == 0 && (
            <tr>
              <td
                className="border-b py-4 text-center text-slate-500"
                colSpan={"4"}
              >
                Data pengguna tidak ada
              </td>
            </tr>
          )} */}
          {/* {kategoris.map((kategori, i) => {
            return (
              <tr key={i}>
                <td className="border-b py-4  p-2" align="middle">
                  {i + 1}
                </td>
                <td className="border-b py-4">
                  <img
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/images/" +
                      kategori.image
                    }
                    className="w-[50px] h-[50px] bg-[#FFC200] rounded-md"
                    alt=""
                  />
                </td>
                <td className="border-b py-4">{kategori.name}</td>
                <td className="border-b py-4"> */}
                  {/* <Update
                    id={kategori.id}
                    data={{ name: kategori.name, url: kategori.url }}
                  />
                  <Delete id={kategori.id} nama={kategori.name} /> */}
                {/* </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </Layout>
  );
};

export default Pengguna;
