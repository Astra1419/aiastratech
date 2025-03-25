document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLang;
    document.getElementById('language-switch').value = savedLang;
    updateContent(savedLang);

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
    });
});

function updateContent(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
    });
}
