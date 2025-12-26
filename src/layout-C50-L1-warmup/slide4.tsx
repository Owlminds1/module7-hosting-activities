"use client";

import { useEffect, useState } from "react";
import Items from "@/src/layout-C50-L1-warmup/items4.json";

type ItemType = {
  Name: string;
};

const Slide4 = () => {
  const [list, setList] = useState<ItemType[]>(Items);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(()=>{
setList((prev)=>[...prev].sort(()=>Math.random() - 0.5))
  },[])

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const updated = [...list];
    const draggedItem = updated[dragIndex];

    // remove dragged item
    updated.splice(dragIndex, 1);
    // insert at new position
    updated.splice(dropIndex, 0, draggedItem);

    setList(updated);
    setDragIndex(null);
  };

  return (
    <div className="grid grid-cols-12 gap-1 place-items-center p-2">
      {list.map((i, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          className="col-span-12 p-2 hover:border-2 hover:border-black  active:scale-95 border active:border-2 active:border-black border-black text-black text-xl w-[30%] cursor-move"
        >
          <h3 className="text-center">{i.Name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Slide4;
