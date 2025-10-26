/**
 * Teatro Gran Rex - Main Script
 * Generated with Mobirise
 */

(function() {
    'use strict';

    // Mobile Menu Toggle
    function initMobileMenu() {
        const toggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (toggler && navbarCollapse) {
            toggler.addEventListener('click', function() {
                navbarCollapse.classList.toggle('show');
                
                // Animate hamburger icon
                const hamburger = this.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.toggle('active');
                }
                
                // Prevent body scroll when menu is open
                if (navbarCollapse.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = toggler.contains(event.target) || 
                                     navbarCollapse.contains(event.target);
                
                if (!isClickInside && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking on a link
            const navLinks = navbarCollapse.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth < 768) {
                        navbarCollapse.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                });
            });
        }
    }

    // Smooth Scroll for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                // Add shadow when scrolling
                if (currentScroll > 50) {
                    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.9)';
                } else {
                    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.8)';
                }
                
                lastScroll = currentScroll;
            });
        }
    }

    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Card hover effects enhancement
    function initCardEffects() {
        const cards = document.querySelectorAll('.show-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle animation to button
                const btn = this.querySelector('.btn-comprar');
                if (btn) {
                    btn.style.transform = 'translateY(-2px)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const btn = this.querySelector('.btn-comprar');
                if (btn) {
                    btn.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Form validation (for future forms)
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                form.classList.add('was-validated');
            });
        });
    }

    // Back to top button
    function initBackToTop() {
        // Create button if it doesn't exist
        let backToTopBtn = document.querySelector('.back-to-top');
        
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '↑';
            backToTopBtn.setAttribute('aria-label', 'Volver arriba');
            document.body.appendChild(backToTopBtn);
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .back-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #E50914;
                    color: white;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 999;
                    box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
                }
                .back-to-top.show {
                    opacity: 1;
                    visibility: visible;
                }
                .back-to-top:hover {
                    background-color: #F40F18;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 16px rgba(229, 9, 20, 0.6);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize animations on scroll
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        if ('IntersectionObserver' in window && elements.length > 0) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animationClass = element.getAttribute('data-animate') || 'fadeInUp';
                        element.classList.add('mbr-animated', animationClass);
                        animationObserver.unobserve(element);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => animationObserver.observe(el));
        }
    }

    // Handle window resize
    function initResizeHandler() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Reset mobile menu on desktop
                if (window.innerWidth >= 768) {
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse) {
                        navbarCollapse.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                }
            }, 250);
        });
    }

    // Initialize all functions when DOM is ready
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initNavbarScroll();
        initLazyLoading();
        initCardEffects();
        initFormValidation();
        initBackToTop();
        initScrollAnimations();
        initResizeHandler();
        
        // Remove preloader if exists
        const preloader = document.querySelector('.mbr-preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
        
        console.log('Teatro Gran Rex - Site initialized');
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();