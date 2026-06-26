/**
 * RotaVip Landing Page — Interactive Script
 * Handles: header scroll, mobile menu, calculator, FAQ accordion,
 * pricing toggle, testimonials slider, and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // 1. HEADER SCROLL EFFECT
  // ========================================
  const header = document.getElementById('header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ========================================
  // 2. MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });

    // Close menu on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
      });
    });
  }

  // ========================================
  // 3. ACTIVE NAV LINK ON SCROLL
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ========================================
  // 4. SAVINGS CALCULATOR
  // ========================================
  const calcStops = document.getElementById('calc-stops');
  const calcDays = document.getElementById('calc-days');
  const calcFuel = document.getElementById('calc-fuel');
  const stopsValue = document.getElementById('stops-value');
  const daysValue = document.getElementById('days-value');
  const fuelValue = document.getElementById('fuel-value');
  const calcSavings = document.getElementById('calc-savings');
  const calcLiters = document.getElementById('calc-liters');
  const calcHours = document.getElementById('calc-hours');

  const updateCalculator = () => {
    if (!calcStops || !calcDays || !calcFuel) return;

    const stops = parseInt(calcStops.value);
    const days = parseInt(calcDays.value);
    const fuel = parseFloat(calcFuel.value);

    // Display current values
    stopsValue.textContent = stops;
    daysValue.textContent = days;
    fuelValue.textContent = `R$ ${fuel.toFixed(2).replace('.', ',')}`;

    // Calculation logic:
    // Average saving per stop: ~0.8 km less driven
    // Average fuel consumption: 12 km/L (moto) to 8 km/L (car), use 10 km/L avg
    // Average time saving per stop: ~3 minutes
    const kmSavedPerDay = stops * 0.8;
    const litersSavedPerDay = kmSavedPerDay / 10;
    const litersSavedPerMonth = litersSavedPerDay * days;
    const moneySaved = litersSavedPerMonth * fuel;
    const hoursSaved = (stops * 3 * days) / 60; // minutes to hours

    // Animate value updates
    calcSavings.textContent = `R$ ${Math.round(moneySaved).toLocaleString('pt-BR')}`;
    calcLiters.textContent = `${Math.round(litersSavedPerMonth)} L`;
    calcHours.textContent = `${Math.round(hoursSaved)}h`;
  };

  if (calcStops) calcStops.addEventListener('input', updateCalculator);
  if (calcDays) calcDays.addEventListener('input', updateCalculator);
  if (calcFuel) calcFuel.addEventListener('input', updateCalculator);
  
  // Initial calculation
  updateCalculator();

  // ========================================
  // 5. PRICING TOGGLE (Monthly <-> Annual)
  // ========================================
  const pricingToggle = document.getElementById('pricing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual = document.getElementById('label-annual');
  const priceMonthly = document.querySelectorAll('.price-monthly');
  const priceAnnual = document.querySelectorAll('.price-annual');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;
      
      labelMonthly.classList.toggle('active', !isAnnual);
      labelAnnual.classList.toggle('active', isAnnual);
      
      priceMonthly.forEach(el => el.style.display = isAnnual ? 'none' : 'inline');
      priceAnnual.forEach(el => el.style.display = isAnnual ? 'inline' : 'none');
    });
  }

  // ========================================
  // 6. FAQ ACCORDION
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        otherAnswer.style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ========================================
  // 7. TESTIMONIALS SLIDER
  // ========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoSlideInterval;

  const showSlide = (index) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    showSlide((currentSlide + 1) % slides.length);
  };

  // Auto-rotate every 6 seconds
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 6000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      showSlide(index);
      resetAutoSlide();
    });
  });

  if (slides.length > 0) {
    startAutoSlide();
  }

  // ========================================
  // 8. SCROLL REVEAL ANIMATIONS
  // ========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========================================
  // 9. SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
