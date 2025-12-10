/**
 * Image Zoom Module
 * Provides zoom functionality for project images
 * Uses medium-zoom library for smooth image zooming
 */

import mediumZoom from 'medium-zoom';

export function initImageZoom() {
  // Initialize zoom on all project images
  const zoomImages = document.querySelectorAll('[data-action="zoom"]');
  
  if (zoomImages.length > 0) {
    mediumZoom(zoomImages, {
      margin: 24,
      background: 'rgba(255, 255, 255, 0.95)',
      scrollOffset: 0
    });
  }
}
