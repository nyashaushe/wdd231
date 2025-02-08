// Function to load and display attractions
async function loadAttractions() {
    try {
        const response = await fetch('data/discover.json');
        const data = await response.json();
        displayAttractions(data.attractions);
    } catch (error) {
        console.error('Error loading attractions:', error);
    }
}

// Function to display attractions
function displayAttractions(attractions) {
    const grid = document.querySelector('.discover-grid');
    
    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        
        card.innerHTML = `
            <img src="images/${attraction.image}" alt="${attraction.title}" loading="lazy">
            <div class="discover-card-content">
                <h2>${attraction.title}</h2>
                <p class="address">${attraction.address}</p>
                <p>${attraction.description}</p>
                <a href="#" class="learn-more-btn">Learn More</a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Function to handle visit tracking
function handleVisitTracking() {
    const visitMessage = document.querySelector('.visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date().getTime();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadAttractions();
    handleVisitTracking();
}); 