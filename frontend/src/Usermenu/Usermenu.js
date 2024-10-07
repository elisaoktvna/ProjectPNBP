import React from 'react'
import Layout from '../components/Layout'
import Baner from '../asset/Rectangle 27 (1).png'
import Mie from '../asset/mie.png'
import Milo from '../asset/milo.png'
const Usermenu = () => {
  return (
    <Layout> 
    <div className="flex">
                    <div className="w-3/4 p-4">
                        <div className="mb-4">
                            <img src={Baner} alt={Baner} className="rounded-3xl shadow-md w-full" />
                        </div>
                        <div className="flex justify-center mb-4">
                            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">Minuman Dingin</button>
                            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">Minuman Panas</button>
                            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">Makanan Berat</button>
                            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">Snack</button>
                            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">Juice</button>
                        </div>
                        <div className="mt-24 grid grid-cols-3 gap-x-6 gap-y-20">
                            {[
                                { name: "Taro Milk tea", price: "Rp 5000", rating: 5.0, img: Mie  },
                                { name: "Mochaccino", price: "Rp 5000", rating: 5.0, img: Milo },
                                { name: "Chocolate", price: "Rp 5000", rating: 5.0, img: Mie },
                                { name: "Thai Tea", price: "Rp 5000", rating: 5.0, img: Milo },
                                { name: "Cincau Susu Gula Aren", price: "Rp 5000", rating: 5.0, img: Mie },
                                { name: "Kopi susu Gula Aren", price: "Rp 5000", rating: 5.0, img: Milo },
                                { name: "Lemon Tea", price: "Rp 4000", rating: 5.0, img: "https://placehold.co/100x200" },
                                { name: "Teh", price: "Rp 4000", rating: 5.0, img: "https://placehold.co/100x200" },
                                { name: "Milo", price: "Rp 4000", rating: 5.0, img: "https://placehold.co/100x200" }
                            ].map((item, index) => (
                                <div key={index} className="bg-yellow-100 p-4 rounded-lg shadow-md flex flex-col items-center relative group hover:-translate-y-3 transition-transform duration-300 ease-in-out">
                                    <img
                                        src={item.img} 
                                        alt={item.name} 
                                        className="absolute top-0 transform -translate-y-1/2 mb-2 object-contain "
                                        style={{ width: '120px', height: '120px' }}/>
                                    <div className="text-center mt-16">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-gray-700">{item.price}</p>
                                        <p className="text-yellow-500"><i className="fas fa-star"></i> {item.rating}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4 p-4 bg-white shadow-md">
                        <h2 className="text-xl font-bold mb-4"><i className="fas fa-shopping-cart"></i> Order List</h2>
                        <div className="flex justify-between mb-2">
                            <span>Total Item : 0</span>
                            <span>Total Harga : Rp 0</span>
                        </div>
                        <hr className="mb-2" />
                        <div className="flex justify-between mb-2">
                            <span>Total Item : 0</span>
                            <span>Total Harga : Rp 0</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Checkout</button>
                        </div>
                    </div>
                </div>

</Layout>
  )
}

export default Usermenu