// Theme handling
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on system preference or stored preference
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    document.body.classList.toggle('dark-theme', storedTheme === 'dark');
} else {
    document.body.classList.toggle('dark-theme', prefersDarkScheme.matches);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggle?.addEventListener('click', toggleTheme);
mobileThemeToggle?.addEventListener('click', toggleTheme);

// Mobile menu handling
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-links a');

mobileMenuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', 
        mobileMenu.classList.contains('active'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (mobileMenu?.classList.contains('active') && 
        !event.target.closest('.mobile-menu') && 
        !event.target.closest('.mobile-menu-toggle')) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    });
});

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

// Image gallery functionality
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&lt;</button>
            <button class="lightbox-next">&gt;</button>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
}

const lightbox = createLightbox();
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

function showLightbox(index) {
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
    currentImageIndex = index;
    lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentImageIndex].querySelector('img').src;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentImageIndex].querySelector('img').src;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
});

lightboxClose.addEventListener('click', hideLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        hideLightbox();
    } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
        showPrevImage();
    } else if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
        showNextImage();
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        hideLightbox();
    }
});

// Add CSS for lightbox
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .lightbox.active {
        display: flex;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .lightbox-close,
    .lightbox-prev,
    .lightbox-next {
        position: absolute;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 1rem;
        transition: opacity 0.3s ease;
    }

    .lightbox-close {
        top: -2rem;
        right: -2rem;
    }

    .lightbox-prev {
        left: -4rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .lightbox-next {
        right: -4rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .lightbox-close:hover,
    .lightbox-prev:hover,
    .lightbox-next:hover {
        opacity: 0.7;
    }

    @media (max-width: 768px) {
        .lightbox-prev {
            left: 1rem;
        }

        .lightbox-next {
            right: 1rem;
        }
    }
`;
document.head.appendChild(style); 