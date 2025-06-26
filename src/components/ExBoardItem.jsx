import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ExBoardItem.module.scss';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function ExBoardItem({ name, role, img, fb, insta, linkedin }) {
  // Gestion du chemin d'image pour Next.js (public/assets/ExCom/)
  const imagePath = `/assets/ExCom/${img}`;
  const [showPopup, setShowPopup] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setShowPopup(true);
    const id = setTimeout(() => {
      setShowPopup(false);
    }, 2250);
    setTimeoutId(id);
    document.body.style.overflow = 'hidden'; // Empêche le scroll du fond
  };

  const handleClose = () => {
    setShowPopup(false);
    if (timeoutId) clearTimeout(timeoutId);
    document.body.style.overflow = '';
  };

  React.useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Dimensions par défaut pour les avatars (adapter si besoin)
  const avatarSize = 132;
  const popupSize = 400;

  return (
    <>
      {showPopup && (
        <div className={styles.popupOverlay} style={{zIndex: 99999}} onClick={handleClose}>
          <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
            <Image
              src={imagePath}
              alt={name}
              className={styles.popupImage}
              width={popupSize}
              height={popupSize}
              style={{ objectFit: 'cover' }}
              loading="eager"
              priority
            />
            <button className={styles.closeBtn} onClick={handleClose}>Fermer</button>
          </div>
        </div>
      )}
      <div className={styles.card}>
        <div
          className={styles.avatarWrapper + ' ' + styles.clickableAvatar}
          onClick={handleImageClick}
        >
          <Image
            src={imagePath}
            alt={name}
            className={styles.avatar}
            width={avatarSize}
            height={avatarSize}
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          {role && (
            <div className={styles.roleContainer}>
              <p className={styles.role}>
                <span className={styles.roleText}>{role}</span>
              </p>
            </div>
          )}
          <div className={styles.socials}>
            {fb && (
              <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
            )}
            {insta && (
              <a href={insta} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
