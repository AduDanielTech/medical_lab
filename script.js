document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Animations (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
        });
    }

    // 2. Initialize EmailJS (If on contact page)
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: "YOUR_PUBLIC_KEY_HERE", 
        });
    }

    // 3. Dark Mode Logic
    const htmlElement = document.documentElement;
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    
    // Helper: Switch Icons based on mode
    function updateThemeIcons(isDark) {
        themeToggleBtns.forEach(btn => {
            const moonIcon = btn.querySelector('.theme-moon');
            const sunIcon = btn.querySelector('.theme-sun');
            
            if (moonIcon && sunIcon) {
                if (isDark) {
                    // Dark Mode: Show Sun, Hide Moon
                    moonIcon.classList.add('hidden');
                    sunIcon.classList.remove('hidden');
                } else {
                    // Light Mode: Show Moon, Hide Sun
                    sunIcon.classList.add('hidden');
                    moonIcon.classList.remove('hidden');
                }
            }
        });
    }

    // Initial Check
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        htmlElement.classList.add('dark');
        updateThemeIcons(true);
    } else {
        htmlElement.classList.remove('dark');
        updateThemeIcons(false);
    }

    // Event Listeners
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark);
        });
    });

    // 4. Mobile Menu Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 5. Contact Form Logic
    const contactForm = document.getElementById('labForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');

            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(() => {
                    btn.textContent = 'Message Sent!';
                    btn.classList.replace('bg-primary', 'bg-green-600');
                    contactForm.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.replace('bg-green-600', 'bg-primary');
                        btn.disabled = false;
                        btn.classList.remove('opacity-75', 'cursor-not-allowed');
                    }, 3000);
                }, (error) => {
                    console.error('FAILED...', error);
                    btn.textContent = 'Error. Try Again.';
                    btn.classList.replace('bg-primary', 'bg-red-600');
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.replace('bg-red-600', 'bg-primary');
                        btn.disabled = false;
                        btn.classList.remove('opacity-75', 'cursor-not-allowed');
                    }, 3000);
                });
        });
    }
});