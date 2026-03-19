document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.immersive-hero');

    window.addEventListener('scroll', () => {
        if (hero && window.scrollY > hero.offsetHeight - 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Bottle Carousel Implementation
    const track = document.getElementById('bottle-track');
    const heroBg = document.getElementById('hero-bg');

    if (track) {
        const bgGradients = [
            'radial-gradient(circle, rgba(148, 163, 184, 0.3) 0%, rgba(255, 255, 255, 0) 60%)', // white 
            'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, rgba(255, 255, 255, 0) 60%)', // pink 
            'radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, rgba(255, 255, 255, 0) 60%)', // yellow 
            'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(255, 255, 255, 0) 60%)', // green
            'radial-gradient(circle, rgba(71, 85, 105, 0.25) 0%, rgba(255, 255, 255, 0) 60%)'  // black
        ];
        
        let currentIndex = 0;
        const totalSlides = 5;

        if (heroBg) heroBg.style.background = bgGradients[currentIndex];

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            
            // Slide track horizontally
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update immersive background smoothly
            if (heroBg) {
                heroBg.style.background = bgGradients[currentIndex];
            }
        }, 3000); // Change slide every 3 seconds
    }

    // Beta form submission mock
    const betaForm = document.getElementById('beta-form');
    const formMessage = document.getElementById('form-message');

    if(betaForm) {
        betaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            betaForm.style.display = 'none';
            formMessage.classList.remove('hidden');
        });
    }
});
