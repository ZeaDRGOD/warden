const lenis = new Lenis({
    duration: 1.2, // Animation duration (seconds)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    smoothWheel: true, // Enable smooth mouse wheel scrolling
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Smooth anchor link scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        lenis.scrollTo(targetId, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
    });
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    mobileMenu.classList.toggle('hidden');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Mobile Dropdown Toggle
const dropdownToggle = document.getElementById('dropdown-toggle');
const mobileDropdown = document.getElementById('mobile-dropdown');

dropdownToggle.addEventListener('click', () => {
    mobileDropdown.classList.toggle('hidden');
    dropdownToggle.querySelector('i').classList.toggle('fa-chevron-down');
    dropdownToggle.querySelector('i').classList.toggle('fa-chevron-up');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu and dropdown after clicking
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            mobileMenu.classList.add('hidden');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
        if (!mobileDropdown.classList.contains('hidden')) {
            mobileDropdown.classList.add('hidden');
            dropdownToggle.querySelector('i').classList.add('fa-chevron-down');
            dropdownToggle.querySelector('i').classList.remove('fa-chevron-up');
        }
    });
});