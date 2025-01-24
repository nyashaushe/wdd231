// spotlights.js

const chamberMembers = [
    {
        "name": "GreenTech Solutions",
        "address": "123 Eco Lane, Harare, Zimbabwe",
        "phone": "+263 71 234 5678",
        "website": "https://greentechsolutions.com",
        "image": "greentech.jpg",
        "membershipLevel": 3,
        "description": "A leader in sustainable energy solutions.",
        "email": "contact@greentechsolutions.com"
    },
    {
        "name": "Farm Fresh Organics",
        "address": "45 Orchard Street, Gweru, Zimbabwe",
        "phone": "+263 77 654 3210",
        "website": "https://farmfreshorganics.co.zw",
        "image": "farmfresh.jpeg",
        "membershipLevel": 2,
        "description": "Providing organic produce to local communities.",
        "email": "info@farmfreshorganics.co.zw"
    },
    {
        "name": "Buildify Contractors",
        "address": "78 Construction Drive, Bulawayo, Zimbabwe",
        "phone": "+263 73 567 8901",
        "website": "https://buildify.co.zw",
        "image": "buildify.png",
        "membershipLevel": 3,
        "description": "Specialists in glazing, aluminum work, and granite installations.",
        "email": "projects@buildify.co.zw"
    },
    {
        "name": "TechNova Innovations",
        "address": "15 Tech Hub, Victoria Falls, Zimbabwe",
        "phone": "+263 74 123 4567",
        "website": "https://technova.com",
        "image": "technova.png",
        "membershipLevel": 1,
        "description": "Innovative technology solutions for businesses.",
        "email": "support@technova.com"
    },
    {
        "name": "Sunset Real Estate",
        "address": "9 Sunset Boulevard, Mutare, Zimbabwe",
        "phone": "+263 79 890 1234",
        "website": "https://sunsetrealestate.com",
        "image": "sunset.png",
        "membershipLevel": 2,
        "description": "Real estate agents for residential and commercial properties.",
        "email": "sales@sunsetrealestate.com"
    },
    {
        "name": "Urban Eats Cafe",
        "address": "101 City Center, Harare, Zimbabwe",
        "phone": "+263 75 432 1098",
        "website": "https://urbaneatscafe.co.zw",
        "image": "urbaneats.png",
        "membershipLevel": 1,
        "description": "Your go-to spot for delicious meals and coffee.",
        "email": "hello@urbaneatscafe.co.zw"
    },
    {
        "name": "AgriPro Supplies",
        "address": "67 Agriculture Road, Masvingo, Zimbabwe",
        "phone": "+263 76 654 9876",
        "website": "https://agriprosupplies.com",
        "image": "agripro.png",
        "membershipLevel": 3,
        "description": "Top supplier of farming equipment and products.",
        "email": "orders@agriprosupplies.com"
    }
];

function displaySpotlights() {
    // Filter for gold (3) and silver (2) members
    const eligibleMembers = chamberMembers.filter(member =>
        member.membershipLevel === 3 || member.membershipLevel === 2
    );

    // Randomly select 2-3 spotlight members
    const randomMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Generate HTML for the spotlights
    const spotlightsHtml = randomMembers.map(member => `
        <div class="spotlight">
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel === 3 ? "Gold" : "Silver"}</p>
            <p><strong>Description:</strong> ${member.description}</p>
        </div>
    `).join('');

    // Append to the business-section in the HTML
    document.querySelector('.business-section').innerHTML = `
        ${spotlightsHtml}
    `;
}

displaySpotlights();
