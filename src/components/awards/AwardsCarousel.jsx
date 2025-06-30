'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSplitAwardImages } from '../../assets/awardImages';
import TextCarousel from './TextCarousel';
import './AwardsCarousel.css';
import './responsive.css';
import './LegendSeparator.css';
import './single-line-fixes.css';

const AwardsCarousel = () => {
  const [firstHalfAwards, setFirstHalfAwards] = useState([]);
  const [secondHalfAwards, setSecondHalfAwards] = useState([]);
  // Particle state for client-only rendering
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate random particle data only on the client
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${Math.random() * 10 + 10}s`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Function to fetch award images split into two halves
    function fetchAwards() {
      const { firstHalf, secondHalf } = getSplitAwardImages();
      setFirstHalfAwards(firstHalf);
      setSecondHalfAwards(secondHalf);
    }

    fetchAwards();
  }, []);  // Calculate the animation duration based on the number of images
  const getAnimationDuration = (count) => {
    return `${count * 8}s`; // 10 seconds per image for a faster animation
  };

  // We need to duplicate the awards to create the infinite loop effect
  const duplicatedFirstHalf = [...firstHalfAwards, ...firstHalfAwards, ...firstHalfAwards];
  const duplicatedSecondHalf = [...secondHalfAwards, ...secondHalfAwards, ...secondHalfAwards];
    return (
    <div className="awards-section">
      {/* Particle effects */}
      <div className="particles-container">
        {mounted && particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={particle}
          />
        ))}
      </div>
        {/* Left to Right Carousel */}
      <div className="awards-carousel-container">
        <div 
          className="carousel-track carousel-track-left" 
          style={{ 
            animationDuration: getAnimationDuration(firstHalfAwards.length) 
          }}
        >          {duplicatedFirstHalf.map((award, index) => (
            <div className="carousel-item" key={`left-${award.id}-${index}`} style={{ position: 'relative' }}>
              <div className="reflection-container">
                <Image 
                  src={award.src} 
                  alt={award.alt}
                  width={180}
                  height={130}
                  style={{
                    objectFit: 'cover',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '180px',
                    maxHeight: '130px'
                  }}
                  priority={index < 3}
                />
                <div className="reflection"></div>
              </div>
            </div>
          ))}
        </div>      </div>      {/* Separator Carousel with "One Name One Legend" */}
      <div className="legend-separator">
        <div className="legend-content">
          <div className="legend-text-container">
            <div className="legend-icon left">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.39L8.24 17.66L9.23 13.38L5.91 10.5L10.29 10.13L12 6.09L13.71 10.13L18.09 10.5L14.77 13.38L15.76 17.66L12 15.39Z" fill="#B92031" />
              </svg>
            </div>            <div style={{ display: 'flex', whiteSpace: 'nowrap', flexWrap: 'nowrap', overflow: 'visible', gap: '0' }}>
              <span className="legend-text-part red">One Name</span>
              <span className="legend-text-part blue">One Legend</span>
            </div>
            <div className="legend-icon right">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.39L8.24 17.66L9.23 13.38L5.91 10.5L10.29 10.13L12 6.09L13.71 10.13L18.09 10.5L14.77 13.38L15.76 17.66L12 15.39Z" fill="#0094FF" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Text Carousel with "IEEE ESPRIT SB" and "One One Legend" */}
      <TextCarousel />
      
      {/* Right to Left Carousel */}
      <div className="awards-carousel-container">
        <div 
          className="carousel-track carousel-track-right" 
          style={{ 
            animationDuration: getAnimationDuration(secondHalfAwards.length) 
          }}
        >          {duplicatedSecondHalf.map((award, index) => (
            <div className="carousel-item" key={`right-${award.id}-${index}`} style={{ position: 'relative' }}>
              <div className="reflection-container">
                <Image 
                  src={award.src} 
                  alt={award.alt}
                  width={180}
                  height={130}
                  style={{
                    objectFit: 'cover',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '180px',
                    maxHeight: '130px'
                  }}
                  priority={index < 3}
                />
                <div className="reflection"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsCarousel;
