// Welcome Animation
window.addEventListener('load', function() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    
    // Show welcome for 3 seconds, then fade out
    setTimeout(() => {
        welcomeOverlay.classList.add('fade-out');
        // Remove from DOM after animation completes
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 1000);
    }, 2000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Banner Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.getElementById('slider');
const navDots = document.querySelectorAll('.nav-dot');

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update navigation dots
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Navigation dot click handlers
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Contact Form Submission and Display
const contactForm = document.getElementById('contactForm');
const infoDisplay = document.getElementById('infoDisplay');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Display submitted information in the right column
    displayContactInfo(data);
    
    // Show success message
    alert('Message sent successfully! Check the contact information panel.');
    
    // Reset form
    contactForm.reset();
});

function displayContactInfo(data) {
    const timestamp = new Date().toLocaleString();
    
    infoDisplay.innerHTML = `
        <h3>Latest Submission</h3>
        <div class="info-item">
            <div class="info-label">📅 Submitted</div>
            <div class="info-value">${timestamp}</div>
        </div>
        <div class="info-item">
            <div class="info-label">👤 Name</div>
            <div class="info-value">${data.name || 'Not provided'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">📧 Email</div>
            <div class="info-value">${data.email || 'Not provided'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">📞 Phone</div>
            <div class="info-value">${data.phone || 'Not provided'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">📋 Subject</div>
            <div class="info-value">${data.subject || 'Not provided'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">💬 Message</div>
            <div class="info-value">${data.message || 'Not provided'}</div>
        </div>
    `;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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