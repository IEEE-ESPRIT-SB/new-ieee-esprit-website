import React, { useEffect } from 'react';
import styles from './StatistiqueCard.module.scss';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import useScrollTrigger from '../../hooks/useScrollTrigger';

export default function StatistiqueCard({ icon: Icon, value, label, delay = 0 }) {
  const { count, startAnimation } = useAnimatedCounter(value, 2500, delay);
  const { ref, isVisible } = useScrollTrigger({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  return (
    <div 
      ref={ref} 
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.value}>{count}</h3>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}
