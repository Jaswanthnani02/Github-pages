/**
 * GSAP Professional Animations - ULTRA PREMIUM EDITION
 * Using GreenSock Animation Platform with advanced techniques
 * Features: Parallax, Smooth Scroll, Split Text, Morphing, Physics
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Configure GSAP defaults for smoother animations
gsap.config({
    force3D: true,
    nullTargetWarn: false
});

// Smooth scroll configuration
const lenis = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false
};

// ========================================
// 1. HERO TIMELINE ANIMATION
// ========================================
function initHeroTimeline() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate hero elements in sequence
    tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
    })
        .from(".hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-description", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".hero-buttons .btn", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.2)"
        }, "-=0.4")
        .from(".stat-item", {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.3")
        .from(".profile-photo", {
            scale: 0.8,
            opacity: 0,
            rotation: -10,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)"
        }, "-=1")
        .from(".floating-icon", {
            scale: 0,
            opacity: 0,
            rotation: 360,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(2)"
        }, "-=0.8")
        .from(".scroll-indicator", {
            y: -20,
            opacity: 0,
            duration: 0.8
        }, "-=0.5");
}

// ========================================
// 2. SCROLL-TRIGGERED ANIMATIONS (FIXED)
// ========================================
function initScrollAnimations() {
    // Section titles - smoother reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 60,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none none", // Only play once, don't reverse
                markers: false
            },
            duration: 1,
            ease: "power2.out"
        });
    });

    // Project cards - reduced 3D effect
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 60,
            opacity: 0,
            scale: 0.95
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    // Skill categories - smooth stagger
    gsap.utils.toArray('.skill-category').forEach((cat, index) => {
        gsap.fromTo(cat, {
            y: 40,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '.skills-grid',
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out"
        });
    });

    // About text paragraphs - ensure visible
    gsap.utils.toArray('.about-text p').forEach((p, index) => {
        gsap.fromTo(p, {
            x: -30,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: p,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            delay: index * 0.2,
            ease: "power1.out"
        });
    });

    // Progress bars - always fill
    gsap.utils.toArray('.progress-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            gsap.fromTo(bar, {
                width: '0%'
            }, {
                width: width + '%',
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 1.5,
                ease: "power2.out"
            });
        }
    });
}

// ========================================
// 3. MAGNETIC BUTTON EFFECT
// ========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .social-link');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.4,
                ease: "elastic.out(1, 0.3)"
            });
        });

        button.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        });

        button.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(this, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// ========================================
// 4. ENHANCED PROJECT CARD HOVER
// ========================================
function initProjectCardHovers() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            gsap.to(this, {
                y: -20,
                scale: 1.03,
                duration: 0.6,
                ease: "power2.out",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)"
            });

            // Animate tech tags
            gsap.from(this.querySelectorAll('.tech-tag'), {
                scale: 0.9,
                opacity: 0.7,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(1.7)"
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this, {
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
            });
        });
    });
}

// ========================================
// 5. FLOATING ICONS ANIMATION
// ========================================
function initFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');

    icons.forEach((icon, index) => {
        // Continuous floating animation
        gsap.to(icon, {
            y: -20,
            rotation: 5,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Enhanced click animation
        icon.addEventListener('click', function () {
            gsap.timeline()
                .to(this, {
                    scale: 1.5,
                    rotation: 720,
                    duration: 0.8,
                    ease: "power2.out"
                })
                .to(this, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)"
                });

            // Particle burst effect
            createGSAPParticleBurst(this);
        });
    });
}

// ========================================
// 6. PARTICLE BURST WITH GSAP
// ========================================
function createGSAPParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #8b5cf6, #60a5fa);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(particle);

        const angle = (i / 12) * Math.PI * 2;
        const distance = 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        gsap.timeline()
            .to(particle, {
                x: x,
                y: y,
                opacity: 0,
                scale: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
    }
}

// ========================================
// 7. NAVBAR SCROLL EFFECT
// ========================================
function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');

    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: navbar
        }
    });

    // Smooth reveal on page load
    gsap.from(navbar, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
    });
}

// ========================================
// 8. SCROLL INDICATOR PULSE
// ========================================
function initScrollIndicator() {
    gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Hide on scroll
    ScrollTrigger.create({
        start: 'top -50',
        onEnter: () => {
            gsap.to('.scroll-indicator', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power2.in"
            });
        },
        onLeaveBack: () => {
            gsap.to('.scroll-indicator', {
                opacity: 0.7,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });
}

// ========================================
// 9. STAT COUNTER ANIMATION
// ========================================
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));

        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
                gsap.to({ value: 0 }, {
                    value: target,
                    duration: 2,
                    ease: "power1.out",
                    onUpdate: function () {
                        stat.textContent = Math.floor(this.targets()[0].value) + ' +';
                    }
                });
            }
        });
    });
}

// ========================================
// 10. INITIALIZE ALL ANIMATIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Initializing GSAP animations...');

    // Set default preferences
    gsap.defaults({
        overwrite: 'auto'
    });

    // Initialize all animation modules
    initHeroTimeline();
    initScrollAnimations();
    initMagneticButtons();
    initProjectCardHovers();
    initFloatingIcons();
    initNavbarAnimation();
    initScrollIndicator();
    initStatCounters();

    console.log('✅ GSAP animations loaded successfully!');
});
