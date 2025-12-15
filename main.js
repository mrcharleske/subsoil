// ============================================
// BARGHEER GEOPHYSICS - MAIN JAVASCRIPT
// World-class interactions and animations
// ============================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS with premium settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
      anchorPlacement: 'top-bottom'
    });
  }

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('active');
      
      if (isOpen) {
        mobileMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu when overlay clicked
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // ============================================
  // STICKY NAVIGATION
  // ============================================
  const navigation = document.querySelector('nav');
  let lastScroll = 0;

  if (navigation) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navigation.classList.add('scrolled');
      } else {
        navigation.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only prevent default for same-page anchors
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ============================================
  // FORM VALIDATION (for contact page)
  // ============================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      let isValid = true;
      let errors = [];

      // Basic validation
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      if (!name || name.trim().length < 2) {
        errors.push('Please enter a valid name');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
      }

      if (!message || message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
        isValid = false;
      }

      if (isValid) {
        // Show success message
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      } else {
        // Show error messages
        showFormMessage(errors.join('<br>'), 'error');
      }
    });
  }

  // Helper function to show form messages
  function showFormMessage(message, type) {
    const existingMessage = document.getElementById('form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.id = 'form-message';
    messageDiv.innerHTML = message;
    messageDiv.style.cssText = `
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 8px;
      font-weight: 500;
      animation: slideInDown 0.4s ease-out;
      ${type === 'success' 
        ? 'background: #d1fae5; color: #065f46; border-left: 4px solid #10b981;' 
        : 'background: #fee2e2; color: #991b1b; border-left: 4px solid #ef4444;'
      }
    `;

    contactForm.insertAdjacentElement('beforebegin', messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.animation = 'slideOutUp 0.4s ease-out';
      setTimeout(() => messageDiv.remove(), 400);
    }, 5000);
  }

  // ============================================
  // PARALLAX EFFECT ON HERO SECTIONS
  // ============================================
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }

  // ============================================
  // DROPDOWN MENU FUNCTIONALITY
  // ============================================
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdown = this.nextElementSibling;
      
      if (dropdown && dropdown.classList.contains('dropdown-menu')) {
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
      });
    }
  });

  // ============================================
  // CARD HOVER EFFECTS (3D TILT)
  // ============================================
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // ============================================
  // SCROLL PROGRESS INDICATOR
  // ============================================
  const progressBar = document.getElementById('scroll-progress');
  
  if (progressBar) {
    window.addEventListener('scroll', function() {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ============================================
  // VIDEO HERO AUTO-PAUSE ON SCROLL
  // ============================================
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    window.addEventListener('scroll', function() {
      const videoRect = heroVideo.getBoundingClientRect();
      
      // Pause video when it's out of viewport
      if (videoRect.bottom < 0 || videoRect.top > window.innerHeight) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(() => {
          // Autoplay was prevented
        });
      }
    });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // REGISTER SERVICE WORKER (PWA)
  // ============================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully');
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
      }
