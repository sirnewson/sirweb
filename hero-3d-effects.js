// 3D Hover Effects for Hero Content Boxes
// Applies the same effects as thoughts.html blog cards to hero sections

document.addEventListener('DOMContentLoaded', function() {
    const heroContents = document.querySelectorAll('.hero-content');

    heroContents.forEach(heroContent => {
        // Add 3D hover effect with mouse tracking
        heroContent.addEventListener('mousemove', (e) => {
            const rect = heroContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            // Update CSS custom properties for gradient effect
            heroContent.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            heroContent.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            heroContent.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
            `;
        });

        heroContent.addEventListener('mouseleave', () => {
            heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Add enhanced glow effect to all interactive elements on hover
    const glowElements = document.querySelectorAll(
        'a, button, .btn, .service-card, .project-card, .thought-card, .mosaic-item, ' +
        '.brand-logo, .nav-box, .filter-btn, .blog-card, .drift-resource-card, .ai-video-item'
    );

    glowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.boxShadow = `
                0 0 30px rgba(46, 230, 217, 0.6),
                0 0 60px rgba(46, 230, 217, 0.4),
                0 0 90px rgba(46, 230, 217, 0.2)
            `;
        });

        el.addEventListener('mouseleave', () => {
            // Remove inline box-shadow to revert to CSS
            el.style.boxShadow = '';
        });
    });
});
