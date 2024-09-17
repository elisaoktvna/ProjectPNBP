import React, { useState } from "react";

const FileInput = ({ name, url = "default-image.jpg" }) => {
  const [imageUrl, setImageUrl] = useState(url);
  const onChange = (e) => {
    const val = e.target.files[0];

    setImageUrl(URL.createObjectURL(val));
  };
  return (
    <label className="block w-full">
      <input type="file" name={name} className="hidden" onChange={onChange} />
      <div className="w-full aspect-video border-dotted border  border-[#FF8E29]">
        <img src={imageUrl} alt="" className="max-w-full h-full" />
      </div>
    </label>
  );
};

export default FileInput;
