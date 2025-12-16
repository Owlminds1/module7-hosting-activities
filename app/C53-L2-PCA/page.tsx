"use client";

import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const Page = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setpreviewImage] = useState<string>("");

  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setpreviewImage(imgUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-black">Poster</h4>
      </div>
      <div>
        <img
          src={previewImage ? previewImage : `placeholder_image.jpg`}
          className="w-full h-40 rounded-lg"
          alt=""
        />
     

      </div>
      <div
        onClick={() => inputRef?.current?.click()}
        className="min-h-[50px] min-w-[20%] hover:bg-violet-900 group  active:scale-95 active:shadow transition-all duration-500 cursor-pointer flex justify-center items-center rounded-lg  border border-dashed border-violet-900 "
      >
        <input
          onChange={handleFileChange}
          ref={inputRef}
          //   value={previewImage}
          className="border hidden text-black"
          type="file"
          title="upload your image"
        />

        <div className="flex justify-center gap-3 items-center w-full ">

              <FaUpload
          onClick={() => inputRef?.current?.click()}
          className="text-xl text-violet-800 cursor-pointer group-hover:text-white"
        />
              {previewImage ? (
  <p className="text-green-800 text-md text-center group-hover:text-white">Image Uploaded</p>
) : (
  <p className="text-black text-lg text-center group-hover:text-white">Upload Image</p>
)}
        </div>
      
      </div>
    </div>
  );
};

export default Page;
