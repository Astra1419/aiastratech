// وقتی صفحه لود می‌شه
document.addEventListener('DOMContentLoaded', () => {
    // تنظیم زبان پیش‌فرض از localStorage یا انگلیسی
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLang;
    document.getElementById('language-switch').value = savedLang;
    updateContent(savedLang);
    updateDirection(savedLang);

    // فعال کردن منوی موبایل
    setupMobileMenu();

    // اضافه کردن اسکرول نرم برای همه لینک‌های داخلی
    setupSmoothScroll();

    // مدیریت تغییر زبان
    document.getElementById('language-switch').addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        document.documentElement.lang = selectedLang;
        updateContent(selectedLang);
        updateDirection(selectedLang);
    });
});

// تابع به‌روزرسانی محتوا بر اساس زبان
function updateContent(lang) {
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`) || element.getAttribute('data-en');
        
        // مدیریت المان‌های خاص مثل لینک، دکمه، input و textarea
        if (element.tagName === 'A') {
            element.textContent = text;
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'BUTTON') {
            element.textContent = text;
        } else {
            // برای المان‌هایی که لینک داخلشون دارن
            const link = element.querySelector('a');
            if (link) {
                link.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

// تابع تنظیم جهت و استایل بر اساس زبان
function updateDirection(lang) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const languageSwitch = document.getElementById('language-switch');

    if (lang === 'fa' || lang === 'ar') {
        body.style.direction = 'rtl';
        navbar.style.flexDirection = 'row-reverse';
        navLinks.style.marginRight = '30px';
        navLinks.style.marginLeft = '0';
        languageSwitch.style.marginRight = 'auto';
        languageSwitch.style.marginLeft = '0';
        body.style.fontFamily = lang === 'fa' ? "'Vazir', sans-serif" : "'Noto Naskh Arabic', sans-serif";
    } else {
        body.style.direction = 'ltr';
        navbar.style.flexDirection = 'row';
        navLinks.style.marginLeft = '30px';
        navLinks.style.marginRight = '0';
        languageSwitch.style.marginLeft = 'auto';
        languageSwitch.style.marginRight = '0';
        body.style.fontFamily = "'Roboto', sans-serif";
    }
}

// تابع فعال‌سازی منوی موبایل
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) {
        console.error('Menu toggle or nav links not found.');
        return;
    }

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // انیمیشن نرم برای باز و بسته شدن منو
        if (navLinks.classList.contains('active')) {
            navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
            navLinks.style.opacity = '1';
        } else {
            navLinks.style.maxHeight = '0';
            navLinks.style.opacity = '0';
        }
    });

    // بستن منو وقتی روی لینک کلیک می‌شه (موبایل)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navLinks.style.maxHeight = '0';
                navLinks.style.opacity = '0';
            }
        });
    });

    // تنظیم منو هنگام تغییر اندازه صفحه
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.maxHeight = '';
            navLinks.style.opacity = '';
        }
    });
}

// تابع اسکرول نرم برای همه لینک‌های داخلی
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // فاصله از نویگیشن بار
                    behavior: 'smooth'
                });
            }
        });
    });
}

// افکت هاور برای دکمه CTA (اختیاری)
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// جلوگیری از ارسال فرم تماس (در صورت فعال شدن فرم در آینده)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submission is not yet implemented. Contact us directly via email or phone!');
    });
}
