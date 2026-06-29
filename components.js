// Path resolution helper to ensure images/links work from both root and subdirectories
function getBasePath() {
    // If we are in a subdirectory (like /services/), go up one level
    return window.location.pathname.includes('/services/') ? '../' : './';
}

const navbarHTML = `
    <nav id="navbar" class="glass-nav">
        <div class="nav-container">
            <a href="${getBasePath()}index.html" class="logo">
                <img src="https://res.cloudinary.com/duuqawuka/image/upload/v1782737247/VectrosparkLogo.png" alt="VectroSpark Logo">
            </a>
            <div class="nav-links">
                <a href="${getBasePath()}index.html">Home</a>
                <a href="${getBasePath()}process.html">Process</a>
                <a href="${getBasePath()}services.html">Services</a>
                <a href="${getBasePath()}reviews.html">Reviews</a>
                <a href="${getBasePath()}contact.html" class="btn-primary" style="padding: 0.5rem 1rem;">Let's Talk</a>
            </div>
        </div>
    </nav>
`;

const footerHTML = `
    <footer id="contact" class="footer">
        <div class="footer-container">
            <div class="footer-brand">
                <img src="https://res.cloudinary.com/duuqawuka/image/upload/v1782737247/VectrosparkLogo.png" alt="VectroSpark Logo" class="footer-logo">
                <p>Sparking innovation in digital media.</p>
            </div>
            <div class="footer-links">
                <h3>Quick Links</h3>
                <a href="${getBasePath()}index.html">Home</a>
                <a href="${getBasePath()}index.html#services">Services</a>
                <a href="${getBasePath()}contact.html">Contact</a>
                <a href="${getBasePath()}admin.html" style="color: var(--accent-1);">Admin Center</a>
            </div>
            <div class="footer-contact">
                <h3>Contact</h3>
                <p>hello@vectrospark.com</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 VectroSpark. All rights reserved.</p>
        </div>
    </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = navbarHTML;
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // Re-initialize navbar scroll effect after dynamic injection
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(5, 5, 10, 0.85)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(5, 5, 10, 0.6)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
});
