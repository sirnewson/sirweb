/**
 * Pinterest-style Masonry Gallery with Firebase Integration
 * Dynamically loads gallery items from Firebase Firestore
 */

class MasonryGallery {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        this.options = {
            showFilters: options.showFilters !== false,
            categories: options.categories || ['all', 'branding', 'web', 'ai', '3d', 'youtube', 'billboard', 'events'],
            firebaseCollection: options.firebaseCollection || 'gallery',
            enableLightbox: options.enableLightbox !== false,
            ...options
        };

        this.items = [];
        this.currentFilter = 'all';
        this.lightbox = null;

        this.init();
    }

    init() {
        this.createGalleryStructure();
        if (this.options.showFilters) {
            this.createFilters();
        }
        if (this.options.enableLightbox) {
            this.createLightbox();
        }

        // Load items from Firebase or use sample data
        if (this.options.sampleData) {
            this.renderItems(this.options.sampleData);
        } else if (window.firebaseLoaded) {
            this.loadFromFirebase();
        } else {
            this.showLoadingSkeleton();
        }
    }

    createGalleryStructure() {
        const wrapper = document.createElement('div');
        wrapper.className = 'masonry-gallery-container';
        wrapper.innerHTML = `
            ${this.options.title ? `<h2 class="masonry-gallery-title" style="text-align: center; font-size: 2.5rem; color: #E6F0EF; margin-bottom: 2rem; font-family: 'Space Grotesk', sans-serif;">${this.options.title}</h2>` : ''}
            ${this.options.showFilters ? '<div class="masonry-filters"></div>' : ''}
            <div class="masonry-gallery"></div>
        `;
        this.container.appendChild(wrapper);

        this.gallery = wrapper.querySelector('.masonry-gallery');
        if (this.options.showFilters) {
            this.filtersContainer = wrapper.querySelector('.masonry-filters');
        }
    }

    createFilters() {
        const categories = this.options.categories;
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `masonry-filter-btn ${category === 'all' ? 'active' : ''}`;
            btn.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
            btn.dataset.category = category;
            btn.addEventListener('click', () => this.filterItems(category));
            this.filtersContainer.appendChild(btn);
        });
    }

    filterItems(category) {
        this.currentFilter = category;

        // Update active button
        this.filtersContainer.querySelectorAll('.masonry-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        // Filter gallery items
        const items = this.gallery.querySelectorAll('.masonry-item');
        items.forEach((item, index) => {
            const itemCategory = item.dataset.category;
            const shouldShow = category === 'all' || itemCategory === category || itemCategory?.includes(category);

            if (shouldShow) {
                item.style.display = 'block';
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s backwards`;
                }, 10);
            } else {
                item.style.display = 'none';
            }
        });
    }

    renderItems(items) {
        this.items = items;
        this.gallery.innerHTML = '';

        if (items.length === 0) {
            this.showEmptyState();
            return;
        }

        items.forEach((item, index) => {
            const itemEl = this.createItemElement(item, index);
            this.gallery.appendChild(itemEl);
        });
    }

    createItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'masonry-item';
        div.dataset.category = item.category || 'uncategorized';
        div.dataset.index = index;

        const mediaType = item.type || (item.url?.includes('.mp4') || item.url?.includes('.webm') ? 'video' : 'image');
        const mediaHtml = mediaType === 'video'
            ? `<video src="${item.url || item.thumbnail}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`
            : `<img src="${item.url || item.thumbnail}" alt="${item.title || 'Gallery item'}" loading="lazy">`;

        div.innerHTML = `
            ${item.category ? `<span class="masonry-item-category">${item.category}</span>` : ''}
            <div class="masonry-item-media">
                ${mediaHtml}
            </div>
            ${item.title || item.description ? `
                <div class="masonry-item-content">
                    ${item.title ? `<h3 class="masonry-item-title">${item.title}</h3>` : ''}
                    ${item.description ? `<p class="masonry-item-description">${item.description}</p>` : ''}
                    ${item.tags && item.tags.length ? `
                        <div class="masonry-item-tags">
                            ${item.tags.map(tag => `<span class="masonry-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        `;

        if (this.options.enableLightbox) {
            div.addEventListener('click', () => this.openLightbox(item));
        }

        return div;
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'masonry-lightbox';
        this.lightbox.innerHTML = `
            <div class="masonry-lightbox-content">
                <button class="masonry-lightbox-close">&times;</button>
                <div class="masonry-lightbox-media"></div>
            </div>
        `;
        document.body.appendChild(this.lightbox);

        this.lightbox.querySelector('.masonry-lightbox-close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
    }

    openLightbox(item) {
        if (!this.lightbox) return;

        const mediaContainer = this.lightbox.querySelector('.masonry-lightbox-media');
        const mediaType = item.type || (item.url?.includes('.mp4') || item.url?.includes('.webm') ? 'video' : 'image');

        if (mediaType === 'video') {
            mediaContainer.innerHTML = `<video src="${item.url}" controls autoplay></video>`;
        } else {
            mediaContainer.innerHTML = `<img src="${item.url || item.thumbnail}" alt="${item.title || 'Gallery item'}">`;
        }

        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        if (!this.lightbox) return;
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';

        // Stop video if playing
        const video = this.lightbox.querySelector('video');
        if (video) video.pause();
    }

    showLoadingSkeleton() {
        this.gallery.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'masonry-item loading';
            skeleton.style.height = `${200 + Math.random() * 200}px`;
            skeleton.style.background = 'rgba(18, 26, 27, 0.6)';
            this.gallery.appendChild(skeleton);
        }
    }

    showEmptyState() {
        this.gallery.innerHTML = `
            <div class="masonry-empty">
                <div class="masonry-empty-icon">📁</div>
                <p class="masonry-empty-text">No items to display</p>
                <p style="color: #B7C7C4; font-size: 0.95rem;">Gallery items will appear here when uploaded</p>
            </div>
        `;
    }

    async loadFromFirebase() {
        try {
            // Dynamically import Firebase if available
            if (!window.db) {
                console.warn('Firebase not initialized. Showing sample data.');
                this.renderSampleData();
                return;
            }

            const { collection, getDocs, query, orderBy: fbOrderBy } = window;
            const galleryRef = collection(window.db, this.options.firebaseCollection);
            const q = query(galleryRef, fbOrderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);

            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });

            this.renderItems(items);
        } catch (error) {
            console.error('Error loading from Firebase:', error);
            this.renderSampleData();
        }
    }

    renderSampleData() {
        const sampleData = [
            {
                url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
                title: 'Brand Identity Design',
                description: 'Complete brand system for modern tech startup',
                category: 'branding',
                tags: ['Logo', 'Identity', 'Guidelines']
            },
            {
                url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
                title: 'AI-Powered Dashboard',
                description: 'Intelligent analytics platform with predictive insights',
                category: 'ai',
                tags: ['UI/UX', 'AI', 'Dashboard']
            },
            {
                url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
                title: 'E-Commerce Platform',
                description: 'Seamless shopping experience with modern interface',
                category: 'web',
                tags: ['Web Design', 'E-Commerce']
            },
            {
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700',
                title: '3D Product Visualization',
                description: 'Photorealistic 3D renders for product launches',
                category: '3d',
                tags: ['3D', 'Rendering', 'Visualization']
            },
            {
                url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600',
                title: 'Mobile App Interface',
                description: 'Intuitive design for fitness tracking application',
                category: 'web',
                tags: ['Mobile', 'UI', 'App']
            },
            {
                url: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800',
                title: 'YouTube Thumbnail Series',
                description: 'Eye-catching thumbnails that drive clicks',
                category: 'youtube',
                tags: ['YouTube', 'Thumbnails', 'Graphics']
            }
        ];

        this.renderItems(sampleData);
    }

    // Public methods
    addItem(item) {
        this.items.push(item);
        const itemEl = this.createItemElement(item, this.items.length - 1);
        this.gallery.appendChild(itemEl);
    }

    refresh() {
        if (window.firebaseLoaded) {
            this.loadFromFirebase();
        } else {
            this.renderItems(this.items);
        }
    }

    destroy() {
        if (this.lightbox) {
            this.lightbox.remove();
        }
        this.container.innerHTML = '';
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasonryGallery;
}
