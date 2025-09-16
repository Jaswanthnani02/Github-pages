// Enhanced Loading Screen with Error Handling
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading Portfolio...</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    let loadingTimeout;
    let isLoaded = false;
    
    function hideLoadingScreen() {
        if (isLoaded) return;
        isLoaded = true;
        
        clearTimeout(loadingTimeout);
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.remove();
            }
        }, 500);
    }
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', hideLoadingScreen);
    
    // Fallback: hide loading screen after maximum wait time
    loadingTimeout = setTimeout(() => {
        console.warn('Loading screen timeout - hiding after 5 seconds');
        hideLoadingScreen();
    }, 5000);
    
    // Hide loading screen if DOM is ready and images are loaded
    if (document.readyState === 'complete') {
        hideLoadingScreen();
    }
}

// Optimized Particle System
function createParticleSystem() {
    const particleBackground = document.createElement('div');
    particleBackground.className = 'particle-background';
    document.body.appendChild(particleBackground);
    
    let particleCount = 0;
    const maxParticles = 15; // Reduced from unlimited
    
    function createParticle() {
        if (particleCount >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 2; // Reduced size range
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 10; // Reduced duration range
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}px;
            animation-duration: ${duration}s;
        `;
        
        particleBackground.appendChild(particle);
        particleCount++;
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                particleCount--;
            }
        }, duration * 1000);
    }
    
    // Create particles less frequently
    setInterval(createParticle, 500); // Increased interval
    
    // Create fewer initial particles
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Custom Cursor
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .floating-icon, .photo-container');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Enhanced Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Improved hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});


// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced Navbar background change on scroll with throttling
const handleScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll, { passive: true });

// Optimized Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for child elements with reduced delay
            const children = entry.target.querySelectorAll('.skill-category, .project-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 50); // Reduced delay for faster animation
            });
            
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Interactive Profile Photo with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .section-title');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Enhanced interactive profile photo effects
    const photoContainer = document.querySelector('.photo-container');
    const floatingIcons = document.querySelectorAll('.floating-icon');

    if (photoContainer) {
        // Enhanced mouse move effect for photo
        photoContainer.addEventListener('mousemove', (e) => {
            const rect = photoContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            photoContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Add parallax effect to floating icons
            floatingIcons.forEach((icon, index) => {
                const speed = (index + 1) * 0.5;
                const moveX = (x - centerX) * speed * 0.01;
                const moveY = (y - centerY) * speed * 0.01;
                icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        // Reset transform on mouse leave
        photoContainer.addEventListener('mouseleave', () => {
            photoContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            
            // Reset floating icons
            floatingIcons.forEach(icon => {
                icon.style.transform = 'translate(0, 0)';
            });
        });

        // Enhanced click effect with ripple
        photoContainer.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = photoContainer.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            photoContainer.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            photoContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.1)';
            setTimeout(() => {
                photoContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)';
            }, 200);
        });
    }

    // Enhanced floating icons interaction
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animationPlayState = 'paused';
            icon.style.transform = 'scale(1.3) rotate(10deg)';
            
            // Add glow effect
            icon.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.8)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.animationPlayState = 'running';
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = 'none';
        });

        // Enhanced click effect for icons
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(1.5) rotate(360deg)';
            icon.style.boxShadow = '0 0 40px rgba(139, 92, 246, 1)';
            
            // Create particle burst effect
            createIconParticleBurst(icon);
            
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = 'none';
            }, 300);
        });
    });
});

// Icon particle burst effect
function createIconParticleBurst(icon) {
    const rect = icon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 4px;
            height: 4px;
            background: #8b5cf6;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particle-burst 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// Add CSS for ripple and particle burst animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes particle-burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx, 50px), var(--vy, 50px)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Enhanced Project card hover effects with 3D transform
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
});

// Enhanced Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Enhanced scroll progress indicator with throttling
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #fbbf24);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = throttle(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 16);
    
    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Enhanced back to top button
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1) rotate(5deg)';
        backToTop.style.boxShadow = '0 6px 25px rgba(59, 130, 246, 0.5)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1) rotate(0deg)';
        backToTop.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
    });
    
    const updateBackToTop = throttle(() => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }, 16);
    
    window.addEventListener('scroll', updateBackToTop, { passive: true });
}

// Text reveal animation
function createTextReveal() {
    const textElements = document.querySelectorAll('.hero-subtitle, .hero-description, .about-text p');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.textContent = '';
                entry.target.style.opacity = '1';
                
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        entry.target.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 30);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        textObserver.observe(el);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-theme', savedTheme === 'dark');
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Cleanup function to prevent memory leaks
function cleanup() {
    // Remove event listeners and clear intervals
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', updateProgress);
    window.removeEventListener('scroll', updateBackToTop);
    
    // Clear any remaining timeouts
    const highestTimeoutId = setTimeout(() => {}, 0);
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createLoadingScreen();
    createParticleSystem();
    // createCustomCursor(); // Disabled custom cursor
    createScrollProgress();
    createBackToTop();
    createTextReveal();
    initThemeToggle();
    
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - close menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        } else {
            // Swipe right - open menu
            hamburger.classList.add('active');
            navMenu.classList.add('active');
        }
    }
}
