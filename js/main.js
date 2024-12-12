// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Update time display
    const timeDisplay = document.querySelector('.time-display');
    const currentTime = new Date('2024-12-12T12:15:33-06:00');
    timeDisplay.textContent = currentTime.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short'
    });

    // Navigation scroll behavior
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.style.transform = 'translateY(-100%)';
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.style.transform = 'translateY(0)';
            nav.classList.remove('scroll-down');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery image loading with fade-in animation
    const galleryGrid = document.querySelector('.gallery-grid');
    const imageUrls = [
        // Main icons
        'assets/images/Christ1.jpg',
        'assets/images/Christ2.jpg',
        'assets/images/Christ_medium.jpg',
        'assets/images/Christ_small.jpg',
        'assets/images/Theotokos.jpg',
        'assets/images/Nicholas.jpg',
        // Additional images
        'assets/images/2000_6139285d81ea5.jpg',
        'assets/images/2000_6139285d89e79.jpg',
        'assets/images/2000_6139285d8b288.jpg',
        'assets/images/2000_6139285d928d6.jpg',
        'assets/images/2000_6139285d9d457.jpg',
        'assets/images/2000_6139285da1b6b.jpg',
        'assets/images/2000_6139285da1c70.jpg',
        'assets/images/2000_6139285e13f6e.jpg',
        'assets/images/2000_6139285e28a88.jpg',
        'assets/images/2000_6139285e67b60.jpg',
        'assets/images/2000_6139285e7b3b4.jpg',
        'assets/images/2000_6139285e7e1e8.jpg',
        'assets/images/2000_6139285e88c28.jpg',
        'assets/images/2000_6139285ea164a.jpg',
        'assets/images/2000_6139285ea6887.jpg',
        'assets/images/2000_6139285eb867e.jpg',
        'assets/images/2000_6139285ec28cb.jpg',
        'assets/images/2000_6139285eef27d.jpg',
        'assets/images/Anna.jpg',
        'assets/images/Chrysostom.jpg',
        'assets/images/Elias.jpg',
        'assets/images/Geoffery.jpg',
        'assets/images/Good Shep.jpg',
        'assets/images/Irene.jpg',
        'assets/images/Joshua.jpg',
        'assets/images/Mark&Tarasios.jpg',
        'assets/images/Nektarios2.jpg',
        'assets/images/nektarios1.jpg',
        'assets/images/Paul.jpg',
        'assets/images/Romanos.jpg'
    ];

    const loadGalleryImages = async () => {
        try {
            const initialDisplay = 6; // Number of images to show initially
            let isExpanded = false;
            
            // Create expand button
            const expandButton = document.createElement('button');
            expandButton.className = 'expand-gallery-btn';
            expandButton.textContent = 'Show More';
            
            // Function to toggle gallery visibility
            const toggleGallery = () => {
                const allItems = galleryGrid.querySelectorAll('.gallery-item');
                allItems.forEach((item, index) => {
                    if (index >= initialDisplay) {
                        item.style.display = isExpanded ? 'block' : 'none';
                    }
                });
                expandButton.textContent = isExpanded ? 'Show Less' : 'Show More';
                isExpanded = !isExpanded;
            };
            
            // Load all images
            for (const [index, url] of imageUrls.entries()) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                if (index >= initialDisplay) {
                    galleryItem.style.display = 'none';
                }
                
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Byzantine Icon';
                img.loading = 'lazy';
                
                img.onload = () => {
                    galleryItem.style.opacity = '1';
                };
                
                img.onerror = () => {
                    console.error(`Failed to load image: ${url}`);
                    galleryItem.remove();
                };
                
                galleryItem.appendChild(img);
                galleryGrid.appendChild(galleryItem);
            }
            
            // Add expand button after gallery grid
            expandButton.addEventListener('click', toggleGallery);
            galleryGrid.parentElement.appendChild(expandButton);
            
        } catch (error) {
            console.error('Error loading gallery images:', error);
        }
    };

    loadGalleryImages();

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

    // Form submission handling
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                successMessage.style.color = '#4CAF50';
                successMessage.style.marginTop = '1rem';
                successMessage.style.textAlign = 'center';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Close modal after delay
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    successMessage.remove();
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Failed to send message. Please try again.';
            errorMessage.style.color = '#f44336';
            errorMessage.style.marginTop = '1rem';
            errorMessage.style.textAlign = 'center';
            contactForm.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Intersection Observer for fade-in animations
    const observeElements = document.querySelectorAll('.section-header, .about-content, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    observeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});