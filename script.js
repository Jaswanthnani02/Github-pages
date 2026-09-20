/**
 * Jaswanth Gaddam — Professional Portfolio
 * Subtle 3D space + Clean GSAP animations
 */

// ============================================
// 1. THREE.JS — SUBTLE SPACE BACKGROUND
// ============================================
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Procedural star texture
    function makeStarSprite() {
        const c = document.createElement('canvas');
        c.width = 32; c.height = 32;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.2, 'rgba(200,230,255,0.6)');
        g.addColorStop(0.5, 'rgba(100,200,255,0.1)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
    }
    const starTex = makeStarSprite();

    // Stars
    const starCount = 1200;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    const palette = [[0.6,0.8,1],[1,0.95,0.85],[0.85,0.9,1],[0.7,1,0.9]];
    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPos[i3] = (Math.random()-0.5)*80;
        starPos[i3+1] = (Math.random()-0.5)*80;
        starPos[i3+2] = (Math.random()-0.5)*80;
        const c = palette[Math.floor(Math.random()*palette.length)];
        starCol[i3] = c[0]; starCol[i3+1] = c[1]; starCol[i3+2] = c[2];
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
        size: 0.08, map: starTex, vertexColors: true,
        transparent: true, opacity: 0.7,
        blending: THREE.AdditiveBlending, sizeAttenuation: true, depthWrite: false,
    }));
    scene.add(stars);

    // Subtle nebula glows
    function makeGlow(color, pos, scale, opacity) {
        const c = document.createElement('canvas');
        c.width = 128; c.height = 128;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(64,64,0,64,64,64);
        g.addColorStop(0, color);
        g.addColorStop(0.5, color.replace('0.4','0.1'));
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0,0,128,128);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(c), transparent: true, opacity,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        sprite.position.set(pos[0], pos[1], pos[2]);
        sprite.scale.set(scale, scale, 1);
        scene.add(sprite);
        return sprite;
    }
    makeGlow('rgba(100,255,218,0.4)', [-8, 4, -20], 20, 0.03);
    makeGlow('rgba(100,150,255,0.4)', [10, -5, -25], 18, 0.025);
    makeGlow('rgba(180,100,255,0.4)', [0, 8, -30], 15, 0.02);

    // Spaceship
    function buildShip(s) {
        const g = new THREE.Group();
        // Hull
        const hull = new THREE.Mesh(
            new THREE.ConeGeometry(0.08, 0.5, 6),
            new THREE.MeshBasicMaterial({ color: 0xccd6f6, transparent: true, opacity: 0.6 })
        );
        hull.rotation.x = Math.PI/2;
        g.add(hull);
        // Wings
        const wing = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.01, 0.15),
            new THREE.MeshBasicMaterial({ color: 0x64ffda, transparent: true, opacity: 0.35 })
        );
        wing.position.z = 0.08;
        g.add(wing);
        // Engines
        const engMat = new THREE.SpriteMaterial({
            map: starTex, color: 0x64ffda, transparent: true, opacity: 0.8,
            blending: THREE.AdditiveBlending,
        });
        const eng = [];
        [-0.06, 0.06].forEach(x => {
            const e = new THREE.Sprite(engMat.clone());
            e.scale.set(0.08, 0.2, 1);
            e.position.set(x, 0, 0.3);
            g.add(e);
            eng.push(e);
        });
        g.scale.set(s, s, s);
        scene.add(g);
        return { group: g, engines: eng };
    }
    const ship1 = buildShip(1);
    const ship2 = buildShip(0.5);

    // Shooting stars
    const meteors = [];
    function spawnMeteor() {
        const len = 12;
        const pos = new Float32Array(len * 3);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
            color: [0x64ffda, 0xccd6f6, 0xa78bfa][Math.floor(Math.random()*3)],
            transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending,
        }));
        scene.add(line);
        const x = (Math.random()-0.5)*40, y = Math.random()*15+5, z = (Math.random()-0.5)*20-5;
        return { line, pos, len, x, y, z,
            dx: (Math.random()-0.5)*0.2, dy: -(Math.random()*0.12+0.08), dz: (Math.random()-0.5)*0.1,
            life: 0, max: 60+Math.random()*60 };
    }
    for (let i = 0; i < 3; i++) meteors.push(spawnMeteor());

    camera.position.z = 10;
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX/window.innerWidth-0.5)*2;
        my = (e.clientY/window.innerHeight-0.5)*2;
    }, { passive: true });

    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        t += 0.003;

        stars.rotation.y += 0.00008;
        stars.rotation.x += 0.00003;

        // Ship 1 — figure-8
        const a = t * 0.3;
        const sx = Math.sin(a)*7, sy = Math.sin(a*2)*2, sz = Math.cos(a)*4;
        ship1.group.position.set(sx, sy, sz);
        ship1.group.lookAt(Math.sin(a+0.04)*7, Math.sin((a+0.04)*2)*2, Math.cos(a+0.04)*4);
        ship1.group.rotation.z = Math.cos(a)*0.3;
        const fl = 0.6+Math.sin(t*40)*0.3;
        ship1.engines.forEach(e => { e.material.opacity = fl; });

        // Ship 2 — circular
        const b = t * 0.18;
        ship2.group.position.set(Math.cos(b)*12, Math.sin(b*1.3)*3-2, Math.sin(b)*9-6);
        ship2.group.lookAt(Math.cos(b+0.04)*12, Math.sin((b+0.04)*1.3)*3-2, Math.sin(b+0.04)*9-6);
        ship2.engines.forEach(e => { e.material.opacity = fl*0.7; });

        // Meteors
        meteors.forEach(m => {
            m.life++; m.x += m.dx; m.y += m.dy; m.z += m.dz;
            for (let i = m.len-1; i > 0; i--) {
                m.pos[i*3]=m.pos[(i-1)*3]; m.pos[i*3+1]=m.pos[(i-1)*3+1]; m.pos[i*3+2]=m.pos[(i-1)*3+2];
            }
            m.pos[0]=m.x; m.pos[1]=m.y; m.pos[2]=m.z;
            m.line.geometry.attributes.position.needsUpdate = true;
            m.line.material.opacity = Math.max(0, 1-m.life/m.max)*0.5;
            if (m.life >= m.max) {
                m.x=(Math.random()-0.5)*40; m.y=Math.random()*15+5; m.z=(Math.random()-0.5)*20-5;
                m.life=0; m.max=60+Math.random()*60;
                for (let i=0;i<m.len;i++){m.pos[i*3]=m.x;m.pos[i*3+1]=m.y;m.pos[i*3+2]=m.z;}
            }
        });
        if (Math.random()<0.003 && meteors.length<5) meteors.push(spawnMeteor());

        camera.position.x += (mx*0.4-camera.position.x)*0.015;
        camera.position.y += (-my*0.4-camera.position.y)*0.015;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });
}

// ============================================
// 2. GSAP — CLEAN ANIMATIONS
// ============================================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: true, nullTargetWarn: false });

    // Hero stagger entrance
    const heroItems = document.querySelectorAll('.fade-up');
    gsap.to(heroItems, {
        opacity: 1, y: 0, duration: 0.6,
        stagger: 0.12, delay: 0.3,
        ease: 'power3.out',
    });

    // Navbar entrance
    gsap.from('.header', { y: -20, opacity: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' });
    gsap.from('.side-email, .side-social', { opacity: 0, duration: 0.5, delay: 1.2, ease: 'power2.out' });

    // Scroll-triggered sections
    document.querySelectorAll('.section').forEach(section => {
        // Section heading
        const heading = section.querySelector('.section-heading, .section-number');
        if (heading) {
            gsap.from(heading, {
                y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
            });
        }

        // Cards, groups, articles
        const cards = section.querySelectorAll('.exp-card, .skill-group, .project-card, .project-featured, .badges-section');
        cards.forEach((card, i) => {
            gsap.from(card, {
                y: 40, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
            });
        });
    });

    // About section
    gsap.from('.about-text', {
        x: -30, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-layout', start: 'top 80%', toggleActions: 'play none none none' },
    });
    gsap.from('.about-image', {
        x: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-layout', start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Contact
    gsap.from('.contact-title', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none none' },
    });
    gsap.from('.contact-desc', {
        y: 20, opacity: 0, duration: 0.5, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none none' },
    });
    gsap.from('.contact-links', {
        y: 20, opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Navbar scroll effect
    ScrollTrigger.create({
        start: 'top -80', end: 99999,
        toggleClass: { className: 'scrolled', targets: '#header' },
    });
}

// ============================================
// 3. NAVIGATION
// ============================================
function initNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active link tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const y = window.scrollY + 150;
        sections.forEach(s => {
            if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${s.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { passive: true });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// 4. SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const pct = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = pct + '%';
    }, { passive: true });
}

// ============================================
// 5. PROJECT DETAIL MODAL
// ============================================
const PROJECT_DETAILS = {
    dispatcher: {
        overline: 'BetterWorld Technology · Production',
        title: 'Ticket Auto-Dispatcher',
        body: `
            <h4>Problem</h4>
            <p>Support tickets needed fair, fast assignment across technicians without manual triage on every board.</p>
            <h4>What I built</h4>
            <ul>
                <li>Azure Functions service on the ConnectWise Manage API</li>
                <li>Management selects ConnectWise boards by condition</li>
                <li>Assignment uses round-robin and weighted averages on technician ticket counts</li>
                <li>Tickets are sent to technicians through API calls</li>
                <li>Companion metrics dashboard tracks processed tickets, time saved, fairness, and estimated cost savings</li>
            </ul>
            <h4>Outcome</h4>
            <ul>
                <li>100,000+ tickets auto-assigned in the last 6 months</li>
                <li>Labor savings estimated from measured time saved at an assumed $35/hour technician rate</li>
                <li>History persisted to Azure Blob Storage for ops and Power BI views</li>
            </ul>
        `,
        tech: ['Azure Functions', 'ConnectWise Manage API', 'Python', 'Azure Blob Storage']
    },
    'ops-dashboard': {
        overline: 'BetterWorld Technology · Production',
        title: 'Ops Analytics Dashboard',
        body: `
            <h4>Problem</h4>
            <p>Management needed one place to see ticket volume, open work, technician load, account health, and why tickets stall — across time ranges and boards.</p>
            <h4>What I built</h4>
            <ul>
                <li>Ops dashboard on Cosmos DB (source of truth for MSP operational data)</li>
                <li>Hosted on Azure Containers with auto-scaling; report snapshots cached in Azure Redis</li>
                <li>ConnectWise API + Microsoft 365 integration</li>
                <li>Time-bounded views (e.g. last 30 days or custom range) for tickets processed or open</li>
                <li>Technician performance, account health scores, and MTTR by account</li>
                <li>Priority-sorted bar and Sankey charts by agent volume, company, or board</li>
                <li>Azure AI Foundry “AI analysis” reads ticket notes to explain why a ticket is unresolved</li>
                <li>In-dashboard messaging using each user’s own credentials</li>
            </ul>
            <h4>Reporting tied to this stack</h4>
            <ul>
                <li>Weekly flash reports for a quick management overview</li>
                <li>Monthly ops reports: tickets processed/closed, CSAT average, MTTR by SLA</li>
                <li>Per-client home-health scores from ticket hygiene, customer feedback, time-to-response, and sentiment</li>
            </ul>
        `,
        tech: ['Cosmos DB', 'Azure Containers', 'Azure Redis', 'Azure AI Foundry', 'ConnectWise API', 'Microsoft 365']
    },
    mcp: {
        overline: 'BetterWorld Technology · Production',
        title: 'ConnectWise MCP Platform',
        body: `
            <h4>Problem</h4>
            <p>The team needed safe, role-aware tools so Claude and other LLMs could work against ConnectWise products without ad-hoc scripts.</p>
            <h4>What I built</h4>
            <ul>
                <li>Custom APIs from ConnectWise documentation, exposed as MCP tools with clear tool descriptions</li>
                <li>Deployed to Azure Containers with auto-scaling</li>
                <li>Predefined authorization and role-based access control modeled after ConnectWise permissions</li>
                <li>Coverage across SmileBack, ConnectWise Asio (RMM), and ConnectWise CPQ (CRM), plus Manage workflows</li>
                <li>Paired with a Cosmos DB data layer (IT Glue, projects, invoices, tickets, technicians, RMM devices, disk utilization, SmileBack feedback, CPQ) so LLMs can query for insights</li>
            </ul>
            <h4>Outcome</h4>
            <p>Entire team uses the MCP stack with controlled access for day-to-day operations and analytics.</p>
        `,
        tech: ['MCP', 'Azure Containers', 'ConnectWise', 'Cosmos DB', 'RBAC']
    },
    onboarding: {
        overline: 'BetterWorld Technology · Production',
        title: 'n8n New-Hire Onboarding',
        body: `
            <h4>Problem</h4>
            <p>Manual onboarding took 2–5 business days: raising tickets, collecting feedback, briefing the hire, scheduling meetings, creating every credential, and adding groups.</p>
            <h4>What I built</h4>
            <ul>
                <li>End-to-end n8n automation with data guidelines and approval gates</li>
                <li>Assigns ConnectWise licenses</li>
                <li>Provisions Microsoft Graph credentials and enterprise applications</li>
                <li>Assigns managers and sets calendar meetings</li>
                <li>Delivers credentials and sends the welcome email</li>
            </ul>
            <h4>Outcome</h4>
            <p>When approvals are processed instantly, new-hire credentials are ready in 5–10 minutes instead of days.</p>
        `,
        tech: ['n8n', 'Microsoft Graph', 'ConnectWise', 'Approvals']
    },
    smartops: {
        overline: 'BetterWorld Technology · Production',
        title: 'ConnectWise SmartOps AI',
        body: `
            <h4>What I built</h4>
            <ul>
                <li>Python service integrating ConnectWise with AI-assisted ticket analysis</li>
                <li>Automated categorization and prioritization for support workflows</li>
                <li>Power Automate hooks for downstream automation</li>
                <li>Monitoring for API performance and automation outcomes</li>
            </ul>
        `,
        tech: ['Python', 'ConnectWise', 'OpenAI', 'Power Automate']
    },
    rag: {
        overline: 'Selected delivery',
        title: 'Generative AI & RAG Systems',
        body: `
            <h4>What I built</h4>
            <ul>
                <li>Custom Generative AI solutions with LangGraph, LangChain, and Crew AI</li>
                <li>RAG pipelines for knowledge retrieval</li>
                <li>Multi-agent orchestration for multi-step business workflows</li>
            </ul>
        `,
        tech: ['LangGraph', 'LangChain', 'Crew AI', 'RAG', 'Python']
    },
    expedia: {
        overline: 'Nexturn · Client engagement',
        title: 'Expedia Recon Database',
        body: `
            <ul>
                <li>Pulled Splunk Data Lake data into production and transformed it with PySpark</li>
                <li>Maintained PostgreSQL for payment and FDS reconciliation</li>
                <li>Tableau dashboards for discrepancies and failure patterns</li>
            </ul>
        `,
        tech: ['PySpark', 'PostgreSQL', 'Tableau', 'Splunk']
    },
    rxsense: {
        overline: 'Nexturn · Client engagement',
        title: 'Rxsense ETL Pipelines',
        body: `
            <ul>
                <li>Matillion ETL pipelines integrating Python and SQL</li>
                <li>Automated large-scale transforms to reduce manual work</li>
                <li>Documented data flows, dependencies, and transformation steps</li>
            </ul>
        `,
        tech: ['Matillion', 'Python', 'SQL', 'ETL']
    }
};

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const overline = document.getElementById('projectModalOverline');
    const title = document.getElementById('projectModalTitle');
    const body = document.getElementById('projectModalBody');
    const tech = document.getElementById('projectModalTech');

    function openProject(id) {
        const data = PROJECT_DETAILS[id];
        if (!data) return;
        overline.textContent = data.overline;
        title.textContent = data.title;
        body.innerHTML = data.body;
        tech.innerHTML = data.tech.map(t => `<li>${t}</li>`).join('');
        modal.hidden = false;
        document.body.classList.add('modal-open');
    }

    function closeProject() {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.project-open').forEach(btn => {
        btn.addEventListener('click', () => openProject(btn.dataset.project));
    });

    modal.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', closeProject);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.hidden) closeProject();
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const image = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    const stage = lightbox.querySelector('.lightbox-stage');

    function openLightbox(src, text, alt) {
        image.classList.remove('is-zoomed');
        image.src = src;
        image.alt = alt || text || '';
        caption.textContent = text || '';
        if (stage) stage.scrollTop = 0;
        lightbox.hidden = false;
        document.body.classList.add('modal-open');
    }

    function closeLightbox() {
        lightbox.hidden = true;
        image.classList.remove('is-zoomed');
        image.removeAttribute('src');
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('[data-lightbox]').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-lightbox');
            const text = btn.getAttribute('data-caption') || '';
            const img = btn.querySelector('img');
            openLightbox(src, text, img ? img.alt : text);
        });
    });

    image.addEventListener('click', e => {
        e.stopPropagation();
        image.classList.toggle('is-zoomed');
        if (stage) {
            stage.scrollTop = 0;
            stage.scrollLeft = 0;
        }
    });

    lightbox.querySelectorAll('[data-close-lightbox]').forEach(el => {
        el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
}

// ============================================
// 6. CURSOR GLOW (desktop only)
// ============================================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) { if (glow) glow.style.display = 'none'; return; }
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }, { passive: true });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initAnimations();
    initNav();
    initScrollProgress();
    initProjectModal();
    initLightbox();
    initCursorGlow();
});
