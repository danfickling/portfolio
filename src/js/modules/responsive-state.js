/**
 * Responsive State Classes Module
 * Adds state-xxs, state-xs, state-sm, etc. classes to the HTML element
 * based on viewport width (matching Gridle grid framework behavior)
 */

const breakpoints = {
  xxs: 0,
  xs: 695,
  sm: 795,
  md: 992,
  lg: 1200
};

function getCurrentState() {
  const width = window.innerWidth;
  
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  if (width >= breakpoints.xs) return 'xs';
  return 'xxs';
}

function updateStateClass() {
  const html = document.documentElement;
  const currentState = getCurrentState();
  
  // Remove all state classes
  Object.keys(breakpoints).forEach(state => {
    html.classList.remove(`state-${state}`);
  });
  
  // Add current state class
  html.classList.add(`state-${currentState}`);
}

export function initResponsiveState() {
  // Set initial state
  updateStateClass();
  
  // Update on resize with debouncing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateStateClass, 100);
  });
}
