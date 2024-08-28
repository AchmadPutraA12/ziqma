// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../../css/carousel.css";
import Image1 from "../../../../public/carousel/1.jpg";
import Image2 from "../../../../public/carousel/2.jpg";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Carousel() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{ delay: 2000 }}
            >
                <SwiperSlide>
                    <img src={Image1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Image2} alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
