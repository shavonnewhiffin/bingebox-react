import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import videoa from '../assets/videoa.mp4'
import videob from '../assets/videob.mp4'
import videoc from '../assets/videoc.mp4'
import videod from '../assets/videod.mp4'
import videoe from '../assets/videoe.mp4'
import videog from '../assets/videog.mp4'
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
      video: videoa,
      title: "@treyoftheday" ,
      description: `Trey shares his thought on ${trending[0]?.title || trending[0]?.name || '...'}`,
    },
    {
      video: videob,
      title: "@jessology",
      description: `Okay, wait can we talk about the ending of Love Is Blind for a second?!`,
    },
    {
      video: videoc,
      title: "@lisas_lemon",
      description: `I paused my K drama addiction to watch ${trending[1]?.title || trending[1]?.name || '...' } and here are my thoughts.`,
    },
    {
      video: videod,
      title: "@hottakejamal" ,
      description: `Had to take a moment to discuss ${trending[3]?.title || trending[3]?.name || '...' } on the pod.`,
    },
    {
      video: videoe,
      title: "@mariavasquez33",
      description: "Here are my top 3 recommendations on Bingebox. Link in bio. ",
    },
    {
      video: videog,
      title: "@ryanjames",
      description: `We all know that ${trending[4]?.title || trending[4]?.name || '...' } was underwhelming.`,
    }
  
  ]
  


  return (
    <section id="social">
      <div className="section__tag">Join the conversation</div>
      <h2>Drop your hottest takes using</h2>
      <span className="social__bingedit">#BINGEIT</span>
      <div className="social__container">
    <Swiper
    modules = {[Pagination, Navigation]}
      grabCursor
      initialSlide={1}
      centeredSlides
      slidesPerView="auto"
      speed={800}
      slidetoClickedSlide
      pagination={{ clickable:true }}
      navigation
      breakpoints={{
        470: { spaceBetween: 40 },
        640: { spaceBetween: 30 },
        772: { spaceBetween: 30 },
        992: { spaceBetween: 30 },
        1440: { spaceBetween: 30 },
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
      <p className="social__description">{slide.description} <span className="social__tag">#bingeit</span></p>
    </div>
  </SwiperSlide>
      ))}
    </Swiper>
    </div>
    </section>
  )
}
