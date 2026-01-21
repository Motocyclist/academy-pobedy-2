// ========================================
// АКАДЕМИЯ ПОБЕДЫ - JavaScript (v2)
// ========================================

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================

    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================

    function handleNavbarScroll() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
    }

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================

    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (easeInOutCubic)
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.about-text, .about-image, .mission-text, .mission-image, ' +
            '.direction-card, .support-item, .cta-card, ' +
            '.footer-brand, .footer-links, .footer-contacts, .footer-bottom'
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    // ========================================
    // PARALLAX EFFECT
    // ========================================

    function initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            const yPos = scrolled * parallaxSpeed;
            
            heroImage.style.transform = `translateY(${yPos}px) scale(1.1)`;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // ========================================
    // CARD HOVER EFFECTS
    // ========================================

    function initCardEffects() {
        const cards = document.querySelectorAll('.direction-card, .support-item, .cta-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ========================================
    // NAVBAR LINKS CLICK HANDLERS
    // ========================================

    function initNavLinks() {
        // Smooth scroll for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                smoothScrollTo(targetId);
                closeMobileMenu();
            });
        });

        // Smooth scroll for CTA buttons
        const ctaButtons = document.querySelectorAll('.btn-cta-small, .btn-primary, .btn-secondary');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    smoothScrollTo(href);
                }
            });
        });
    }

    // ========================================
    // MOBILE MENU TOGGLE HANDLER
    // ========================================

    function initMobileMenu() {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = navToggle.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ========================================
    // SCROLL INDICATOR (v2 CHANGES)
    // ========================================

    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        let hidden = false;

        function handleScroll() {
            // v2: Hide earlier (at 80px instead of 100px) for better UX
            if (window.scrollY > 80 && !hidden) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
                hidden = true;
            } else if (window.scrollY <= 80 && hidden) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
                hidden = false;
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ========================================
    // LOADING ANIMATIONS
    // ========================================

    function initLoadingAnimations() {
        // Hero elements animation
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-slogan, .hero-cta');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + index * 150);
        });
    }

    // ========================================
    // DYNAMIC BACKGROUND EFFECT
    // ========================================

    function initDynamicBackground() {
        const heroGradient = document.querySelector('.hero-gradient');
        if (!heroGradient) return;

        let mouseX = 50;
        let mouseY = 50;
        let currentX = 50;
        let currentY = 50;

        function updateGradient() {
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;
            
            currentX += dx * 0.05;
            currentY += dy * 0.05;
            
            heroGradient.style.background = `radial-gradient(ellipse at ${currentX}% ${currentY}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`;
            
            requestAnimationFrame(updateGradient);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 100;
            mouseY = (e.clientY / window.innerHeight) * 100;
        });

        updateGradient();
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    function init() {
        // Add loaded class to body
        document.body.classList.add('loaded');

        // Initialize all components
        initLoadingAnimations();
        initScrollAnimations()
        initParallax();
        initCardEffects();
        initNavLinks();
        initMobileMenu();
        initScrollIndicator();
        initDynamicBackground();

        // Event listeners
        window.addEventListener('scroll', debounce(handleNavbarScroll, 10), { passive: true });
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250));

        // Initialize navbar state
        handleNavbarScroll();
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // CSS IN JS FOR DYNAMIC EFFECTS
    // ========================================

    // Add dynamic styles
    const dynamicStyles = `
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
            transform: translateX(-10px);
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .direction-card,
        .support-item,
        .cta-card {
            will-change: transform, opacity;
        }
        
        .hero-image {
            will-change: transform;
        }
        
        /* v2: Ensure scroll indicator doesn't block interactions */
        .scroll-indicator {
            pointer-events: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .direction-card,
            .support-item,
            .cta-card,
            .hero-image {
                will-change: auto;
            }
        }
    `;

    // Inject dynamic styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);

})();
