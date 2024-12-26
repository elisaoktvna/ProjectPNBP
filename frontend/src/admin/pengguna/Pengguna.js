import React from "react";
import Layout from "../../components/Layout";
// import Add from "./Add";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import AddPengguna from "./AddPengguna.js";
import UpdatePengguna from "./UpdatePengguna.js";
import DeletePengguna from "./DeletePengguna.js";

const Pengguna = () => {
  const {
    data: { data: users },
  } = useFetch("/users");
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
              className="border-b py-4 text-slate-500 font-semibold w-[200px]"
              align="start"
            >
              Nama
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              Email
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              Role
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
          {users?.length == 0 && (
            <tr>
              <td
                className="border-b py-4 text-center text-slate-500"
                colSpan={"4"}
              >
                Data pengguna tidak ada
              </td>
            </tr>
          )}
          {users?.map((user, i) => {
            return (
              <tr key={i}>
                <td className="border-b py-4  p-2" align="middle">
                  {i + 1}
                </td>
                <td className="border-b py-4">{user.name}</td>
                <td className="border-b py-4">{user.email}</td>
                <td className="border-b py-4">{user.role}</td>
                <td className="border-b py-4">
                  <UpdatePengguna id={user.id} data={{ ...user }} />
                  <DeletePengguna id={user.id} nama={user.name} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Pengguna;
