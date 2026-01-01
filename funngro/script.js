// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page loads
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1500);

    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initFAQ();
    initTrustTabs();
    initAnimations();
    initChatWidget();
    initBackToTop();
    initCounters();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButtons.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.benefit-card, .category-highlight, .category-card, .testimonial-card, ' +
        '.blog-card, .safety-card, .process-step, .stat-card'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.display = 'none';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
}

// Trust tabs functionality
function initTrustTabs() {
    const trustTabs = document.querySelectorAll('.trust-tab');
    const trustPanels = document.querySelectorAll('.trust-panel');
    
    trustTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            trustTabs.forEach(t => t.classList.remove('active'));
            trustPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/[^\d]/g, ''));
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on original text
        let displayValue;
        if (text.includes('50,00,000')) {
            displayValue = Math.floor(current / 100000) + ',00,000+';
        } else if (text.includes(',')) {
            displayValue = Math.floor(current).toLocaleString() + '+';
        } else {
            displayValue = Math.floor(current) + '+';
        }
        
        element.textContent = displayValue;
    }, 20);
}

// Chat widget functionality
function initChatWidget() {
    const chatButton = document.querySelector('.chat-button');
    
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            // Simulate chat opening
            showNotification('Chat support will be available soon! For now, please download our app for instant help.', 'info');
        });
    }
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// General animations
function initAnimations() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.float-icon');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Stagger animations for grids
    const grids = document.querySelectorAll('.benefits-grid, .categories-grid, .testimonials-grid');
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Button click handlers
document.addEventListener('click', (e) => {
    // Download app buttons
    if (e.target.matches('.btn-download, .btn-download-now') || e.target.closest('.btn-download, .btn-download-now')) {
        handleAppDownload();
    }
    
    // Learn more buttons
    if (e.target.matches('.btn-learn-more, .btn-learn-more-cta') || e.target.closest('.btn-learn-more, .btn-learn-more-cta')) {
        handleLearnMore();
    }
    
    // Start earning button
    if (e.target.matches('.btn-start-earning') || e.target.closest('.btn-start-earning')) {
        handleStartEarning();
    }
    
    // Watch episode button
    if (e.target.matches('.btn-watch-episode') || e.target.closest('.btn-watch-episode')) {
        handleWatchEpisode();
    }
    
    // Store links
    if (e.target.matches('.store-link') || e.target.closest('.store-link')) {
        e.preventDefault();
        const link = e.target.closest('.store-link');
        const isGooglePlay = link.querySelector('img').alt.includes('Google Play');
        handleStoreRedirect(isGooglePlay);
    }
    
    // Blog read more buttons
    if (e.target.matches('.btn-read-more') || e.target.closest('.btn-read-more')) {
        handleBlogRead(e.target);
    }
});

// Handler functions
function handleAppDownload() {
    showNotification('Redirecting to app store...', 'success');
    // Detect mobile platform and redirect accordingly
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/android/i.test(userAgent)) {
        window.open('https://play.google.com/store/apps/details?id=com.wishbanc.funngro', '_blank');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open('https://apps.apple.com/in/app/funngro/id1579361075', '_blank');
    } else {
        // Desktop - show both options
        showAppDownloadModal();
    }
}

function handleLearnMore() {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
        howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleStartEarning() {
    showNotification('Ready to start? Download our app to begin your earning journey!', 'info');
    setTimeout(() => {
        handleAppDownload();
    }, 1500);
}

function handleWatchEpisode() {
    showNotification('Shark Tank episode coming soon! Follow us on social media for updates.', 'info');
}

function handleStoreRedirect(isGooglePlay) {
    if (isGooglePlay) {
        window.open('https://play.google.com/store/apps/details?id=com.wishbanc.funngro', '_blank');
    } else {
        window.open('https://apps.apple.com/in/app/funngro/id1579361075', '_blank');
    }
}

function handleBlogRead(button) {
    const blogCard = button.closest('.blog-card');
    const title = blogCard.querySelector('h3').textContent;
    showNotification(`Opening "${title}"...`, 'info');
    // In a real app, this would navigate to the blog post
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

function showAppDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Download Funngro App</h3>
                <p>Choose your platform:</p>
                <div class="modal-buttons">
                    <a href="https://play.google.com/store/apps/details?id=com.wishbanc.funngro" target="_blank" class="modal-btn android">
                        <i class="fab fa-google-play"></i>
                        <span>Android</span>
                    </a>
                    <a href="https://apps.apple.com/in/app/funngro/id1579361075" target="_blank" class="modal-btn ios">
                        <i class="fab fa-apple"></i>
                        <span>iOS</span>
                    </a>
                </div>
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
        }
    });
}

// Performance optimization
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
    // Any scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const modals = document.querySelectorAll('.download-modal');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
        
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real application, this would send data to your analytics service
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        trackEvent('button_click', {
            button_text: button.textContent.trim(),
            button_class: button.className
        });
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}