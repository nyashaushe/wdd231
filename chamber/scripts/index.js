// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');

    if (hamburgerBtn && primaryNav) {
        // Toggle menu when hamburger is clicked
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            primaryNav.classList.toggle('show');
            const isExpanded = primaryNav.classList.contains('show');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
            hamburgerBtn.innerHTML = isExpanded ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !primaryNav.contains(e.target)) {
                primaryNav.classList.remove('show');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.innerHTML = '☰';
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
