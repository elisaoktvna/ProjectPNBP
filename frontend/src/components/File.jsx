import React, { useState, useRef } from "react";

const FileInput = ({
  name,
  url = "default-image.jpg",
  accept = "image/*",
  hasClear = false,
  onChangeTrigger,
}) => {
  const [imageUrl, setImageUrl] = useState(url);
  const fileInputRef = useRef(null);

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update imageUrl with the new file URL
      setImageUrl(URL.createObjectURL(file));
      if (onChangeTrigger) onChangeTrigger(file); // Pass the file to the callback
    }
  };

  const handleClear = () => {
    // Reset file input and imageUrl
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImageUrl("default-image.jpg");

    if (onChangeTrigger) onChangeTrigger(null); // Pass null to indicate reset
  };

  console.log(hasClear && imageUrl != "default-image.jpg", hasClear, imageUrl);

  return (
    <div className="flex-col items-center flex">
      <label className="block w-full">
        <input
          ref={fileInputRef}
          accept={accept}
          type="file"
          name={name}
          className="hidden"
          onChange={onChange}
        />
        <div className="w-full aspect-video border-dotted border rounded-md overflow-hidden border-[#FF8E29]">
          <img
            src={imageUrl}
            alt="Selected"
            className="max-w-full h-full w-full object-cover"
          />
        </div>
      </label>

      {/* Clear button logic */}
      {hasClear && imageUrl != "default-image.jpg" && (
        <button
          type="button"
          className="px-5 mt-4 hover:bg-[#F65454]/70 text-sm py-2 bg-[#F65454] rounded-full text-white"
          onClick={handleClear}
        >
          <i className="fa fa-close"></i> Hapus
        </button>
      )}
    </div>
  );
};

export default FileInput;
