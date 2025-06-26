import React, { useEffect, useRef } from 'react';
import './TextCarousel.css';

const TextCarousel = () => {
  const trackRef = useRef(null);
  
  useEffect(() => {
    const calculateWidth = () => {
      if (trackRef.current) {
        // Calculate the total width of all text items
        const textItems = trackRef.current.querySelectorAll('.text-item');
        let totalWidth = 0;
        
        textItems.forEach(item => {
          totalWidth += item.offsetWidth;
        });
        
        // Set a CSS variable for the animation
        document.documentElement.style.setProperty('--text-track-width', `${totalWidth / 2}px`);
      }
    };
    
    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    
    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);
    // Duplicate the text items to create a seamless infinite loop
  const textItems = [
    { text: "IEEE ESPRIT SB", className: "ieee-text" },
    { text: "One Name One Legend", className: "legend-text" },
    { text: "IEEE ESPRIT SB", className: "ieee-text" },
    { text: "One Name One Legend", className: "legend-text" },
    { text: "IEEE ESPRIT SB", className: "ieee-text" },
    { text: "One Name One Legend", className: "legend-text" },
    { text: "IEEE ESPRIT SB", className: "ieee-text" },
    { text: "One Name One Legend", className: "legend-text" }
  ];

  return (
    <div className="text-carousel-container">
      <div className="text-carousel">
        <div className="text-track" ref={trackRef}>
          {textItems.map((item, index) => (
            <div 
              key={index} 
              className={`text-item ${item.className}`}
              style={{
                animationDelay: `${index * 0.5}s`
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextCarousel;
