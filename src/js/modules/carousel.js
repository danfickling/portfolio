export function initCarousel() {
    const carousels = document.querySelectorAll('.image-carousel');
    if (!carousels.length) return;

    // 1. Custom Cursor Setup
    let cursor = document.querySelector('.carousel-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'carousel-cursor';
        cursor.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        document.body.appendChild(cursor);
    }

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // 2. Intersection Observer for Active Figure (Captions and Opacity)
    // Observer is set up per-carousel so images fade in based on carousel scroll position

    carousels.forEach(carousel => {
        const figures = carousel.querySelectorAll('figure');

        // SINGLE IMAGE CASE: If only one image exists, treat it as a regular block
        if (figures.length <= 1) {
            console.log('Found single carousel', carousel, 'figures:', figures.length);
            carousel.classList.add('is-single');

            // Check aspect ratio for wide single images
            const img = carousel.querySelector('img');
            if (img) {
                const checkWideImage = () => {
                    if (img.naturalWidth / img.naturalHeight > 2) {
                        carousel.classList.add('is-image-wide');
                    }
                };
                if (img.complete) {
                    checkWideImage();
                } else {
                    img.addEventListener('load', checkWideImage);
                }
            }
            return;
        }

        // Setup observer for each figure, relative to the carousel viewport
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const siblings = carousel.querySelectorAll('figure');
                    siblings.forEach(sibling => sibling.classList.remove('is-active'));
                    entry.target.classList.add('is-active');
                }
            });
        }, {
            root: carousel,
            rootMargin: '0px',
            threshold: 0.6
        });

        figures.forEach(figure => carouselObserver.observe(figure));

        if (isTouchDevice) {
            // Touch device logic
            const wrapper = document.createElement('div');
            wrapper.className = 'image-carousel-wrapper';
            carousel.parentNode.insertBefore(wrapper, carousel);
            wrapper.appendChild(carousel);

            const arrowBtn = document.createElement('button');
            arrowBtn.className = 'carousel-fallback-arrow';
            arrowBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            wrapper.appendChild(arrowBtn);

            const updateTouchArrow = () => {
                // Tightened tolerance for touch as well
                const atEnd = Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 2;
                arrowBtn.style.display = atEnd ? 'none' : 'flex';
            };

            carousel.addEventListener('scroll', updateTouchArrow);
            updateTouchArrow();

            arrowBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' });
            });
        } else {
            // Mouse events for custom cursor with edge detection
            let canGoPrev = false;
            let canGoNext = true;
            let currentIsLeftHalf = false;
            let isMouseInside = false;

            const updateCursorVisibility = () => {
                if (!isMouseInside) return;
                const shouldShowArrow = (currentIsLeftHalf && canGoPrev) || (!currentIsLeftHalf && canGoNext);

                if (shouldShowArrow) {
                    cursor.style.opacity = '1';
                    carousel.style.cursor = 'none'; // Hide system cursor
                } else {
                    cursor.style.opacity = '0';
                    carousel.style.cursor = 'default'; // Show system cursor
                }
            };

            const checkEdges = () => {
                const rect = carousel.getBoundingClientRect();
                const firstFigure = figures[0];
                const lastFigure = figures[figures.length - 1];

                if (!firstFigure || !lastFigure) {
                    canGoPrev = false;
                    canGoNext = false;
                } else {
                    const firstRect = firstFigure.getBoundingClientRect();
                    const lastRect = lastFigure.getBoundingClientRect();

                    // If the first figure's left edge is to the right of the carousel's left edge, we're at the start
                    // We use a small tolerance (2px) to handle subpixel issues
                    canGoPrev = firstRect.left < rect.left - 2;

                    // If the last figure's right edge is to the left of the carousel's right edge, we're at the end
                    canGoNext = lastRect.right > rect.right + 2;
                }

                updateCursorVisibility();
            };

            carousel.addEventListener('scroll', checkEdges);
            checkEdges();

            carousel.addEventListener('mouseenter', () => {
                isMouseInside = true;
                checkEdges(); // Refresh on enter
                cursor.classList.add('is-active');
            });

            carousel.addEventListener('mouseleave', () => {
                isMouseInside = false;
                cursor.classList.remove('is-active');
                cursor.style.opacity = '0';
                carousel.style.cursor = 'default';
            });

            carousel.addEventListener('mousemove', (e) => {
                isMouseInside = true;
                const rect = carousel.getBoundingClientRect();
                const xInCarousel = e.clientX - rect.left;

                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;

                currentIsLeftHalf = xInCarousel < rect.width / 2;

                if (currentIsLeftHalf) {
                    cursor.classList.add('is-prev');
                } else {
                    cursor.classList.remove('is-prev');
                }

                checkEdges(); // Ensure state is fresh and updates visibility
            });

            carousel.addEventListener('click', (e) => {
                const rect = carousel.getBoundingClientRect();
                const xInCarousel = e.clientX - rect.left;
                const isLeftHalf = xInCarousel < rect.width / 2;
                const scrollAmount = carousel.clientWidth * 0.75;

                if (isLeftHalf && canGoPrev) {
                    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else if (!isLeftHalf && canGoNext) {
                    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        }
    });
}
