document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Auto-Update Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Initialize Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            once: true, 
            offset: 50, 
            easing: 'ease-out-cubic' 
        });
    }

    // 3. Theme Logic
    const html = document.documentElement;
    const toggles = document.querySelectorAll('.theme-toggle');
    
    function setIcon(isDark) {
        toggles.forEach(btn => {
            const moon = btn.querySelector('.theme-moon');
            const sun = btn.querySelector('.theme-sun');
            if (moon && sun) {
                if (isDark) { 
                    moon.classList.add('hidden'); 
                    sun.classList.remove('hidden'); 
                } else { 
                    sun.classList.add('hidden'); 
                    moon.classList.remove('hidden'); 
                }
            }
        });
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark'); 
        setIcon(true);
    } else {
        html.classList.remove('dark'); 
        setIcon(false);
    }

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            setIcon(isDark);
        });
    });

    // 4. Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 5. FAQ Logic
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const ans = q.nextElementSibling;
            const icon = q.querySelector('.faq-icon');
            ans.classList.toggle('hidden');
            if (icon) {
                icon.style.transform = ans.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });

    // 6. Contact Form (EmailJS)
    const contactForm = document.getElementById('labForm');
    if (contactForm && typeof emailjs !== 'undefined') {
        // Initialize EmailJS with your Public Key
        emailjs.init({ publicKey: "3xnbMw4bjV4WKIhhG" }); 

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Loading State
            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-not-allowed');

            // Send Form
            emailjs.sendForm('service_woqi7ih', 'template_2z541er', this)
                .then(() => {
                    // Success State
                    btn.textContent = 'Message Sent!';
                    btn.classList.replace('bg-primary', 'bg-green-600');
                    contactForm.reset();
                    
                    // Reset Button after 3 seconds
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.replace('bg-green-600', 'bg-primary');
                        btn.disabled = false;
                        btn.classList.remove('opacity-75', 'cursor-not-allowed');
                    }, 3000);
                }, (error) => {
                    // Error State
                    console.error('FAILED...', error);
                    btn.textContent = 'Error. Try Again.';
                    btn.classList.replace('bg-primary', 'bg-red-600');
                    
                    // Reset Button after 3 seconds
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