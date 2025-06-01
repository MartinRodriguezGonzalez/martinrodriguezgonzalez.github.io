// Smooth scrolling navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Update active nav link
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Smooth scroll
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        const xPos = Math.sin(scrolled * 0.001 + index) * 20;
        shape.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${scrolled * 0.1}deg)`;
    });
});

// Typing effect for hero description
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced loading animations

document.addEventListener('DOMContentLoaded', () => {            
    // Staggered animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Staggered animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Enhanced typing effect
    const heroDescription = document.querySelector('.hero-description');
    const originalText = heroDescription.textContent;
    setTimeout(() => {
        typeWriter(heroDescription, originalText, 20);
    }, 0);
});

// Performance optimization - throttle scroll events
let ticking = false;

function updateScrollEffects() {
    // Parallax and other scroll effects here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add dynamic background color changes based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = 220 + (scrollPercent * 60); // From blue to purple
    document.documentElement.style.setProperty('--dynamic-hue', hue);
});