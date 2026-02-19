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
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const carousel = entry.target.closest('.image-carousel');
                if (!carousel) return;

                const siblings = carousel.querySelectorAll('figure');
                siblings.forEach(sibling => sibling.classList.remove('is-active'));
                entry.target.classList.add('is-active');
            }
        });
    }, observerOptions);

    carousels.forEach(carousel => {
        const figures = carousel.querySelectorAll('figure');

        // SINGLE IMAGE CASE: If only one image exists, treat it as a regular block
        if (figures.length <= 1) {
            carousel.classList.add('is-single');
            return;
        }

        // Setup observer for each figure
        figures.forEach(figure => observer.observe(figure));

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

            const checkEdges = () => {
                // Precision edge detection with 2px tolerance
                canGoPrev = carousel.scrollLeft > 2;
                canGoNext = Math.ceil(carousel.scrollLeft + carousel.clientWidth) < carousel.scrollWidth - 2;
            };

            carousel.addEventListener('scroll', checkEdges);
            checkEdges();

            carousel.addEventListener('mouseenter', () => {
                cursor.classList.add('is-active');
            });

            carousel.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-active');
                cursor.style.opacity = '0';
                carousel.style.cursor = 'default';
            });

            carousel.addEventListener('mousemove', (e) => {
                const rect = carousel.getBoundingClientRect();
                const xInCarousel = e.clientX - rect.left;

                cursor.style.top = `${e.clientY}px`;
                cursor.style.left = `${e.clientX}px`;

                const isLeftHalf = xInCarousel < rect.width / 2;
                const shouldShowArrow = (isLeftHalf && canGoPrev) || (!isLeftHalf && canGoNext);

                if (isLeftHalf) {
                    cursor.classList.add('is-prev');
                } else {
                    cursor.classList.remove('is-prev');
                }

                if (shouldShowArrow) {
                    cursor.style.opacity = '1';
                    carousel.style.cursor = 'none'; // Hide system cursor
                } else {
                    cursor.style.opacity = '0';
                    carousel.style.cursor = 'default'; // Show system cursor
                }
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
