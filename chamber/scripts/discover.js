// Function to load discover data and create image cards
async function loadDiscoverData() {
    try {
        const response = await fetch('data/discover.json');
        const data = await response.json();
        const discoverGrid = document.querySelector('.discover-grid');

        data.attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'discover-card';

            const img = document.createElement('img');
            img.src = `images/${attraction.image}`;
            img.alt = attraction.title;
            img.loading = 'lazy'; // Enable lazy loading

            const details = document.createElement('div');
            details.className = 'card-details';
            
            details.innerHTML = `
                <h2>${attraction.title}</h2>
                <p class="address">${attraction.address}</p>
                <p class="description">${attraction.description}</p>
            `;

            card.appendChild(img);
            card.appendChild(details);
            discoverGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading discover data:', error);
    }
}

// Function to handle visit message
function handleVisitMessage() {
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

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadDiscoverData();
    handleVisitMessage();
}); 