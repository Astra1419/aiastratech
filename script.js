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
        const text = element.getAttribute(`data-${lang}`);
        
        // اگر المان لینک دارد، فقط متن داخل لینک یا بیرون آن را تغییر بده
        const link = element.querySelector('a');
        if (link) {
            const prefix = element.textContent.split(':')[0] + ': ';
            element.innerHTML = prefix + `<a href="${link.href}" target="${link.target || ''}">${text.split(': ')[1]}</a>`;
        } else {
            element.textContent = text;
        }
    });

    // تنظیم جهت و فونت بر اساس زبان
    if (lang === 'fa' || lang === 'ar') {
        document.body.style.direction = 'rtl';
        document.querySelector('.navbar').style.flexDirection = 'row-reverse';
        document.querySelector('.nav-links').style.marginRight = '30px';
        document.querySelector('.nav-links').style.marginLeft = '0';
        document.getElementById('language-switch').style.marginRight = 'auto';
        document.getElementById('language-switch').style.marginLeft = '0';
        document.body.style.fontFamily = lang === 'fa' ? "'Vazir', sans-serif" : "'Noto Naskh Arabic', sans-serif";
    } else if (lang === 'en') {
        document.body.style.direction = 'ltr';
        document.querySelector('.navbar').style.flexDirection = 'row';
        document.querySelector('.nav-links').style.marginLeft = '30px';
        document.querySelector('.nav-links').style.marginRight = '0';
        document.getElementById('language-switch').style.marginLeft = 'auto';
        document.getElementById('language-switch').style.marginRight = '0';
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

// افزودن افکت پارالاکس ساده به هدرها هنگام اسکرول
window.addEventListener('scroll', function() {
    const headers = document.querySelectorAll('.hero, .services-hero, .about-hero, .contact-hero');
    headers.forEach(header => {
        const scrollPosition = window.pageYOffset;
        header.style.backgroundPositionY = -(scrollPosition * 0.3) + 'px';
    });
});
