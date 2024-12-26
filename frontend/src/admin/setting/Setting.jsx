import React, { useState } from "react";
import Layout from "../../components/Layout";
import FileInput from "../../components/File";
import toast from "react-hot-toast";
import { getLocalStorage } from "../../helpers/localStorage";
import { useFetch } from "../../hooks/useFetch";

const Setting = () => {
  const { data: setting } = useFetch("/setting");
  const [imageIndex, setImageIndex] = useState([]);
  console.log(imageIndex);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("imageIndex", imageIndex);
    try {
      const token = getLocalStorage("site");
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/setting`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.status == 200) {
        e.target.reset();
        toast.success("Pengaturan berhasil diubah");
      } else {
        toast.error("Pengaturan gagal diubah");
      }
    } catch (error) {
      toast.error("Pengaturan gagal diubah");
    }
  };
  return (
    <Layout>
      <h1 className="text-lg font-bold mb-4">Pengaturan Website</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="" className="mb-2 block">
          Slider Image
        </label>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          {setting?.data?.images?.map((set, i) => {
            return (
              <FileInput
                hasClear
                onChangeTrigger={() =>
                  setImageIndex((prev) => {
                    const updatedArray = prev.filter((index) => index !== i); // Remove duplicate if exists
                    return [...updatedArray, i]; // Add the new value
                  })
                }
                key={i}
                name={"images[]"}
                url={`${process.env.REACT_APP_BASE_URL}/images/${set}`}
              />
            );
          })}

          {new Array(3 - (setting?.data?.images?.length ?? 0))
            .fill(0)
            .map((s, i) => {
              return (
                <FileInput
                  hasClear
                  key={i}
                  name={"images[]"}
                  // url={`${process.env.REACT_APP_BASE_URL}/images/${data?.image}`}
                />
              );
            })}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-5 hover:bg-[#FFC200]/70 text-sm py-2 bg-[#FFC200] rounded-full text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Setting;
