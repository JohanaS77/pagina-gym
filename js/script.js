// ===== ELEMENTOS DEL DOM =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const scrollIndicator = document.querySelector('.scroll-indicator');

// ===== NAVEGACIÓN =====
// Toggle menú móvil
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll y prevenir enlaces vacíos
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== EFECTOS DE SCROLL =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar scroll effect
    navbar.classList.toggle('scrolled', scrollY > 50);
    
    // Ocultar scroll indicator
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
    }
    
    // Active link on scroll
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
});

// Click en scroll indicator
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// ===== FORMULARIO DE CONTACTO =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validación
    if (!nombre || !email || !telefono || !mensaje) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    if (!/^[0-9]{7,10}$/.test(telefono)) {
        alert('Por favor, ingresa un número de teléfono válido (7-10 dígitos).');
        return;
    }
    
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.`);
    contactForm.reset();
});

// ===== ANIMACIÓN DE ELEMENTOS AL HACER SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.service-card, .pricing-card, .schedule-card, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== BOTONES DE PLANES =====
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        const planPrice = card.querySelector('.price').textContent;
        console.log(`Plan seleccionado: ${planName} - ${planPrice}`);
    });
});

// ===== DESTACAR HORARIO ACTUAL =====
function actualizarHorarioActual() {
    const hoy = new Date().getDay();
    const scheduleCards = document.querySelectorAll('.schedule-card');
    
    scheduleCards.forEach(card => card.style.border = 'none');
    
    if (hoy >= 1 && hoy <= 5) {
        scheduleCards[0].style.border = '3px solid var(--primary-color)';
    } else if (hoy === 6) {
        scheduleCards[1].style.border = '3px solid var(--primary-color)';
    } else {
        scheduleCards[2].style.border = '3px solid #999';
    }
}

window.addEventListener('load', actualizarHorarioActual);

// ===== SLIDER DE GALERÍA =====
const sliderImages = document.querySelectorAll('.slider-image');
const sliderDotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;

// Crear puntos indicadores
sliderImages.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDotsContainer.appendChild(dot);
});

const sliderDots = document.querySelectorAll('.slider-dot');

function goToSlide(slideIndex) {
    sliderImages[currentSlide].classList.remove('active');
    sliderDots[currentSlide].classList.remove('active');
    currentSlide = slideIndex;
    sliderImages[currentSlide].classList.add('active');
    sliderDots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide((currentSlide + 1) % sliderImages.length);
}

setInterval(nextSlide, 5000);

// ===== MODALES =====
const modals = {
    video: {
        modal: document.getElementById('videoModal'),
        video: document.getElementById('modalVideo'),
        title: document.getElementById('modalTitle'),
        close: document.querySelector('.modal-close')
    },
    formulario: {
        modal: document.getElementById('formularioModal'),
        iframe: document.getElementById('formularioIframe'),
        close: document.querySelector('.modal-formulario-close'),
        btn: document.getElementById('btnFormularioCliente')
    }
};

// Modal de Video
document.querySelectorAll('.service-card[data-video]').forEach(card => {
    card.addEventListener('click', () => {
        const { modal, video, title } = modals.video;
        video.src = card.getAttribute('data-video');
        title.textContent = card.getAttribute('data-title');
        modal.style.display = 'block';
        video.play();
    });
});

modals.video.close.addEventListener('click', () => closeModal('video'));

// Modal Formulario Cliente
modals.formulario.btn.addEventListener('click', (e) => {
    e.preventDefault();
    modals.formulario.iframe.src = 'formulario.html';
    modals.formulario.modal.style.display = 'block';
});

modals.formulario.close.addEventListener('click', () => closeModal('formulario'));

// Función para cerrar modales
function closeModal(type) {
    if (type === 'video') {
        const { modal, video } = modals.video;
        modal.style.display = 'none';
        video.pause();
        video.src = '';
    } else if (type === 'formulario') {
        const { modal, iframe } = modals.formulario;
        modal.style.display = 'none';
        iframe.src = '';
    }
}

// Cerrar modales al hacer clic fuera o con ESC
window.addEventListener('click', (e) => {
    if (e.target === modals.video.modal) closeModal('video');
    if (e.target === modals.formulario.modal) closeModal('formulario');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modals.video.modal.style.display === 'block') closeModal('video');
        if (modals.formulario.modal.style.display === 'block') closeModal('formulario');
    }
});

// ===== LAZY LOADING DE IMÁGENES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== CONSOLE LOG =====
console.log('%c¡Bienvenido a GoldenGym Ibagué! 💪', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cDisciplina • Compromiso • Resultados', 'color: #000; font-size: 14px;');