"use client";
import data from "@/src/layout-C50-L3-warmup/data.json";
import { useEffect, useState } from "react";

type ItemType = {
  id: string;
  Name: string;
};

export default function LayoutC50L3Warmup() {
  const [items, setItems] = useState<ItemType[]>(data);
  const [indexItem, setIndexItem] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const correctOrder: string[] = data.map((item) => item.id);

  const handleClick = (index: number) => {
    setIndexItem(index);
  };

  const moveUp = () => {
    if (indexItem === null || indexItem === 0) return;

    const newItems = [...items];

    [newItems[indexItem - 1], newItems[indexItem]] = [
      newItems[indexItem],
      newItems[indexItem - 1],
    ];

    setItems(newItems);
    setIndexItem(indexItem - 1);
  };

  const moveDown = () => {
    if (indexItem === null || indexItem === items.length - 1) return;

    const newItems = [...items];

    [newItems[indexItem + 1], newItems[indexItem]] = [
      newItems[indexItem],
      newItems[indexItem + 1],
    ];

    setItems(newItems);
    setIndexItem(indexItem + 1);
  };

  const checkResult = () => {
    const isStored = items.every(
      (item, index) => item.id === correctOrder[index]
    );

    setMessage(
      isStored
        ? "Great job! You got the right order!"
        : "Oops! The order is wrong. Try again!"
    );

    setIsCorrect(isStored);
  };

  useEffect(() => {
    function shuffleTasks(arr: ItemType[]): ItemType[] {
      return [...arr].sort(() => Math.random() - 0.5);
    }

    const shuffleData = shuffleTasks([...data]);
    setItems(shuffleData);
  }, []);

  return (
    <div className="py-8 min-h-screen bg-[#F8FCFA] flex items-center justify-center gap-3 pt-5 flex-col">
      <h1 className="text-4xl text-center mb-8 text-black">
      CHRONOLOGY OR PREFERENCE
      </h1>

      <div className="flex justify-center item-center flex-wrap px-8 gap-4">
        <button
          className="bg-yellow-600 text-lg rounded py-2 px-8 cursor-pointer active:scale-95"
          onClick={moveUp}
        >
          Move up
        </button>

        <button
          onClick={moveDown}
          className="bg-yellow-600 text-lg rounded py-2 px-8 cursor-pointer active:scale-95"
        >
          Move down
        </button>

        <button
          onClick={checkResult}
          className="bg-green-600 text-lg rounded py-2 px-5 cursor-pointer active:scale-95"
        >
          Check result
        </button>
      </div>

      <p className="text-xl text-black">{message}</p>

      {items.map((item, index) => (
        <h1
          key={item.id}
          onClick={() => handleClick(index)}
          className={`${
            indexItem === index ? "border-3 border-black" : ""
          } ${
            isCorrect ? "bg-green-600" : "bg-violet-900"
          } cursor-pointer min-w-[700px] text-center rounded py-3 shadow-sm shadow-black`}
        >
          {item.Name}
        </h1>
      ))}
    </div>
  );
}
