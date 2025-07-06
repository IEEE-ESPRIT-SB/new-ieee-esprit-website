'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import ExBoardItem from '../../components/excom/ExBoardItem';
import AwardsCarousel from '../../components/awards/AwardsCarousel';
import LocationSection from '../../components/location/LocationSection';
import StatisticsSection from '../../components/StatisticsSection';
import exboard from '../../assets/exboard.json';

export default function Home() {
  const [preloading, setPreloading] = useState(true);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [coloredCircles, setColoredCircles] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      setPreloading(false);

      const completeTimer = setTimeout(() => {
        setLoadingComplete(true);
      }, 500);

      return () => clearTimeout(completeTimer);
    }, 500);

    return () => clearTimeout(preloadTimer);
  }, []);

  // Generate colored circles to exactly match the background in the example image
  useEffect(() => {
    const generateColoredCircles = () => {
      const colors = {
        darkBlue: '#0a0b30',
        mediumBlue: '#141654',
        brightBlue: '#1e1c7c',
        purple: '#2c1a5a'
      };
      
      const newCircles = [
        {
          id: 0,
          x: -10,
          y: 50,
          size: 800,
          opacity: 0.8,
          color: colors.darkBlue
        },
        {
          id: 1,
          x: 110,
          y: 50,
          size: 800,
          opacity: 0.8,
          color: colors.purple
        },
        {
          id: 2,
          x: 50,
          y: 0,
          size: 700,
          opacity: 0.7,
          color: colors.mediumBlue
        },
        {
          id: 3,
          x: 50,
          y: 100,
          size: 500,
          opacity: 0.7,
          color: colors.brightBlue
        },
        {
          id: 4,
          x: 80,
          y: 25,
          size: 500,
          opacity: 0.2,
          color: colors.purple
        },
        {
          id: 5,
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
  }, []);

  // Generate random stars with different sizes
  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 10000));
      const newStars = [];
      const starColors = ['#FDFDFD', '#b8beea'];
      
      const glowingStarsCount = Math.floor(starCount * (Math.random() * 0.05 + 0.05));
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 4;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const opacity = Math.random() * 0.6 + 0.4;
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
      const x = Math.random() * 50;
      const y = Math.random() * 30;
      const duration = Math.random() * 4 + 2;
      
      const newShootingStar = {
        id: shootingStarId++,
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
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

return (
    <>
      <Head>
        <title>About Us | IEEE ESPRIT SB</title>
        <meta name="description" content="Découvrez l'équipe, les distinctions et l'impact d'IEEE ESPRIT Student Branch. Innovation, excellence et engagement !" />
        <meta property="og:title" content="About Us | IEEE ESPRIT SB" />
        <meta property="og:description" content="Découvrez l'équipe, les distinctions et l'impact d'IEEE ESPRIT Student Branch. Innovation, excellence et engagement !" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ieee-esprit.tn/about_us" />
        <meta property="og:image" content="https://ieee-esprit.tn/og-aboutus.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | IEEE ESPRIT SB" />
        <meta name="twitter:description" content="Découvrez l'équipe, les distinctions et l'impact d'IEEE ESPRIT Student Branch. Innovation, excellence et engagement !" />
        <meta name="twitter:image" content="https://ieee-esprit.tn/og-aboutus.jpg" />
        <link rel="canonical" href="https://ieee-esprit.tn/about_us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "IEEE ESPRIT Student Branch",
            "url": "https://ieee-esprit.tn",
            "logo": "https://ieee-esprit.tn/ieee-logo.png",
            "sameAs": [
              "https://www.facebook.com/IEEE.ESPRIT.SB/",
              "https://www.instagram.com/ieee.esprit.sb/",
              "https://www.linkedin.com/company/ieee-esprit-sb/"
            ],
            "description": "Découvrez l'équipe, les distinctions et l'impact d'IEEE ESPRIT Student Branch. Innovation, excellence et engagement !"
          })
        }} />
      </Head>
      <AnimatePresence mode="wait">
        {preloading && <Preloader />}
      </AnimatePresence>
      <div className="night-sky" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
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

      <main className="content-container" style={{ opacity: loadingComplete ? 1 : 0, transition: 'opacity 0.5s ease-in-out 0.3s' }}>
        <Navbar active="about" />
        
        {/* Meet the Team Section */}
        <section style={{
          padding: '2rem 0 3rem 0',
          position: 'relative',
          zIndex: 3
        }}>
          <h1 className="text-display" style={{
            fontFamily: "'Playfair Display', 'Times New Roman', serif",
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            color: '#b8beea',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: '1.2',
            textAlign: 'center',
            marginBottom: '1rem',
            padding: '0 1rem',
            wordBreak: 'break-word',
            hyphens: 'auto',
            background: 'none',
            boxShadow: 'none',
            border: 'none',
            textShadow: 'none'
          }}>Our Executive Committee</h1>
          <h2 style={{
            color: '#b8beea',
            fontSize: '1.2rem',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '2.5em',
            letterSpacing: '0.04em',
            textShadow: '0 2px 16px #0a0b30'
          }}>IEEE ESPRIT SB</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                windowWidth <= 600
                  ? '1fr'
                  : windowWidth <= 900
                  ? 'repeat(2, 1fr)'
                  : 'repeat(4, 1fr)',
              gap: '2.5rem 2rem',
              maxWidth: '1200px',
              margin: '0 auto',
              justifyItems: 'center',
              width: '100%',
            }}
          >
            {exboard.map((member, idx) => (
              <ExBoardItem
                key={member.name + idx}
                name={member.name}
                role={member.position}
                img={member.img}
                fb={member.fb}
                insta={member.insta}
                linkedin={member.linkedin}
              />
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Awards Section */}
        <section style={{
          padding: '3rem 0',
          position: 'relative',
          zIndex: 3,
          overflow: 'visible',
          width: '100%'
        }}>
          <div className="awards-title-wrapper">
            <h2 className="text-display" style={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              color: '#b8beea',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: '1.2',
              textAlign: 'center',
              marginBottom: '1rem',
              padding: '0 1rem',
              wordBreak: 'break-word',
              hyphens: 'auto',
              background: 'none',
              boxShadow: 'none',
              border: 'none',
              textShadow: 'none'
            }}>Our Awards & Recognitions</h2>
            <h3 className="awards-subtitle">Excellence in Innovation & Impact</h3>
          </div>
          <AwardsCarousel />
        </section>
        
        <LocationSection />
      </main>
    </>
  );
}