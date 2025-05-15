// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition class
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    // Add click event listeners
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', 
                e.matches ? 'dark' : 'light');
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');
    const closeBtn = document.querySelector('.mobile-menu-close');

    // Hamburger animation
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize project image popup
    initProjectImagePopup();
    
    // Initialize certificate popup
    initCertificatePopup();
});

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Remove previous lightbox code and add new floating image popup
function initProjectImagePopup() {
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('click', function (e) {
            e.preventDefault();
            // Remove any existing popup
            const existing = document.querySelector('.image-popup');
            if (existing) existing.remove();

            // Create popup container
            const popup = document.createElement('div');
            popup.className = 'image-popup';

            // Create image element
            const popupImg = document.createElement('img');
            popupImg.src = img.src;
            popupImg.alt = img.alt;
            popupImg.className = 'popup-img';

            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'image-popup-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close');

            // Close on click
            closeBtn.addEventListener('click', () => {
                popup.remove();
            });

            // Append elements
            popup.appendChild(popupImg);
            popup.appendChild(closeBtn);
            document.body.appendChild(popup);
        });
    });
}

// Certificate image popup preview
function initCertificatePopup() {
    // Delegate for dynamically loaded certificates
    document.body.addEventListener('click', function(e) {
        // Handle expand button or image click
        const expandBtn = e.target.closest('.view-certificate');
        const certImg = e.target.closest('.certificate-image img');
        let imgSrc = null;
        let imgAlt = '';
        if (expandBtn) {
            // Find the image inside the same certificate card
            const card = expandBtn.closest('.certificate-card');
            if (card) {
                const img = card.querySelector('.certificate-image img');
                if (img) {
                    imgSrc = img.src;
                    imgAlt = img.alt;
                }
            }
        } else if (certImg) {
            imgSrc = certImg.src;
            imgAlt = certImg.alt;
        }
        if (imgSrc) {
            // Remove any existing popup
            const existing = document.querySelector('.image-popup');
            if (existing) existing.remove();
            // Create popup container
            const popup = document.createElement('div');
            popup.className = 'image-popup';
            // Create image element
            const popupImg = document.createElement('img');
            popupImg.src = imgSrc;
            popupImg.alt = imgAlt;
            popupImg.className = 'popup-img';
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'image-popup-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.addEventListener('click', () => popup.remove());
            // Append elements
            popup.appendChild(popupImg);
            popup.appendChild(closeBtn);
            document.body.appendChild(popup);
        }
    });
} 