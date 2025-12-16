"use client";
import React, { useState } from "react";

const LayoutC49L2A1 = () => {
  // 9 rows × each row has 3 fields
  const [rows, setRows] = useState(
    Array.from({ length: 3}, () => ({
      item: "",
      price: "",
      reason: ""
    }))
  );

  const handleAdd = () => {
    setRows((prev) => [
      ...prev,
      { item: "", price: "", reason: "" } // add 3 inputs together
    ]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-black">
          Bingo: Needs and Wants
        </h4>
      </div>

      <div className="w-[80%] flex justify-center items-center">
        <div className="grid grid-cols-12 w-full place-items-center p-2">
          <div className="col-span-4 bg-violet-900 text-white text-center w-full p-1">
            ITEM
          </div>
          <div className="col-span-4 bg-violet-900 text-white text-center w-full p-1">
            PRICE
          </div>
          <div className="col-span-4 bg-violet-900 text-white text-center w-full p-1">
            REASON
          </div>

          {rows.map((_, index) => (
            <React.Fragment key={index}>
              <div key={index + "-item"} className="col-span-4 w-full p-1">
                <textarea
                  placeholder="write item..."
                  className="text-center w-full min-h-[30px] p-2 text-black"
                />
              </div>

              <div key={index + "-price"} className="col-span-4 w-full p-1">
                <textarea
                  placeholder="write price..."
                  className="text-center w-full min-h-[30px] p-2 text-black"
                />
              </div>

              <div key={index + "-reason"} className="col-span-4 w-full p-1">
                <textarea
                  placeholder="write reason..."
                  className="text-center w-full min-h-[30px] p-2 text-black"
                />
              </div>
            </React.Fragment>
          ))}

          <div className="col-span-12 w-full text-center">
            <button
              onClick={handleAdd}
              className="bg-violet-900 text-white cursor-pointer px-5 py-2 rounded-lg"
            >
              Add Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutC49L2A1;
