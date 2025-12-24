// Main JavaScript for Koneksyon Plus Ministry Website
// Premium animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypedText();
    initScrollAnimations();
    initStatsCounters();
    initFormHandling();
    initSmoothScrolling();
    loadShowsPreview();
    
    console.log('Koneksyon Plus Ministry website initialized');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Sticky navigation with blur effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Typed text animation for hero section
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Empowering Leaders',
                'Building Communities', 
                'Growing Together',
                'Faith & Business'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('card-hover')) {
                    const cards = document.querySelectorAll('.card-hover');
                    cards.forEach((card, index) => {
                        if (card.classList.contains('visible')) {
                            setTimeout(() => {
                                anime({
                                    targets: card,
                                    translateY: [30, 0],
                                    opacity: [0, 1],
                                    duration: 600,
                                    delay: index * 200,
                                    easing: 'easeOutQuart'
                                });
                            }, 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-bg');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Animated statistics counters
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 19 ? 'K+' : '+');
            }
        };
        
        updateCounter();
    };
    
    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stats-counter');
                counters.forEach((counter, index) => {
                    setTimeout(() => animateCounter(counter), index * 300);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.floating');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Form handling with validation
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                // Show success message
                showNotification('Thank you! We\'ll be in touch soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
    
    // Add focus animations to form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                scale: [1, 1.02],
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        input.addEventListener('blur', () => {
            anime({
                targets: input,
                scale: [1.02, 1],
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Form validation
function validateForm(data) {
    const requiredFields = ['name', 'email'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </div>
            <div>
                <p class="font-medium">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => notification.remove()
        });
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        anime({
            targets: heroContent.children,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200),
            easing: 'easeOutQuart'
        });
    }
});

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 16); // ~60fps

// Load featured shows on homepage
// Load featured shows on homepage
async function loadShowsPreview() {
    const showsGrid = document.querySelector('[data-shows-grid]');
    if (!showsGrid) return;
    
    try {
        // Fetch from YouTube RSS via rss2json
        const channelId = 'UCjY2VSXSITvz2wY6vRep7Zw'; // @Koneksyonplus
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok') {
            // Take the top 3 videos
            const episodes = data.items.slice(0, 3).map(item => ({
                id: item.guid.split(':')[2] || item.link.split('v=')[1],
                title: item.title,
                description: item.description ? item.description.substring(0, 100) + '...' : '',
                thumbnail: item.thumbnail
            }));
            
            const gradients = [
                'from-purple-600 to-blue-600',
                'from-orange-500 to-orange-600',
                'from-green-500 to-teal-600'
            ];
            
            showsGrid.innerHTML = episodes.map((ep, index) => `
                <div class="card-hover bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 fade-in">
                    <div class="aspect-video bg-gradient-to-r ${gradients[index % 3]} flex items-center justify-center relative">
                        <img src="${ep.thumbnail}" alt="${ep.title}" class="w-full h-full object-cover absolute top-0 left-0" style="z-index: 0;">
                        <a href="https://www.youtube.com/watch?v=${ep.id}" target="_blank" class="flex items-center justify-center w-full h-full" style="z-index: 1;">
                            <svg class="w-16 h-16 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${ep.title}</h3>
                        <p class="text-gray-300 mb-4 text-sm">${ep.description}</p>
                        <a href="https://www.youtube.com/watch?v=${ep.id}" target="_blank" class="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center">
                            Watch Episode 
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    </div>
                </div>
            `).join('');
            
            // Re-trigger animations for new elements
            const fadeElements = showsGrid.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });
            fadeElements.forEach(el => observer.observe(el));
            
        } else {
            throw new Error('RSS status not ok');
        }
    } catch (error) {
        console.error('Error loading shows preview:', error);
        // Stick with default/fallback content if fetch fails (requires manual fallback HTML or re-implementation of fallback here)
        // Since the HTML already has content, we can just do nothing, OR overwrite if the container was empty.
        // But we modified index.html to have content. Wait, I didn't empty the container in index.html, I just added the attribute.
        // So if this fails, the hardcoded content remains! Perfect fallback.
    }
}window.addEventListener('scroll', optimizedScrollHandler);