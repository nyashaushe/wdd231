document.addEventListener('DOMContentLoaded', function () {
    const spotlightContainer = document.querySelector('.spotlight-cards');

    // Fetch member data from the JSON file
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            // Filter members by Gold or Silver membership level (membershipLevel 2 and 3)
            const filteredMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

            // Shuffle members for random display
            const randomMembers = getRandomMembers(filteredMembers, 3); // Display 2 random members

            // Generate HTML for spotlight cards
            // my classes are spotlight-logo, spotlight-card
            let spotlightHTML = '';
            randomMembers.forEach(member => {
                spotlightHTML += `
                    <div class="spotlight-card">
                        <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-logo">
                        <h3>${member.name}</h3>
                        <p>Phone: ${member.phone}</p>
                        <p>Address: ${member.address}</p>
                        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                        <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
                        <p>${member.description}</p>
                        <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
                    </div>
                `;
            });

            spotlightContainer.innerHTML = spotlightHTML;
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
            spotlightContainer.innerHTML = '<p>Error loading spotlight data.</p>';
        });

    // Function to get random members
    function getRandomMembers(array, count) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
});
