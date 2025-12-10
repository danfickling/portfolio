/**
 * Navigation Module
 * Handles mobile hamburger menu toggle
 */

export function initNavigation() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('page-nav');
  
  if (!toggle || !nav) return;
  
  // Toggle menu on click
  toggle.addEventListener('click', () => {
    toggleMenu();
  });
  
  // Toggle menu on Enter/Space key
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
  
  // Close menu when clicking nav links
  const navLinks = nav.querySelectorAll('.page-nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && 
        !nav.contains(e.target) && 
        !toggle.contains(e.target)) {
      closeMenu();
    }
  });
  
  function toggleMenu() {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  }
  
  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
  }
}
