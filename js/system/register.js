// Simple client-side hash function (not secure for production)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

// IndexedDB setup
const dbName = 'UsersDB';
const storeName = 'users';
let db;

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const store = db.createObjectStore(storeName, { keyPath: 'email' });
    store.createIndex('email', 'email', { unique: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
    checkLoginStatus();
};

request.onerror = (event) => {
    console.error('Database error:', event.target.errorCode);
};

// Check login status and redirect
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'billing.html';
    }
}

// Form toggle
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');

showLogin.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    showLogin.classList.add('active');
    showRegister.classList.remove('active');
});

showRegister.addEventListener('click', () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    showRegister.classList.add('active');
    showLogin.classList.remove('active');
});

// Register form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = simpleHash(document.getElementById('register-password').value);
    const error = document.getElementById('register-error');
    const success = document.getElementById('register-success');

    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    // Check if email exists
    const getRequest = store.get(email);
    getRequest.onsuccess = () => {
        if (getRequest.result) {
            error.textContent = 'Email already exists';
            error.style.display = 'block';
            success.style.display = 'none';
        } else {
            // Add new user
            store.add({ username, email, password });
            error.style.display = 'none';
            success.style.display = 'block';
            registerForm.reset();
        }
    };

    getRequest.onerror = () => {
        error.textContent = 'Error checking email';
        error.style.display = 'block';
        success.style.display = 'none';
    };
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = simpleHash(document.getElementById('login-password').value);
    const error = document.getElementById('login-error');

    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const getRequest = store.get(email);

    getRequest.onsuccess = () => {
        const user = getRequest.result;
        if (user && user.password === password) {
            error.style.display = 'none';
            localStorage.setItem('loggedInUser', email);
            window.location.href = 'billing.html';
        } else {
            error.textContent = 'Invalid email or password';
            error.style.display = 'block';
        }
    };

    getRequest.onerror = () => {
        error.textContent = 'Error during login';
        error.style.display = 'block';
    };
});