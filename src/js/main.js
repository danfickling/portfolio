/**
 * Main JavaScript Entry Point
 * Uses modern ES modules, no jQuery dependency
 */

import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initImageZoom } from './modules/image-zoom.js';
import { initScrollAnimations } from './modules/scroll-animations.js';

import { initStickyImage } from './modules/sticky-image.js';

// Remove no-js class when JavaScript is loaded
document.documentElement.classList.remove('no-js');

// Check for hash on load and disable intro animations if present
if (window.location.hash) {
  document.body.classList.add('no-animation');
  // Also force scroll to top to ensure we don't start at 0 and then jump
  // but actually, we want to let the browser handle the scroll to the anchor.
  // The no-animation class prevents the transitions that might cause confusion.
}

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  initSmoothScroll();
  initImageZoom();
  initScrollAnimations();
  initStickyImage();
});
