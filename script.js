window.onload = function() {
    changeLanguage('en');
};

document.getElementById('language-switch').addEventListener('change', function() {
    changeLanguage(this.value);
});

function changeLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    if (lang === 'fa') {
        document.body.style.direction = 'rtl';
        document.body.style.fontFamily = "'Vazir', sans-serif";
    } else if (lang === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.style.fontFamily = "'Noto Naskh Arabic', sans-serif";
    } else if (lang === 'en') {
        document.body.style.direction = 'ltr';
        document.body.style.fontFamily = "'Roboto', sans-serif";
    }
}
