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
        const link = element.querySelector('a') || (element.tagName === 'A' ? element : null);
        if (link) {
            link.textContent = text;
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

// تابع تtoggle منو توی موبایل
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    } else {
        console.error('Menu toggle or nav links not found. Check your HTML structure.');
    }

    // افکت اسکرول نرم فقط توی صفحه اصلی (index.html)
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1); // حذف # از href
                const target = document.getElementById(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // تنظیم فاصله از بالای صفحه
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // مدیریت تغییر زبان
    const languageSwitch = document.getElementById('language-switch');
    const elementsToTranslate = document.querySelectorAll('[data-en]');

    // تنظیم زبان پیش‌فرض
    const savedLang = localStorage.getItem('language') || 'en';
    languageSwitch.value = savedLang;
    document.documentElement.lang = savedLang;
    updateContent(savedLang);

    languageSwitch.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        document.documentElement.lang = selectedLang;
        updateContent(selectedLang);
    });

    function updateContent(lang) {
        elementsToTranslate.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // اگر المان input یا textarea یا button باشد
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'BUTTON') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }
});
