// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Log to confirm DOM is loaded
    // Function to get all jpg files from the assets/images directory
    async function getGalleryImages() {
        return [
            '2000_6139285d81ea5.jpg',
            '2000_6139285d89e79.jpg',
            '2000_6139285d8b288.jpg',
            '2000_6139285d928d6.jpg',
            '2000_6139285d9d457.jpg',
            '2000_6139285da1b6b.jpg',
            '2000_6139285da1c70.jpg',
            '2000_6139285e13f6e.jpg',
            '2000_6139285e28a88.jpg',
            '2000_6139285e67b60.jpg',
            '2000_6139285e7b3b4.jpg',
            '2000_6139285e7e1e8.jpg',
            '2000_6139285e88c28.jpg',
            '2000_6139285ea164a.jpg',
            '2000_6139285ea6887.jpg',
            '2000_6139285eb867e.jpg',
            '2000_6139285ec28cb.jpg',
            '2000_6139285eef27d.jpg',
            '2000_61522a9a4e1f4.jpg',
            'Anna.jpg',
            'Christ1.jpg',
            'Christ2.jpg',
            'Christ_medium.jpg',
            'Christ_mini.jpg',
            'Christ_small.jpg',
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
    }

    // Load and display the images
    async function loadGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) {
            console.error('Gallery grid element not found');
            return;
        }
        
        try {
            galleryGrid.innerHTML = '<p class="loading">Loading images...</p>';
            const images = await getGalleryImages();
            galleryGrid.innerHTML = ''; // Clear existing images
            console.log('Images to load:', images);

            if (images.length === 0) {
                galleryGrid.innerHTML = '<p>No images available.</p>';
                return;
            }

            images.forEach(filename => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';

                const img = document.createElement('img');
                img.loading = 'lazy';
                img.src = `assets/images/${filename}`;
                img.alt = filename.replace('.jpg', '').replace(/-/g, ' ');
                img.onerror = function() {
                    console.error('Error loading image:', img.src);
                    galleryItem.textContent = 'Image not found';
                };

                galleryItem.appendChild(img);
                galleryGrid.appendChild(galleryItem);
            });
        } catch (error) {
            console.error('Failed to load gallery:', error);
            galleryGrid.innerHTML = '<p>Failed to load images.</p>';
        }
    }

    // Initialize gallery
    loadGallery();
});
<section id="gallery" class="gallery">
    <h2>Gallery of Work</h2>
    <div class="gallery-container">
        <div class="gallery-grid">
            <!-- Images will be loaded dynamically via JavaScript -->
        </div>
    </div>
</section>