"use client";
import React, { useState } from "react";
import EXPECTED from "@/src/layout-C50-L1-A5/EXPECTED.json";
import WORD_BANK from "@/src/layout-C50-L1-A5/WORD_BANK.json";
import Image from "next/image";

const LayoutC50L1A5: React.FC = () => {
  const [availableWords, setAvailableWords] = useState(WORD_BANK);
  const [blanks, setBlanks] = useState<string[]>(Array(8).fill(""));

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, word: string) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLSpanElement>,
    blankIndex: number
  ) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    if (!word) return;

    // ❌ Block wrong words
    if (word !== EXPECTED[blankIndex]) return;

    // ✅ Correct → Fill blank
    setBlanks((prev) => {
      const updated = [...prev];
      updated[blankIndex] = word;
      return updated;
    });

    // Remove from word bank
    setAvailableWords((prev) => prev.filter((w) => w.text !== word));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h4 className="text-2xl font-bold text-black">
        HOW ADULTS HELP KIDS MAKE WISE CHOICES
      </h4>

      <p className="text-lg text-center text-black my-3">
        Fill in the blanks with the correct choice from the table.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 place-items-center gap-6 w-[85%]">
        {/* 👉 RIGHT SIDE (Word Bank) */}
        <div
          className={`${
            availableWords.length === 0
              ? "col-span-0"
              : "col-span-4 p-5 border rounded-lg"
          }   `}
        >
          <div className="flex flex-wrap justify-center items-center gap-3">
            {availableWords.map((word) => (
              <div key={word.text}  draggable
                  onDragStart={(e) => onDragStart(e, word.text)} className="border cursor-grab p-1 flex justify-center items-center flex-col border-black">
                <h4
                 
                  className="px-3 py-1 text-black rounded-lg  text-lg"
                >
                  {word.text}
                </h4>

                <div className="w-20 h-20 relative">
                  <Image src={word.img} fill alt={word.text} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 👉 LEFT SIDE Paragraph */}
        <div
          className={`${
            availableWords.length === 0 ? "col-span-12" : "col-span-8"
          }  p-5 border rounded-lg shadow flex justify-center items-center flex-col gap-3 bg-white`}
        >
          <Image src="/C50IMages/Gratitude.jpg"  width={200} height={100} alt="images"/>
          <p className="text-lg text-black leading-8">
            I think I have really cool parents and teachers. I have learned how
            to have
            <Blank index={0} blanks={blanks} handleDrop={handleDrop} />
            from them. I also appreciate how they
            <Blank index={1} blanks={blanks} handleDrop={handleDrop} />
            me in making really wise choices. Every choice I have made has had
            <Blank index={2} blanks={blanks} handleDrop={handleDrop} />
            outcomes. Even when I make
            <Blank index={3} blanks={blanks} handleDrop={handleDrop} />
            my parents and teachers have taught me to be
            <Blank index={4} blanks={blanks} handleDrop={handleDrop} />
            and
            <Blank index={5} blanks={blanks} handleDrop={handleDrop} />
            . I’m really looking forward to making more
            <Blank index={6} blanks={blanks} handleDrop={handleDrop} />
            and continuing learning from
            <Blank index={7} blanks={blanks} handleDrop={handleDrop} />!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayoutC50L1A5;

/* 🔹 Blanks Component */
const Blank = ({
  index,
  blanks,
  handleDrop,
}: {
  index: number;
  blanks: string[];
  handleDrop: (e: React.DragEvent<HTMLSpanElement>, idx: number) => void;
}) => {
  const filled = blanks[index];

  return (
    <span
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, index)}
      className={`inline-block mx-2 px-2 py-1 min-w-[90px]   
        ${
          filled
            ? "text-violet-900  border-b-2 border-black"
            : "border-gray-400"
        }
      `}
    >
      {filled || "_________"}
    </span>
  );
};
