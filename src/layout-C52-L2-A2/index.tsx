"use client";
import Welldone from "@/components/wellDone";
import TableData from "@/src/layout-C52-L2-A2/tableData.json";
import { useEffect, useState } from "react";

const LayoutC52L2A2 = () => {
  // Definitions ARE shuffled
  const [defs, setDefs] = useState<typeof TableData>([]);

  const [dragDefIndex, setDragDefIndex] = useState<number | null>(null);

  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  // Only shuffle definitions on load
  useEffect(() => {
    const shuffledDefs = [...TableData].sort(() => Math.random() - 0.5);
    setDefs(shuffledDefs);
  }, []);

  // Drag Drop for DEFINITIONS only
  const handleDefDrop = (dropIndex: number) => {
    if (dragDefIndex === null) return;

    const updated = [...defs];
    const dragged = updated[dragDefIndex];

    updated.splice(dragDefIndex, 1);
    updated.splice(dropIndex, 0, dragged);

    setDefs(updated);
    setDragDefIndex(null);
  };

  // Check answers
  const checkAnswers = () => {
    setChecked(true);

    // Check if each title's definition matches correct pair
    const correct = defs.every(
      (d, i) => d.text === TableData[i].text
    );

    if (correct) {
      setOpen(true);
    }
  };



  
  return (
    <div className="min-h-screen bg-[#F8FCFA] flex flex-col justify-start items-center p-5 gap-10">

      <h3 className="text-2xl font-bold text-center text-black">
        Banking Vocabulary
      </h3>

      <button
        onClick={checkAnswers}
        className="mb-4 px-6 py-2 bg-violet-900 text-white font-bold rounded hover:bg-violet-800"
      >
        Check Answers
      </button>

      <div className="grid grid-cols-12 w-[80%] gap-1">

        {/* TERMS COLUMN (Not shuffled) */}
        <div className="col-span-6">
          <div className="bg-violet-900 text-white font-bold p-2 text-center">
            TERM
          </div>

          {TableData.map((t, i) => (
            <div
              key={i}
              className="border flex justify-center items-center p-3 font-bold text-center min-h-25 text-black bg-white"
            >
              {t.item}
            </div>
          ))}
        </div>

        {/* DEFINITIONS COLUMN (Shuffled + draggable) */}
        <div className="col-span-6">
          <div className="bg-violet-900 text-white font-bold p-2 text-center">
            DEFINITION
          </div>

          {defs.map((d, i) => {
            const matched = checked && d.text === TableData[i].text;

            return (
              <div
                key={i}
                draggable
                onDragStart={() => setDragDefIndex(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDefDrop(i)}
                className={`border p-3 flex justify-center items-center  font-bold text-center min-h-25 text-black active:border-black active:scale-95  active:cursor-grabbing hover:cursor-grab 
                  ${checked ? (matched ? "bg-green-200" : "bg-red-200") : "bg-white"}
                `}
              >
                {d.text}
              </div>
            );
          })}
        </div>
      </div>

      <Welldone open={open} setOpen={setOpen} />
    </div>
  );
};

export default LayoutC52L2A2;
