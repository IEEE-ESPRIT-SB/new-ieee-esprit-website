'use client';
import { useEffect, useState, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    title: "Active Community",
    description: "Join a dynamic community of over 200 active members sharing the same passion for technology.",
    icon: <Sparkles size={28} />,
    color: "#6366f1"
  },
  {
    title: "Regular Events",
    description: "Participate in our workshops, hackathons and conferences with international experts.",
    icon: <Sparkles size={28} />,
    color: "#8b5cf6"
  },
  {
    title: "Professional Development",
    description: "Benefit from certified training and networking with industry professionals.",
    icon: <Sparkles size={28} />,
    color: "#ec4899"
  }
];

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
      const completeTimer = setTimeout(() => setLoadingComplete(true), 500);
      return () => clearTimeout(completeTimer);
    }, 500);
    return () => clearTimeout(preloadTimer);
  }, []);

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
  }, []);

  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 10000));
      const starColors = ['#FDFDFD', '#b8beea'];
      const glowingStarsCount = Math.floor(starCount * (Math.random() * 0.05 + 0.05));
      const newStars = Array.from({ length: starCount }, (_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return {
          id: i,
          x,
          y,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 4,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          opacity: Math.random() * 0.6 + 0.4,
          isGlowing: i < glowingStarsCount
        };
      });
      setStars(newStars);
    };
    generateStars();
    const handleResize = () => generateStars();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let shootingStarId = 0;
    const createShootingStar = () => {
      const newShootingStar = {
        id: shootingStarId++,
        x: Math.random() * 50,
        y: Math.random() * 30,
        duration: Math.random() * 4 + 2
      };
      setShootingStars(prev => [...prev, newShootingStar]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newShootingStar.id));
      }, newShootingStar.duration * 1000);
    };
    createShootingStar();
    const interval = setInterval(createShootingStar, Math.random() * 5000 + 3000);
    return () => clearInterval(interval);
  }, []);

  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);
    if (splineRef.current) {
      splineRef.current.emitEvent('setPosition', 'LookTarget', { x: x * 5, y: y * 2, z: 0 });
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {preloading && <Preloader />}
      </AnimatePresence>
      <div className="night-sky">
        {coloredCircles.map(circle => (
          <div key={circle.id} style={{
            left: `${circle.x}%`, top: `${circle.y}%`, position: 'absolute', transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${circle.size / 2}px ${circle.size / 2}px ${circle.color}`,
            opacity: circle.opacity * 0.7, filter: 'blur(40px)', zIndex: 1, borderRadius: '50%'
          }} />
        ))}
        {stars.map(star => (
          <div key={star.id} className="star" style={{
            left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`,
            backgroundColor: star.color, opacity: star.opacity, position: 'absolute', zIndex: 2,
            animationDelay: `${star.delay}s`,
            animation: star.isGlowing ? `twinkle-glow ${50 + Math.random()}s infinite ease-in-out` : `twinkle ${1 + Math.random()}s infinite ease-in-out`
          }} />
        ))}
        {shootingStars.map(star => (
          <div key={star.id} className="shooting-star" style={{
            left: `${star.x}%`, top: `${star.y}%`, animation: `shoot ${star.duration}s linear forwards`, position: 'absolute'
          }} />
        ))}
      </div>
      <main className="content-container" style={{ opacity: loadingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in-out 0.3s' }} onMouseMove={handleMouseMove}>
        <Navbar active="home" />
        <motion.section
          style={{
            textAlign: 'center',
            marginTop: '0',
            padding: '1rem clamp(0.5rem, 2vw, 1.5rem)',
            paddingTop: 'clamp(0.5rem, 2vh, 1.5rem)',
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '900',
              lineHeight: '1.2',
              textAlign: 'center',
              color: '#fff',
              marginBottom: '0.75rem',
              fontFamily: 'Playfair Display, serif'
            }}
          >
           <span style={{ display: 'inline-block' }}>We Are</span>{' '}
            <span style={{
              display: 'inline-block',
              marginLeft: '10px',
              background: 'linear-gradient(90deg, #B92031, #FF4E50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              <Typewriter
                options={{
                  strings: ['IEEE', 'Engineers', 'Innovators'],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 50,
                  pauseFor: 2000,
                }}
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            style={{
              maxWidth: '800px',
              margin: '0 auto 1rem auto',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              lineHeight: '1.6',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'center'
            }}
          >
            <Typewriter onInit={tw => tw.typeString("We are IEEE Student Branch at ESPRIT, passionate about advancing technology and fostering innovation through impactful initiatives and professional development.").start()} options={{ loop: false, delay: 20 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center'
            }}
          >
            <Link href="/about_us" legacyBehavior><a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(90deg, #B92031, #FF4E50)',
                  color: '#ffffff', border: 'none', borderRadius: '14px',
                  padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                Learn more About us
                <ArrowRight size={20} />
              </motion.button></a>
            </Link>

            <Link href="/units" legacyBehavior><a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(185, 32, 49, 0.1)', color: '#ffffff',
                  border: '1px solid rgba(185, 32, 49, 0.4)', borderRadius: '14px',
                  padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Discover our units
              </motion.button></a>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            padding: '2rem 1rem',
            marginBottom: '1rem'
          }}
        >
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '0.75rem',
              fontFamily: '"Playfair Display", serif'
            }}>
              Why IEEE ESPRIT?
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A dynamic community at the heart of technological innovation
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 + index * 0.2 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: `0 25px 50px ${feature.color}25`
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '18px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                  border: `2px solid ${feature.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  color: feature.color
                }}>
                  {feature.icon}
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.35rem)',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>
                  {feature.title}
                </h3>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: '1.5',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

       
        
      </main>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes twinkle-glow {
          0%, 100% { 
            opacity: 0.2;
            box-shadow: 0 0 10px 2px currentColor, 0 0 3px 1px currentColor;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            box-shadow: 0 0 20px 5px currentColor, 0 0 8px 3px currentColor;
            transform: scale(1.3);
          }
        }

        @keyframes shoot {
          0% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(-45deg);
          }
          100% {
            opacity: 0;
            transform: translateX(400px) translateY(400px) rotate(-45deg);
          }
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, #ffffff, transparent);
          transform: translateX(-100%);
        }

        .night-sky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          z-index: -1;
          background-color: #070825;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}