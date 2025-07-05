'use client';
import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import './units.css';

export default function UnitsPage() {
  const [preloading, setPreloading] = useState(true);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [coloredCircles, setColoredCircles] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Generate colored circles to exactly match the background in the events page
  useEffect(() => {
    const generateColoredCircles = () => {
      // Colors sampled directly from the events page
      const colors = {
        darkBlue: '#0a0b30',    // Base dark blue
        mediumBlue: '#141654',  // Medium blue
        brightBlue: '#1e1c7c',  // Brighter blue accent
        purple: '#2c1a5a'       // Purple accent
      };
      
      // Create circles based on exact placement in the events page
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
    
    // Complete the preloader after background setup
    setTimeout(() => {
      setPreloading(false);
      setTimeout(() => setLoadingComplete(true), 300);
    }, 2000);
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
      <main className="content-container" style={{ opacity: loadingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in-out 0.3s' }}>
        {/* Navigation */}
        <Navbar active="units" />

        {/* Units content */}
        <section style={{ padding: '2rem', minHeight: '100vh', marginTop: '100px' }}>
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            {/* Main Title */}
            <h1 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-6xl)', 
              fontWeight: '800', 
              letterSpacing: 'var(--letter-tight)',
              lineHeight: 'var(--leading-tight)',
              marginBottom: '1.5rem', 
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 25%, #94a3b8 50%, #64748b 75%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
            }}>
              Our Units
            </h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{ 
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)', 
                fontSize: 'var(--text-xl)', 
                fontWeight: '400',
                letterSpacing: 'var(--letter-normal)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '700px', 
                margin: '0 auto 2rem auto'
              }}
            >
              Information about our units will be available here soon.
            </motion.p>
          </motion.div>
        </section>
      </main>
    </>
  );
} 