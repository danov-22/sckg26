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

/* ===== HERO PARALLAX EFFECT ===== */
window.addEventListener("scroll", function() {
  var img = document.querySelector(".hero-bg img");
  if (!img) return;

  var offset = window.innerWidth <= 767 ? -120 : 0;
  img.style.transform =
    `translateY(${offset + window.scrollY * 0.12}px)`;
});