document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Set current year in footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    };

    // Close modal when clicking X
    document.querySelectorAll('.close').forEach(button => {
        button.onclick = function() {
            closeModal(this.closest('.modal').id);
        };
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
} 