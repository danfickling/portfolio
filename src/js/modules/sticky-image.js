/**
 * Sticky Image Module
 * Keeps the intro image fixed/sticky across Intro and About sections
 */
export const initStickyImage = () => {
    const photoContainer = document.querySelector('.intro-photo-container');
    const introSection = document.getElementById('intro');
    const aboutSection = document.getElementById('about');

    // Config
    // Config
    // Config
    const BREAKPOINT = 920;
    const TOP_OFFSET = 220; // Aligned with h1 top (approx 280px)
    const MARGIN_ACCOUNT = 32; // Account for margin/delay unsticking

    if (!photoContainer || !introSection || !aboutSection) return;

    let isSticky = false;
    let placeholder = null;

    // Create a placeholder to prevent layout collapse when image becomes fixed
    const createPlaceholder = () => {
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.className = 'intro-photo-placeholder';
            // Match essential layout properties
            placeholder.style.display = 'none';
            // Insert it before the photo container
            photoContainer.parentNode.insertBefore(placeholder, photoContainer);
        }
    };

    const updatePlaceholder = () => {
        if (placeholder && isSticky) {
            // When sticky, placeholder takes up the space
            // placeholder width defaults to 100% (set in createPlaceholder)
            // so it naturally fills the grid column.

            // We only strictly need to hold the height.
            placeholder.style.height = `${photoContainer.offsetHeight}px`;
            placeholder.style.display = 'block';

        } else if (placeholder) {
            placeholder.style.display = 'none';
        }
    };

    const handleScroll = () => {
        if (window.innerWidth < BREAKPOINT) {
            resetStyles();
            return;
        }

        const aboutRect = aboutSection.getBoundingClientRect();

        // Logic:
        // 1. Pinned Phase: About Top <= (270 - 32). Move with About (offset by 32).
        // 2. Sticky Phase: Always (Fixed at 270).

        // We delay clipping/pushing up by MARGIN_ACCOUNT
        const unstickPoint = TOP_OFFSET - MARGIN_ACCOUNT;

        if (aboutRect.top <= unstickPoint) {
            // PINNED TO ABOUT TOP / SCROLLING AWAY
            enableStickyMode();
            // To be smooth, at transition point: Top = (TOP_OFFSET - 32) + 32 = TOP_OFFSET
            photoContainer.style.top = `${aboutRect.top + MARGIN_ACCOUNT}px`;

        } else {
            // ALWAYS STICKY (Fixed at Top Offset)
            enableStickyMode();
            photoContainer.style.top = `${TOP_OFFSET}px`;
        }
    };

    const enableStickyMode = () => {
        if (!isSticky) {
            createPlaceholder();
            // Ensure placeholder mimics the container's layout classes to maintain grid slot
            placeholder.className = photoContainer.className;
            // Add a specific class to distinguish it if needed, or just rely on DOM position
            placeholder.classList.add('sticky-placeholder');
            placeholder.classList.remove('intro-photo-container');
            // Actually, 'intro-photo-container' has `display: none` in CSS media queries? 
            // In intro.css: .intro-photo-container { display: none; } @media... { display: block; }
            // So if we copy classes, it will behave correctly responsively.

            isSticky = true;
            updatePlaceholder();
        }

        // Always update coords when active
        if (placeholder) {
            const pRect = placeholder.getBoundingClientRect();
            photoContainer.style.position = 'fixed';
            photoContainer.style.left = `${pRect.left}px`;
            photoContainer.style.width = `${pRect.width}px`;
            photoContainer.style.zIndex = '40'; // Below navbar (100)

            // If placeholder isn't sizing correctly, the copied classes might help.
            // But we must ensure it doesn't have ID conflicts (it doesn't have ID).
        }
    };

    const resetStyles = () => {
        isSticky = false;
        photoContainer.style.position = '';
        photoContainer.style.top = '';
        photoContainer.style.left = '';
        photoContainer.style.width = '';
        photoContainer.style.zIndex = '';
        if (placeholder) placeholder.style.display = 'none';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial setup
    createPlaceholder();
    handleScroll();
};
