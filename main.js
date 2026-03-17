// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer para animaciones al scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos los elementos animables
  const animateElements = document.querySelectorAll(
    '.service-card, .feature-card, .testimonial-card-v2, .contact-card, .gallery-item, .stats-box-large'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Smooth scroll para enlaces del navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Animación del navbar al hacer scroll
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
      navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
  });

  // Contador animado para estadísticas
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  };

  // Animar números cuando son visibles
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const statValue = entry.target.querySelector('.stats-number-large');
        if (statValue) {
          const text = statValue.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          if (number) {
            statValue.classList.add('counted');
            animateCounter(statValue, number);
          }
        }
      }
    });
  }, { threshold: 0.5 });

  const statsBox = document.querySelector('.stats-box-large');
  if (statsBox) {
    statsObserver.observe(statsBox);
  }
});

// Animación de testimonios al scroll
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.testimonial-card-v2').forEach(card => {
  testimonialObserver.observe(card);
});

