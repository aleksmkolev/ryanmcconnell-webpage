// Enhanced Page Loading and Performance
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class initially
    document.body.classList.add('loading');
    
    // Performance optimization: Preload critical resources
    preloadCriticalResources();
    
    // Page transition and loading effects
    initializePageTransitions();
    
    // Intersection Observer for smooth animations
    initializeAnimations();
    
    // Smooth page loading
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 100);
    });
    // Video background handling
    const video = document.querySelector('.video-background video');
    if (video) {
        video.addEventListener('loadstart', function() {
            console.log('Video started loading');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can start playing');
        });
        
        video.addEventListener('playing', function() {
            console.log('Video is playing');
        });
        
        video.addEventListener('error', function(e) {
            console.error('Video error:', e);
        });
        
        // Force play on interaction if autoplay is blocked
        document.addEventListener('click', function() {
            if (video.paused) {
                video.play().catch(e => console.log('Video play failed:', e));
            }
        }, { once: true });
    }
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Handle dropdown toggle for mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe therapy cards and other animated elements
    const animatedElements = document.querySelectorAll('.therapy-card, .issues-column');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // CTA button enhancement
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Email link click tracking (for analytics)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here if needed
            console.log('Email consultation requested');
        });
    });

    // Easter egg - Secret message
    let konami = [];
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konami.push(e.code);
        konami.splice(-konamiCode.length - 1, konami.length - konamiCode.length);
        
        if (konami.join('') === konamiCode.join('')) {
            showSecretMessage();
        }
    });

    function showSecretMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--primary-blue);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                text-align: center;
                font-family: var(--font-serif);
                max-width: 400px;
            ">
                <h3 style="margin-bottom: 1rem;">🎉 Secret Discovered!</h3>
                <p style="margin-bottom: 1.5rem;">Quote 'Thor' for 25% off your next session!</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: white;
                    color: var(--primary-blue);
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                ">Got it!</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
            " onclick="this.parentElement.remove()"></div>
        `;
        document.body.appendChild(message);
    }

    // Form validation (if you add contact forms later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy loading for images (when you add them)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Performance optimization - debounce scroll events
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

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Any additional scroll handling can go here
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Initially hide all answers
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.display = 'none';
                } else {
                    item.classList.add('active');
                    answer.style.display = 'block';
                }
            });
        }
    });

    // Helper Functions for Enhanced Performance

    function preloadCriticalResources() {
        // Preload fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&display=swap'
        ];
        
        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });

        // Preload images if they exist
        const criticalImages = [
            'images/ryan.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Prefetch internal page links
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href*="' + window.location.hostname + '"], a[href^="./"], a[href^="../"]');
        internalLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const href = this.href;
                if (href && !this.dataset.prefetched) {
                    const linkElement = document.createElement('link');
                    linkElement.rel = 'prefetch';
                    linkElement.href = href;
                    document.head.appendChild(linkElement);
                    this.dataset.prefetched = 'true';
                }
            });
        });
    }

    function initializePageTransitions() {
        // Add page transition class to main content
        const mainElements = document.querySelectorAll('main, .hero, .section');
        mainElements.forEach(el => {
            el.classList.add('page-transition');
        });

        // Trigger animations after a short delay
        setTimeout(() => {
            mainElements.forEach(el => {
                el.classList.add('animate-in');
            });
        }, 200);

        // Handle internal link navigation with smooth transitions
        const internalLinks = document.querySelectorAll('a[href^="./"], a[href^="../"], a[href*="' + window.location.hostname + '"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.href;
                if (href && href !== window.location.href && !this.href.includes('#')) {
                    e.preventDefault();
                    
                    // Show loading spinner
                    showLoadingSpinner();
                    
                    // Fade out current page
                    document.body.style.opacity = '0.8';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 200);
                }
            });
        });
    }

    function initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.faq-item, .therapy-card, .case-study, .about-credentials-list, .ryan-image');
        animateElements.forEach(el => {
            el.classList.add('page-transition');
            observer.observe(el);
        });
    }

    function showLoadingSpinner() {
        let spinner = document.querySelector('.loading-spinner');
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(spinner);
        }
        spinner.classList.add('show');
        
        setTimeout(() => {
            spinner.classList.remove('show');
        }, 3000); // Auto-hide after 3 seconds
    }

    // Enhanced scroll performance
    let ticking = false;
    function updateOnScroll() {
        // Add any scroll-based optimizations here
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate);

    // Optimize video performance
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('loadstart', () => {
            video.style.opacity = '0.5';
        });
        
        video.addEventListener('canplay', () => {
            video.style.opacity = '0.8';
        });
    });
});