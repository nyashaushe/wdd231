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
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
    setupFilterListeners();
});

// Setup filter button listeners
function setupFilterListeners() {
    document.getElementById('filter-all').addEventListener('click', (e) => {
        setActiveFilter(e.target);
        displayCourses(courses);
    });
    
    document.getElementById('filter-WDD').addEventListener('click', (e) => {
        setActiveFilter(e.target);
        const filtered = courses.filter(course => course.subject === 'WDD');
        displayCourses(filtered);
    });
    
    document.getElementById('filter-CSE').addEventListener('click', (e) => {
        setActiveFilter(e.target);
        const filtered = courses.filter(course => course.subject === 'CSE');
        displayCourses(filtered);
    });
}

// Set active filter button
function setActiveFilter(button) {
    document.querySelectorAll('.filter-container button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Display courses and update total credits
function displayCourses(courseList) {
    const courseContainer = document.getElementById('course-list');
    courseContainer.innerHTML = '';
    
    courseList.forEach(course => {
        const card = createCourseCard(course);
        courseContainer.appendChild(card);
    });

    // Calculate and display total credits
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

// Create course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
        card.classList.add('completed');
    }

    card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <h4>${course.title}</h4>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p><strong>Status:</strong> ${course.completed ? 'Completed' : 'In Progress'}</p>
        <p>${course.description}</p>
    `;

    return card;
}