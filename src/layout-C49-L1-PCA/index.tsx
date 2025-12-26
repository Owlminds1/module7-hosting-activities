"use client";
import Data from "@/src/layout-C49-L1-PCA/data.json";

const LayoutC49L1PCA = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-start items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl text-center font-bold text-black">
       Kindness Star
        </h4>
        <p className="text-black text-lg text-center">
          Think about ways you can be kind towards people you love and respect. This includes your:
        </p>
      </div>

      <div className=" relative h-[600px]  w-[700px] bg-[url('/C49Images/star.png')] bg-cover bg-center bg-no-repeat">
        {Data.map((i, index) => (
          <div
            style={{
              top: i.top,
              left: i.left,
              right: i.right,
              bottom: i.bottom,
              rotate:i.rotatr
            }}
            key={index}
            className="p-2 absolute   "
          >
            <h4 className="w-full pb-0.5  text-black font-bold text-center">{i.tilte}</h4>
            <textarea
              placeholder="write here..."
              className=" text-black/80 rounded-3xl p-2 outline-0 text-center "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutC49L1PCA;
