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
  
  // Desktop dropdown hover functionality
  // Wait a bit for content to load, then add dropdown listeners
  setTimeout(function() {
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    
    dropdownItems.forEach(item => {
      const dropdown = item.querySelector('.dropdown-menu');
      
      item.addEventListener('mouseenter', function() {
        dropdown.style.display = 'block';
        setTimeout(() => {
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0)';
        }, 10);
      });
      
      item.addEventListener('mouseleave', function() {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          dropdown.style.display = 'none';
        }, 300);
      });
    });
  }, 500);
  
});
