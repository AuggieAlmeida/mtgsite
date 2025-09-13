(function(){
  'use strict';
  
  const track = document.querySelector('.carousel__track');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel__slide'));
  const prevBtn = document.querySelector('.carousel__button--left');
  const nextBtn = document.querySelector('.carousel__button--right');
  const indicators = Array.from(document.querySelectorAll('.carousel__indicator'));
  
  let currentIndex = 0;
  let autoInterval = null;
  let isTransitioning = false;
  
  const AUTO_DELAY = 6000;
  const TRANSITION_DURATION = 500;

  function updateIndicators() {
    indicators.forEach((btn, i) => {
      const isActive = i === currentIndex;
      btn.classList.toggle('bg-white', isActive);
      btn.classList.toggle('bg-white/50', !isActive);
      btn.setAttribute('aria-selected', isActive.toString());
    });
  }

  function goTo(index, direction = 'next') {
    if (isTransitioning) return;
    
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    if (index === currentIndex) return;
    
    isTransitioning = true;
    
    const previousIndex = currentIndex;
    currentIndex = index;
    
    // Add slide animation class based on direction
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators with animation
    updateIndicators();
    
    // Reset transition lock
    setTimeout(() => {
      isTransitioning = false;
    }, TRANSITION_DURATION);
    
    // Announce slide change for screen readers
    track.setAttribute('aria-live', 'polite');
    const currentSlide = slides[currentIndex];
    const slideTitle = currentSlide.querySelector('h2')?.textContent || `Slide ${currentIndex + 1}`;
    track.setAttribute('aria-label', `${slideTitle}, slide ${currentIndex + 1} of ${slides.length}`);
  }

  // Auto-advance functions
  function startAuto() {
    stopAuto();
    autoInterval = setInterval(() => { 
      goTo(currentIndex + 1, 'next');
    }, AUTO_DELAY);
  }
  
  function stopAuto() { 
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }
  
  function resetAuto() { 
    stopAuto(); 
    startAuto(); 
  }

  // Event listeners
  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-slide-to'));
      if (!isNaN(idx)) {
        goTo(idx);
        resetAuto();
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => { 
      goTo(currentIndex - 1, 'prev'); 
      resetAuto(); 
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => { 
      goTo(currentIndex + 1, 'next'); 
      resetAuto(); 
    });
  }

  // Pause on hover/focus
  const carouselEl = document.querySelector('.carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopAuto);
    carouselEl.addEventListener('mouseleave', startAuto);
    carouselEl.addEventListener('focusin', stopAuto);
    carouselEl.addEventListener('focusout', startAuto);
  }

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      goTo(currentIndex + 1, 'next');
      resetAuto();
    }
    if (touchEndX > touchStartX + 50) {
      goTo(currentIndex - 1, 'prev');
      resetAuto();
    }
  }

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only respond if carousel is in focus or no other interactive element is focused
    const activeElement = document.activeElement;
    const isCarouselFocused = carouselEl?.contains(activeElement);
    
    if (isCarouselFocused || activeElement === document.body) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(currentIndex - 1, 'prev');
        resetAuto();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(currentIndex + 1, 'next');
        resetAuto();
      }
    }
  });

  // Wait for images to load
  const imgs = track.querySelectorAll('img');
  let imgCount = imgs.length;
  
  if (imgCount === 0) {
    goTo(0);
    startAuto();
  } else {
    imgs.forEach(img => {
      if (img.complete) {
        imgCount--;
      } else {
        img.addEventListener('load', () => {
          imgCount--;
          if (imgCount === 0) {
            goTo(0);
            startAuto();
          }
        });
      }
    });
  }

  // Initialize
  goTo(0);
  startAuto();

  // Pause when tab becomes inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
  });
})();
