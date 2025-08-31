"use client";
import { useEffect, useState, useRef } from "react";
import Typewriter from "typewriter-effect";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "../components/Preloader";
import Navbar from "../components/navbar/Navbar";
import Link from "next/link";
import NightSkyBackground from "../components/background/NightSkyBackground";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const [preloading, setPreloading] = useState(true);
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

  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);
    if (splineRef.current) {
      splineRef.current.emitEvent("setPosition", "LookTarget", {
        x: x * 5,
        y: y * 2,
        z: 0,
      });
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {preloading && <Preloader />}
      </AnimatePresence>
      <NightSkyBackground />
      <main
        className="content-container"
        style={{
          opacity: loadingComplete ? 1 : 0,
          transition: "opacity 0.5s ease-in-out 0.3s",
        }}
        onMouseMove={handleMouseMove}
      >
        <Navbar active="home" />

        <motion.section
          style={{
            textAlign: "center",
            marginTop: "0",
            padding: "1rem clamp(0.5rem, 2vw, 1.5rem)",
            paddingTop: "clamp(0.5rem, 2vh, 1.5rem)",
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-display"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              lineHeight: "1.1",
              textAlign: "center",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
            as="h1"
          >
            <span style={{ display: "inline-block" }}>We Are</span>{" "}
            <span
              style={{
                display: "inline-block",
                marginLeft: "10px",
                background:
                  "linear-gradient(135deg, #B92031, #FF4E50, #ff6b6b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 900,
                textShadow: "0 4px 20px rgba(185, 32, 49, 0.4)",
                filter: "drop-shadow(0 2px 8px rgba(185, 32, 49, 0.3))",
              }}
            >
              <Typewriter
                options={{
                  strings: ["IEEE", "Engineers", "Innovators"],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 50,
                  pauseFor: 2000,
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-body-large"
            style={{
              maxWidth: "800px",
              margin: "0 auto 1rem auto",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              lineHeight: "1.6",
              fontWeight: 400,
              color: "var(--text-secondary)",
              textAlign: "center",
              letterSpacing: "0.01em",
            }}
          >
            IEEE Esprit Student Branch is the largest SB in Tunisia Section as
            well as Region 8. Founded in 2017, IEEE ESPRIT Student Branch made
            its way to being ranked as the largest Student Branch in Tunisia
            Section as well as the Region 8. It includes 7 technical chapters
            (AESS, CIS, CS, IAS, IES, PES, MTTS, RAS) alongside two groups
            (SIGHT and WIE).
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link href="/about_us" legacyBehavior>
              <a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "linear-gradient(90deg, #B92031, #FF4E50)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "14px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  Learn more About us
                  <ArrowRight size={20} />
                </motion.button>
              </a>
            </Link>

            <Link href="/units" legacyBehavior>
              <a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "rgba(185, 32, 49, 0.1)",
                    color: "#ffffff",
                    border: "1px solid rgba(185, 32, 49, 0.4)",
                    borderRadius: "14px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backdropFilter: "blur(10px)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Discover our units
                </motion.button>
              </a>
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
