// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form modal
    const modal = document.getElementById('contact-modal');
    const emailButton = document.getElementById('email-button');
    const closeButton = document.querySelector('.close');
    const contactForm = document.getElementById('contact-form');

    emailButton.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Here you would typically send the form data to a server
        // For now, we'll simulate a submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });

    // Load and display the images with fade-in effect
    async function loadGallery() {
        console.log('Starting gallery load...');
        const galleryGrid = document.querySelector('.gallery-grid');
        
        if (!galleryGrid) {
            console.error('Gallery grid element not found');
            return;
        }

        try {
            galleryGrid.innerHTML = '<p class="loading">Loading images...</p>';
            
            // Get list of images from directory
            const images = [
                'Anna.jpg',
                'Christ1.jpg',
                'Christ2.jpg',
                'Christ_medium.jpg',
                'Chrysostom.jpg',
                'Elias.jpg',
                'Geoffery.jpg',
                'Good Shep.jpg',
                'Irene.jpg',
                'Joshua.jpg',
                'Mark&Tarasios.jpg',
                'Nektarios2.jpg',
                'Nicholas.jpg',
                'Paul.jpg',
                'Romanos.jpg',
                'Theotokos.jpg'
            ];

            console.log(`Found ${images.length} images to load`);
            galleryGrid.innerHTML = '';

            if (images.length === 0) {
                galleryGrid.innerHTML = '<p>No images available.</p>';
                return;
            }

            const loadImage = (filename) => {
                return new Promise((resolve) => {
                    console.log(`Loading image: ${filename}`);
                    const img = new Image();
                    
                    img.onload = () => {
                        console.log(`Successfully loaded: ${filename}`);
                        resolve(img);
                    };
                    
                    img.onerror = (error) => {
                        console.error(`Error loading image: ${filename}`, error);
                        resolve(null);
                    };
                    
                    img.src = `assets/images/${filename}`;
                });
            };

            // Load images in batches of 4 for better performance
            const batchSize = 4;
            for (let i = 0; i < images.length; i += batchSize) {
                const batch = images.slice(i, i + batchSize);
                console.log(`Loading batch ${i/batchSize + 1}:`, batch);
                
                const loadedImages = await Promise.all(batch.map(loadImage));
                
                loadedImages.forEach((img, index) => {
                    if (img) {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        
                        const imgElement = document.createElement('img');
                        imgElement.src = img.src;
                        imgElement.alt = batch[index].replace('.jpg', '').replace(/-/g, ' ');
                        imgElement.loading = 'lazy';
                        
                        galleryItem.appendChild(imgElement);
                        galleryGrid.appendChild(galleryItem);
                        
                        // Trigger reflow for animation
                        void galleryItem.offsetWidth;
                        galleryItem.style.opacity = '1';
                        console.log(`Added image to gallery: ${batch[index]}`);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load gallery:', error);
            galleryGrid.innerHTML = '<p>Failed to load images.</p>';
        }
    }

    // Initialize gallery
    loadGallery();
});