// This file contains the JavaScript code for the application, handling user interactions, dynamic content updates, and any necessary API calls.

// Example of a simple function to handle a button click
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login');
    loginButton.addEventListener('click', () => {
        alert('Login button clicked!');
        // Add your login logic here
    });
});

// Function to check if the app is running as a PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Running in standalone mode');
} else {
    console.log('Running in browser mode');
}