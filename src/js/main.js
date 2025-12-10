/**
 * Main JavaScript Entry Point
 * Uses modern ES modules, no jQuery dependency
 */

import '../styles/original.css';
import { initNavigation } from './modules/navigation.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initImageZoom } from './modules/image-zoom.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initResponsiveState } from './modules/responsive-state.js';

// Remove no-js class when JavaScript is loaded
document.documentElement.classList.remove('no-js');

// Initialize responsive state immediately (before DOM ready for faster styling)
initResponsiveState();

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initImageZoom();
  initScrollAnimations();
});
