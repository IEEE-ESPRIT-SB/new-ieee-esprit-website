import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pagination({ pageCount, currentPage, onPageChange }) {
  // Scroll to top of cards on page change
  function handlePageChange(selected) {
    onPageChange(selected.selected + 1);
    const cardsSection = document.getElementById('events-cards-section');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Calcul des deux pages précédentes
  const prevPages = [];
  for (let i = 2; i >= 1; i--) {
    const page = currentPage - i;
    if (page > 0) prevPages.push(page);
  }
  // Calcul des deux pages suivantes
  const nextPages = [];
  for (let i = 1; i <= 2; i++) {
    const page = currentPage + i;
    if (page <= pageCount) nextPages.push(page);
  }
  const hasMore = currentPage + 2 < pageCount;

  return (
    <nav className="pagination-nav" style={{gap: '0.5rem'}}>
      <button
        className={`pagination-previous${currentPage === 1 ? ' pagination-disabled' : ''}`}
        onClick={() => currentPage > 1 && handlePageChange({ selected: currentPage - 2 })}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </button>
      {/* Pages précédentes */}
      {prevPages.map(page => (
        <button
          key={page}
          className="pagination-page"
          onClick={() => handlePageChange({ selected: page - 1 })}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
      {/* Animated current page indicator */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentPage}
          className="pagination-current"
          aria-current="page"
          style={{
            fontWeight: 700,
            color: '#fff',
            background: 'rgba(63,81,181,0.12)',
            borderRadius: '12px',
            padding: '0.5rem 1.1rem',
            margin: '0 0.2rem',
            fontFamily: 'var(--font-body, Inter, sans-serif)',
            fontSize: '1.08rem',
            letterSpacing: '0.01em',
            display: 'inline-block',
            minWidth: 60,
            textAlign: 'center',
            outline: 'none',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.35, type: 'spring', stiffness: 220, damping: 22 }}
        >
          Page {currentPage}
        </motion.span>
      </AnimatePresence>
      {/* Pages suivantes */}
      {nextPages.map(page => (
        <button
          key={page}
          className="pagination-page"
          onClick={() => handlePageChange({ selected: page - 1 })}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
      {/* Indicateur s'il y a plus de pages */}
      {hasMore && (
        <span className="pagination-break" aria-label="More pages">...</span>
      )}
      <button
        className={`pagination-next${currentPage === pageCount ? ' pagination-disabled' : ''}`}
        onClick={() => currentPage < pageCount && handlePageChange({ selected: currentPage })}
        disabled={currentPage === pageCount}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
} 