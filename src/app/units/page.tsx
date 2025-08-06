'use client';
import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Users, Calendar, Globe, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/navbar/Navbar';
import unitsData from './units.json';
import './units.scss';

interface Unit {
  name: string;
  subName: string;
  description: string;
  url: string;
  website: string;
  numberOfMembers: number;
  numberOfActivities: number;
  foundation: string;
  color: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
  opacity: number;
  isGlowing: boolean;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  duration: number;
}

interface ColoredCircle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export default function UnitsPage() {
  const [preloading, setPreloading] = useState(true);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [coloredCircles, setColoredCircles] = useState<ColoredCircle[]>([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [_visibleCards, _setVisibleCards] = useState<Set<string>>(new Set());

  const units = useMemo(() => Object.entries(unitsData as Record<string, Unit>), []);

  // Generate colored circles for background
  useEffect(() => {
    const generateColoredCircles = () => {
      const colors = {
        darkBlue: '#0a0b30',
        mediumBlue: '#141654',
        brightBlue: '#1e1c7c',
        purple: '#2c1a5a'
      };
      
      const newCircles = [
        { id: 0, x: -10, y: 50, size: 800, opacity: 0.8, color: colors.darkBlue },
        { id: 1, x: 110, y: 50, size: 800, opacity: 0.8, color: colors.purple },
        { id: 2, x: 50, y: 0, size: 700, opacity: 0.7, color: colors.mediumBlue },
        { id: 3, x: 50, y: 100, size: 500, opacity: 0.7, color: colors.brightBlue },
        { id: 4, x: 80, y: 25, size: 500, opacity: 0.2, color: colors.purple },
        { id: 5, x: 20, y: 75, size: 500, opacity: 0.4, color: colors.mediumBlue }
      ];
      
      setColoredCircles(newCircles);
    };
    
    generateColoredCircles();
    
    setTimeout(() => {
      setPreloading(false);
      setTimeout(() => setLoadingComplete(true), 300);
    }, 2000);
  }, []);

  // Generate stars
  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.min(200, Math.floor(window.innerWidth * window.innerHeight / 8000));
      const newStars = [];
      const starColors = ['#FDFDFD', '#b8beea', '#e2e8f0'];
      const glowingStarsCount = Math.floor(starCount * 0.08);
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2.5 + 0.8;
        const delay = Math.random() * 6;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const opacity = Math.random() * 0.7 + 0.3;
        const isGlowing = i < glowingStarsCount;
        
        newStars.push({ id: i, x, y, size, delay, color, opacity, isGlowing });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    const handleResize = () => generateStars();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create shooting stars
  useEffect(() => {
    let shootingStarId = 0;
    
    const createShootingStar = () => {
      const x = Math.random() * 40;
      const y = Math.random() * 25;
      const duration = Math.random() * 3 + 2.5;
      
      const newShootingStar = { id: shootingStarId++, x, y, duration };
      
      setShootingStars(prev => [...prev, newShootingStar]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, duration * 1000);
    };
    
    createShootingStar();
    
    const interval = setInterval(() => {
      createShootingStar();
    }, Math.random() * 4000 + 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            _setVisibleCards(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.unit-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [loadingComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {preloading && <Preloader />}
      </AnimatePresence>
      
      {/* Starry Night Background */}
      <div className="night-sky">
        {/* Background circles */}
        {coloredCircles.map(circle => (
          <div
            key={circle.id}
            className="colored-circle"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              boxShadow: `0 0 ${circle.size/2}px ${circle.size/2}px ${circle.color}`,
              opacity: circle.opacity * 0.7
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
              animation: star.isGlowing 
                ? `twinkle-glow ${8 + Math.random() * 4}s infinite ease-in-out` 
                : `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`,
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

      {/* Main Content */}
      <main className={`content-container ${loadingComplete ? 'loaded' : ''}`}>
        <Navbar active="units" />

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="hero-section"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="hero-badge"
          >
            <Sparkles className="inline-block w-6 h-6 mr-2 text-blue-400" />
            <span className="text-blue-300 font-medium tracking-wider text-sm uppercase">
              Discover our units
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="hero-title text-display"
          >
            Our Units
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="hero-subtitle text-body-large"
          >
            Explore our various IEEE Technical Societies, each dedicated to a specialized area of ​​engineering and technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="stats-container"
          >
            <div className="stat-item">
              <div className="stat-number">{units.length}</div>
              <div className="stat-label">Units</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1200</div>
              <div className="stat-label">Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {units.reduce((sum, [, unit]) => sum + unit.numberOfActivities, 0)}
              </div>
              <div className="stat-label">Activities</div>
            </div>
          </motion.div>
        </motion.section>

        {/* Units Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate={loadingComplete ? "visible" : "hidden"}
          className="units-grid"
        >
          {units.map(([key, unit]) => (
            <motion.div
              key={key}
              id={`unit-${key}`}
              variants={cardVariants}
              className={`unit-card ${hoveredCard === key ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(key)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderColor: hoveredCard === key ? unit.color + '40' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: hoveredCard === key 
                  ? `0 25px 50px ${unit.color}25, 0 0 0 1px ${unit.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                  : '0 8px 32px rgba(0, 0, 0, 0.12)'
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="card-bg-gradient"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${unit.color}15 0%, transparent 70%)`
                }}
              />

              {/* Card Header */}
              <div className="card-header">
                <motion.div
                  variants={iconVariants}
                  className="unit-icon"
                  style={{
                    background: `linear-gradient(135deg, ${unit.color}20, ${unit.color}10)`,
                    border: `2px solid ${unit.color}30`
                  }}
                >
                  <motion.div
                    animate={hoveredCard === key ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Zap 
                      size={28} 
                      style={{ color: unit.color }} 
                    />
                  </motion.div>
                  
                  {/* Animated shine effect */}
                  <motion.div
                    className="shine-effect"
                    style={{
                      transform: hoveredCard === key ? 'translateX(200%)' : 'translateX(-100%)'
                    }}
                  />
                </motion.div>

                <div>
                  <h3 className="unit-name">
                    {unit.name}
                  </h3>
                  <p className="unit-subname" style={{ color: unit.color }}>
                    {unit.subName}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <p className="unit-description">
                  {unit.description.length > 150 
                    ? unit.description.substring(0, 150) + '...' 
                    : unit.description}
                </p>

                {/* Stats */}
                <div className="unit-stats">
                  <div className="stat">
                    <Users size={16} style={{ color: unit.color }} />
                    <div>{unit.numberOfMembers}</div>
                    <div>Members</div>
                  </div>
                  <div className="stat">
                    <Target size={16} style={{ color: unit.color }} />
                    <div>{unit.numberOfActivities}</div>
                    <div>Activity</div>
                  </div>
                  <div className="stat">
                    <Calendar size={16} style={{ color: unit.color }} />
                    <div>{unit.foundation}</div>
                    <div>founded</div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="card-footer">
                <motion.a
                  href={unit.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: `linear-gradient(135deg, ${unit.color}, ${unit.color}dd)`
                  }}
                >
                  <Globe size={16} />
                  Website
                </motion.a>
                
                <motion.a
                  href={unit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    border: `1px solid ${unit.color}40`
                  }}
                >
                  <ExternalLink size={16} />
                  Facebook
                </motion.a>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="hover-overlay"
                style={{
                  background: `linear-gradient(135deg, ${unit.color}08, transparent)`
                }}
              />
            </motion.div>
          ))}
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="cta-section"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="cta-container"
          >
            <h2>Join us!</h2>
            <p>Discover your passion and develop your skills within our IEEE units.</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="cta-button"
            >
              learn more
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}