// Smooth scrolling and performance optimizations
document.documentElement.style.scrollBehavior = 'smooth';

// Custom cursor functionality
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.cursorRing = document.querySelector('.cursor-ring');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        this.init();
    }
    
    init() {
        // Only initialize if not on mobile
        if (window.innerWidth > 480) {
            document.addEventListener('mousemove', (e) => this.updateCursor(e));
            document.addEventListener('mouseenter', () => this.showCursor());
            document.addEventListener('mouseleave', () => this.hideCursor());
            
            // Hover effects for interactive elements
            this.addHoverEffects();
            
            // Start animation loop
            this.animate();
        }
    }
    
    updateCursor(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Update dot position immediately
        this.cursorDot.style.left = this.mouseX + 'px';
        this.cursorDot.style.top = this.mouseY + 'px';
    }
    
    animate() {
        // Smooth ring following with easing
        this.ringX += (this.mouseX - this.ringX) * 0.15;
        this.ringY += (this.mouseY - this.ringY) * 0.15;
        
        this.cursorRing.style.left = this.ringX + 'px';
        this.cursorRing.style.top = this.ringY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    showCursor() {
        this.cursor.style.opacity = '1';
    }
    
    hideCursor() {
        this.cursor.style.opacity = '0';
    }
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .innovation-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursorRing.style.borderColor = 'rgba(0, 255, 136, 0.8)';
                this.cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursorRing.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Scroll-driven animations and parallax effects
class ScrollAnimations {
    constructor() {
        this.scrollY = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        // Intersection Observer for fade-in animations
        this.setupIntersectionObserver();
        
        // Scroll event for parallax and continuous animations
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Initial setup
        this.handleScroll();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.title-word, .section-description, .feature-item, .innovation-card, .stat-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });
        
        // Observe visual elements
        const visualElements = document.querySelectorAll('.visual-element');
        visualElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('title-word')) {
            element.classList.add('animate');
        } else if (element.classList.contains('visual-element')) {
            this.animateVisualElement(element);
        } else {
            element.classList.add('animate');
        }
        
        // Stagger animations for grouped elements
        const parent = element.parentElement;
        if (parent.classList.contains('feature-list') || 
            parent.classList.contains('stats-grid') || 
            parent.classList.contains('innovation-grid')) {
            this.staggerChildAnimations(parent);
        }
    }
    
    staggerChildAnimations(parent) {
        const children = parent.querySelectorAll('.fade-in-up');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate');
            }, index * 100);
        });
    }
    
    animateVisualElement(element) {
        const cube = element.querySelector('.floating-cube');
        const frame = element.querySelector('.neon-frame');
        const network = element.querySelector('.network-visualization');
        
        if (cube) {
            cube.style.animation = 'cubeFloat 6s ease-in-out infinite';
        }
        if (frame) {
            frame.style.animation = 'frameRotate 20s linear infinite';
        }
        if (network) {
            const nodes = network.querySelectorAll('.network-node');
            nodes.forEach((node, index) => {
                node.style.animationDelay = `${index}s`;
            });
        }
    }
    
    handleScroll() {
        this.scrollY = window.pageYOffset;
        
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallax();
                this.updateNavigation();
                this.updateScrollIndicator();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateParallax() {
        // Hero section parallax
        const heroGrid = document.querySelector('.hero-grid');
        const floatingParticles = document.querySelector('.floating-particles');
        
        if (heroGrid) {
            const speed = this.scrollY * 0.5;
            heroGrid.style.transform = `translate(${speed * 0.1}px, ${speed * 0.2}px)`;
        }
        
        if (floatingParticles) {
            const speed = this.scrollY * 0.3;
            floatingParticles.style.transform = `translateY(${speed}px)`;
        }
        
        // Visual elements parallax
        const visualElements = document.querySelectorAll('.visual-element');
        visualElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const speed = (window.innerHeight - rect.top) * 0.1;
            const direction = index % 2 === 0 ? 1 : -1;
            
            element.style.transform = `translateY(${speed * direction}px)`;
        });
    }
    
    updateNavigation() {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Update navbar background opacity
        const opacity = Math.min(this.scrollY / 100, 1);
        navbar.style.background = `rgba(10, 10, 10, ${0.8 + (opacity * 0.2)})`;
        
        // Update active nav link
        let activeSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                activeSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === activeSection) {
                link.style.color = '#00ff88';
            } else {
                link.style.color = '#ffffff';
            }
        });
    }
    
    updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(1 - (this.scrollY / 300), 0);
            scrollIndicator.style.opacity = opacity;
        }
    }
}

// Smooth section transitions
class SectionTransitions {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.section');
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        // Smooth scroll to sections
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            this.scrollToSection(targetSection);
        }
    }
    
    handleKeyNavigation(e) {
        if (this.isScrolling) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                this.scrollToNextSection();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.scrollToPrevSection();
                break;
            case 'Home':
                e.preventDefault();
                this.scrollToSection(this.sections[0]);
                break;
            case 'End':
                e.preventDefault();
                this.scrollToSection(this.sections[this.sections.length - 1]);
                break;
        }
    }
    
    scrollToNextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.scrollToSection(this.sections[this.currentSection]);
        }
    }
    
    scrollToPrevSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.scrollToSection(this.sections[this.currentSection]);
        }
    }
    
    scrollToSection(section) {
        this.isScrolling = true;
        
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
        
        // Update current section index
        this.currentSection = Array.from(this.sections).indexOf(section);
    }
}

// Text animation effects
class TextAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypewriterEffect();
        this.setupGlitchEffect();
    }
    
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i > text.length) {
                    clearInterval(typeInterval);
                }
            }, 50);
        });
    }
    
    setupGlitchEffect() {
        const glitchElements = document.querySelectorAll('.neon-text');
        
        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.1) {
                    element.style.textShadow = `
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0px #ff0040,
                        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0px #00ff88,
                        0 0 5px #00ff88,
                        0 0 10px #00ff88,
                        0 0 20px #00ff88,
                        0 0 40px #00ff88
                    `;
                    
                    setTimeout(() => {
                        element.style.textShadow = `
                            0 0 5px #00ff88,
                            0 0 10px #00ff88,
                            0 0 20px #00ff88,
                            0 0 40px #00ff88
                        `;
                    }, 50);
                }
            }, 100);
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Preload critical resources
        this.preloadResources();
        
        // Optimize animations for reduced motion
        this.respectMotionPreferences();
        
        // Lazy load non-critical elements
        this.setupLazyLoading();
        
        // Throttle resize events
        this.setupResizeHandler();
    }
    
    preloadResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
        document.head.appendChild(fontLink);
    }
    
    respectMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }
        
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }
    
    setupLazyLoading() {
        // Lazy load visual elements
        const visualElements = document.querySelectorAll('.visual-element');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        visualElements.forEach(el => observer.observe(el));
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    handleResize() {
        // Recalculate positions and sizes on resize
        const customCursor = new CustomCursor();
        
        // Update mobile cursor behavior
        if (window.innerWidth <= 480) {
            document.body.style.cursor = 'auto';
            document.querySelector('.custom-cursor').style.display = 'none';
        } else {
            document.body.style.cursor = 'none';
            document.querySelector('.custom-cursor').style.display = 'block';
        }
    }
}

// Audio feedback (optional)
class AudioFeedback {
    constructor() {
        this.audioContext = null;
        this.init();
    }
    
    init() {
        // Initialize Web Audio API
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
        }
        
        this.setupAudioTriggers();
    }
    
    setupAudioTriggers() {
        if (!this.audioContext) return;
        
        // Add subtle audio feedback for interactions
        const interactiveElements = document.querySelectorAll('button, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.playTone(800, 0.1, 0.05);
            });
            
            element.addEventListener('click', () => {
                this.playTone(400, 0.2, 0.1);
            });
        });
    }
    
    playTone(frequency, duration, volume = 0.1) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const customCursor = new CustomCursor();
    const scrollAnimations = new ScrollAnimations();
    const sectionTransitions = new SectionTransitions();
    const textAnimations = new TextAnimations();
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Optional audio feedback (uncomment to enable)
    // const audioFeedback = new AudioFeedback();
    
    // Loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">YPIT</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <div class="loading-text">CONNECTING COMMUNITY</div>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    // Add loading screen styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        }
        .loading-content {
            text-align: center;
        }
        .loading-logo {
            font-size: 48px;
            font-weight: 800;
            color: #00ff88;
            margin-bottom: 30px;
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }
        .loading-bar {
            width: 300px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            margin: 0 auto 20px;
            overflow: hidden;
        }
        .loading-progress {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #00ff88, #00d4ff);
            animation: loadingProgress 2s ease-in-out forwards;
        }
        .loading-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            letter-spacing: 2px;
        }
        @keyframes loadingProgress {
            to { width: 100%; }
        }
    `;
    document.head.appendChild(loadingStyles);
    
    // Remove loading screen after animation
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
            loadingStyles.remove();
        }, 500);
    }, 2500);
    
    console.log('🚀 YPIT Community Platform Initialized');
});
