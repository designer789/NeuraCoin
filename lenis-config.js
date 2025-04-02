// Initialize Lenis smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out exponential
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Get all smooth scroll triggers
document.querySelectorAll('a[href^="#"]').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            lenis.scrollTo(offsetPosition, {
                duration: 1.5,
                easing: (t) => 1 - Math.pow(1 - t, 5), // Ease out quint
            });
        }
    });
});

// Connect lenis to window RAF (request animation frame)
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Optional: Update on resize
window.addEventListener('resize', () => {
    lenis.resize();
});

// Optional: Handle anchor links on page load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            setTimeout(() => {
                lenis.scrollTo(offsetPosition, {
                    duration: 0,
                });
            }, 100);
        }
    }
}); 