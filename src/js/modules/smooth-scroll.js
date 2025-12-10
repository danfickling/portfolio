/**
 * Smooth Scroll Module
 * Uses GSAP ScrollToPlugin for smooth anchor scrolling
 */

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

export function initSmoothScroll() {
  // Get all anchor links that point to IDs on the page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Calculate offset for fixed navigation
        const navHeight = window.innerWidth >= 768 ? 80 : 60;
        
        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: target,
            offsetY: navHeight
          },
          ease: 'power2.inOut'
        });
        
        // Update URL hash without jumping
        history.pushState(null, '', href);
      }
    });
  });
}
