document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLang;
    document.getElementById('language-switch').value = savedLang;
    updateContent(savedLang);
    updateDirection(savedLang);

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.getElementById('language-switch').addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        updateContent(lang);
        updateDirection(lang);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
});

function updateContent(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
        el.textContent = text;
    });
}

function updateDirection(lang) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    if (lang === 'fa' || lang === 'ar') {
        body.style.direction = 'rtl';
        navbar.style.flexDirection = 'row-reverse';
    } else {
        body.style.direction = 'ltr';
        navbar.style.flexDirection = 'row';
    }
}
