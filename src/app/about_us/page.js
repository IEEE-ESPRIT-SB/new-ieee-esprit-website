'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/navbar/Navbar';
import NightSkyBackground from '../../components/background/NightSkyBackground';
import ExBoardItem from '../../components/excom/ExBoardItem';
import AwardsCarousel from '../../components/awards/AwardsCarousel';
import LocationSection from '../../components/location/LocationSection';
import StatisticsSection from '../../components/stats/StatisticsSection';
import exboard from '../../assets/exboard.json';
import './about.css';

export default function AboutUs() {
  const [preloading, setPreloading] = useState(true);
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          setWindowWidth(window.innerWidth);
        }, 150);
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
      };
    }
  }, []);

  const getGridClass = () => {
    if (windowWidth <= 600) return 'mobile';
    if (windowWidth <= 900) return 'tablet';
    return 'desktop';
  };

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
      
      <NightSkyBackground />

      <main className={`content-container about-main ${loadingComplete ? 'loaded' : ''}`}>
        <Navbar active="about" />
        
        {/* Meet the Team Section */}
        <section className="about-section">
          <h1 className="text-display about-title">Our Executive Committee</h1>
          <h2 className="about-subtitle">IEEE ESPRIT SB</h2>
          <div className={`team-grid ${getGridClass()}`}>
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
        <section className="awards-section">
          <div className="awards-title-wrapper">
            <h2 className="text-display about-title about-title-awards">Our Awards & Recognitions</h2>
            <h3 className="about-subtitle about-subtitle-awards">Excellence in Innovation & Impact</h3>
          </div>
          <AwardsCarousel />
        </section>
        
        <LocationSection />
      </main>
    </>
  );
}