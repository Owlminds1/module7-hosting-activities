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
    <div className="min-h-screen bg-[#F8FAFC] flex justify-start items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-black text-center">Questioning parents</h4>
        <p className="text-lg text-black text-center my-3">Ask the following questions to your parents in an interview format. Record the interview and share with the teacher.
</p>


<div className="w-full my-2 flex justify-center items-center">
  <ul className="list-disc space-y-2 px-2   w-[60%]">
  <li className="text-black text-lg ">Why do you buy from a specific brand?</li>
  <li className="text-black text-lg ">Where do you shop grocery items?</li>
  <li className="text-black text-lg ">Where do you shop stationary items?</li>
  <li className="text-black text-lg "> What are some positive qualities of the brands you buy from on a regular basis?</li>
  <li className="text-black text-lg ">What kind of brands do you not buy from? Why?</li>
  <li className="text-black text-lg ">What advice would you give to buyers?</li>
</ul>
</div>
      </div>
      <div>
        {
          previewImage ? 
          <audio
          className="invert"
            autoPlay
            muted
            controls
            src={ previewImage }
          ></audio>
          :
           <img
          src={`audio_placeholder.jpg`}
          className="w-full h-40 rounded-lg"
          alt=""
        />
        }
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
          accept="audio/*"
          title="upload your Audio"
        />

        <div className="flex justify-center gap-3 items-center w-full ">
          <FaUpload
            onClick={() => inputRef?.current?.click()}
            className="text-xl text-violet-800 cursor-pointer group-hover:text-white"
          />
          {previewImage ? (
            <p className="text-green-800 text-md text-center group-hover:text-white">
              Audio Uploaded
            </p>
          ) : (
            <p className="text-black text-lg text-center group-hover:text-white">
              Upload Audio
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
