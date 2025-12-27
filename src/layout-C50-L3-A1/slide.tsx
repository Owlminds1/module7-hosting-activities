"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import tableData from "@/src/layout-C50-L3-A1/tableData.json";

import dropZone from "@/src/layout-C50-L3-A1/dropZone.json";
import Image from "next/image";
import Welldone from "@/components/wellDone";

const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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

  const handlePrev = () => {
    swiperRef?.current?.slidePrev();
  };
  const handleNext = () => {
    swiperRef?.current?.slideNext();
  };
  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-center text-black">
          Vocabulary of finance
        </h4>
      </div>

      <div className=" w-[90%] flex justify-center items-center flex-col gap-3  ">
        <div className="w-full shadow-md p-3 min-h-[200px]  ">
          <Swiper
            loop={false}
            autoHeight
            allowTouchMove={false}
            autoplay={false}
            modules={[Navigation]}
            slidesPerView={1}
            // navigation
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {dropZone.map((drop, dIndex) => (
              <SwiperSlide key={dIndex}>
                <div className="w-full px-4 py-6 grid grid-cols-12 place-items-start gap-6">
                  {/* 🔵 DRAG SOURCE LIST */}
                  {shuffle.length > 0 && (
                    <div className="col-span-5 w-full bg-violet-100 p-3 rounded-xl flex flex-wrap justify-center gap-3 shadow">
                      {shuffle.map((item, index) => (
                        <h4
                          key={index}
                          draggable
                          onDragStart={() => handleDragStart(item)}
                          className="px-3 w-full text-center  py-1 text-black bg-white border border-gray-300 rounded-lg cursor-grab hover:bg-gray-100 shadow-sm font-medium"
                        >
                          {item.text}
                        </h4>
                      ))}
                    </div>
                  )}

                  {/* 🟣 DROP ZONES */}
                  <div className={`${shuffle.length === 0 ?"col-span-12":"col-span-7"}  w-full grid grid-cols-12 gap-4`}>
                    <div
                      key={dIndex}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, drop.val, dIndex)}
                      className="col-span-12 bg-white border border-gray-300 rounded-xl shadow-md p-3 flex gap-1 hover:shadow-lg transition-all"
                    >
                      {/* LEFT — IMAGE + TITLE */}
                      <div className="w-full flex flex-col items-center gap-2">
                        <h3 className="w-full text-center text-lg font-bold bg-violet-900 text-white p-2">
                          Vocabulary
                        </h3>

                        <h3 className="w-full font-bold text-center text-black p-1 rounded-md">
                          {drop.val}
                        </h3>
                        <div className="relative w-full h-full">
                          <Image
                            src={drop.image}
                            alt="image"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </div>

                      {/* RIGHT — DROP AREA */}
                      <div className="w-full flex flex-col">
                        <h3 className="w-full text-center text-lg font-bold bg-violet-900 text-white p-2">
                          Definition
                        </h3>

                        <div className="mt-2 w-full min-h-[300px] flex justify-center items-center border border-dashed border-violet-800 rounded-md p-2 bg-violet-50">
                          {dropItems[dIndex]?.map((item, i) => (
                            <div
                              key={i}
                              className=" text-xl font-bold text-black text-center"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

              
                <Welldone open={open} setOpen={setOpen} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* slide buttons  */}
        <div className="flex justify-between items-center gap-5 w-full mt-8  ">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide === 0 ? "invisible" : "visible"
            }  cursor-pointer text-black text-4xl border border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowLeft />
          </span>
          <span
            onClick={handleNext}
            className={` ${
              activeSlide < tableData.length -1 ? "visible" : "invisible"
            }  cursor-pointer text-black text-4xl border border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
