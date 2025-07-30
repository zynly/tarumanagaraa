let carousels = {};
let lastScrollTop = 0;

// SEMBUNYIKAN NAVBAR SAAT SCROLL KE BAWAH
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar?.classList.add('navbar-hidden');
  } else {
    navbar?.classList.remove('navbar-hidden');
  }
  lastScrollTop = Math.max(0, scrollTop);
});

// SCROLL KE SECTION DETAIL
function scrollToDetail(id) {
  const detail = document.getElementById(id);
  if (detail) detail.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  // INISIALISASI CAROUSEL PER PROYEK
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

  // FILTER PER PROYEK
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

  // DEFAULT FILTER "ALL"
  document.querySelectorAll('.gallery-filter-group').forEach(group => {
    const defaultBtn = group.querySelector('[data-filter="all"]');
    if (defaultBtn) defaultBtn.click();
  });
});

// FILTER KARTU PER PROYEK
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

// NAVIGASI KIRI/ KANAN DENGAN MUTAR
function moveCarousel(id, direction) {
  const data = carousels[id];
  const total = data.visibleCards.length;
  if (total === 0) return;

  data.currentIndex = (data.currentIndex + direction + total) % total;
  updateCarousel(id);
}

// UPDATE POSISI KARTU 3D
function updateCarousel(id) {
  const data = carousels[id];
  const cards = data.visibleCards;
  const index = data.currentIndex;

  cards.forEach((card, i) => {
    card.className = 'card'; // reset class
    card.classList.remove('hidden');

    if (i === index) card.classList.add('center');
    else if (i === (index - 1 + cards.length) % cards.length) card.classList.add('left-1');
    else if (i === (index - 2 + cards.length) % cards.length) card.classList.add('left-2');
    else if (i === (index + 1) % cards.length) card.classList.add('right-1');
    else if (i === (index + 2) % cards.length) card.classList.add('right-2');
    else card.classList.add('hidden');
  });
};
 AOS.init({
    once: true, // animasi hanya sekali
    duration: 800, // durasi animasi (ms)
  });

  // Tombol hero muncul lambat saat halaman load
  window.addEventListener('load', () => {
    const heroButton = document.querySelector('.hero a');
    if (heroButton) {
      heroButton.classList.add('visible');
    }
  });
