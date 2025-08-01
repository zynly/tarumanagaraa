// =============================
// == GLOBAL VARIABLE ==
// =============================
const carousels = {};
const navbar = document.querySelector('.navbar');
let lastScrollTop = window.scrollY || 0;
const scrollThreshold = 5;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  console.log("Current:", currentScroll, "Last:", lastScrollTop);
  if (Math.abs(currentScroll - lastScrollTop) <= scrollThreshold) return;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scroll ke bawah → sembunyikan navbar
    navbar.classList.add('navbar-hidden');
  } else if (currentScroll < lastScrollTop) {
    // Scroll ke atas → tampilkan navbar
    navbar.classList.remove('navbar-hidden');
  }

  // Transparansi: ubah saat scroll > 50
  if (currentScroll > 50) {
    navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('scrolled');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


// =============================
// == DOM READY INIT ==
// =============================
document.addEventListener('DOMContentLoaded', () => {
  // Init carousel for each project
  document.querySelectorAll('.carousel-container').forEach(container => {
    const id = container.dataset.carousel;
    const track = container.querySelector('.carousel-track');
    const allCards = Array.from(track.querySelectorAll('.card'));

    carousels[id] = {
      id,
      container,
      track,
      allCards,
      visibleCards: [...allCards],
      currentIndex: 0,
    };

    updateCarousel(id);
  });

  // Init filter per project
  document.querySelectorAll('.gallery-filter-group .filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const group = button.closest('.gallery-filter-group');
      const id = group.dataset.carousel;
      const filter = button.dataset.filter;

      group.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      applyFilter(id, filter);
    });
  });

  // Trigger default filter "all"
  document.querySelectorAll('.gallery-filter-group').forEach(group => {
    const defaultBtn = group.querySelector('[data-filter="all"]');
    if (defaultBtn) defaultBtn.click();
  });

  // Hero section button visibility
  const heroButton = document.querySelector('.hero a');
  if (heroButton) heroButton.classList.add('visible');

  // Fade-in/out observer for all fade sections
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-section, .scroll-fade').forEach(el => observer.observe(el));

  // AOS initialization
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 800,
    });
  }
});

// =============================
// == CAROUSEL FUNCTIONS ==
// =============================
function applyFilter(id, filter) {
  const data = carousels[id];
  data.visibleCards = [];

  data.allCards.forEach(card => {
    const category = card.dataset.category;
    if (filter === 'all' || category === filter) {
      card.style.display = 'block';
      data.visibleCards.push(card);
    } else {
      card.style.display = 'none';
    }
  });

  data.currentIndex = 0;
  updateCarousel(id);
}

function moveCarousel(id, direction) {
  const data = carousels[id];
  const total = data.visibleCards.length;
  if (total === 0) return;

  data.currentIndex = (data.currentIndex + direction + total) % total;
  updateCarousel(id);
}

function updateCarousel(id) {
  const data = carousels[id];
  const cards = data.visibleCards;
  const index = data.currentIndex;

  cards.forEach((card, i) => {
    card.className = 'card'; // Reset
    card.classList.remove('hidden');

    if (i === index) card.classList.add('center');
    else if (i === (index - 1 + cards.length) % cards.length) card.classList.add('left-1');
    else if (i === (index - 2 + cards.length) % cards.length) card.classList.add('left-2');
    else if (i === (index + 1) % cards.length) card.classList.add('right-1');
    else if (i === (index + 2) % cards.length) card.classList.add('right-2');
    else card.classList.add('hidden');
  });
}

// =============================
// == UTILITIES ==
// =============================
function scrollToDetail(id) {
  const detail = document.getElementById(id);
  if (detail) detail.scrollIntoView({ behavior: 'smooth' });
}

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
