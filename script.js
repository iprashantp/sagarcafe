// ===================================
// Business Hours Status
// ===================================
function updateBusinessStatus() {
    const statusBadge = document.getElementById('statusBadge');
    if (!statusBadge) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Open from 1:00 PM (13:00) to 11:00 PM (23:00)
    const isOpen = currentHour >= 13 && currentHour < 23;
    
    const statusIcon = statusBadge.querySelector('.status-icon');
    const statusText = statusBadge.querySelector('.status-text');
    const statusHours = statusBadge.querySelector('.status-hours');
    
    if (isOpen) {
        statusBadge.classList.remove('closed');
        statusIcon.textContent = '🟢';
        statusText.textContent = 'Open Now';
        statusHours.textContent = '1:00 PM - 11:00 PM';
    } else {
        statusBadge.classList.add('closed');
        statusIcon.textContent = '🔴';
        statusText.textContent = 'Closed';
        
        // Calculate time until opening (1:00 PM / 13:00)
        let openingTime = new Date(now);
        
        if (currentHour >= 23 || currentHour < 13) {
            // If after 11 PM or before 1 PM, set opening time to next 1 PM
            if (currentHour >= 23) {
                openingTime.setDate(openingTime.getDate() + 1);
            }
            openingTime.setHours(13, 0, 0, 0);
        }
        
        // Calculate difference in milliseconds
        const diff = openingTime - now;
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        
        let timeLeftText = '';
        
        if (totalHours >= 1) {
            const hours = totalHours;
            const minutes = totalMinutes % 60;
            timeLeftText = hours === 1 
                ? `Opens in ${hours} hour${minutes > 0 ? ` ${minutes} min` : ''}`
                : `Opens in ${hours} hours${minutes > 0 ? ` ${minutes} min` : ''}`;
        } else if (totalMinutes >= 1) {
            const minutes = totalMinutes;
            const seconds = totalSeconds % 60;
            timeLeftText = `Opens in ${minutes} min${seconds > 0 ? ` ${seconds} sec` : ''}`;
        } else {
            timeLeftText = `Opens in ${totalSeconds} sec`;
        }
        
        statusHours.textContent = timeLeftText;
    }
}

// Update status on page load and every second for countdown
updateBusinessStatus();
setInterval(updateBusinessStatus, 1000);

// ===================================
// Testimonials Data & Rendering
// ===================================
const testimonialsData = [
    {
        stars: 5,
        text: "Absolutely amazing food! The taste is authentic and the ambiance is perfect for family gatherings. Highly recommended!",
        name: "Kapil Sharma",
        role: "Food Enthusiast",
        avatar: "K"
    },
    {
        stars: 5,
        text: "Best cafe in town! The hygiene standards are exceptional and the pure veg menu is extensive. Love coming here!",
        name: "Amit Patel",
        role: "Regular Customer",
        avatar: "A"
    },
    {
        stars: 5,
        text: "Great experience every time! The staff is friendly, food is delicious, and the prices are very reasonable. A must-visit!",
        name: "Neelesh Kumar",
        role: "Local Resident",
        avatar: "N"
    },
    {
        stars: 5,
        text: "I'm impressed by the quality and presentation of every dish. The cafe has become my go-to spot for special occasions!",
        name: "Kriti Singh",
        role: "Happy Diner",
        avatar: "K"
    }
];

function renderTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;

    testimonialsGrid.innerHTML = testimonialsData.map(testimonial => `
        <div class="testimonial-card">
            <div class="stars">
                ${Array(testimonial.stars).fill('<span>⭐</span>').join('')}
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.avatar}</div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Render testimonials on page load
renderTestimonials();

// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// Menu Sharing Functionality
// ===================================
const shareButtons = document.querySelectorAll('.share-btn');
const menuImageUrl = window.location.origin + '/resources/Sagar Cafe Menu (18 x 12 in).png';
const shareText = 'Check out the delicious menu at Sagar Cafe - 100% Pure Veg!';
const shareUrl = window.location.href;

shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.getAttribute('data-platform');
        
        switch(platform) {
            case 'whatsapp':
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                window.open(whatsappUrl, '_blank');
                showNotification('Opening WhatsApp...', 'success');
                break;
                
            case 'facebook':
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
                showNotification('Opening Facebook...', 'success');
                break;
                
            case 'twitter':
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
                showNotification('Opening Twitter...', 'success');
                break;
                
            case 'copy':
                // Copy link to clipboard
                navigator.clipboard.writeText(shareUrl).then(() => {
                    showNotification('Link copied to clipboard!', 'success');
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = shareUrl;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        showNotification('Link copied to clipboard!', 'success');
                    } catch (err) {
                        showNotification('Failed to copy link', 'error');
                    }
                    document.body.removeChild(textArea);
                });
                break;
        }
    });
});

// ===================================
// Image Carousel
// ===================================
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let currentSlide = 0;
let autoPlayInterval;

// Create indicators
slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.carousel-indicator');

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
    resetAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

// Pause autoplay on hover
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

// Start autoplay
startAutoPlay();

// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Form Handling
// ===================================

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show message that form submission is disabled
    showNotification('Please contact us directly at +91-9174849029 or visit us in person.', 'info');
    
    // Reset form
    contactForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        
        // Reset form
        newsletterForm.reset();
        
        // In a real application, you would send this to a server
        console.log('Newsletter subscription:', email);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification and modal animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .notification-content p {
        margin: 0;
        flex: 1;
        color: white;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===================================
// Smooth Scroll Enhancement
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty anchors
        if (href === '#' || !href) return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature, .gallery-item, .info-card, .about-text, .about-image');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// Date Input Minimum Date
// ===================================
const dateInput = document.getElementById('date');
if (dateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===================================
// Image Loading Optimization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            console.warn('Failed to load image:', img.src);
            // You could set a placeholder image here
        });
    });
});

// ===================================
// Gallery Lightbox (Optional Enhancement)
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        createLightbox(img.src, img.alt);
    });
});

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: zoom-out;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: -40px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.transform = 'scale(1.1)';
        closeBtn.style.background = '#d4af37';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.transform = 'scale(1)';
        closeBtn.style.background = 'white';
    });
    
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => lightbox.remove(), 300);
    };
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    
    lightbox.addEventListener('click', closeLightbox);
    
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    document.body.appendChild(lightbox);
}

// Add fadeIn/fadeOut animations for lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(lightboxStyle);

// ===================================
// Image Zoom Functionality
// ===================================
const menuImage = document.getElementById('menuImage');
const imageZoomModal = document.getElementById('imageZoomModal');
const zoomedImage = document.getElementById('zoomedImage');
const zoomClose = document.getElementById('zoomClose');

if (menuImage && imageZoomModal && zoomedImage) {
    // Open zoom modal when menu image is clicked
    menuImage.addEventListener('click', function() {
        imageZoomModal.classList.add('active');
        zoomedImage.src = this.src;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close zoom modal when close button is clicked
    zoomClose.addEventListener('click', function() {
        imageZoomModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close zoom modal when clicking outside the image
    imageZoomModal.addEventListener('click', function(e) {
        if (e.target === imageZoomModal) {
            imageZoomModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close zoom modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageZoomModal.classList.contains('active')) {
            imageZoomModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===================================
// Party Badge Click Handler
// ===================================
const partyBadge = document.getElementById('partyBadge');
if (partyBadge) {
    partyBadge.addEventListener('click', function() {
        const partyCard = document.getElementById('partyCard');
        const decorationCard = document.getElementById('decorationCard');
        
        if (partyCard) {
            // Scroll to the party card with smooth behavior
            partyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Flip both cards after scrolling
            setTimeout(() => {
                partyCard.classList.add('flipped');
                if (decorationCard) {
                    decorationCard.classList.add('flipped');
                }
            }, 1500);
        }
    });
}

// ===================================
// Flip Card Functionality
// ===================================
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🍽️ Welcome to Sagar Cafe! 🍽️', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cWebsite designed with ❤️ for food lovers', 'font-size: 14px; color: #666;');
