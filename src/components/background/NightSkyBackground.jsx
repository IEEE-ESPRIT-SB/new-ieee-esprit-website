'use client';
import { useEffect, useState } from 'react';

export default function NightSkyBackground() {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [coloredCircles, setColoredCircles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate colored circles for background gradient
  useEffect(() => {
    if (!isClient) return;
    
    const generateColoredCircles = () => {
      const colors = {
        darkBlue: '#0a0b30',
        mediumBlue: '#141654',
        brightBlue: '#1e1c7c',
        purple: '#2c1a5a'
      };
      
      const newCircles = [
        {
          id: 'circle-0',
          x: -10,
          y: 50,
          size: 800,
          opacity: 0.8,
          color: colors.darkBlue
        },
        {
          id: 'circle-1',
          x: 110,
          y: 50,
          size: 800,
          opacity: 0.8,
          color: colors.purple
        },
        {
          id: 'circle-2',
          x: 50,
          y: 0,
          size: 700,
          opacity: 0.7,
          color: colors.mediumBlue
        },
        {
          id: 'circle-3',
          x: 50,
          y: 100,
          size: 500,
          opacity: 0.7,
          color: colors.brightBlue
        },
        {
          id: 'circle-4',
          x: 80,
          y: 25,
          size: 500,
          opacity: 0.2,
          color: colors.purple
        },
        {
          id: 'circle-5',
          x: 20,
          y: 75,
          size: 500,
          opacity: 0.4,
          color: colors.mediumBlue
        }
      ];
      
      setColoredCircles(newCircles);
    };
    
    generateColoredCircles();
  }, [isClient]);

  // Generate random stars
  useEffect(() => {
    if (!isClient) return;
    
    const generateStars = () => {
      const starCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 10000));
      const newStars = [];
      const starColors = ['#FDFDFD', '#b8beea'];
      const glowingStarsCount = Math.floor(starCount * 0.1); // Fixed percentage instead of random

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 4;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const opacity = Math.random() * 0.6 + 0.4;
        const isGlowing = i < glowingStarsCount;

        newStars.push({
          id: `star-${i}`,
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

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  // Create shooting stars
  useEffect(() => {
    if (!isClient) return;
    
    let shootingStarId = 0;

    const createShootingStar = () => {
      const x = Math.random() * 50;
      const y = Math.random() * 30;
      const duration = Math.random() * 4 + 2;

      const newShootingStar = {
        id: `shooting-star-${shootingStarId++}`,
        x,
        y,
        duration
      };

      setShootingStars(prev => [...prev, newShootingStar]);

      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, duration * 1000);
    };

    createShootingStar();

    const interval = setInterval(() => {
      createShootingStar();
    }, (Math.random() * 5000 + 3000));

    return () => clearInterval(interval);
  }, [isClient]);

  // Don't render anything on server-side to avoid hydration issues
  if (!isClient) {
    return (
      <div className="night-sky fixed inset-0 -z-10" style={{ 
        background: 'linear-gradient(135deg, #0a0b30 0%, #141654 25%, #1e1c7c 50%, #2c1a5a 100%)',
        opacity: 1, 
        transition: 'opacity 0.5s ease-in-out' 
      }} />
    );
  }

  return (
    <div className="night-sky fixed inset-0 -z-10" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
      {/* Colored circles for background gradient */}
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
            boxShadow: `0 0 ${circle.size / 2}px ${circle.size / 2}px ${circle.color}`,
            opacity: circle.opacity * 0.7,
            filter: 'blur(40px)',
            zIndex: 1,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Stars */}
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

      {/* Shooting stars */}
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
  );
}
