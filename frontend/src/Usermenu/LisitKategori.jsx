import React from "react";

const LisitKategori = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex kategori-parent outline-none border-b-4 pb-3 justify-center mb-4">
      {categories.map((category, i) => (
        <button
          key={i}
          className={`bg-gray-200 kategori-item text-gray-700 px-4 py-2 rounded-full mx-2 transition-all transform hover:scale-105 outline-none active:scale-95 hover:bg-yellow-200  active:bg-yellow-500 active:outline-none hover:outline-none focus:outline-none ${
            selectedCategory === category.name ? "bg-yellow-500 text-white" : ""
          }`}
          onClick={() => setSelectedCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default LisitKategori;
