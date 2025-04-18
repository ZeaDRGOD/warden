// Redirect to register.html if not logged in
const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'login.html';
}

// Logout
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});