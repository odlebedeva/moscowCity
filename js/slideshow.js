// Данные слайдов - кириллица отображается корректно
const slidesData = [
    {
        id: "tower_neva",
        name: "Neva Towers",
        file: "tower/ru/tower_neva.html",
        img: "slidesImg/tower_neva.jpg",
        alt: "Neva Towers — элитный жилой комплекс с панорамным видом на Москва-Сити",
        shortName: "Neva Towers"
    },
    {
        id: "tower_afimoll",
        name: "ТРЦ Афимолл",
        file: "tower/ru/tower_afimoll.html",
        img: "slidesImg/tower_afimol.jpg",
        alt: "Торгово-развлекательный центр Афимолл — более 400 магазинов в Москва-Сити",
        shortName: "Афимолл"
    },
    {
        id: "tower_federation",
        name: "Башня Федерация",
        file: "tower/ru/tower_federation.html",
        img: "slidesImg/tower_federation.jpg",
        alt: "Башня Федерация — одна из самых высоких башен Европы и легенда Москва-Сити",
        shortName: "Федерация"
    },
    {
        id: "tower_capital",
        name: "Башня Город столиц",
        file: "tower/ru/tower_capital.html",
        img: "slidesImg/tower_capital.jpg",
        alt: "Башня Город столиц — комплекс из двух небоскребов в Москва-Сити",
        shortName: "Город столиц"
    },
    {
        id: "tower_embakment",
        name: "Башня на набережной",
        file: "tower/ru/tower_embakment.html",
        img: "slidesImg/tower_embakment.jpg",
        alt: "Башня на набережной — один из первых небоскребов Москва-Сити",
        shortName: "На набережной"
    },
    {
        id: "tower_mercury",
        name: "Башня Меркурий",
        file: "tower/ru/tower_mercury.html",
        img: "slidesImg/tower_mercury.jpg",
        alt: "Башня Меркурий — бизнес-центр с уникальной архитектурой в Москва-Сити",
        shortName: "Меркурий"
    },
    {
        id: "tower_imperia",
        name: "Башня Империя",
        file: "tower/ru/tower_imperia.html",
        img: "slidesImg/tower_imperia.jpg",
        alt: "Башня Империя — многофункциональный комплекс в Москва-Сити",
        shortName: "Империя"
    },
    {
        id: "tower_evolution",
        name: "Башня Эволюция",
        file: "tower/ru/tower_evolution.html",
        img: "slidesImg/tower_evolution.jpg",
        alt: "Башня Эволюция — уникальная винтообразная башня в Москва-Сити",
        shortName: "Эволюция"
    },
    {
        id: "tower_eurasia",
        name: "Башня Евразия",
        file: "tower/ru/tower_eurasia.html",
        img: "slidesImg/tower_eurasia.jpg",
        alt: "Башня Евразия (ВТБ) — один из небоскребов Москва-Сити",
        shortName: "Евразия"
    },
    {
        id: "tower_north",
        name: "Северная башня",
        file: "tower/ru/tower_north.html",
        img: "slidesImg/tower_north.jpg",
        alt: "Северная башня — современный бизнес-центр в Москва-Сити",
        shortName: "Северная"
    },
    {
        id: "tower_2000",
        name: "Башня 2000",
        file: "tower/ru/tower_2000.html",
        img: "slidesImg/tower_2000.jpg",
        alt: "Башня 2000 — первая башня Москва-Сити, построенная в 2001 году",
        shortName: "2000"
    },
    {
        id: "tower_iq",
        name: "IQ-центр",
        file: "tower/ru/tower_iq.html",
        img: "slidesImg/tower_iq.jpg",
        alt: "IQ-центр — современный офисный комплекс в Москва-Сити",
        shortName: "IQ-центр"
    },
    {
        id: "tower_oko",
        name: "Башня ОКО",
        file: "tower/ru/tower_oko.html",
        img: "slidesImg/tower_oko.jpg",
        alt: "Башня ОКО — второй по высоте небоскреб Европы в Москва-Сити",
        shortName: "ОКО"
    },
    {
        id: "bridge_bagration",
        name: "Мост Багратион",
        file: "tower/ru/bridge_bagration.html",
        img: "slidesImg/bridge_bagration.jpg",
        alt: "Мост Багратион — крытый пешеходный мост между Башней 2000 и Москва-Сити",
        shortName: "Мост Багратион"
    }
];
// Конфигурация слайдера
const config = {
  autoplayDelay: 4000,      // 4 секунды на слайд
  autoplayEnabled: true,
  swipeThreshold: 50        // минимальное расстояние для свайпа (px)
};

let currentIndex = 0;
let autoplayInterval = null;
let isAnimating = false;
let touchStartX = 0;
let touchEndX = 0;

// DOM элементы
let slidesWrapper, dotsContainer, prevBtn, nextBtn, progressBar;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  slidesWrapper = document.getElementById('slides-wrapper');
  dotsContainer = document.getElementById('dotsContainer');
  prevBtn = document.getElementById('prevSlide');
  nextBtn = document.getElementById('nextSlide');
  progressBar = document.getElementById('progressBar');

  if (!slidesWrapper) return;

  renderSlides();
  createDots();
  updateSlides();
  attachEventListeners();
  startAutoplay();
  setupSwipe();
});

// Рендер всех слайдов (размер 1075×632)
function renderSlides() {
  slidesWrapper.innerHTML = slidesData.map((slide, idx) => `
    <div class="mySlides" data-index="${idx}">
      <div class="slide-number">${idx + 1} / ${slidesData.length}</div>
      <a href="${slide.file}" class="slide-link">
        <img class="slide-image"
             src="image/${slide.img}"
             alt="${slide.alt}"
             width="1075"
             height="632"
             loading="${idx < 2 ? 'eager' : 'lazy'}"
             decoding="async">
      </a>
      <div class="slide-caption">${slide.name}</div>
    </div>
  `).join('');
}

// Создание точек пагинации
function createDots() {
  dotsContainer.innerHTML = slidesData.map((_, idx) =>
    `<span class="dot" data-dot="${idx}" role="button" tabindex="0" aria-label="Перейти к слайду ${idx + 1}"></span>`
  ).join('');
}

// Обновление активного слайда
function updateSlides() {
  const slides = document.querySelectorAll('.mySlides');
  const dots = document.querySelectorAll('.dot');

  slides.forEach((slide, idx) => {
    if (idx === currentIndex) {
      slide.classList.add('active');
      slide.style.display = 'block';
    } else {
      slide.classList.remove('active');
      slide.style.display = 'none';
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Обновляем aria-метки
  const container = document.getElementById('slideshow-container');
  if (container) {
    container.setAttribute('aria-label', `Слайд ${currentIndex + 1} из ${slidesData.length}: ${slidesData[currentIndex].name}`);
  }
}

// Переключение на следующий/предыдущий слайд
function goToSlide(index) {
  if (isAnimating) return;
  if (index < 0) index = slidesData.length - 1;
  if (index >= slidesData.length) index = 0;

  isAnimating = true;
  currentIndex = index;
  updateSlides();

  setTimeout(() => {
    isAnimating = false;
  }, 300);

  resetAutoplayProgress();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

// Автопрокрутка
function startAutoplay() {
  if (!config.autoplayEnabled) return;
  if (autoplayInterval) clearInterval(autoplayInterval);

  let progress = 0;
  const step = 100 / (config.autoplayDelay / 16);

  autoplayInterval = setInterval(() => {
    if (!config.autoplayEnabled) return;
    progress += step;

    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    if (progress >= 100) {
      progress = 0;
      nextSlide();
    }
  }, 16);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

function resetAutoplay() {
  if (!config.autoplayEnabled) return;
  stopAutoplay();
  startAutoplay();
}

function resetAutoplayProgress() {
  if (progressBar) {
    progressBar.style.width = '0%';
  }
  resetAutoplay();
}

// Обработчики событий
function attachEventListeners() {
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); });

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (dot && dot.dataset.dot !== undefined) {
        stopAutoplay();
        goToSlide(parseInt(dot.dataset.dot));
      }
    });

    dotsContainer.addEventListener('keydown', (e) => {
      const dot = e.target.closest('.dot');
      if (dot && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        stopAutoplay();
        goToSlide(parseInt(dot.dataset.dot));
      }
    });
  }

  const container = document.querySelector('.slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', () => {
      stopAutoplay();
    });
    container.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  }
}

// Поддержка свайпов
function setupSwipe() {
  const container = document.querySelector('.slideshow-container');
  if (!container) return;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > config.swipeThreshold) {
      stopAutoplay();
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  });
}

// Клавиатурная навигация
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    stopAutoplay();
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    stopAutoplay();
    nextSlide();
  }
});

// Добавляем эффект параллакса при движении мыши
function addParallaxEffect() {
  const container = document.querySelector('.slideshow-container');
  if (!container) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const activeSlide = document.querySelector('.mySlides.active .slide-image');
    if (activeSlide) {
      activeSlide.style.transform = `scale(1.02) translate(${x * 5}px, ${y * 5}px)`;
    }
  });

  container.addEventListener('mouseleave', () => {
    const activeSlide = document.querySelector('.mySlides.active .slide-image');
    if (activeSlide) {
      activeSlide.style.transform = 'scale(1) translate(0, 0)';
    }
  });
}

// Эффект "glow" для активной точки
function enhanceDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      this.style.transform = 'scale(1.5)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
}

// Инициализация дополнительных эффектов
setTimeout(() => {
  addParallaxEffect();
  enhanceDots();
}, 500);