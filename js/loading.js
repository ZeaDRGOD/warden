function loadCSS(href) {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        document.head.appendChild(link);
    });
}

// Simulate loading heavy CSS and assets
window.addEventListener('load', () => {
    // Replace with your actual CSS files or heavy assets
    Promise.all([
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'), // Example heavy CSS
        new Promise(resolve => setTimeout(resolve, 0)) // Simulate additional delay
    ]).then(() => {
        // Hide loader and show content
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('mainContent');
        
        loader.classList.add('loader-hidden');
        mainContent.classList.add('loaded');

        // Optional: Remove loader from DOM after transition
        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    });
});