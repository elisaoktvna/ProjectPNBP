import React from 'react'
import Layout from '../../components/Layout'
import Add from "./Add";
import {Link} from "react-router-dom"

const dummy = [
    {
        name:"Minuman",
        image:"https://picsum.photos/id/1/200/300"
    },
    {
        name:"Makanan",
        image:"https://picsum.photos/id/1/200/300"
    },
    {
        name:"Soda",
        image:"https://picsum.photos/id/1/200/300"
    }
]

const Kategori = () => {
  return (
      <Layout>
          <div className="mb-6 flex items-center ">
              <div className="">
                          <h1 className='font-semibold'>List Kategori</h1>
          <p className='text-slate-500'>Berikut Adalah Tabel  Untuk Kategori yang tersedia</p>
         </div>
             <Add/>
       </div>
          <table className='border w-full'>
              <thead>
                  <tr>
                      <th className='border-b py-4 text-slate-500 font-semibold w-22'  >No</th>
                      <th className='border-b py-4 text-slate-500 font-semibold w-[150px]' align='start'>Foto Kategori</th>
                      <th className='border-b py-4 text-slate-500 font-semibold' align='start'>Nama Kategori</th>
                      <th className='border-b py-4 text-slate-500 font-semibold' align='start'>Aksi</th>
                  </tr>
              </thead>
              <tbody>
                  {dummy.map((d,i)=>{
                    return <tr key={i}>
                    <td className='border-b py-4  p-2' align='middle'>{i+1}</td>
                    <td className='border-b py-4'><img src={d.image} className='w-[50px] h-[50px] bg-[#FFC200] rounded-md' alt="" /></td>
                    <td className='border-b py-4'>{d.name}</td>
                    <td className='border-b py-4'>
                        <a href="" className='text-white me-2 text-sm px-4 rounded-full hover:bg-green-500/70 bg-green-500 py-1'>Ubah</a>
                        <a href="" className='text-white text-sm  px-4 rounded-full hover:bg-[#F65454]/70 bg-[#F65454] py-1'>Hapus</a>
                    </td>
                </tr>
                  })}
              </tbody>
          </table>
      </Layout>
  )
}

export default Kategori