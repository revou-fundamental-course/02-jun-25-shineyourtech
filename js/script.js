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

// Contact Form Validation 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Validation functions
    function validateName() {
        const name = nameField.value.trim();
        const errorDiv = document.getElementById('nameError');
        
        if (name === '') {
            showError(nameField, errorDiv, 'Full name is required');
            return false;
        } else {
            hideError(nameField, errorDiv);
            return true;
        }
    }

    function validateEmail() {
        const email = emailField.value.trim();
        const errorDiv = document.getElementById('emailError');
        
        if (email === '') {
            showError(emailField, errorDiv, 'Email address is required');
            return false;
        } else if (!email.includes('@')) {
            showError(emailField, errorDiv, 'Email must contain @ symbol');
            return false;
        } else if (!isValidEmail(email)) {
            showError(emailField, errorDiv, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailField, errorDiv);
            return true;
        }
    }

    function validatePhone() {
        const phone = phoneField.value.trim();
        const errorDiv = document.getElementById('phoneError');
        
        if (phone !== '') {
            const cleanPhone = phone.replace(/\D/g, '');
            
            if (!cleanPhone.startsWith('08')) {
                showError(phoneField, errorDiv, 'Phone number must start with 08');
                return false;
            } else if (cleanPhone.length < 10) {
                showError(phoneField, errorDiv, 'Phone number must be at least 10 digits long');
                return false;
            } else if (!isValidPhone(phone)) {
                showError(phoneField, errorDiv, 'Phone number contains invalid characters');
                return false;
            }
        }
        
        hideError(phoneField, errorDiv);
        return true;
    }

    function validateSubject() {
        const subject = subjectField.value.trim();
        const errorDiv = document.getElementById('subjectError');
        
        if (subject === '') {
            showError(subjectField, errorDiv, 'Subject is required');
            return false;
        } else {
            hideError(subjectField, errorDiv);
            return true;
        }
    }

    function validateMessage() {
        const message = messageField.value.trim();
        const errorDiv = document.getElementById('messageError');
        
        if (message === '') {
            showError(messageField, errorDiv, 'Message is required');
            return false;
        } else {
            hideError(messageField, errorDiv);
            return true;
        }
    }

    // Helper functions
    function showError(field, errorDiv, message) {
        field.classList.add('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function hideError(field, errorDiv) {
        field.classList.remove('error');
        errorDiv.style.display = 'none';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Remove all non-digit characters for validation
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Must start with 08 and contain only numbers (after cleaning)
        if (!cleanPhone.startsWith('08')) {
            return false;
        }
        
        // Allow numbers, spaces, hyphens, parentheses, and plus sign in display
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        return phoneRegex.test(phone);
    }

    // Real-time validation
    nameField.addEventListener('blur', validateName);
    emailField.addEventListener('blur', validateEmail);
    phoneField.addEventListener('blur', validatePhone);
    subjectField.addEventListener('blur', validateSubject);
    messageField.addEventListener('blur', validateMessage);

    // Clear errors on input
    nameField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('nameError'));
        }
    });

    emailField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('emailError'));
        }
    });

    phoneField.addEventListener('input', function() {
        hideError(this, document.getElementById('phoneError'));
    });

    subjectField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('subjectError'));
        }
    });

    messageField.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('messageError'));
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide success message
        document.getElementById('successMessage').style.display = 'none';
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Here you would typically send the form data to your server
            console.log('Form submitted successfully!');
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                firstError.focus();
            }
        }
    });
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