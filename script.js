// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
    // Animation for hamburger to X
    if (menuToggle.classList.contains('open')) {
        menuToggle.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuToggle.querySelectorAll('span')[1].style.opacity = '0';
        menuToggle.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        menuToggle.querySelectorAll('span')[0].style.transform = 'rotate(0) translate(0, 0)';
        menuToggle.querySelectorAll('span')[1].style.opacity = '1';
        menuToggle.querySelectorAll('span')[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Language Switch Functionality
const languageSwitch = document.getElementById('language-switch');
const elements = document.querySelectorAll('[data-en], [data-fa], [data-ar]');

function updateLanguage() {
    const selectedLang = languageSwitch.value;
    elements.forEach(element => {
        const text = element.getAttribute(`data-${selectedLang}`);
        if (text) {
            element.textContent = text;
        }
    });
}

languageSwitch.addEventListener('change', updateLanguage);

// Set default language on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form Submission (Basic Alert for Demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        // Simulate form submission
        alert(`Message Sent!\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
        contactForm.reset();
    });
}

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.service-card, .stat-item, .why-us-item, .process-step, .contact-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease-in';
    observer.observe(element);
});

// Add fade-in class dynamically
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
});
