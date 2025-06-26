'use client';
import { useEffect, useState, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';

export default function Home() {
  const [preloading, setPreloading] = useState(true);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [coloredCircles, setColoredCircles] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const splineRef = useRef();

  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      setPreloading(false);

      const completeTimer = setTimeout(() => {
        setLoadingComplete(true);
      }, 500);

      // Clear second timer if component unmounts before it fires
      return () => clearTimeout(completeTimer);
    }, 500);

    // Clear first timer if component unmounts before it fires
    return () => clearTimeout(preloadTimer);
  }, []);

  // Generate colored circles to exactly match the background in the example image
  useEffect(() => {
    const generateColoredCircles = () => {
      // Colors sampled directly from the example image
      const colors = {
        darkBlue: '#0a0b30',    // Base dark blue
        mediumBlue: '#141654',  // Medium blue
        brightBlue: '#1e1c7c',  // Brighter blue accent
        purple: '#2c1a5a'       // Purple accent
      };
      
      // Create circles based on exact placement in the example image
      const newCircles = [
        // Left edge gradient - dark blue
        {
          id: 0,
          x: -10,  // Positioned slightly off-screen to the left
          y: 50,   // Middle of screen
          size: 800,
          opacity: 0.8,
          color: colors.darkBlue
        },
        
        // Right edge gradient - purple
        {
          id: 1,
          x: 110,  // Positioned slightly off-screen to the right
          y: 50,   // Middle of screen
          size: 800,
          opacity: 0.8,
          color: colors.purple
        },
        
        // Top center gradient - medium blue
        {
          id: 2,
          x: 50,   // Center horizontally
          y: 0,    // Top edge
          size: 700,
          opacity: 0.7,
          color: colors.mediumBlue
        },
        
        // Bottom center gradient - brighter blue
        {
          id: 3,
          x: 50,   // Center horizontally
          y: 100,  // Bottom edge
          size: 500,
          opacity: 0.7,
          color: colors.brightBlue
        },
        
        // Upper right accent - purple
        {
          id: 4,
          x: 80,   // Upper right area
          y: 25,   // Upper area
          size: 500,
          opacity: 0.2,
          color: colors.purple
        },
        
        // Lower left accent - medium blue
        {
          id: 5,
          x: 20,   // Lower left area
          y: 75,   // Lower area
          size: 500,
          opacity: 0.4,
          color: colors.mediumBlue
        }
      ];
      
      setColoredCircles(newCircles);
    };
    
    generateColoredCircles();
    
    // No need to regenerate colored circles on resize as they should stay fixed
  }, []);

  // Generate random stars with different sizes
  useEffect(() => {
    // Create stars with varying sizes
    const generateStars = () => {
      const starCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 10000));
      const newStars = [];
      const starColors = ['#FDFDFD', '#b8beea'];
      
      // Determine how many stars should glow (approximately 10-15% of stars)
      const glowingStarsCount = Math.floor(starCount * (Math.random() * 0.05 + 0.05));
      
      for (let i = 0; i < starCount; i++) {
        // Generate random positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Generate random sizes (1-3px for regular stars)
        const size = Math.random() * 2 + 1;
        
        // Generate random delay for the twinkle animation
        const delay = Math.random() * 4;
        
        // Generate random color from the specified colors
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        
        // Generate random opacity between 0.4 and 1
        const opacity = Math.random() * 0.6 + 0.4;
        
        // Determine if this star should glow (only a small number will glow)
        const isGlowing = i < glowingStarsCount;
        
        newStars.push({
          id: i,
          x,
          y,
          size,
          delay,
          color,
          opacity,
          isGlowing
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    // Regenerate stars when window is resized
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Create shooting stars at random intervals
  useEffect(() => {
    let shootingStarId = 0;
    
    const createShootingStar = () => {
      // Generate random position for the shooting star
      const x = Math.random() * 50; // Start in the left half of the screen
      const y = Math.random() * 30; // Start in the top portion
      
      // Generate random duration (2-6 seconds)
      const duration = Math.random() * 4 + 2;
      
      const newShootingStar = {
        id: shootingStarId++,
        x,
        y,
        duration
      };
      
      setShootingStars(prev => [...prev, newShootingStar]);
      
      // Remove the shooting star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, duration * 1000);
    };
    
    // Create initial shooting star
    createShootingStar();
    
    // Create new shooting stars at random intervals (3-8 seconds)
    const interval = setInterval(() => {
      createShootingStar();
    }, (Math.random() * 5000 + 3000));
    
    return () => clearInterval(interval);
  }, []);

  function handleMouseMove(e) {
    // Get normalized mouse coordinates (-1 to 1)
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);

    // Adjust these values to fit your scene's scale and camera
    const lookTargetPosition = { x: x * 5, y: y * 2, z: 0 };

    // Move the null object in Spline
    if (splineRef.current) {
      splineRef.current.emitEvent('setPosition', 'LookTarget', lookTargetPosition);
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {preloading && <Preloader />}
      </AnimatePresence>
      <div className="night-sky" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
        {/* Render colored background circles */}
        {coloredCircles.map(circle => (
          <div
            key={circle.id}
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: '0',
              height: '0',
              backgroundColor: 'transparent',
              borderRadius: '50%',
              position: 'absolute',
              boxShadow: `0 0 ${circle.size/2}px ${circle.size/2}px ${circle.color}`,
              opacity: circle.opacity * 0.7,
              filter: 'blur(40px)',
              zIndex: 1,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
        
        {/* Render stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animation: star.isGlowing ? `twinkle-glow ${50 + Math.random()}s infinite ease-in-out` : `twinkle ${1 + Math.random()}s infinite ease-in-out`,
              zIndex: 2
            }}
          />
        ))}
        
        {/* Render shooting stars */}
        {shootingStars.map(star => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `shoot ${star.duration}s linear forwards`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      
      <main className="content-container" style={{ opacity: loadingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in-out 0.3s' }} onMouseMove={handleMouseMove}>
        {/* Navigation */}
        <Navbar active="home" />

        {/* Hero section */}
        <section className="hero-section">
          <h1 className="hero-title">
            <span style={{ display: 'inline-block' }}>We Are</span>
            <span className="highlight" style={{ display: 'inline-block', marginLeft: '10px' }}>
              <Typewriter
                options={{
                  strings: ['IEEE', 'Engineers', 'Innovators'],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 50,
                  pauseFor: 3000,
                }}
              />
            </span>
          </h1>
          <div className="hero-subtitle">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                .typeString('We are IEEE Student Branch at ESPRIT, passionate about advancing technology and fostering innovation through impactful initiatives and professional development.')
                .start();
              }}
              options={{
                loop: false,
                delay: 20,
              }}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="main-footer">
          <p>© 2025 Cosmic Exploration. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Facebook">👍</a>
          </div>
        </footer>
      </main>
      
    </>
  );
}
