// ============================================
// NAVIGATION & MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// STICKY HEADER
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// DOCTOR PROFILE TOGGLE
// ============================================
function toggleDoctor(doctorId) {
    const details = document.getElementById(`details-${doctorId}`);
    const button = event.currentTarget;
    const btnText = button.querySelector('.btn-text');
    const btnArrow = button.querySelector('.btn-arrow');
    
    if (details.classList.contains('expanded')) {
        // Collapse
        details.classList.remove('expanded');
        btnText.textContent = 'View Complete Profile';
        button.classList.remove('expanded');
    } else {
        // Expand
        details.classList.add('expanded');
        btnText.textContent = 'View Less';
        button.classList.add('expanded');
        
        // Smooth scroll to show expanded content
        setTimeout(() => {
            details.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
    }
}

// ============================================
// DOCTOR IMAGE PLACEHOLDERS
// ============================================
const doctorImages = [
    { 
        id: 'img-pinki', 
        name: 'DR. PINKI', 
        gradient: 'linear-gradient(135deg, #751F5C, #8b2f6b)' 
    },
    { 
        id: 'img-shyam', 
        name: 'DR. SHYAM\nKISHORE', 
        gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)' 
    }
];

doctorImages.forEach(({ id, name, gradient }) => {
    const img = document.getElementById(id);
    if (img) {
        img.addEventListener('error', function() {
            const wrapper = this.parentElement;
            wrapper.style.background = gradient;
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                color: white;
                font-size: 2rem;
                font-weight: 900;
                font-family: 'Poppins', sans-serif;
                text-align: center;
                text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
                white-space: pre-line;
                line-height: 1.2;
                padding: 20px;
            `;
            placeholder.textContent = name;
            wrapper.appendChild(placeholder);
            
            this.style.display = 'none';
        });
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for fade-in animation
const animateElements = document.querySelectorAll(
    '.doctor-card, .service-card, .feature-card, .testimonial-card, .gallery-item, .info-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// APPOINTMENT FORM
// ============================================
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(appointmentForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `*Appointment Request*\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
        const whatsappURL = `https://wa.me/919229235807?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success message
        alert('Thank you! Your appointment request is being sent via WhatsApp. We will contact you shortly.');
        
        // Reset form
        appointmentForm.reset();
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty # links
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// WAVE ANIMATION PARALLAX
// ============================================
const waves = document.querySelectorAll('.wave-1, .wave-2');
let ticking = false;

function updateWaves() {
    const scrolled = window.pageYOffset;
    
    waves.forEach((wave, index) => {
        const speed = (index + 1) * 0.03;
        if (wave) {
            wave.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateWaves);
        ticking = true;
    }
});

// ============================================
// STAT COUNTER ANIMATION (Hero Section)
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const isRating = target.includes('/');
    const number = parseFloat(target.replace(/[^0-9.]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const step = number / 60;
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (isRating) {
                element.textContent = current.toFixed(1) + '/5';
            } else {
                element.textContent = Math.floor(current).toLocaleString() + (isPlus ? '+' : '');
            }
        }
    }, duration / 60);
};

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 120) {
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

// ============================================
// HOVER EFFECTS FOR CARDS
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
const featureCards = document.querySelectorAll('.feature-card');

[...serviceCards, ...featureCards].forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', () => {
    // Fade in header
    header.style.animation = 'fadeInDown 0.6s ease';
    
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'fadeInUp 0.8s ease forwards';
        }, index * 200);
    });
});

// ============================================
// ADD CSS KEYFRAMES DYNAMICALLY
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        background: rgba(255, 255, 255, 0.15);
        color: #67e8f9;
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🏥 Navjeevan Nursing Home', 'font-size: 20px; font-weight: bold; color: #751F5C;');
console.log('%c24/7 Medical Care in Purnia', 'font-size: 14px; color: #0891b2;');
console.log('%cWebsite loaded successfully!', 'font-size: 12px; color: #10b981;');
