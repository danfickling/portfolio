/**
 * Smooth Scroll Module
 * Uses GSAP ScrollToPlugin for smooth anchor scrolling
 */

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

export function initSmoothScroll() {
  const getNavHeight = () => (window.innerWidth >= 768 ? 80 : 60);

  const resolveTargetFromHash = (hash) => {
    if (!hash) return null;

    if (hash === '#work' || hash === '#works') {
      return document.querySelector('.works-grid .work-tile');
    }

    return document.querySelector(hash);
  };

  const scrollToTarget = (target, smooth = true) => {
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = Math.max(0, targetTop - getNavHeight());

    if (smooth) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: offsetTop
        },
        ease: 'power2.inOut'
      });
    } else {
      window.scrollTo({ top: offsetTop, behavior: 'auto' });
    }
  };

  // Get all anchor links that point to IDs on the page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (!href || href === '#') return;
      
      const target = resolveTargetFromHash(href);
      
      if (target) {
        e.preventDefault();
        scrollToTarget(target, true);
        
        // Update URL hash without jumping
        history.pushState(null, '', href);
      }
    });
  });

  // Correct hash landing on page load (especially for cross-page links and Firefox)
  if (window.location.hash) {
    const syncHashPosition = () => {
      const target = resolveTargetFromHash(window.location.hash);
      if (target) {
        scrollToTarget(target, false);
      }
    };

    requestAnimationFrame(syncHashPosition);
    window.addEventListener('load', () => {
      setTimeout(syncHashPosition, 60);
    }, { once: true });
  }
}
