import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import img1TiaoEPardinho from "../assets/imgs/20210721172843_est-dio-f-21-07-fm-2-.png";
import img2TiaoEPardinho from "../assets/imgs/OS-REIS-DO-PAGODE.jpg";
import img3TiaoEPardinho from "../assets/imgs/images.jpeg";

const Home = () => {
  return (
    <div className="flex justify-center align-middle items-center">
      <div className="flex flex-col justify-center align-middle items-center gap-5">
        <section className="bg-neutral-200 mt-8 w-[90vw] max-w-[1580px] rounded-md px-3 py-2 min-h-[60vh] text-neutral-800">
          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="pt-8"
            modules={[Autoplay]}
          >
            <SwiperSlide className="flex justify-center items-center">
              <div className="w-[80vw] max-w-[350px] h-[80vw] max-h-[350px] overflow-hidden">
                <img
                  src={img1TiaoEPardinho}
                  alt="Slide 1"
                  className="w-full h-full object-cover rounded-md border-[5px] border-neutral-700"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div className="w-[80vw] max-w-[350px] h-[80vw] max-h-[350px] overflow-hidden">
                <img
                  src={img2TiaoEPardinho}
                  alt="Slide 2"
                  className="w-full h-full object-cover rounded-md border-[5px] border-neutral-700"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
              <div className="w-[80vw] max-w-[350px] h-[80vw] max-h-[350px] overflow-hidden">
                <img
                  src={img3TiaoEPardinho}
                  alt="Slide 3"
                  className="w-full h-full object-cover rounded-md border-[5px] border-neutral-700"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="mt-[50px] flex justify-center">
            <button className="font-semibold text-neutral-700 bg-neutral-300 rounded-md py-1 px-2 shadow-md">
              <Link to="/discographies">Discografias</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
