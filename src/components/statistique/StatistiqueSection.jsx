import React from 'react';
import styles from './StatistiqueSection.module.scss';
import StatistiqueCard from './StatistiqueCard';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import { FaUsers, FaUserFriends, FaUserGraduate, FaCalendarAlt, FaAward } from 'react-icons/fa';

export default function StatistiqueSection() {
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.1,
    triggerOnce: true
  });

  const statistiques = [
    {
      icon: FaUsers,
      value: 8,
      label: 'Chapters',
      delay: 0
    },
    {
      icon: FaUserFriends,
      value: 2,
      label: 'Groups',
      delay: 200
    },
    {
      icon: FaUserGraduate,
      value: 1025,
      label: 'Members',
      delay: 400
    },
    {
      icon: FaCalendarAlt,
      value: 170,
      label: 'Annual Activities',
      delay: 600
    },
    {
      icon: FaAward,
      value: 25,
      label: 'Awards',
      delay: 800
    }
  ];

  return (
    <section ref={ref} className={styles.section}>
      <div style={{ textAlign: 'center', marginBottom: '2.5em', marginTop: '2em' }}>
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
        }}>IEEE ESPRIT in Numbers</h1>
        <h2 style={{
          fontFamily: "'Playfair Display', 'Times New Roman', serif",
          fontSize: 'clamp(1.25rem, 3vw, 2rem)',
          color: '#b8beea',
          fontWeight: 400,
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          marginBottom: '0.5em',
          padding: '0 1rem',
          wordBreak: 'break-word',
          hyphens: 'auto',
          background: 'none',
          boxShadow: 'none',
          border: 'none',
          textShadow: '0 2px 16px #0a0b30, 0 1px 0 #fff2',
          opacity: 0.85
        }}>Our impact through the years</h2>
      </div>
      <div className={styles.statistiqueContainer}>
        {statistiques.map((stat, index) => (
          <StatistiqueCard 
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={stat.delay}
          />
        ))}
      </div>
    </section>
  );
}
