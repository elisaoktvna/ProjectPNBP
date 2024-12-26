import React, { useState, useEffect } from "react";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure that images is always an array
  const safeImages = images || [];

  // Fungsi untuk menggeser ke gambar sebelumnya
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? safeImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Fungsi untuk menggeser ke gambar berikutnya
  const goToNext = () => {
    const isLastSlide = currentIndex === safeImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Fungsi untuk autoplay
  useEffect(() => {
    if (safeImages.length > 0) {
      const interval = setInterval(goToNext, 5000); // Ganti gambar setiap 3 detik
      return () => clearInterval(interval); // Membersihkan interval ketika komponen dibersihkan
    }
  }, [currentIndex, safeImages.length]);

  // Pastikan ada gambar untuk ditampilkan
  if (safeImages.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl mb-4">
      {/* Gambar slider dengan smooth transition */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Move image by 100% width per slide
        }}
      >
        {safeImages.map((image, i) => (
          <img
            key={i}
            src={`${process.env.REACT_APP_BASE_URL}/images/${image}`}
            alt={`Banner ${i + 1}`}
            className=" min-w-[100%] aspect-[3.5/1] object-cover shadow-md"
          />
        ))}
      </div>

      {/* Tombol navigasi */}
      <button
        onClick={goToPrevious}
        className="absolute w-10 top-1/2 left-4  transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      <button
        onClick={goToNext}
        className="absolute w-10 top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Slider;
