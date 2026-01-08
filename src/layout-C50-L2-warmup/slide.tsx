"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import  { useRef, useState } from "react";
import MyImage from "@/components/myImage";
import Slide1 from "./slide1";
import Slide2 from "./slide2";
import Slide3 from "./slide3";
import Slide4 from "./slide4";
import Slide5 from "./slide5";


const Slide = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  

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
         <h1 className="text-4xl text-center mb-2 text-black">CHRONOLOGY OR PRIORITY</h1>

        <p className="text-xl text-black text-center">{
          activeSlide === 0
            ? "Drag and drop in order of plant growth"
            : activeSlide === 1 ? " Drag and drop in order of their preferred routine": activeSlide === 2 ?"Drag and drop in order of their preferred subjects, the most favourite subject at the top and least favourite at the bottom": activeSlide === 3 ? "Drag and drop in order of their preferred people, the most favourite being at the top and least favourite at the bottom" : activeSlide === 4 ? "Dag and drop in order of their preferred fruits, the most favourite at the top and least favourite at the bottom":""}
</p>
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
            <SwiperSlide>
              <Slide1/>
            </SwiperSlide>
            
              <SwiperSlide>
              <Slide2/>
            </SwiperSlide>
            
             <SwiperSlide>
              <Slide3/>
            </SwiperSlide>
            
            <SwiperSlide>
              <Slide4/>
            </SwiperSlide>
            
            <SwiperSlide>
              <Slide5/>
            </SwiperSlide>

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
              activeSlide < 4 ? "visible" : "invisible"
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
