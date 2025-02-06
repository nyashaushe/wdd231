document.addEventListener('DOMContentLoaded', async () => {
    // Handle visit message
    const visitMessage = document.querySelector('.visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentDate);

    // Load and display attractions from JSON
    try {
        const response = await fetch('data/discover.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        const discoverGrid = document.querySelector('.discover-grid');
        discoverGrid.innerHTML = ''; // Clear existing content

        data.attractions.forEach((attraction, index) => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <h2>${attraction.title}</h2>
                <figure>
                    <img src="images/discover/${attraction.image}" 
                         alt="${attraction.title}" 
                         loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button class="button">Learn More</button>
            `;
            discoverGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading attractions:', error);
    }
}); 