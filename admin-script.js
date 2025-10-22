// Sir Newson Admin Dashboard - Content Management System
// Local Storage Database Implementation

class ContentManager {
    constructor() {
        this.initializeStorage();
        this.initializeEventListeners();
        this.updateDashboard();
        this.loadContent();
    }

    // Initialize local storage structure
    initializeStorage() {
        if (!localStorage.getItem('sn_clients')) {
            localStorage.setItem('sn_clients', JSON.stringify([]));
        }
        if (!localStorage.getItem('sn_posters')) {
            localStorage.setItem('sn_posters', JSON.stringify([]));
        }
        if (!localStorage.getItem('sn_thoughts')) {
            localStorage.setItem('sn_thoughts', JSON.stringify([]));
        }
        if (!localStorage.getItem('sn_projects')) {
            localStorage.setItem('sn_projects', JSON.stringify([]));
        }
        if (!localStorage.getItem('sn_index_content')) {
            localStorage.setItem('sn_index_content', JSON.stringify({
                hero: {},
                about: {}
            }));
        }
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                if (section) {
                    this.switchSection(section);
                }
            });
        });

        // Form submissions
        document.getElementById('clientForm').addEventListener('submit', (e) => this.handleClientSubmit(e));
        document.getElementById('posterForm').addEventListener('submit', (e) => this.handlePosterSubmit(e));
        document.getElementById('thoughtForm').addEventListener('submit', (e) => this.handleThoughtSubmit(e));
        document.getElementById('projectForm').addEventListener('submit', (e) => this.handleProjectSubmit(e));
        document.getElementById('heroForm').addEventListener('submit', (e) => this.handleHeroSubmit(e));
        document.getElementById('aboutForm').addEventListener('submit', (e) => this.handleAboutSubmit(e));
    }

    // Section navigation
    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Show alert messages
    showAlert(section, message, type = 'success') {
        const alertEl = document.getElementById(`${section}Alert`);
        alertEl.className = `alert alert-${type} show`;
        alertEl.textContent = message;

        setTimeout(() => {
            alertEl.classList.remove('show');
        }, 5000);
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Generate URL-friendly slug
    generateSlug(title) {
        return title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    // ========== CLIENT MANAGEMENT ==========
    handleClientSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const client = {
            id: this.generateId(),
            name: formData.get('clientName'),
            type: formData.get('clientType'),
            description: formData.get('clientDescription'),
            image: formData.get('clientImage'),
            website: formData.get('clientWebsite'),
            year: formData.get('clientYear'),
            createdAt: new Date().toISOString()
        };

        const clients = this.getClients();
        clients.push(client);
        localStorage.setItem('sn_clients', JSON.stringify(clients));

        this.showAlert('clients', 'Client added successfully!');
        e.target.reset();
        this.renderClientsList();
        this.updateDashboard();
        this.logActivity('Added new client', client.name);
    }

    getClients() {
        return JSON.parse(localStorage.getItem('sn_clients') || '[]');
    }

    renderClientsList() {
        const clients = this.getClients();
        const list = document.getElementById('clientsList');

        if (clients.length === 0) {
            list.innerHTML = '<li class="content-item"><div class="content-item-info"><p style="color: var(--text-secondary);">No clients added yet</p></div></li>';
            return;
        }

        list.innerHTML = clients.map(client => `
            <li class="content-item">
                <div class="content-item-info">
                    <h4>${client.name}</h4>
                    <p>${client.type} • ${client.year || 'N/A'}</p>
                </div>
                <div class="content-item-actions">
                    <button class="btn-icon" style="background: var(--danger);" onclick="contentManager.deleteClient('${client.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    deleteClient(id) {
        if (!confirm('Are you sure you want to delete this client?')) return;

        let clients = this.getClients();
        clients = clients.filter(c => c.id !== id);
        localStorage.setItem('sn_clients', JSON.stringify(clients));

        this.renderClientsList();
        this.updateDashboard();
        this.showAlert('clients', 'Client deleted successfully!');
    }

    // ========== POSTER MANAGEMENT ==========
    handlePosterSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const poster = {
            id: this.generateId(),
            title: formData.get('posterTitle'),
            category: formData.get('posterCategory'),
            year: formData.get('posterYear'),
            description: formData.get('posterDescription'),
            image: formData.get('posterImage'),
            tags: formData.get('posterTags').split(',').map(t => t.trim()).filter(t => t),
            createdAt: new Date().toISOString()
        };

        const posters = this.getPosters();
        posters.push(poster);
        localStorage.setItem('sn_posters', JSON.stringify(posters));

        this.showAlert('posters', 'Poster added successfully!');
        e.target.reset();
        this.renderPostersList();
        this.updateDashboard();
        this.logActivity('Added new poster', poster.title);
    }

    getPosters() {
        return JSON.parse(localStorage.getItem('sn_posters') || '[]');
    }

    renderPostersList() {
        const posters = this.getPosters();
        const list = document.getElementById('postersList');

        if (posters.length === 0) {
            list.innerHTML = '<li class="content-item"><div class="content-item-info"><p style="color: var(--text-secondary);">No posters added yet</p></div></li>';
            return;
        }

        list.innerHTML = posters.map(poster => `
            <li class="content-item">
                <div class="content-item-info">
                    <h4>${poster.title}</h4>
                    <p>${poster.category} • ${poster.year || 'N/A'}</p>
                </div>
                <div class="content-item-actions">
                    <button class="btn-icon" style="background: var(--danger);" onclick="contentManager.deletePoster('${poster.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    deletePoster(id) {
        if (!confirm('Are you sure you want to delete this poster?')) return;

        let posters = this.getPosters();
        posters = posters.filter(p => p.id !== id);
        localStorage.setItem('sn_posters', JSON.stringify(posters));

        this.renderPostersList();
        this.updateDashboard();
        this.showAlert('posters', 'Poster deleted successfully!');
    }

    // ========== BLOG POST MANAGEMENT ==========
    handleThoughtSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const thought = {
            id: this.generateId(),
            title: formData.get('thoughtTitle'),
            slug: this.generateSlug(formData.get('thoughtTitle')),
            category: formData.get('thoughtCategory'),
            readTime: formData.get('thoughtReadTime') || '5',
            image: formData.get('thoughtImage'),
            excerpt: formData.get('thoughtExcerpt'),
            content: formData.get('thoughtContent'),
            tags: formData.get('thoughtTags').split(',').map(t => t.trim()).filter(t => t),
            date: formData.get('thoughtDate') || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };

        // Save to storage
        const thoughts = this.getThoughts();
        thoughts.push(thought);
        localStorage.setItem('sn_thoughts', JSON.stringify(thoughts));

        // Generate HTML file
        this.generateBlogPostHTML(thought);

        this.showAlert('thoughts', 'Blog post created successfully! HTML file generated.');
        e.target.reset();
        this.renderThoughtsList();
        this.updateDashboard();
        this.logActivity('Created blog post', thought.title);
    }

    getThoughts() {
        return JSON.parse(localStorage.getItem('sn_thoughts') || '[]');
    }

    generateBlogPostHTML(thought) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${thought.title} - Sir Newson</title>
    <meta name="description" content="${thought.excerpt}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            --primary: #FF6B35;
            --primary-light: #FF8C61;
            --neutral-black: #0A0A0A;
            --neutral-dark: #121212;
            --neutral-medium: #1A1A1A;
            --text-primary: #FFFFFF;
            --text-secondary: #A0A0A0;
            --border-subtle: #2A2A2A;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--neutral-black);
            color: var(--text-primary);
            line-height: 1.8;
        }

        .cinema-container {
            padding: 100px;
            min-height: 100vh;
            background: var(--neutral-black);
        }

        @media (max-width: 1200px) {
            .cinema-container { padding: 60px; }
        }

        @media (max-width: 768px) {
            .cinema-container { padding: 20px; }
        }

        /* Navigation */
        .nav-box {
            position: fixed;
            top: 2rem;
            left: 2rem;
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-subtle);
            border-radius: 20px;
            padding: 1.5rem;
            z-index: 10002;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-box:hover {
            border-color: var(--primary);
        }

        .hamburger {
            width: 28px;
            height: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
        }

        .hamburger span {
            display: block;
            width: 100%;
            height: 1px;
            background: var(--text-primary);
            transition: all 0.4s ease-in-out;
        }

        /* Article */
        article {
            max-width: 800px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }

        .article-meta {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-subtle);
            flex-wrap: wrap;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .meta-item i {
            color: var(--primary);
        }

        .category-badge {
            display: inline-block;
            padding: 0.3rem 1rem;
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid var(--primary);
            border-radius: 20px;
            color: var(--primary);
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(2rem, 5vw, 3.5rem);
            line-height: 1.2;
            margin-bottom: 1.5rem;
            color: var(--text-primary);
        }

        .featured-image {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
            border-radius: 20px;
            margin: 2rem 0;
        }

        .article-content {
            font-size: 1.1rem;
            line-height: 1.9;
        }

        .article-content p {
            margin-bottom: 1.5rem;
        }

        .article-content h2,
        .article-content h3 {
            font-family: 'Space Grotesk', sans-serif;
            margin: 2.5rem 0 1rem;
            color: var(--primary);
        }

        .article-content ul,
        .article-content ol {
            margin-left: 2rem;
            margin-bottom: 1.5rem;
        }

        .article-content li {
            margin-bottom: 0.5rem;
        }

        .article-content blockquote {
            border-left: 4px solid var(--primary);
            padding-left: 2rem;
            margin: 2rem 0;
            font-style: italic;
            color: var(--text-secondary);
        }

        .tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-subtle);
        }

        .tag {
            padding: 0.5rem 1rem;
            background: var(--neutral-medium);
            border-radius: 10px;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            margin-top: 3rem;
            transition: gap 0.3s ease;
        }

        .back-link:hover {
            gap: 1rem;
        }
    </style>
</head>
<body>
    <div class="cinema-container">
        <a href="index.html" class="nav-box">
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </a>

        <article>
            <span class="category-badge">${thought.category}</span>

            <h1>${thought.title}</h1>

            <div class="article-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${new Date(thought.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${thought.readTime} min read</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>Sir Newson</span>
                </div>
            </div>

            ${thought.image ? `<img src="${thought.image}" alt="${thought.title}" class="featured-image">` : ''}

            <div class="article-content">
                ${thought.content}
            </div>

            ${thought.tags.length > 0 ? `
            <div class="tags">
                ${thought.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            ` : ''}

            <a href="thoughts.html" class="back-link">
                <i class="fas fa-arrow-left"></i>
                Back to all thoughts
            </a>
        </article>
    </div>
</body>
</html>`;

        // Download the HTML file
        this.downloadFile(`${thought.slug}.html`, html);
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    renderThoughtsList() {
        const thoughts = this.getThoughts();
        const list = document.getElementById('thoughtsList');

        if (thoughts.length === 0) {
            list.innerHTML = '<li class="content-item"><div class="content-item-info"><p style="color: var(--text-secondary);">No blog posts created yet</p></div></li>';
            return;
        }

        list.innerHTML = thoughts.map(thought => `
            <li class="content-item">
                <div class="content-item-info">
                    <h4>${thought.title}</h4>
                    <p>${thought.category} • ${thought.readTime} min read • ${new Date(thought.date).toLocaleDateString()}</p>
                    <p style="font-size: 0.85rem; margin-top: 0.5rem;">File: ${thought.slug}.html</p>
                </div>
                <div class="content-item-actions">
                    <button class="btn-icon" style="background: var(--primary);" onclick="contentManager.regeneratePost('${thought.id}')" title="Regenerate HTML">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="btn-icon" style="background: var(--danger);" onclick="contentManager.deleteThought('${thought.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    regeneratePost(id) {
        const thoughts = this.getThoughts();
        const thought = thoughts.find(t => t.id === id);
        if (thought) {
            this.generateBlogPostHTML(thought);
            this.showAlert('thoughts', 'Blog post HTML regenerated!');
        }
    }

    deleteThought(id) {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        let thoughts = this.getThoughts();
        thoughts = thoughts.filter(t => t.id !== id);
        localStorage.setItem('sn_thoughts', JSON.stringify(thoughts));

        this.renderThoughtsList();
        this.updateDashboard();
        this.showAlert('thoughts', 'Blog post deleted successfully!');
    }

    // ========== PROJECT MANAGEMENT ==========
    handleProjectSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const project = {
            id: this.generateId(),
            name: formData.get('projectName'),
            category: formData.get('projectCategory'),
            status: formData.get('projectStatus'),
            description: formData.get('projectDescription'),
            tech: formData.get('projectTech').split(',').map(t => t.trim()).filter(t => t),
            url: formData.get('projectUrl'),
            year: formData.get('projectYear'),
            createdAt: new Date().toISOString()
        };

        const projects = this.getProjects();
        projects.push(project);
        localStorage.setItem('sn_projects', JSON.stringify(projects));

        this.showAlert('projects', 'Project added successfully!');
        e.target.reset();
        this.updateDashboard();
        this.logActivity('Added new project', project.name);
    }

    getProjects() {
        return JSON.parse(localStorage.getItem('sn_projects') || '[]');
    }

    // ========== INDEX CONTENT ==========
    handleHeroSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const content = JSON.parse(localStorage.getItem('sn_index_content'));

        content.hero = {
            title: formData.get('heroTitle'),
            subtitle: formData.get('heroSubtitle')
        };

        localStorage.setItem('sn_index_content', JSON.stringify(content));
        this.showAlert('index', 'Hero section updated successfully!');
        this.logActivity('Updated hero section');
    }

    handleAboutSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const content = JSON.parse(localStorage.getItem('sn_index_content'));

        content.about = {
            p1: formData.get('aboutP1'),
            p2: formData.get('aboutP2'),
            p3: formData.get('aboutP3'),
            image: formData.get('aboutImage')
        };

        localStorage.setItem('sn_index_content', JSON.stringify(content));
        this.showAlert('index', 'About section updated successfully!');
        this.logActivity('Updated about section');
    }

    // ========== DASHBOARD ==========
    updateDashboard() {
        document.getElementById('totalPosts').textContent = this.getThoughts().length;
        document.getElementById('totalClients').textContent = this.getClients().length;
        document.getElementById('totalPosters').textContent = this.getPosters().length;
        document.getElementById('totalProjects').textContent = this.getProjects().length;
    }

    logActivity(action, details = '') {
        const activities = JSON.parse(localStorage.getItem('sn_activities') || '[]');
        activities.unshift({
            action,
            details,
            timestamp: new Date().toISOString()
        });

        // Keep only last 10 activities
        activities.splice(10);
        localStorage.setItem('sn_activities', JSON.stringify(activities));
        this.renderRecentActivity();
    }

    renderRecentActivity() {
        const activities = JSON.parse(localStorage.getItem('sn_activities') || '[]');
        const list = document.getElementById('recentActivity');

        if (activities.length === 0) {
            list.innerHTML = '<li class="content-item"><div class="content-item-info"><p style="color: var(--text-secondary);">No recent activity</p></div></li>';
            return;
        }

        list.innerHTML = activities.map(activity => `
            <li class="content-item">
                <div class="content-item-info">
                    <h4>${activity.action}</h4>
                    <p>${activity.details} • ${new Date(activity.timestamp).toLocaleString()}</p>
                </div>
            </li>
        `).join('');
    }

    // ========== LOAD CONTENT ==========
    loadContent() {
        this.renderClientsList();
        this.renderPostersList();
        this.renderThoughtsList();
        this.renderRecentActivity();
    }
}

// Data Export/Import functions
function exportData() {
    const data = {
        clients: JSON.parse(localStorage.getItem('sn_clients') || '[]'),
        posters: JSON.parse(localStorage.getItem('sn_posters') || '[]'),
        thoughts: JSON.parse(localStorage.getItem('sn_thoughts') || '[]'),
        projects: JSON.parse(localStorage.getItem('sn_projects') || '[]'),
        indexContent: JSON.parse(localStorage.getItem('sn_index_content') || '{}'),
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sirnewson-content-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Data exported successfully!');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (confirm('This will replace all existing data. Continue?')) {
                localStorage.setItem('sn_clients', JSON.stringify(data.clients || []));
                localStorage.setItem('sn_posters', JSON.stringify(data.posters || []));
                localStorage.setItem('sn_thoughts', JSON.stringify(data.thoughts || []));
                localStorage.setItem('sn_projects', JSON.stringify(data.projects || []));
                localStorage.setItem('sn_index_content', JSON.stringify(data.indexContent || {}));

                alert('Data imported successfully! Refreshing page...');
                location.reload();
            }
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (!confirm('Are you ABSOLUTELY sure? This will delete ALL content permanently!')) return;
    if (!confirm('Last chance! This action cannot be undone!')) return;

    localStorage.removeItem('sn_clients');
    localStorage.removeItem('sn_posters');
    localStorage.removeItem('sn_thoughts');
    localStorage.removeItem('sn_projects');
    localStorage.removeItem('sn_index_content');
    localStorage.removeItem('sn_activities');

    alert('All data cleared! Refreshing page...');
    location.reload();
}

// Initialize the content manager
const contentManager = new ContentManager();
