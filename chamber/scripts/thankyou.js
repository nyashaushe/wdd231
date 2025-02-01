// Display form submission details
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const details = document.getElementById('submission-details');
    
    const fields = {
        'firstname': 'First Name',
        'lastname': 'Last Name',
        'email': 'Email',
        'phone': 'Phone',
        'business': 'Business Name',
        'timestamp': 'Submission Time'
    };

    let html = '<dl>';
    for (const [param, label] of Object.entries(fields)) {
        if (params.has(param)) {
            html += `<dt>${label}:</dt><dd>${params.get(param)}</dd>`;
        }
    }
    html += '</dl>';
    
    details.innerHTML = html;

    // Set current year in footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();
} 