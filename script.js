// هنگام لود صفحه، زبان پیش‌فرض انگلیسی تنظیم می‌شود
window.onload = function() {
    changeLanguage('en');
};

// تغییر زبان با انتخاب از سوییچ زبان
document.getElementById('language-switch').addEventListener('change', function() {
    changeLanguage(this.value);
});

function changeLanguage(lang) {
    // تنظیم زبان صفحه
    document.documentElement.lang = lang;

    // تغییر محتوای متنی بر اساس زبان انتخاب‌شده
    document.querySelectorAll('[data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // تنظیم جهت و فونت بر اساس زبان
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

// افکت اسکرول نرم برای لینک‌های داخلی
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // جبران ارتفاع نویگیشن بار
                behavior: 'smooth'
            });
        }
    });
});

// انیمیشن برای تغییر زبان دکمه‌ها در فرم تماس
document.querySelectorAll('form button').forEach(button => {
    button.addEventListener('change', function() {
        changeLanguage(document.getElementById('language-switch').value);
    });
});

// افزودن افکت پارالاکس ساده به هدرها هنگام اسکرول
window.addEventListener('scroll', function() {
    const headers = document.querySelectorAll('.hero, .services-hero, .about-hero, .contact-hero');
    headers.forEach(header => {
        const scrollPosition = window.pageYOffset;
        header.style.backgroundPositionY = -(scrollPosition * 0.3) + 'px';
    });
});
