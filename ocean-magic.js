// 🌊 OCEAN MAGIC - Water Ripple & Marine Effects
// Creates an immersive underwater creative paradise

class OceanMagic {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.ripples = [];
        this.init();
    }

    init() {
        // Create ripple canvas
        this.createRippleCanvas();

        // Initialize click ripples
        this.initClickRipples();

        // Initialize hover glow effects
        this.initHoverGlow();

        // Add whale cursor
        this.initWhaleCursor();

        // Place only fish (swimming right)
        this.placeFish();

        // Add underwater atmosphere
        this.addUnderwaterEffects();

        // Add floating bubbles
        this.createBubbles();
    }

    createRippleCanvas() {
        // Create canvas for water ripples
        const canvas = document.createElement('canvas');
        canvas.id = 'ripple-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
            mix-blend-mode: screen;
            opacity: 0.6;
        `;

        document.body.prepend(canvas);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Start animation loop
        this.animateRipples();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initClickRipples() {
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY, 100, 1.5);
        });

        // Also create ripples on hover over interactive elements
        document.querySelectorAll('a, button, .btn, .service-card, .nav-box, .ai-video-item, .drift-resource-card').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const rect = el.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                this.createRipple(x, y, 50, 1);
            });
        });
    }

    createRipple(x, y, maxRadius = 100, speed = 1) {
        this.ripples.push({
            x,
            y,
            radius: 0,
            maxRadius,
            speed,
            alpha: 1
        });
    }

    animateRipples() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw ripples
        this.ripples = this.ripples.filter(ripple => {
            ripple.radius += ripple.speed;
            ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);

            if (ripple.radius < ripple.maxRadius) {
                // Draw ripple with gradient - ocean colors
                const gradient = this.ctx.createRadialGradient(
                    ripple.x, ripple.y, ripple.radius - 10,
                    ripple.x, ripple.y, ripple.radius
                );

                // Tropical Tech+ palette: Aqua Mint, Orchid Purple, Sunset Orange
                gradient.addColorStop(0, `rgba(46, 230, 217, ${ripple.alpha * 0.7})`);
                gradient.addColorStop(0.5, `rgba(162, 89, 255, ${ripple.alpha * 0.8})`);
                gradient.addColorStop(1, `rgba(226, 106, 44, ${ripple.alpha * 0.5})`);

                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 4;
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                this.ctx.stroke();

                return true;
            }
            return false;
        });

        requestAnimationFrame(() => this.animateRipples());
    }

    initHoverGlow() {
        // Add glow and scale effect on hover
        const glowElements = document.querySelectorAll(
            '.service-card, .project-card, .btn, .brand-logo, .nav-box, .ai-video-item, .drift-resource-card'
        );

        glowElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.boxShadow = `
                    0 0 30px rgba(46, 230, 217, 0.8),
                    0 0 60px rgba(162, 89, 255, 0.6),
                    0 0 90px rgba(226, 106, 44, 0.4)
                `;
                el.style.transform = 'scale(1.05)';
                el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            el.addEventListener('mouseleave', () => {
                el.style.boxShadow = '';
                el.style.transform = 'scale(1)';
            });
        });
    }

    initWhaleCursor() {
        // Replace default cursor with whale
        const style = document.createElement('style');
        style.textContent = `
            body {
                cursor: url('https://i.pinimg.com/originals/7d/a0/fa/7da0fa1c2a3e9e1ae4a897791cebfd0a.gif'), auto !important;
            }

            a, button, .btn, .clickable {
                cursor: url('https://i.pinimg.com/originals/7d/a0/fa/7da0fa1c2a3e9e1ae4a897791cebfd0a.gif'), pointer !important;
            }
        `;
        document.head.appendChild(style);

        // Hide the custom cursor elements since we're using image cursor
        const customCursor = document.querySelector('.cursor');
        const customFollower = document.querySelector('.cursor-follower');
        if (customCursor) customCursor.style.display = 'none';
        if (customFollower) customFollower.style.display = 'none';
    }

    placeFish() {
        // Swimming fish - all swim to the right
        const fishGifs = [
            'https://i.pinimg.com/originals/66/94/b3/6694b3076508b8e9229c378efa5d66d7.gif',
            'https://i.pinimg.com/originals/d8/f1/0e/d8f10e9361fd3006f48e524642ce3b0b.gif',
            'https://i.pinimg.com/originals/ae/a1/b6/aea1b61515cf987787c90b67ccc8a62c.gif',
            'https://i.pinimg.com/originals/2d/64/40/2d6440dd3e31bef462a98df769dfd724.gif',
            'https://i.pinimg.com/originals/f3/df/30/f3df30eebed6bf16b6365eae64db3bc3.gif'
        ];

        // Place fish swimming to the right (flipped to face right)
        fishGifs.forEach((gif, index) => {
            const fish = document.createElement('img');
            fish.src = gif;
            const size = 60 + Math.random() * 40;
            fish.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: auto;
                z-index: 3;
                pointer-events: auto;
                cursor: pointer;
                animation: swimRight ${15 + index * 3}s linear infinite;
                top: ${15 + index * 16}%;
                opacity: 1;
                filter: brightness(1.1) contrast(1.2) saturate(1.3);
                transform: scaleX(-1);
                drop-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
            `;

            // Make fish clickable - swim away fast on click
            fish.addEventListener('click', function(e) {
                e.stopPropagation();

                // Remove current animation
                this.style.animation = 'none';

                // Swim away super fast in a random direction
                const directions = ['swimAwayRight', 'swimAwayLeft', 'swimAwayUp', 'swimAwayDown'];
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];

                // Apply fast swim away animation
                this.style.animation = `${randomDirection} 0.8s ease-out forwards`;

                // Remove fish after animation
                setTimeout(() => {
                    this.remove();

                    // Respawn a new fish after 3 seconds
                    setTimeout(() => {
                        this.placeFish();
                    }.bind(this), 3000);
                }, 800);
            });

            // Hover effect - fish gets slightly bigger
            fish.addEventListener('mouseenter', function() {
                this.style.transform = 'scaleX(-1.1) scaleY(1.1)';
            });

            fish.addEventListener('mouseleave', function() {
                this.style.transform = 'scaleX(-1)';
            });

            document.body.appendChild(fish);
        });

        // Add CSS animation for fish swimming right
        const animStyle = document.createElement('style');
        animStyle.textContent = `
            @keyframes swimRight {
                0% {
                    left: -120px;
                }
                100% {
                    left: calc(100% + 120px);
                }
            }

            @keyframes swimAwayRight {
                0% {
                    transform: scaleX(-1) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scaleX(-1) scale(0.3) translateX(800px);
                    opacity: 0;
                }
            }

            @keyframes swimAwayLeft {
                0% {
                    transform: scaleX(-1) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scaleX(1) scale(0.3) translateX(-800px);
                    opacity: 0;
                }
            }

            @keyframes swimAwayUp {
                0% {
                    transform: scaleX(-1) scale(1) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scaleX(-1) scale(0.3) translateY(-800px) rotate(-20deg);
                    opacity: 0;
                }
            }

            @keyframes swimAwayDown {
                0% {
                    transform: scaleX(-1) scale(1) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scaleX(-1) scale(0.3) translateY(800px) rotate(20deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(animStyle);
    }

    addUnderwaterEffects() {
        // Create underwater color overlay
        const overlay = document.createElement('div');
        overlay.id = 'underwater-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: radial-gradient(
                ellipse at 50% 30%,
                rgba(46, 230, 217, 0.08) 0%,
                rgba(162, 89, 255, 0.05) 30%,
                rgba(15, 43, 46, 0.15) 70%,
                rgba(15, 43, 46, 0.25) 100%
            );
            animation: underwaterPulse 8s ease-in-out infinite;
        `;
        document.body.prepend(overlay);

        // Add animation for underwater effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes underwaterPulse {
                0%, 100% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.02);
                }
            }

            @keyframes bubbleFloat {
                0% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) translateX(30px) scale(1.5);
                    opacity: 0;
                }
            }

            @keyframes bubbleSway {
                0%, 100% {
                    transform: translateX(0);
                }
                50% {
                    transform: translateX(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    createBubbles() {
        // Create bubble container
        const bubbleContainer = document.createElement('div');
        bubbleContainer.id = 'bubble-container';
        bubbleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            overflow: hidden;
        `;
        document.body.prepend(bubbleContainer);

        // Create continuous bubbles
        setInterval(() => {
            if (Math.random() > 0.3) {
                this.createSingleBubble();
            }
        }, 800);

        // Create initial bubbles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createSingleBubble(), i * 400);
        }
    }

    createSingleBubble() {
        const bubble = document.createElement('div');
        const size = 5 + Math.random() * 20;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 7;
        const delay = Math.random() * 2;

        bubble.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%,
                rgba(255, 255, 255, 0.9),
                rgba(46, 230, 217, 0.6),
                rgba(162, 89, 255, 0.3)
            );
            border-radius: 50%;
            animation: bubbleFloat ${duration}s ease-in ${delay}s,
                       bubbleSway ${duration * 0.5}s ease-in-out ${delay}s infinite;
            box-shadow:
                inset 0 -2px 4px rgba(255, 255, 255, 0.5),
                0 2px 10px rgba(46, 230, 217, 0.4);
            filter: blur(0.5px);
        `;

        const bubbleContainer = document.getElementById('bubble-container');
        if (bubbleContainer) {
            bubbleContainer.appendChild(bubble);

            // Remove bubble after animation
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, (duration + delay) * 1000);
        }
    }
}

// Initialize ocean magic when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.oceanMagic = new OceanMagic();
    });
} else {
    window.oceanMagic = new OceanMagic();
}
