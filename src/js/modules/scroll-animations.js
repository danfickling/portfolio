/**
 * Scroll Animations Module
 * Handles scroll-triggered animations and reveals
 * - Parallax effect on the white top section
 * - Class toggle for about section transition (CSS handles the smooth animation)
 * - Project image reveals on scroll
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  const pageContent = document.querySelector('.page-content');
  const aboutSection = document.querySelector('.section--about');
  const introSection = document.querySelector('.section--intro');
  const sectionTop = document.querySelector('.section__top');
  const projects = document.querySelectorAll('.project');

  // Parallax effect on the top white section
  // Note: .section__top has an initial CSS animation (1s delay + 1.75s duration = 2.75s total)
  if (sectionTop && introSection) {
    let animationComplete = document.body.classList.contains('no-animation');

    const updateParallax = () => {
      // If no-animation is set, we can update immediately or just ensure logic runs
      if (!animationComplete && !document.body.classList.contains('no-animation')) return;

      const rect = introSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const duration = viewportHeight * 0.5;

      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.min(1, Math.abs(rect.top) / duration);
      }

      const translateY = progress * 15;
      sectionTop.style.transform = `translate3d(0, ${translateY}vh, 0)`;
    };

    // Only set timeout if we are animating
    if (!animationComplete) {
      setTimeout(() => {
        animationComplete = true;
        updateParallax();
      }, 2750);
    } else {
      // Initial update if no animation
      updateParallax();
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  // Toggle about-active class when about section reaches 40% of viewport
  // CSS handles all the smooth transitions (background color, opacity changes)
  if (aboutSection && pageContent) {
    const updateAboutState = () => {
      const rect = aboutSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.4;

      if (rect.top <= triggerPoint) {
        pageContent.classList.add('about-active');
      } else {
        pageContent.classList.remove('about-active');
      }
    };

    window.addEventListener('scroll', updateAboutState, { passive: true });
    updateAboutState();
  }

  // Add project--active class when projects scroll into view
  projects.forEach(project => {
    ScrollTrigger.create({
      trigger: project,
      start: 'top 80%',
      once: true,
      onEnter: () => project.classList.add('project--active')
    });
  });
}
