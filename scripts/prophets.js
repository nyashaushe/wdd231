// Declare a const variable "url" that contains the URL string of the JSON resource provided
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Declare a const variable "cards" that selects the HTML div element with id "cards"
const cards = document.querySelector('#cards');

// Create an async function "getProphetData" to fetch data from the JSON source URL
async function getProphetData(url) {
  const response = await fetch(url);  // Fetch the data from the URL
  const data = await response.json();  // Convert the response to JSON
  // Temporary testing of data response in console
  console.table(data.prophets);  // This logs the prophets array in a neat table format
  // Call the displayProphets function, passing the data.prophets array
  displayProphets(data.prophets);
}

// Call the getProphetData function to test the fetch and response
getProphetData(url);

// Define the displayProphets function to handle displaying the prophets on the page
const displayProphets = (prophets) => {
  // Loop through each prophet in the array
  prophets.forEach((prophet) => {
    // Create a section element for the card
    const card = document.createElement('section');
    
    // Create an h2 element for the prophet's full name
    const fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;  // Set the text content as the full name
    
    // Create p elements for Date of Birth and Place of Birth
    const dob = document.createElement('p');
    dob.textContent = `Date of Birth: ${prophet.birthdate}`;  // Display Date of Birth
    
    const pob = document.createElement('p');
    pob.textContent = `Place of Birth: ${prophet.birthplace}`;  // Display Place of Birth
    
    // Create an img element for the prophet's portrait
    const portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);  // Set the image URL
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);  // Set the alt text
    portrait.setAttribute('loading', 'lazy');  // Set lazy loading for performance
    portrait.setAttribute('width', '300');  // Set the image width
    portrait.setAttribute('height', '400');  // Set the image height
    
    // Append the heading, Date of Birth, Place of Birth, and image to the card section
    card.appendChild(fullName);
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(portrait);
    
    // Append the card to the "cards" div
    cards.appendChild(card);
  });
};
