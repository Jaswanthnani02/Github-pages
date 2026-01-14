// GSAP ULTRA ADDITIONS - Advanced Effects Module

// Add this after the main GSAP animations load

// ========================================
// PARALLAX BACKGROUND LAYERS
// ========================================
function initParallaxLayers() {
    // Parallax on hero background
    gsap.to('.hero::before', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        },
        y: 200,
        opacity: 0.5,
        ease: 'none'
    });

    // Parallax stats
    gsap.to('.stat-item', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
        },
        y: -100,
        stagger: 0.05,
        ease: 'none'
    });

    // Photo tilts on scroll
    gsap.to('.profile-photo', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        rotationY: 15,
        y: 50,
        ease: 'none'
    });
}

// ========================================
// LIQUID BLOB MORPHING for BUTTONS
// ========================================
function initLiquidButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(btn => {
        // Create blob background
        const blob = document.createElement('div');
        blob.style.cssText = `
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(96, 165, 250, 0.3));
            border-radius: 12px;
            filter: blur(15px);
            opacity: 0;
            z-index: -1;
            pointer-events: none;
        `;

        btn.style.position = 'relative';
        btn.appendChild(blob);

        // Animate blob on hover
        btn.addEventListener('mouseenter', () => {
            gsap.to(blob, {
                opacity: 1,
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(blob, {
                opacity: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.in'
            });
        });
    });
}

// ========================================
// SMOOTH SCROLL WITH LOCOMOTIVE SCROLL-LIKE EFFECT
// ========================================
function initSmoothScroll() {
    let scrollY = 0;
    let targetScrollY = 0;

    function smoothScrollLoop() {
        targetScrollY = window.scrollY;
        scrollY += (targetScrollY - scrollY) * 0.1;

        // Apply transform to body for smooth effect
        document.body.style.transform = `translateY(${-(scrollY - targetScrollY)}px)`;

        requestAnimationFrame(smoothScrollLoop);
    }

    // Note: This is a lightweight version. For production, use Locomotive Scroll or GSAP ScrollSmoother
    // smoothScrollLoop(); // Uncomment to enable
}

// ========================================
// TEXT SCRAMBLE EFFECT ON TITLES
// ========================================
function initTextScramble() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    const scramble = (element, finalText) => {
        let iteration = 0;
        const speed = 30;

        const interval = setInterval(() => {
            element.textContent = finalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return finalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= finalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, speed);
    };

    // Apply to section titles on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        const originalText = title.textContent;

        ScrollTrigger.create({
            trigger: title,
            start: 'top 80%',
            onEnter: () => scramble(title, originalText),
            once: true
        });
    });
}

// ========================================
// 3D CARD TILT EFFECT (Enhanced)
// ========================================
function init3DCardTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotationX: -rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power2.out'
            });

            // Shine effect
            const shine = card.querySelector('.card-shine') || createShine(card);
            gsap.to(shine, {
                x: x,
                y: y,
                opacity: 0.3,
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });

            const shine = card.querySelector('.card-shine');
            if (shine) {
                gsap.to(shine, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
    });
}

function createShine(card) {
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
    `;
    card.style.position = 'relative';
    card.appendChild(shine);
    return shine;
}

// ========================================
// INITIALIZE ULTRA FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main GSAP animations to load
    setTimeout(() => {
        console.log('🚀 Loading ULTRA GSAP features...');

        initParallaxLayers();
        initLiquidButtons();
        init3DCardTilt();
        // initTextScramble(); // Uncomment if you want scramble effect
        // initSmoothScroll(); // Uncomment for smooth scroll (can conflict with ScrollTrigger)

        console.log('✨ ULTRA features loaded!');
    }, 100);
});
