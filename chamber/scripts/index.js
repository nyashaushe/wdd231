// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');

    if (hamburgerBtn && primaryNav) {
        // Toggle menu when hamburger is clicked
        hamburgerBtn.addEventListener('click', function() {
            document.getElementById('primary-nav').classList.toggle('show');
            this.textContent = this.textContent === '☰' ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const nav = document.getElementById('primary-nav');
            const hamburger = document.getElementById('hamburger-btn');
            
            if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
                nav.classList.remove('show');
                hamburger.textContent = '☰';
            }
        });
    }

    // Set current year in footer
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date if element exists
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});

// Initialize page elements
function initializePage() {
    // Set current year in footer
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Initialize hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
}

// Toggle mobile menu
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('show');
    }
}

// Handle scroll events for header visibility
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    const header = document.querySelector('header');
    
    if (header) {
        header.style.transform = currentScrollPosition > lastScrollPosition ? 
            'translateY(-100%)' : 'translateY(0)';
        lastScrollPosition = currentScrollPosition;
    }
});
