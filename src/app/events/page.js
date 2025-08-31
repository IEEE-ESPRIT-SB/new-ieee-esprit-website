'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Preloader from '../../components/Preloader';
import Navbar from '../../components/navbar/Navbar';
import NightSkyBackground from '../../components/background/NightSkyBackground';
import eventsData from '../../assets/events.json';
import './events.scss';
import Pagination from '../../components/events/Pagination';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Import sophisticated icon components
import { 
  SearchIcon, 
  CalendarIcon, 
  LocationIcon, 
  SparklesIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserGroupIcon,
  ArrowRightIcon,
  FilterIcon,
  EventIcon
} from '../../components/EventIcons';

// Import dynamique de react-select pour réduire le JS runtime côté client
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function EventsPage() {
  const [preloading, setPreloading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [_windowWidth, setWindowWidth] = useState(1200);
  const _splineRef = useRef();

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Pagination state
  const pageSizeOptions = [
    { value: 6, label: '6 per page' },
    { value: 12, label: '12 per page' },
    { value: 24, label: '24 per page' },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0].value);

  // Reset page to 1 when filter/search/pageSize changes
  useEffect(() => { setCurrentPage(1); }, [activeFilter, debouncedSearch, pageSize]);

  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      setPreloading(false);

      const completeTimer = setTimeout(() => {
        setLoadingComplete(true);
      }, 500);

      // Clear second timer if component unmounts before it fires
      return () => clearTimeout(completeTimer);
    }, 500);

    // Clear first timer if component unmounts before it fires
    return () => clearTimeout(preloadTimer);
  }, []);

  // Load events data
  useEffect(() => {
    setEvents(eventsData);
  }, []);

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Memoized filtered events for performance
  const filteredEvents = useMemo(() => {
    let filtered = events;
    if (debouncedSearch) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        event.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        event.location.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    if (activeFilter !== 'all') {
      filtered = filtered.filter(event => {
        switch(activeFilter) {
          case 'workshops':
            return event.title.toLowerCase().includes('workshop') || event.description.toLowerCase().includes('workshop');
          case 'competitions':
            return event.title.toLowerCase().includes('hack') || event.title.toLowerCase().includes('competition') || event.description.toLowerCase().includes('hackathon');
          case 'social':
            return event.title.toLowerCase().includes('iftar') || event.title.toLowerCase().includes('team') || event.title.toLowerCase().includes('social');
          default:
            return true;
        }
      });
    }
    return filtered;
  }, [events, debouncedSearch, activeFilter]);

  // Pagination calculations
  const pageCount = Math.ceil(filteredEvents.length / pageSize);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEvents.slice(startIndex, startIndex + pageSize);
  }, [filteredEvents, currentPage, pageSize]);

  // Mouse move handler for interactive effects
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setWindowWidth(window.innerWidth);
    
    // Add subtle parallax or cursor following effects here if needed
    const _mouseX = (clientX / window.innerWidth) * 100;
    const _mouseY = (clientY / window.innerHeight) * 100;
    
    // You can use mouseX and mouseY for advanced effects
  };

  const filterOptions = [
    { key: 'all', label: 'All Events', icon: FilterIcon },
    { key: 'workshops', label: 'Workshops', icon: AcademicCapIcon },
    { key: 'competitions', label: 'Competitions', icon: TrophyIcon },
    { key: 'social', label: 'Social', icon: UserGroupIcon }
  ];

  return (
    <>
      <Head>
        <title>Events - IEEE ESPRIT Student Branch</title>
        <meta name="description" content="Discover extraordinary events, workshops, and competitions organized by IEEE ESPRIT Student Branch. Join our vibrant community of innovation and excellence." />
        <meta name="keywords" content="IEEE ESPRIT, events, workshops, competitions, technology, engineering, student branch" />
        <meta property="og:title" content="Events - IEEE ESPRIT Student Branch" />
        <meta property="og:description" content="Discover extraordinary events, workshops, and competitions organized by IEEE ESPRIT Student Branch." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://ieee-esprit.tn/events" />
      </Head>
      <AnimatePresence mode="wait">
        {preloading && <Preloader />}
      </AnimatePresence>
      
      <NightSkyBackground />

      {/* Main content container */}
      <main className={`events-content-container ${loadingComplete ? 'loaded' : ''}`} onMouseMove={handleMouseMove}>
        {/* Navigation */}
        <Navbar active="events" />

        {/* Events content */}
        <section className="events-main-section">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="events-hero-header"
          >
            {/* Elegant Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="events-overline"
            >
              <SparklesIcon size={16} className="icon-pulse" />
              IEEE ESPRIT Student Branch
              <SparklesIcon size={16} className="icon-pulse" />
            </motion.div>

            {/* Main Title with Sophisticated Typography */}
            <h1 className="events-main-title">
              Extraordinary Events
            </h1>

            {/* Refined Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="events-subtitle"
            >
              Discover the remarkable journey of innovation, collaboration, and excellence through our 
              carefully curated collection of events, workshops, and community gatherings.
            </motion.p>

            {/* Call-to-Action Metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: loadingComplete ? 1 : 0, scale: loadingComplete ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="events-metrics-container"
            >
              {[
                { icon: EventIcon, number: '50+', label: 'Events' },
                { icon: UserGroupIcon, number: '500+', label: 'Participants' },
                { icon: TrophyIcon, number: '25+', label: 'Awards' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                  className="events-metric-item"
                >
                  <metric.icon size={18} className="icon-hover-glow" />
                  <span className="events-metric-number">
                    {metric.number}
                  </span>
                  <span className="events-metric-label">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="events-search-filter-section"
          >
            {/* Premium Search Bar */}
            <motion.div 
              className="events-search-container"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="events-search-input"
              />
              <motion.div 
                className="events-search-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SearchIcon size={22} className="icon-hover-glow" />
              </motion.div>
            </motion.div>

            {/* Sophisticated Filter Buttons */}
            <motion.div className="events-filter-buttons">
              {filterOptions.map((filter, index) => (
                <motion.button
                  key={filter.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`events-filter-button ${activeFilter === filter.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  <span className="events-filter-icon">
                    <filter.icon size={16} />
                  </span>
                  <span className="events-filter-text">
                    {filter.label}
                  </span>
                  {activeFilter === filter.key && (
                    <motion.div
                      layoutId="activeFilter"
                      className="filter-active-indicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Sélecteur du nombre de cards par page */}
          <div className="events-page-size-container">
            <div className="events-page-size-selector events-select-container">
              <Select
                options={pageSizeOptions}
                value={pageSizeOptions.find(opt => opt.value === pageSize)}
                onChange={opt => setPageSize(opt.value)}
                instanceId="event-page-size-select"
                aria-label="Number of events per page"
                isSearchable={false}
                classNamePrefix="react-select"
              />
            </div>
          </div>

          {/* Affichage des événements paginés */}
          <motion.div
            id="events-cards-section"
            className="events-grid"
          >
            {paginatedEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50, scale: loadingComplete ? 1 : 0.9 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="event-card"
              >
                {/* Event Image - Optimized */}
                <div className="event-image-container">
                  <Image
                    src={`/assets/events/${event.img || event.image || 'default.jpg'}`}
                    alt={event.title}
                    fill
                    className="event-image"
                    sizes="(max-width: 600px) 100vw, 600px"
                    priority={index < 2}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    onError={(e) => { e.target.style.opacity = 0.5; e.target.onerror = null; }}
                  />
                  {/* Optional overlay for premium look */}
                  <div className="event-image-overlay" />
                </div>

                {/* Gradient Overlay */}
                <div className="event-gradient-overlay" />

                {/* Event Content */}
                <div className="event-content">
                  {/* Event Title with Sophisticated Typography */}
                  <h3 className="event-title">
                    {event.title}
                  </h3>

                  {/* Event Meta Information */}
                  <div className="event-meta">
                    <motion.span 
                      className="event-meta-date"
                      whileHover={{ scale: 1.05 }}
                    >
                      <CalendarIcon size={14} className="icon-hover-lift" />
                      {event.date}
                    </motion.span>
                    
                    <motion.span 
                      className="event-meta-location"
                      whileHover={{ scale: 1.05 }}
                    >
                      <LocationIcon size={14} className="icon-hover-lift" />
                      {event.location}
                    </motion.span>
                  </div>

                  {/* Event Description */}
                  <p className="event-description">
                    {event.description}
                  </p>

                  {/* Premium Call-to-Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="event-cta-button"
                  >
                    <span>Learn More</span>
                    <ArrowRightIcon size={16} className="icon-hover-lift" />
                    
                    {/* Button Shimmer Effect */}
                    <motion.div
                      className="event-button-shimmer"
                      animate={{
                        left: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.button>
                </div>

                {/* Floating Elements */}
                <div className="event-floating-element" />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination en bas si besoin */}
          {pageCount > 1 && (
            <div className="events-pagination-container">
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* Refined No Results Message */}
          {paginatedEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="events-no-results"
            >
              {/* Icon Container */}
              <motion.div 
                className="events-no-results-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <SearchIcon size={32} />
              </motion.div>

              {/* Title */}
              <h3 className="events-no-results-title">
                No Events Found
              </h3>

              {/* Description */}
              <p className="events-no-results-description">
                Try adjusting your search terms or filters to discover the events you&apos;re looking for.
              </p>

              {/* Background Decoration */}
              <div className="events-no-results-bg" />
            </motion.div>
          )}

          {/* Refined Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="events-stats-section"
          >
            {/* Background Decoration */}
            <div className="events-stats-bg" />

            {[
              { number: events.length, label: 'Total Events', icon: EventIcon, color: '#3f51b5' },
              { number: '500+', label: 'Participants', icon: UserGroupIcon, color: '#9c27b0' },
              { number: '50+', label: 'Workshops', icon: AcademicCapIcon, color: '#00bcd4' },
              { number: '25+', label: 'Awards', icon: TrophyIcon, color: '#ff9800' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                className="events-stat-item"
              >
                {/* Icon Container */}
                <motion.div 
                  className="events-stat-icon"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                    border: `1px solid ${stat.color}30`
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} className="icon-hover-glow" />
                </motion.div>

                {/* Number Display */}
                <div className="events-stat-number">
                  {stat.number}
                </div>

                {/* Label */}
                <div className="events-stat-label">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.section>
        </section>
      </main>
    </>
  );
}
