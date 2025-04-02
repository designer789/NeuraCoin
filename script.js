class TextRotator {
    constructor(element, texts, interval = 3000) {
        this.element = element;
        this.texts = texts;
        this.interval = interval;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        // Set initial text
        this.updateText();
        
        // Start rotation
        setInterval(() => {
            this.element.classList.remove('visible');
            
            setTimeout(() => {
                this.currentIndex = (this.currentIndex + 1) % this.texts.length;
                this.updateText();
                this.element.classList.add('visible');
            }, 500); // Half of the transition time
        }, this.interval);
    }

    updateText() {
        this.element.textContent = this.texts[this.currentIndex];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const rotatingElement = document.querySelector('.rotating-text');
    const texts = [
        'Decentralize Intelligence.',
        'Democratize AI.',
        '1000x Your Compute Power.'
    ];
    
    // Create new instance with 3 second interval
    new TextRotator(rotatingElement, texts, 3000);
    
    // Add initial visible class
    setTimeout(() => {
        rotatingElement.classList.add('visible');
    }, 100);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth Scrolling Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position with offset for fixed header
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active menu item on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // Offset for earlier activation
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Set initial active state
    highlightActiveSection();
    
    // Update active state on scroll
    window.addEventListener('scroll', highlightActiveSection);
}); 