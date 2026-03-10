import { heroData } from "@/data/hero.data";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components";

export default function Homepage() {
  const swiperRef = useRef<SwiperRef>(null);
  const swiperNext = () => swiperRef.current?.swiper.slideNext();
  const swiperPrev = () => swiperRef.current?.swiper.slidePrev();
  return (
    <main className="p-4 w-full">
      <section className="w-full grid grid-cols-1 relative">
        <Button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-2 p-2"
          onClick={swiperPrev}
        >
          <FaChevronLeft className="size-6" />
        </Button>
        <Button
          onClick={swiperNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-2 p-2"
        >
          <FaChevronRight className="size-6" />
        </Button>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, EffectCoverflow]}
          slidesPerView={1.2}
          spaceBetween={16}
          className="w-full"
        >
          {heroData.map(({ src }, i) => (
            <SwiperSlide key={i}>
              <div className="w-full rounded-lg overflow-hidden">
                <video src={src} autoPlay loop controls />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
