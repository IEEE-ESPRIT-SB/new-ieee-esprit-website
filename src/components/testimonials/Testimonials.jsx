'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import testimonialsData from '../../assets/testimonials.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './Testimonials.scss';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    setTestimonials(testimonialsData);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToSlide = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const nextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <motion.section
      className="testimonials-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="testimonials-container">
        {/* Section Header */}
        <motion.div className="testimonials-header" variants={itemVariants}>
          <div className="header-badge">
            <Star className="badge-icon" />
            <span>Previous Experience</span>
          </div>
          <h2 className="section-title">
            What Our <span className="gradient-text">Alumni</span> Say
          </h2>
          <p className="section-subtitle">
            Discover the transformative experiences of our former leaders and the lasting impact 
            of their journey with IEEE ESPRIT Student Branch.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div className="testimonials-carousel" variants={itemVariants}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
             loop={true} 
            breakpoints={{
              768: {
                slidesPerView: 1.5,
                spaceBetween: 40
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 50
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 60
              }
            }}
            onSlideChange={handleSlideChange}
            onSwiper={setSwiperInstance}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                  whileHover={{ 
                    y: -15,
                    boxShadow: "0 25px 80px rgba(185, 32, 49, 0.25), 0 10px 30px rgba(255, 78, 80, 0.15)",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                >
                  {/* Quote Icon - Moved to top for cleaner look */}
                  <div className="quote-icon">
                    <Quote size={28} />
                  </div>

                  {/* Author Image - Below quote icon */}
                  <div className="author-image-top">
                    <Image
                      src={`/assets/testimonials/${testimonial.photo}`}
                      alt={testimonial.name}
                      width={120}
                      height={120}
                      className="author-photo-large"
                      onError={(e) => {
                        e.target.src = '/assets/testimonials/default-avatar.jpg';
                      }}
                    />
                    <div className="image-glow-large"></div>
                  </div>

                  {/* Author Details - Below image */}
                  <div className="author-details-centered">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <span className="author-year">{testimonial.year}</span>
                  </div>

                  {/* Testimonial Content */}
                  <div className="testimonial-content">
                    <p className="testimonial-quote">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Card Decorations */}
                  <div className="card-decoration">
                    <div className="decoration-dot"></div>
                    <div className="decoration-dot"></div>
                    <div className="decoration-dot"></div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="testimonials-navigation">
            <motion.button
              className="nav-button nav-prev"
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Pagination Dots */}
            <div className="testimonials-pagination">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              className="nav-button nav-next"
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Background Decorations */}
        <div className="background-decorations">
          <div className="decoration-circle decoration-1"></div>
          <div className="decoration-circle decoration-2"></div>
          <div className="decoration-circle decoration-3"></div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
