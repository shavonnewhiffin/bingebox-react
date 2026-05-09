import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import video1 from '../assets/video1.mp4'
import video2 from '../assets/video2.mp4'
import video3 from '../assets/video3.mp4'
import video4 from '../assets/video4.mp4'
import video5 from '../assets/video5.mp4'
import video6 from '../assets/video6.mp4'
import video7 from '../assets/video7.mp4'
import { fetchTrending } from '../utils/api';


export default function Social() {

  const [trending, setTrending] = useState([]);


  // Ensuring the slide is centered across various screensizes

  const swiperWrappedRef = useRef(null);

  function adjustMargin() {
    const screenWidth = window.innerWidth;

    if(swiperWrappedRef.current){
      swiperWrappedRef.current.style.marginLeft =
      screenWidth <= 520
      ? "0px"
      : screenWidth <= 650
      ? "-50px"
      : screenWidth <= 800
      ? "-100px"
      : "-150px";

    }
  }

  useEffect(() => {
    adjustMargin();
    window.addEventListener("resize", adjustMargin);
    return () => window.removeEventListener("resize", adjustMargin);
  }, []);

  useEffect(() => {
    fetchTrending().then((data) => setTrending(data));
  }, []);

  const slidesData = [
    {
      video: video1,
      title: "@treyoftheday" ,
      description: `Trey shares his thought on ${trending[0]?.title || trending[0]?.name || '...'}`,
    },
    {
      video: video2,
      title: "@jessology",
      description: `Okay, wait can we talk about the ending of Love Is Blind for a second?!`,
    },
    {
      video: video3,
      title: "@lisas_lemonade",
      description: `I paused my K drama addiction to watch ${trending[1]?.title || trending[1]?.name || '...' } and here are my thoughts.`,
    },
    {
      video: video4,
      title: "@hottakejamal" ,
      description: `Had to take a moment to discuss ${trending[3]?.title || trending[3]?.name || '...' } on the pod.`,
    },
    {
      video: video5,
      title: "@mariavasquez33",
      description: "Here are my top 3 recommendations on Bingebox. Link in bio. ",
    },
    {
      video: video6,
      title: "@ryanjames",
      description: `We all know that ${trending[4]?.title || trending[4]?.name || '...' } was underwhelming.`,
    },
    {
      video: video7,
      title: "@itsbrittbby",
      description: `When they cancel and you get to Bingebox and chill instead.`,
    },
  
  ]
  


  return (
    <section id="social">
      <h2>Loved it? Hated it? Tag us with your reactions using #BINGEDIT</h2>
      <div className="social__container">
    <Swiper
    modules = {[Pagination, Navigation]}
      grabCursor
      initialSlide={3}
      centeredSlides
      slidesPerView="auto"
      speed={800}
      slidetoClickedSlide
      pagination={{ clickable:true }}
      navigation
      breakpoints={{
        320: { spaceBetween: 40} ,
        650: { spaceBetween: 30 },
        1000: { spaceBetween: 20 },
      }}
      // Ref for margin adjustment
      onSwiper={(swiper) => {
        swiperWrappedRef.current = swiper.wrapperEl;
      }}
    >
      {slidesData.map((slide, index)=> (
  <SwiperSlide key={index}>
    <div className="social__video-wrapper">
      <video src={slide.video} className="social__video" autoPlay muted loop playsInline></video>
    </div>
    <div className="social__info">
      <h4>{slide.title}</h4>
      <p className="social__description">{slide.description} <span className="social__tag">#bingedit</span></p>
    </div>
  </SwiperSlide>
      ))}
    </Swiper>
    </div>
    </section>
  )
}
