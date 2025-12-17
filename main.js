// main.js - Menu, scroll effects, and other interactions

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  }
  
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  menuOverlay.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when clicking a link (except parent links)
  document.addEventListener('click', function(e) {
    if (e.target.matches('#mobile-menu a:not(.mobile-nav-parent)')) {
      toggleMobileMenu();
    }
  });
  
  // Scroll progress bar
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
  
  // Navbar scroll effect
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Desktop dropdown CLICK functionality (not hover)
  // Wait a bit for content to load, then add dropdown listeners
  setTimeout(function() {
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    
    dropdownItems.forEach(item => {
      const mainLink = item.querySelector('.nav-link-with-dropdown');
      const dropdown = item.querySelector('.dropdown-menu');
      
      mainLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-item-dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  }, 500);
  
});

