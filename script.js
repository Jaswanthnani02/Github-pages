// Skeleton Loading Animation
function createSkeletonLoading() {
    const skeletonElements = document.querySelectorAll('.project-card, .skill-category, .about-text p');
    
    skeletonElements.forEach(element => {
        element.classList.add('skeleton-loading');
    });
    
    // Remove skeleton after a delay
    setTimeout(() => {
        skeletonElements.forEach(element => {
            element.classList.remove('skeleton-loading');
            element.classList.add('skeleton-loaded');
        });
    }, 2000);
}

// Enhanced Loading Screen with Error Handling
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading Portfolio...</p>
            <div class="loading-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    let loadingTimeout;
    let isLoaded = false;
    let progress = 0;
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        const progressFill = loadingScreen.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 100);
    
    function hideLoadingScreen() {
        if (isLoaded) return;
        isLoaded = true;
        
        clearTimeout(loadingTimeout);
        clearInterval(progressInterval);
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

// Matrix Code Rain Effect
function createCodeRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'code-rain-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.1;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
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

// Interactive Cursor with Trail Effects
function createInteractiveCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'interactive-cursor';
    document.body.appendChild(cursor);
    
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const trailDot = document.createElement('div');
        trailDot.className = 'cursor-trail';
        trailDot.style.cssText = `
            position: fixed;
            width: ${4 - (i * 0.2)}px;
            height: ${4 - (i * 0.2)}px;
            background: rgba(59, 130, 246, ${1 - (i * 0.05)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(trailDot);
        trail.push(trailDot);
    }
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Main cursor
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Trail animation
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.forEach((dot, index) => {
            const delay = index * 0.02;
            const x = trailX - (mouseX - trailX) * delay;
            const y = trailY - (mouseY - trailY) * delay;
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
        });
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .floating-icon, .photo-container');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            trail.forEach(dot => {
                dot.style.transform = 'scale(1.5)';
                dot.style.background = 'rgba(139, 92, 246, 0.8)';
            });
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            trail.forEach(dot => {
                dot.style.transform = 'scale(1)';
                dot.style.background = 'rgba(59, 130, 246, 0.6)';
            });
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

// Dynamic Typing Effect with Multiple Roles
function createDynamicTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const roles = [
        'Data Engineer',
        'Data Scientist', 
        'AI/ML Engineer',
        'Python Developer',
        'Machine Learning Expert',
        'Big Data Specialist'
    ];
    
    let currentRoleIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = 100;
    
    function typeEffect() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            currentText = currentRole.substring(0, currentText.length - 1);
            typeSpeed = 50;
        } else {
            currentText = currentRole.substring(0, currentText.length + 1);
            typeSpeed = 100;
        }
        
        // Update the title with the current text
        heroTitle.innerHTML = `Hi, I'm <span class="highlight">Jaswanth Gaddam</span><br><span class="typing-text">${currentText}</span><span class="cursor">|</span>`;
        
        if (!isDeleting && currentText === currentRole) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next role
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
}

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

// Floating Action Button with Quick Navigation
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = `
        <button class="fab-main" id="fabMain">
            <i class="fas fa-plus"></i>
        </button>
        <div class="fab-menu" id="fabMenu">
            <button class="fab-item" data-section="home" title="Home">
                <i class="fas fa-home"></i>
            </button>
            <button class="fab-item" data-section="about" title="About">
                <i class="fas fa-user"></i>
            </button>
            <button class="fab-item" data-section="projects" title="Projects">
                <i class="fas fa-code"></i>
            </button>
            <button class="fab-item" data-section="contact" title="Contact">
                <i class="fas fa-envelope"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(fab);
    
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.getElementById('fabMenu');
    const fabItems = document.querySelectorAll('.fab-item');
    
    let isOpen = false;
    
    fabMain.addEventListener('click', () => {
        isOpen = !isOpen;
        fabMenu.classList.toggle('open', isOpen);
        fabMain.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
    });
    
    fabItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            const target = document.getElementById(section);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            isOpen = false;
            fabMenu.classList.remove('open');
            fabMain.style.transform = 'rotate(0deg)';
        });
    });
    
    // Hide FAB when scrolling up
    let lastScrollY = window.scrollY;
    const updateFAB = throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            fab.style.transform = 'translateY(100px)';
        } else {
            fab.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 16);
    
    window.addEventListener('scroll', updateFAB, { passive: true });
}

// Enhanced back to top button
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
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

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const skillsProgress = document.querySelector('.skills-progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the skills progress section
                if (skillsProgress) {
                    skillsProgress.classList.add('animate');
                }
                
                // Animate individual progress bars
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 500);
                
                // Unobserve after animation
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });
}

// Enhanced Text reveal animation
function createTextReveal() {
    const heroTextElements = document.querySelectorAll('.hero-subtitle, .hero-description');
    const aboutTextElements = document.querySelectorAll('.about-text p');
    
    // Hero text with typing effect
    const heroTextObserver = new IntersectionObserver((entries) => {
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
                }, 20);
                
                heroTextObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // About text with fade-in effect
    const aboutTextObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                aboutTextObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Apply observers
    heroTextElements.forEach(el => {
        el.style.opacity = '0';
        heroTextObserver.observe(el);
    });
    
    aboutTextElements.forEach(el => {
        aboutTextObserver.observe(el);
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
    createSkeletonLoading();
    createCodeRain();
    createParticleSystem();
    createInteractiveCursor();
    createScrollProgress();
    createBackToTop();
    createFloatingActionButton();
    createTextReveal();
    animateProgressBars();
    createDynamicTypingEffect();
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
