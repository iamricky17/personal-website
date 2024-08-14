document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    registrationForm.addEventListener('submit', function(event) {
        // Clear previous error messages
        errorMessage.innerHTML = '';

        let valid = true;
        let messages = [];

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            valid = false;
            messages.push('Please enter a valid email address.');
        }

        // Password validation
        const password = passwordInput.value;
        if (password.length < 10 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            valid = false;
            messages.push('Password must be at least 10 characters long and contain both alphanumeric characters and special characters.');
        }

        if (!valid) {
            event.preventDefault();
            errorMessage.innerHTML = messages.join('<br>');
        }
    });

    // Clear error messages when the user starts typing
    emailInput.addEventListener('input', () => errorMessage.innerHTML = '');
    passwordInput.addEventListener('input', () => errorMessage.innerHTML = '');
});
