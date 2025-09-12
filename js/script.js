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
    
    // Optimize video loop to prevent stutter
    optimizeVideoLoop();
    
    // Smooth page loading
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            // After load, set hero height variable for video clipping
            updateHeroVideoHeight();
        }, 100);
    });
    // Video background handling
    const video = document.querySelector('.video-background video');
    if (video) {
        video.addEventListener('loadstart', function() {
        });
        
        video.addEventListener('canplay', function() {
        });
        
        video.addEventListener('playing', function() {
        });
        
        video.addEventListener('error', function(e) {
        });
        
        // Smooth transition animation when video loop ends
        video.addEventListener('ended', function() {
            // Phase 1: Ease-out transition when video ends
            video.classList.add('loop-ease-out');
            
            // Reset the video to start after ease-out completes
            setTimeout(() => {
                video.currentTime = 0;
                
                // Phase 2: Ease-in transition when video starts
                video.classList.remove('loop-ease-out');
                video.classList.add('loop-ease-in');
                
                // Remove ease-in class after transition completes
                setTimeout(() => {
                    video.classList.remove('loop-ease-in');
                }, 600); // Match the ease-in duration
                
            }, 500); // Match the ease-out duration
        });
        
        // Force play on interaction if autoplay is blocked
        document.addEventListener('click', function() {
            if (video.paused) {
                video.play().catch(e => {});
            }
        }, { once: true });
    }
    // Mobile navigation functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenuMobile = document.getElementById('nav-menu-mobile');
    const newNav = document.querySelector('.new-nav');
    const mobileNavLinks = document.querySelectorAll('.nav-menu-mobile a');

    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            newNav.classList.toggle('menu-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a navigational link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On mobile, do NOT close if clicking a dropdown toggle (parent heading)
            if (window.innerWidth <= 768) {
                const parentDropdown = link.closest('.has-dropdown');
                if (parentDropdown) {
                    const parentToggle = parentDropdown.querySelector(':scope > a');
                    if (parentToggle && link === parentToggle) {
                        // This is the dropdown heading; let the other handler toggle submenu and keep menu open
                        return;
                    }
                }
            }

            // Otherwise, close the menu (actual navigation)
            newNav.classList.remove('menu-open');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Handle dropdown toggle for mobile only
    const mobileDropdownItems = document.querySelectorAll('.nav-menu-mobile .has-dropdown');
    
    mobileDropdownItems.forEach(item => {
        const dropdownLink = item.querySelector('a');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle('open');
                }
            });
        }
    });

    // Smooth scrolling for navigation links
    function smoothScrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.new-nav')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Handle all navigation links (both desktop and mobile)
    const allNavLinks = document.querySelectorAll('.nav-menu-desktop a, .nav-menu-mobile a, .mobile-brand');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle hash links (internal page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (newNav.classList.contains('menu-open')) {
                    newNav.classList.remove('menu-open');
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Smooth scroll to section
                smoothScrollToSection(href);
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenuToggle && !mobileMenuToggle.contains(event.target) && !navMenuMobile.contains(event.target)) {
            newNav.classList.remove('menu-open');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't interfere with links that have onclick handlers
            if (this.onclick) {
                return; // Let the onclick handler execute normally
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                console.log('Scrolling to:', targetId);
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

    // Consolidated scroll handler (moved to unified handler below)

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

    // Consolidated scroll handler (moved to unified handler below)

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
        // Preload critical images
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
        }, 50);

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

    // Match text container height to image height
    function matchTextToImageHeight() {
        const ryanImage = document.querySelector('.ryan-image img');
        const textContainer = document.querySelector('.practice-text-container');
        
        if (ryanImage && textContainer) {
            // Wait for image to load if not already loaded
            if (ryanImage.complete) {
                setTextContainerHeight();
            } else {
                ryanImage.addEventListener('load', setTextContainerHeight);
            }
            
            function setTextContainerHeight() {
                const imageHeight = ryanImage.offsetHeight;
                textContainer.style.height = imageHeight + 'px';
            }
            
            // Also update on window resize
            window.addEventListener('resize', debounce(setTextContainerHeight, 250));
        }
    }

    // Set CSS variable to constrain video background to hero bottom
    function updateHeroVideoHeight() {
        const heroSection = document.querySelector('.hero');
        const nav = document.querySelector('.new-nav');
        if (!heroSection) return;
        const navHeight = nav ? nav.offsetHeight : 0;
        const heroHeight = heroSection.offsetHeight;
        // Ensure video starts at top behind navbar and ends at hero bottom
        const heightPx = Math.max(heroHeight, window.innerHeight) - 0;
        document.documentElement.style.setProperty('--hero-height', heightPx + 'px');
    }

    window.addEventListener('resize', debounce(updateHeroVideoHeight, 150));
    window.addEventListener('orientationchange', debounce(updateHeroVideoHeight, 150));
    updateHeroVideoHeight();
    
    // Initialize text-image height matching
    matchTextToImageHeight();
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
        }, 1000); // Auto-hide after 1 second
    }

    // UNIFIED SCROLL HANDLER - Consolidates all scroll functionality
    let ticking = false;
    
    function unifiedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // 1. Header hide/show functionality
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
                
                // 2. Lazy load YouTube videos when they come into view
                lazyLoadVideos();
                
                // 3. Hide video background when scrolling past hero section
                const videoBackground = document.querySelector('.video-background');
                const heroSection = document.querySelector('.hero');
                if (videoBackground && heroSection) {
                    const heroHeight = heroSection.offsetHeight;
                    if (scrollTop > heroHeight) {
                        videoBackground.classList.add('hidden');
                    } else {
                        videoBackground.classList.remove('hidden');
                    }
                }
                
                // 4. Any additional scroll handling from debounced handler
                // (Currently empty but available for future use)
                
                ticking = false;
            });
            ticking = true;
        }
    }

    // Enhanced lazy load YouTube videos with IntersectionObserver
    function initializeLazyLoading() {
        const lazyVideos = document.querySelectorAll('iframe[data-src]');
        
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        if (video.dataset.src) {
                            // Add a small delay to ensure smooth loading
                            setTimeout(() => {
                                video.src = video.dataset.src;
                                video.removeAttribute('data-src');
                                videoObserver.unobserve(video);
                            }, 100);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px', // Start loading 50px before entering viewport
                threshold: 0.1
            });

            lazyVideos.forEach(video => {
                videoObserver.observe(video);
            });
        } else {
            // Fallback for older browsers
            lazyVideos.forEach(video => {
                if (isElementInViewport(video) && video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                }
            });
        }
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Initialize lazy loading
    initializeLazyLoading();

    // Handle page navigation and video reloading
    function handleVideoReload() {
        const videos = document.querySelectorAll('iframe[src*="youtube.com"]');
        videos.forEach(video => {
            // Force reload the video by updating the src
            const currentSrc = video.src;
            video.src = '';
            setTimeout(() => {
                video.src = currentSrc;
            }, 100);
        });
    }

    // Reload videos when page becomes visible again (handles back/forward navigation)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(handleVideoReload, 200);
        }
    });

    // Also reload videos on page focus (additional safety)
    window.addEventListener('focus', () => {
        setTimeout(handleVideoReload, 200);
    });

    // SINGLE optimized scroll event listener
    window.addEventListener('scroll', unifiedScrollHandler, { passive: true });

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

    // Scroll Arrow Functionality
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const nextSection = document.querySelector('#practice');
            if (nextSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = nextSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Hide scroll arrow when scrolling past hero section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const hideScrollArrow = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const heroHeight = heroSection.offsetHeight;
                
                if (scrollTop > heroHeight * 0.3) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            };
            
            // Add to unified scroll handler
            const originalUnifiedScrollHandler = unifiedScrollHandler;
            window.removeEventListener('scroll', unifiedScrollHandler);
            
            window.addEventListener('scroll', function() {
                originalUnifiedScrollHandler();
                hideScrollArrow();
            }, { passive: true });
        }
    }
});

// Video Loop Optimization Function
function optimizeVideoLoop() {
    const video = document.querySelector('.video-background video');
    if (!video) return;
    
    // Ensure video is fully loaded before playing
    video.addEventListener('canplaythrough', function() {
        video.play().catch(e => console.log('Video autoplay prevented:', e));
    });
    
    // Remove any existing loop transition classes to prevent stutter
    video.addEventListener('ended', function() {
        video.classList.remove('loop-ease-out', 'loop-ease-in');
        video.currentTime = 0;
        video.play();
    });
    
    // Preload the video for seamless looping
    video.load();
}