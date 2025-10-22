// Sir Newson Content API
// This file provides functions to load content from the admin system

class ContentAPI {
    // Get all clients
    static getClients() {
        return JSON.parse(localStorage.getItem('sn_clients') || '[]');
    }

    // Get all posters
    static getPosters() {
        return JSON.parse(localStorage.getItem('sn_posters') || '[]');
    }

    // Get all blog posts/thoughts
    static getThoughts() {
        return JSON.parse(localStorage.getItem('sn_thoughts') || '[]')
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
    }

    // Get all projects
    static getProjects() {
        return JSON.parse(localStorage.getItem('sn_projects') || '[]');
    }

    // Get index page content
    static getIndexContent() {
        return JSON.parse(localStorage.getItem('sn_index_content') || '{"hero":{},"about":{}}');
    }

    // Get specific blog post by slug
    static getThoughtBySlug(slug) {
        const thoughts = this.getThoughts();
        return thoughts.find(t => t.slug === slug);
    }

    // Get recent blog posts (limit)
    static getRecentThoughts(limit = 5) {
        return this.getThoughts().slice(0, limit);
    }

    // Get posters by category
    static getPostersByCategory(category) {
        return this.getPosters().filter(p => p.category === category);
    }

    // Get clients by type
    static getClientsByType(type) {
        return this.getClients().filter(c => c.type === type);
    }
}

// Example usage functions for rendering content

// Render clients grid on clients page
function renderClientsGrid(containerId) {
    const clients = ContentAPI.getClients();
    const container = document.getElementById(containerId);

    if (!container) return;

    if (clients.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No clients to display yet. Add some in the admin dashboard!</p>';
        return;
    }

    container.innerHTML = clients.map(client => `
        <div class="client-card">
            ${client.image ? `<img src="${client.image}" alt="${client.name}">` : ''}
            <h3>${client.name}</h3>
            <p class="client-type">${client.type}</p>
            ${client.description ? `<p>${client.description}</p>` : ''}
            ${client.website ? `<a href="${client.website}" target="_blank" class="client-link">Visit Website</a>` : ''}
        </div>
    `).join('');
}

// Render poster gallery
function renderPosterGallery(containerId) {
    const posters = ContentAPI.getPosters();
    const container = document.getElementById(containerId);

    if (!container) return;

    if (posters.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No posters to display yet. Add some in the admin dashboard!</p>';
        return;
    }

    container.innerHTML = posters.map(poster => `
        <div class="poster-item">
            <img src="${poster.image}" alt="${poster.title}" loading="lazy">
            <div class="poster-overlay">
                <h3>${poster.title}</h3>
                <p>${poster.category} • ${poster.year}</p>
            </div>
        </div>
    `).join('');
}

// Render blog posts grid on thoughts page
function renderThoughtsGrid(containerId) {
    const thoughts = ContentAPI.getRecentThoughts(20);
    const container = document.getElementById(containerId);

    if (!container) return;

    if (thoughts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No blog posts yet. Create your first post in the admin dashboard!</p>';
        return;
    }

    container.innerHTML = thoughts.map(thought => `
        <div class="thought-card">
            ${thought.image ? `<img src="${thought.image}" alt="${thought.title}" class="thought-image">` : ''}
            <div class="thought-content">
                <span class="thought-category">${thought.category}</span>
                <h3>${thought.title}</h3>
                <p>${thought.excerpt}</p>
                <div class="thought-meta">
                    <span><i class="fas fa-calendar"></i> ${new Date(thought.date).toLocaleDateString()}</span>
                    <span><i class="fas fa-clock"></i> ${thought.readTime} min read</span>
                </div>
                <a href="${thought.slug}.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// Render projects on index page
function renderProjectsSection(containerId) {
    const projects = ContentAPI.getProjects();
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                ${project.status === 'live' ? '<span class="status-badge">LIVE</span>' : ''}
                <span class="project-category">${project.category}</span>
            </div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>` : ''}
        </div>
    `).join('');
}

// Update index page content
function updateIndexContent() {
    const content = ContentAPI.getIndexContent();

    // Update hero section
    if (content.hero && content.hero.title) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');

        if (heroTitle) heroTitle.innerHTML = content.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = content.hero.subtitle;
    }

    // Update about section
    if (content.about) {
        const aboutTexts = document.querySelectorAll('.about-text p');
        if (aboutTexts[0] && content.about.p1) aboutTexts[0].textContent = content.about.p1;
        if (aboutTexts[1] && content.about.p2) aboutTexts[1].textContent = content.about.p2;
        if (aboutTexts[2] && content.about.p3) aboutTexts[2].textContent = content.about.p3;

        if (content.about.image) {
            const aboutImage = document.querySelector('.about-image img');
            if (aboutImage) aboutImage.src = content.about.image;
        }
    }
}

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
    // Auto-detect which page we're on and load appropriate content
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'index.html' || currentPage === '') {
        updateIndexContent();
        // Check if there's a projects container to populate
        const projectsContainer = document.getElementById('dynamicProjects');
        if (projectsContainer) {
            renderProjectsSection('dynamicProjects');
        }
    } else if (currentPage === 'clients.html') {
        renderClientsGrid('clientsGrid');
        renderPosterGallery('postersGallery');
    } else if (currentPage === 'thoughts.html') {
        renderThoughtsGrid('thoughtsGrid');
    }
});
