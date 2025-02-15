// Constants
const NEWS_API_KEY = 'a8c686391809442da82824cc5558b242';
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';

// Utility Functions
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.copyright-year');
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Modal Functions
function createModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <button class="modal-close">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
}

// User Preferences
const userPreferences = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    load(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
};

// News Functions
async function fetchClimateNews() {
    const params = new URLSearchParams({
        q: '(climate change AND (action OR protest OR strike OR activism OR crisis OR emergency)) OR (global warming AND (impact OR effects OR solutions)) OR (climate action AND (youth OR movement OR fridays for future OR greta thunberg))',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: '9',
        searchIn: 'title,description',
        apiKey: NEWS_API_KEY
    });

    try {
        console.log('Fetching news from:', `${NEWS_API_ENDPOINT}?${params}`);
        const response = await fetch(`${NEWS_API_ENDPOINT}?${params}`, {
            headers: {
                'X-Api-Key': NEWS_API_KEY
            },
            mode: 'cors', // Add CORS mode explicitly
            cache: 'no-cache' // Prevent caching issues
        });
        
        console.log('Response status:', response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.status === 'error') {
            throw new Error(data.message || 'Failed to fetch news');
        }

        // Add fallback data in case of API limits
        if (!data.articles || data.articles.length === 0) {
            return [{
                title: "Climate Action News Temporarily Unavailable",
                description: "We're currently experiencing technical difficulties with our news feed. Please check back later for updates on climate action news.",
                publishedAt: new Date().toISOString(),
                source: { name: "Fridays for Future" },
                url: "#"
            }];
        }
        
        return data.articles;
    } catch (error) {
        console.error('Error in fetchClimateNews:', error);
        // Return fallback data in case of any error
        return [{
            title: "Error Loading Climate News",
            description: `We encountered an error: ${error.message}. Please try again later.`,
            publishedAt: new Date().toISOString(),
            source: { name: "Fridays for Future" },
            url: "#"
        }];
    }
}

function generateNewsHTML(articles) {
    if (!articles || articles.length === 0) {
        return `
            <div class="error-message">
                <h2>No Climate News Available</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }

    return `
        <section class="news-grid">
            ${articles.map(article => `
                <article class="news-card">
                    ${article.urlToImage ? `
                        <img src="${article.urlToImage}" 
                             alt="${article.title}"
                             loading="lazy"
                             width="300"
                             height="200"
                             onerror="this.src='images/news-placeholder.jpg'">
                    ` : ''}
                    <div class="news-content">
                        <h2>${article.title || 'No Title Available'}</h2>
                        <p class="date">${new Date(article.publishedAt).toLocaleDateString()}</p>
                        <p>${article.description || 'No description available.'}</p>
                        <div class="news-meta">
                            <span class="source">${article.source?.name || 'Unknown Source'}</span>
                            <span class="category">Climate News</span>
                            ${article.url !== '#' ? `
                                <a href="${article.url}" class="read-more" target="_blank" rel="noopener noreferrer">
                                    Read More
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </article>
            `).join('')}
        </section>
    `;
}

// Form Handling
function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Store in localStorage for demonstration
    localStorage.setItem('lastContact', JSON.stringify(data));
    
    // Show success message
    createModal('Thank You!', 'Your message has been sent successfully. We will get back to you soon.');
    form.reset();
}

// Page Content Generation
function generateHomeContent(data) {
    return `
        <section class="hero">
            <div class="hero-content">
                <h1>${data.hero.title}</h1>
                <p>${data.hero.subtitle}</p>
                <a href="${data.hero.ctaLink}" class="cta-button">${data.hero.ctaText}</a>
            </div>
        </section>

        <section class="mission">
            <div class="mission-content">
                <h2>Our Mission</h2>
                <p>${data.mission.description}</p>
            </div>
            <div class="mission-image">
                <img src="images/mission-image.jpeg" alt="Climate activists" loading="lazy" >
            </div>
        </section>

        <section class="impact">
            <div class="impact-stats">
                <div class="stat-card">
                    <h3>150+</h3>
                    <p>Countries</p>
                </div>
                <div class="stat-card">
                    <h3>14M+</h3>
                    <p>Activists</p>
                </div>
                <div class="stat-card">
                    <h3>4K+</h3>
                    <p>Events</p>
                </div>
            </div>
        </section>

        ${generateGetInvolvedSection(data.getInvolved)}
        ${generateEventsSection(data.events)}
    `;
}

function generateGetInvolvedSection(data) {
    return `
        <section class="get-involved">
            <h2>${data.title}</h2>
            <div class="involvement-grid">
                ${data.sections.map(section => `
                    <div class="involvement-card">
                        <h3>${section.title}</h3>
                        <p>${section.description}</p>
                        <a href="${section.link}" class="action-button">Learn More</a>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function generateEventsSection(events) {
    return `
        <section class="upcoming-events">
            <h2>Upcoming Events</h2>
            <div class="events-grid">
                ${events.map(event => `
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">${new Date(event.date).getDate()}</span>
                            <span class="month">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                        </div>
                        <div class="event-details">
                            <h3>${event.title}</h3>
                            <p class="location">${event.location}</p>
                            <p>${event.description}</p>
                            <a href="${event.link}" class="event-link">Learn More</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// Generate Footer HTML
function generateFooter() {
    return `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@fridaysforfuture.earth</p>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="https://facebook.com/fridaysforfuture" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com/fridaysforfuture" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com/fridaysforfuture" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com/fridaysforfuture" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span class="copyright-year">2024</span> Fridays for Future. All rights reserved.</p>
            <p><a href="attributions.html" class="footer-link">Resource Attributions</a></p>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Handle contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    // Content generation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    loadPageContent(currentPage);

    // Generate footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = generateFooter();
        // Update copyright year after footer is generated
        updateCopyrightYear();
    }

    // Check if it's the user's first visit
    const hasVisited = userPreferences.load('hasVisited');
    if (!hasVisited) {
        createModal(
            'Welcome!',
            'Join us in the fight against climate change. Stay updated with our latest actions and events.'
        );
        userPreferences.save('hasVisited', true);
    }
});

async function loadPageContent(page) {
    const main = document.querySelector('main');
    main.innerHTML = '<div class="loading"></div>';

    try {
        console.log('Loading page:', page);
        let dataFile;
        switch(page) {
            case 'index.html':
                dataFile = 'home';
                break;
            case 'news.html':
                try {
                    const articles = await fetchClimateNews();
                    main.innerHTML = `
                        <section class="page-header">
                            <h1>News & Events</h1>
                            <p>Stay updated with the latest climate action news and upcoming events.</p>
                        </section>
                        <section class="news-container">
                            ${generateNewsHTML(articles)}
                        </section>
                    `;
                } catch (error) {
                    console.error('Error loading news:', error);
                    main.innerHTML = `
                        <div class="error-message">
                            <h2>Error Loading News</h2>
                            <p>Sorry, we couldn't load the latest news. Please try again later.</p>
                        </div>
                    `;
                }
                return;
            case 'get-involved.html':
                main.innerHTML = `
                    <section class="page-header">
                        <h1>Get Involved</h1>
                        <p>Join the movement and make a difference in the fight against climate change.</p>
                    </section>
                    <section class="involvement-options">
                        <div class="option-card">
                            <h2>Join Local Strikes</h2>
                            <p>Find and participate in climate strikes in your area.</p>
                            <a href="#find-strikes" class="action-button">Find Local Strikes</a>
                        </div>
                        <div class="option-card">
                            <h2>Start a Chapter</h2>
                            <p>Learn how to start a Fridays for Future chapter in your community.</p>
                            <a href="#start-chapter" class="action-button">Start a Chapter</a>
                        </div>
                        <div class="option-card">
                            <h2>Online Activism</h2>
                            <p>Participate in digital strikes and online campaigns.</p>
                            <a href="#online-activism" class="action-button">Join Online</a>
                        </div>
                    </section>
                `;
                return;
            case 'contact.html':
                main.innerHTML = `
                    <section class="page-header">
                        <h1>Contact Us</h1>
                        <p>Get in touch with the Fridays for Future team</p>
                    </section>
                    <section class="contact-form">
                        <form id="contactForm" action="#" method="post">
                            <div class="form-group">
                                <label for="name">Full Name:</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="subject">Subject:</label>
                                <select id="subject" name="subject" required>
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="chapter">Start a Chapter</option>
                                    <option value="media">Media Request</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="message">Message:</label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="submit-button">Send Message</button>
                        </form>
                    </section>
                `;
                // Attach form submission handler
                const contactForm = document.getElementById('contactForm');
                if (contactForm) {
                    contactForm.addEventListener('submit', handleFormSubmission);
                }
                return;
            default:
                dataFile = 'home';
        }

        const response = await fetch(`data/${dataFile}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${dataFile}.json: ${response.status}`);
        }
        const data = await response.json();
        
        switch(page) {
            case 'index.html':
                main.innerHTML = generateHomeContent(data);
                break;
            // Add other pages as needed
        }
    } catch (error) {
        console.error('Error loading content:', error);
        main.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Content</h2>
                <p>Error: ${error.message}</p>
                <p>Please try refreshing the page or contact support if the problem persists.</p>
            </div>
        `;
    }
}

// Export the news functions so they can be used in news.html
export { fetchClimateNews, generateNewsHTML }; 