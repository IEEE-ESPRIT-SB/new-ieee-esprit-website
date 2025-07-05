'use client';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Lazy loading critique pour réduire TBT
const Typewriter = dynamic(() => import('typewriter-effect'), {
  ssr: false,
  loading: () => <div className="typewriter-placeholder">Chargement...</div>
});

const AnimatePresence = dynamic(() => 
  import('framer-motion').then(mod => ({ default: mod.AnimatePresence })), {
  ssr: false
});

const Preloader = dynamic(() => import('../components/Preloader'), {
  ssr: false,
  loading: () => <div className="preloader-fallback">Initialisation...</div>
});

const Navbar = dynamic(() => import('../components/Navbar'), {
  ssr: true
});

export default function Home() {
  const [preloading, setPreloading] = useState(true);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [coloredCircles, setColoredCircles] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const _splineRef = useRef();

  // Memoization des couleurs pour éviter les recalculs
  const colors = useMemo(() => ({
    darkBlue: '#0a0b30',
    mediumBlue: '#141654',
    brightBlue: '#1e1c7c',
    purple: '#2c1a5a'
  }), []);

  // Optimisation useEffect avec useCallback pour éviter re-renders
  const handlePreloadComplete = useCallback(() => {
    setPreloading(false);
    const completeTimer = setTimeout(() => {
      setLoadingComplete(true);
    }, 300); // Réduit de 500ms à 300ms
    return () => clearTimeout(completeTimer);
  }, []);

  useEffect(() => {
    const preloadTimer = setTimeout(handlePreloadComplete, 300); // Réduit de 500ms
    return () => clearTimeout(preloadTimer);
  }, [handlePreloadComplete]);

  // Optimisation de la génération des cercles colorés avec useMemo
  const generatedCircles = useMemo(() => [
    // Left edge gradient - dark blue
    {
      id: 0,
      x: -10,
      y: 50,
      size: 800,
      opacity: 0.8,
      color: colors.darkBlue
    },
    // Right edge gradient - purple
    {
      id: 1,
      x: 110,
      y: 50,
      size: 800,
      opacity: 0.8,
      color: colors.purple
    },
    // Top center gradient - medium blue
    {
      id: 2,
      x: 50,
      y: 0,
      size: 700,
      opacity: 0.7,
      color: colors.mediumBlue
    },
    // Bottom center gradient - brighter blue
    {
      id: 3,
      x: 50,
      y: 100,
      size: 500,
      opacity: 0.7,
      color: colors.brightBlue
    },
    // Upper right accent - purple
    {
      id: 4,
      x: 80,
      y: 25,
      size: 500,
      opacity: 0.2,
      color: colors.purple
    },
    // Lower left accent - medium blue
    {
      id: 5,
      x: 20,
      y: 75,
      size: 500,
      opacity: 0.15,
      color: colors.mediumBlue
    }
  ], [colors]);

  useEffect(() => {
    setColoredCircles(generatedCircles);
  }, [generatedCircles]);

  // Optimisation de la génération des étoiles avec RequestIdleCallback
  const generateStars = useCallback(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const newStars = Array.from({ length: 150 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 2 + 1
        }));
        setStars(newStars);
      });
    } else {
      // Fallback pour navigateurs sans requestIdleCallback
      setTimeout(() => {
        const newStars = Array.from({ length: 150 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 2 + 1
        }));
        setStars(newStars);
      }, 100);
    }
  }, []);

  const generateShootingStars = useCallback(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const newShootingStars = Array.from({ length: 5 }, (_, i) => ({
          id: i,
          startX: Math.random() * 100,
          startY: Math.random() * 50,
          endX: Math.random() * 100,
          endY: Math.random() * 50 + 50,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 10
        }));
        setShootingStars(newShootingStars);
      });
    }
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      generateStars();
      generateShootingStars();
    }
  }, [loadingComplete, generateStars, generateShootingStars]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Gradients optimisés */}
      <div className="absolute inset-0">
        {coloredCircles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full filter blur-3xl"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              backgroundColor: circle.color,
              opacity: circle.opacity,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform', // Optimisation GPU
            }}
          />
        ))}
      </div>

      {/* Preloader optimisé */}
      {preloading && (
        <AnimatePresence mode="wait">
          <Preloader />
        </AnimatePresence>
      )}

      {/* Navigation */}
      {!preloading && <Navbar />}

      {/* Contenu principal optimisé */}
      {loadingComplete && (
        <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="block">IEEE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                ESPRIT SB
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-300 mb-8 h-16">
              <Typewriter
                options={{
                  strings: [
                    'Innovation et Excellence',
                    'Technologie de Pointe',
                    'Communauté d\'Étudiants',
                    'Avenir Numérique'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Rejoignez la plus grande organisation étudiante technique au monde et façonnez l&apos;avenir de la technologie.
            </p>
          </div>
        </main>
      )}

      {/* Étoiles optimisées avec CSS transforms */}
      {loadingComplete && stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleSpeed}s`,
            willChange: 'opacity', // Optimisation GPU
          }}
        />
      ))}

      {/* Étoiles filantes optimisées */}
      {loadingComplete && shootingStars.map((shootingStar) => (
        <div
          key={shootingStar.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
            animation: `shootingStarFall ${shootingStar.duration}s linear ${shootingStar.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}

      <style jsx>{`
        @keyframes shootingStarFall {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(200px, 200px) scale(0);
            opacity: 0;
          }
        }
        
        .preloader-fallback,
        .typewriter-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2rem;
          color: #9CA3AF;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
