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
      <div className={`${styles.titleContainer} ${isVisible ? styles.visible : ''}`}>
        <h2 className={styles.title}>IEEE ESPRIT in Numbers</h2>
        <p className={styles.subtitle}>Our impact through the years</p>
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
