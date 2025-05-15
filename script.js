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

// --- Microinteractions & Animations ---

// Reveal on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Page transitions (fade-out on link click, fade-in on load)
function addPageTransitions() {
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      if (link.hostname === window.location.hostname) {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.4s';
        document.body.style.opacity = 0;
        setTimeout(() => {
          window.location = link.href;
        }, 400);
      }
    });
  });
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 0.7s';
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.body.style.opacity = 1;
    }, 50);
  });
}
addPageTransitions();

// Loader logic (for next step)
function showLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) loader.classList.remove('hidden');
}
function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) loader.classList.add('hidden');
  setTimeout(() => loader && loader.remove(), 500);
}
showLoader();
window.addEventListener('load', hideLoader);

// Tilt effect (polish)
document.querySelectorAll('.tilt-element').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// Ripple effect (polish)
document.querySelectorAll('.ripple').forEach(el => {
  el.addEventListener('mousedown', function(e) {
    let ripple = el.querySelector('.ripple-effect');
    if (ripple) ripple.remove();
    ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.left = (e.offsetX - 50) + 'px';
    ripple.style.top = (e.offsetY - 50) + 'px';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Form field focus/blur polish
document.querySelectorAll('.neumorphic-input').forEach(input => {
  input.addEventListener('focus', () => input.classList.add('focused'));
  input.addEventListener('blur', () => input.classList.remove('focused'));
}); 