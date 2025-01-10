// Set current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});


// Toggle menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const isExpanded = navMenu.classList.contains('show');
        menuButton.setAttribute('aria-expanded', isExpanded);
    });
});

// Course data array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dynamic elements
    initializePage();
    
    // Add event listeners for filter buttons
    addFilterListeners();
    
    // Display initial courses
    displayCourses(courses);
});

// Initialize page elements
function initializePage() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = currentYear;
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

// Add event listeners for filter buttons
function addFilterListeners() {
    const filterButtons = {
        'filter-all': 'all',
        'filter-WDD': 'WDD',
        'filter-CSE': 'CSE'
    };

    for (const [buttonId, category] of Object.entries(filterButtons)) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => filterCourses(category));
        }
    }
}

// Filter courses based on category
function filterCourses(category) {
    let filteredCourses = courses;
    
    if (category !== 'all') {
        filteredCourses = courses.filter(course => course.subject === category);
    }
    
    displayCourses(filteredCourses);
}

// Display courses in the DOM
function displayCourses(courseList) {
    const courseContainer = document.getElementById('course-list');
    if (!courseContainer) return;

    // Clear previous courses
    courseContainer.innerHTML = '';
    
    let totalCredits = 0;

    // Create and append course cards
    courseList.forEach(course => {
        const courseCard = createCourseCard(course);
        courseContainer.appendChild(courseCard);
        totalCredits += course.credits;
    });

    // Update total credits display
    updateTotalCredits(totalCredits);
}

// Create a course card element
function createCourseCard(course) {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    
    if (course.completed) {
        courseCard.classList.add('completed');
    }

    courseCard.innerHTML = `
        <h3>${course.subject} ${course.number} - ${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p><strong>Status:</strong> ${course.completed ? 'Completed' : 'In Progress'}</p>
    `;

    return courseCard;
}

// Update total credits display
function updateTotalCredits(total) {
    const totalCreditsElement = document.getElementById('total-credits');
    if (totalCreditsElement) {
        totalCreditsElement.textContent = total;
    }
}

// Handle scroll events for header visibility
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (header) {
        if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollPosition = currentScrollPosition;
    }
});