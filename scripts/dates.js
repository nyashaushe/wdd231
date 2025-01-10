// Set current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});