/* =============================================
   SCKG STUDY CENTER — Main JavaScript
   Navigation, FAQ accordion, scroll effects
   ============================================= */

/* ===== PAGE NAVIGATION ===== */
function showPage(pageName) {
  console.log("Clicked:", pageName);

  // Hide all pages
  document.querySelectorAll('.page').forEach(function(page) {
    page.classList.remove('active');
  });

  // Show target page
  var target = document.getElementById('page-' + pageName);

  if (target) {
    target.classList.add('active');
  } else {
    console.error("Page not found:", 'page-' + pageName);
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.classList.remove('active');

    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Close mobile menu
  var navLinks = document.getElementById('nav-links');

  if (navLinks) {
    navLinks.classList.remove('open');
  }
}

// Make showPage available globally
window.showPage = showPage;

/* ===== FAQ ACCORDION ===== */
function toggleFaq(btn) {
  var answer = btn.nextElementSibling;
  var isOpen = btn.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-question.open').forEach(function(openBtn) {
    openBtn.classList.remove('open');
    openBtn.nextElementSibling.classList.remove('open');
  });

  // Open clicked item if it was closed
  if (!isOpen) {
    btn.classList.add('open');
    if (answer) answer.classList.add('open');
  }
}

window.toggleFaq = toggleFaq;

/* ===== NAVBAR SCROLL EFFECT ===== */
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== HAMBURGER MENU ===== */
document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Close menu on outside click
document.addEventListener('click', function(e) {
  if (
    navLinks &&
    hamburger &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove('open');
  }
});

  // Show home page by default
  showPage('home');
});

/* ===== LIGHTBOX GALlERY (ZOOM IMAGE & VIDEO) ===== */

function zoomImage(element) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVid = document.getElementById('lightboxVid');

    if (lightboxVid) lightboxVid.style.display = 'none';
    if (lightboxImg) lightboxImg.style.display = 'block';

    lightboxImg.src = element.src;
    lightboxImg.alt = element.alt;
    lightbox.classList.add('show');
}

function zoomVideo(element) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVid = document.getElementById('lightboxVid');
    
    // Ambil link video dari tag <source> di dalamnya
    const videoSource = element.querySelector('source').src;

    // Sembunyikan gambar, TAMPILKAN video
    if (lightboxImg) lightboxImg.style.display = 'none';
    if (lightboxVid) lightboxVid.style.display = 'block';
    
    lightboxVid.src = videoSource;
    lightboxVid.load();
    lightboxVid.play(); 

    lightbox.classList.add('show');
}

function closeZoom() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxVid = document.getElementById('lightboxVid');
    
    lightbox.classList.remove('show');
    
    if (lightboxVid) {
        lightboxVid.pause();
        lightboxVid.src = ""; 
    }
}

/* ===== HERO PARALLAX EFFECT ===== */
window.addEventListener("scroll", function() {
  var img = document.querySelector(".hero-bg img");
  if (!img) return;

  var offset = window.innerWidth <= 767 ? -120 : 0;
  img.style.transform =
    `translateY(${offset + window.scrollY * 0.12}px)`;
});


/* ===== FLOATING DRAGGABLE WHATSAPP BUTTON LOGIC ====+ */

// 1. WhatsApp Redirect Function (Triggered on Double Click)
function redirectToWhatsApp() {
    const phoneNumber = "6281234567890"; // <-- Ubah dengan nomor WhatsApp asli Anda
    const message = encodeURIComponent("Halo Study Center, saya ingin bertanya mengenai program kelas.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// 2. Draggable Logic for the Floating Button
const dragElement = document.querySelector('.whatsapp-float');
let isDragging = false;
let startX, startY, initialX, initialY;

if (dragElement) {
    // Desktop Mouse Events
    dragElement.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    // Mobile Touch Events
    dragElement.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    
    // Cek apakah layar sentuh (mobile) atau klik mouse (desktop)
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    
    // Dapatkan posisi koordinat tombol saat ini
    const rect = dragElement.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    // Matikan transisi CSS saat menyeret agar pergerakan tombol terasa responsif dan mulus
    dragElement.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    
    // Mencegah layar ikut tergulung (scrolling) di mobile saat tombol diseret
    if (e.cancelable) e.preventDefault();
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    // Hitung perubahan jarak geser
    const dx = clientX - startX;
    const dy = clientY - startY;
    
    let newX = initialX + dx;
    let newY = initialY + dy;
    
    // Batasi tombol agar tidak keluar dari area layar browser jendelanya
    const padding = 10;
    const maxW = window.innerWidth - dragElement.offsetWidth - padding;
    const maxH = window.innerHeight - dragElement.offsetHeight - padding;
    
    newX = Math.max(padding, Math.min(newX, maxW));
    newY = Math.max(padding, Math.min(newY, maxH));
    
    // Ubah aturan penulisan style CSS dari bottom/right bawaan ke top/left koordinat dinamis
    dragElement.style.right = 'auto';
    dragElement.style.bottom = 'auto';
    dragElement.style.left = `${newX}px`;
    dragElement.style.top = `${newY}px`;
}

function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    
    // Kembalikan efek transisi hover CSS setelah selesai diseret
    dragElement.style.transition = 'transform 0.2s ease-in-out, background-color 0.2s ease';
}