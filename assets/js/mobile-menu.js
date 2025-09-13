(function() {
  'use strict';
  
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!mobileToggle || !mobileMenu) return;
  
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Toggle visibility classes
    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    
    // Update button aria attributes
    mobileToggle.setAttribute('aria-expanded', isMenuOpen.toString());
    mobileToggle.setAttribute('aria-label', isMenuOpen ? 'Fechar menu' : 'Abrir menu');
    
    // Toggle icon animation
    const icon = mobileToggle.querySelector('svg');
    if (icon) {
      icon.style.transform = isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    }
    
    // Add smooth slide animation
    if (isMenuOpen) {
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
      requestAnimationFrame(() => {
        mobileMenu.style.transition = 'all 0.3s ease-in-out';
        mobileMenu.style.maxHeight = '300px';
        mobileMenu.style.opacity = '1';
      });
    } else {
      mobileMenu.style.transition = 'all 0.3s ease-in-out';
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
      setTimeout(() => {
        if (!isMenuOpen) {
          mobileMenu.style.maxHeight = '';
          mobileMenu.style.opacity = '';
          mobileMenu.style.transition = '';
        }
      }, 300);
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }
  
  // Toggle menu on button click
  mobileToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggleMenu();
    }
  });
  
  // Close menu on window resize if screen becomes large
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      toggleMenu();
    }
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });
  
  // Initialize button attributes
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.setAttribute('aria-label', 'Abrir menu');
})();