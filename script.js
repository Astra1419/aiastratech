document.getElementById('language-switch').addEventListener('change', function () {
    const lang = this.value;
    document.documentElement.lang = lang;

    // تغییر متن‌ها
    document.querySelectorAll('[data-fa]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // تنظیم فونت برای عربی (اختیاری)
    if (lang === 'ar') {
        document.body.style.fontFamily = "'Arial', 'Noto Naskh Arabic', sans-serif";
    } else {
        document.body.style.fontFamily = "'Arial', sans-serif";
    }
});