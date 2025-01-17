// Fetch Member Data
const fetchMembers = async () => {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load member data');
        const members = await response.json();
        displayMembers(members, 'grid'); // Default view: grid
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
};

// Display Members
const displayMembers = (members, view) => {
    const memberList = document.getElementById('member-list');
    memberList.className = view; // Set view class (grid or list)
    memberList.innerHTML = ''; // Clear current content

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" width="200" height="200">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
            <p>${member.description}</p>
        `;
        memberList.appendChild(card);
    });
};

// Membership Level Helper
const getMembershipLevel = (level) => {
    return level === 3 ? 'Gold' : level === 2 ? 'Silver' : 'Member';
};

// View Toggle
document.getElementById('grid-view').addEventListener('click', () => {
    fetchMembers().then(() => document.getElementById('member-list').className = 'grid');
});

document.getElementById('list-view').addEventListener('click', () => {
    fetchMembers().then(() => document.getElementById('member-list').className = 'list');
});

// Footer Info
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Initialize
fetchMembers();
