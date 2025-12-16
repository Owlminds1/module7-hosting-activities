"use client";
import React, { useState, useEffect } from "react";
import tableData from "@/src/layout-C49-L3-A2/tableData.json";
import dropZone from "@/src/layout-C49-L3-A2/dropZone.json";
import Image from "next/image";
import Welldone from "@/components/wellDone";

export default function TableSlide() {
  const [shuffle, setShuffle] = useState<{ text: string; val: string }[]>([]);
  const [dragItem, setDragItem] = useState<{
    text: string;
    val: string;
  } | null>(null);
  const [dropItems, setDropItems] = useState<{ [key: number]: string[] }>({});
  const [open, setOpen] = useState(false);

  const [bgCorrect, setBgCorret] = useState<HTMLAudioElement>();
  const [bgWrong, setBgWrong] = useState<HTMLAudioElement>();

  // 🔀 Shuffle once on mount
  useEffect(() => {
    const shuffled = [...tableData].sort(() => Math.random() - 0.5);
    setShuffle(shuffled);
    setBgCorret(new Audio("/sound/correct.mp3"));
    setBgWrong(new Audio("/sound/wrong_buzzer.mp3"));
  }, []);

  // 🧩 Handle drag start
  const handleDragStart = (item: { text: string; val: string }) => {
    setDragItem(item);
  };

  // 🧩 Handle drop (check correct category)
  const handleDrop = (
    e: React.DragEvent,
    dropVal: string,
    dropIndex: number
  ) => {
    if (!dragItem) return;

    // ✅ Check if drop is correct
    if (dragItem.val === dropVal) {
      bgCorrect?.play();
      setDropItems((prev) => ({
        ...prev,
        [dropIndex]: prev[dropIndex]
          ? [...prev[dropIndex], dragItem.text]
          : [dragItem.text],
      }));

      // Remove from master list
      setShuffle((prev) => prev.filter((item) => item.text !== dragItem.text));
    } else {
      bgWrong?.play();
      e.currentTarget.classList.add("shake");
    }

    // Reset drag item
    setDragItem(null);
  };

  // 🎉 Check if all items dropped
  useEffect(() => {
    if (shuffle.length === 0 && Object.keys(dropItems).length > 0) {
      setOpen(true);
    }
  }, [shuffle, dropItems]);

  return (
    <div className="w-full grid grid-cols-12 gap-3 place-items-start p-3">
      {/* 🟩 Master List */}
      {shuffle.length > 0 && (
        <div
          className={`${
            shuffle.length === 0 ? "col-span-0" : "col-span-4"
          }  w-full flex flex-col justify-center items-center h-full gap-2 `}
        >
          {shuffle.map((item, index) => (
            <h4
              key={index}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="text-md p-1 rounded-md border border-gray-300 font-medium text-black bg-white shadow-sm hover:bg-gray-100 cursor-grab active:cursor-grabbing"
            >
              {item.text}
            </h4>
          ))}
        </div>
      )}

      {/* 🟦 Drop Zones */}
      <div
        className={`${
          shuffle.length === 0 ? "col-span-12" : "col-span-8"
        }  w-full grid grid-cols-12 gap-1`}
      >
        {dropZone.map((drop, dIndex) => (
          <div
            key={dIndex}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, drop.val, dIndex)}
            className="col-span-4 w-full min-h-[200px] border p-2 border-black  overflow-hidden bg-violet-50 flex flex-col items-center transition-all hover:bg-violet-100"
          >
            <div className="flex justify-between items-center ">
              <h3 className="w-full  p-1 text-center text-black  text-lg font-medium">
                {drop.val}
              </h3>

              <div className="w-40 h-30 relative">
                <Image src={drop.image} objectFit="cover" fill alt="image" />
              </div>
            </div>

            <div className="mt-2 w-full flex flex-col gap-2 p-2 min-h-[50px] border border-dashed border-violet-900">
              {dropItems[dIndex]?.map((item, i) => (
                <div
                  key={i}
                  className="bg-white text-black text-center border border-gray-300 rounded-md p-1 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🎉 Dialog */}
      <Welldone open={open} setOpen={setOpen}  />
    </div>
  );
}
