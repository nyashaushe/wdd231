// Display current year dynamically
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Display last modified date dynamically
document.getElementById('lastModified').textContent = "Last modified: " + document.lastModified;

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

// Function to filter and display courses based on selected category
function filterCourses(category) {
    let filteredCourses = courses;

    if (category !== 'all') {
        filteredCourses = courses.filter(course => course.subject === category);
    }

    displayCourses(filteredCourses);
}

// Function to display courses dynamically
function displayCourses(courseList) {
    const courseContainer = document.getElementById('course-list');
    courseContainer.innerHTML = ''; // Clear previous courses

    let totalCredits = 0;

    courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Highlight completed courses
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        // Add course details to the card
        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p><strong>Subject:</strong> ${course.subject}</p>
            <p><strong>Course Number:</strong> ${course.number}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <p><strong>Technology Used:</strong> ${course.technology.join(', ')}</p>
            <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>
        `;

        courseContainer.appendChild(courseCard);

        // Add credits to the total
        totalCredits += course.credits;
    });

    // Display total credits for the courses being shown
    document.getElementById('total-credits').textContent = totalCredits;
}

// Initially display all courses
displayCourses(courses);

// Add event listeners for filter buttons
document.getElementById('filter-all').addEventListener('click', () => filterCourses('all'));
document.getElementById('filter-WDD').addEventListener('click', () => filterCourses('WDD'));
document.getElementById('filter-CSE').addEventListener('click', () => filterCourses('CSE'));
