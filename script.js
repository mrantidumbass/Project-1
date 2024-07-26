document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Add event listeners for real-time validation
    fullName.addEventListener('input', validateFullName);
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);

    // Form submission event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    // Validation functions
    function validateFullName() {
        const fullNameValue = fullName.value.trim();
        const fullNameError = document.getElementById('fullNameError');

        if (fullNameValue.length < 5) {
            showError(fullName, fullNameError, 'Name must be at least 5 characters long');
            return false;
        } else {
            hideError(fullName, fullNameError);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        const emailError = document.getElementById('emailError');

        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            showError(email, emailError, 'Enter a valid email address');
            return false;
        } else {
            hideError(email, emailError);
            return true;
        }
    }

    function validatePhone() {
        const phoneValue = phone.value.trim();
        const phoneError = document.getElementById('phoneError');

        if (phoneValue === '123456789' || phoneValue.length !== 10 || isNaN(phoneValue)) {
            showError(phone, phoneError, 'Enter a valid 10-digit phone number');
            return false;
        } else {
            hideError(phone, phoneError);
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = password.value;
        const passwordError = document.getElementById('passwordError');

        if (passwordValue.length < 8 || 
            passwordValue.toLowerCase() === 'password' || 
            passwordValue.toLowerCase() === fullName.value.toLowerCase() ||
            passwordValue === '123456789') {
            showError(password, passwordError, 'Password must be at least 8 characters long and cannot be "password", your name, or "123456789"');
            return false;
        } else {
            hideError(password, passwordError);
            return true;
        }
    }

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPassword.value;
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        if (confirmPasswordValue !== password.value) {
            showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
            return false;
        } else {
            hideError(confirmPassword, confirmPasswordError);
            return true;
        }
    }

    // Helper functions to show/hide error messages
    function showError(input, errorElement, errorMessage) {
        input.classList.add('is-invalid');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }

    function hideError(input, errorElement) {
        input.classList.remove('is-invalid');
        errorElement.style.display = 'none';
    }

    // Validate all fields
    function validateForm() {
        return (
            validateFullName() &&
            validateEmail() &&
            validatePhone() &&
            validatePassword() &&
            validateConfirmPassword()
        );
    }
});
