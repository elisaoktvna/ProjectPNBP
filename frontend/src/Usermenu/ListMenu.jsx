import React from "react";

const ListMenu = ({
  filteredProduks,
  backendURL,
  selectedCategory,
  addToOrder,
}) => {
  return (
    <div className="pt-24 grid grid-cols-4 produk-parent  border-l-4 pl-4 outline-none  gap-x-6 gap-y-20">
      {filteredProduks?.length === 0 ? (
        <div className="text-center text-gray-500">
          Tidak ada produk untuk kategori {selectedCategory}
        </div>
      ) : (
        filteredProduks?.map((produk) => {
          return (
            <div
              key={produk.id}
              tabIndex="-1"
              className="bg-white p-4 border-transparent active:border-yellow-500 focus:border-yellow-500 border-4 outline-none  produk-item rounded-lg shadow-md flex flex-col items-center relative group hover:-translate-y-3 focus:-translate-y-3 active:-translate-y-3  transition-transform duration-200 ease-in-out"
              onClick={() => addToOrder(produk)}
            >
              <img
                src={
                  produk.image
                    ? `${backendURL}/images/${produk.image}`
                    : `${backendURL}/images/default-image.jpg`
                }
                alt={produk.name || "Produk"}
                className="absolute top-0 transform -translate-y-1/2 mb-2 object-cover"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="text-center mt-16">
                <h3 className="font-bold">{produk.name}</h3>
                <p className="text-orange font-bold text-lg">
                  {produk.price ? `Rp ${produk.price}` : "No price"}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListMenu;
