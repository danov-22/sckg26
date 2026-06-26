/* =============================================
   SCKG — Main JavaScript
   Navigation, FAQ accordion, gallery, effects
   ============================================= */


/* ===== PAGE NAVIGATION ===== */

function showPage(pageName) {
    console.log("Clicked:", pageName);

    // Hide all pages
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    const navbar = document.querySelector(".navbar");

    // Home page = transparent navbar
    if (pageName === "home") {
        navbar.classList.remove("page-navbar");
    } else {
        navbar.classList.add("page-navbar");
    }

    // Show target page
    const target = document.getElementById("page-" + pageName);

    if (target) {
        target.classList.add("active");
    } else {
        console.error("Page not found:", "page-" + pageName);
    }

    // Update navigation
    document.querySelectorAll(".nav-link").forEach(function(link) {
        link.classList.remove("active");

        if (link.getAttribute("data-page") === pageName) {
            link.classList.add("active");
        }
    });

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Close mobile menu
    const navLinks = document.getElementById("nav-links");

    if (navLinks) {
        navLinks.classList.remove("open");
    }
}

/* ===== FAQ ACCORDION ===== */

function toggleFaq(button) {

    const answer = button.nextElementSibling;
    const isOpen = button.classList.contains("open");

    // Close all
    document.querySelectorAll(".faq-question.open").forEach(function(item) {
        item.classList.remove("open");

        if (item.nextElementSibling) {
            item.nextElementSibling.classList.remove("open");
        }
    });

    // Open selected
    if (!isOpen) {
        button.classList.add("open");

        if (answer) {
            answer.classList.add("open");
        }
    }
}


/* ===== NAVBAR SCROLL EFFECT ===== */

window.addEventListener("scroll", function() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ===== HAMBURGER MENU ===== */

document.addEventListener("DOMContentLoaded", function() {

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("open");
        });


        // Close when clicking outside
        document.addEventListener("click", function(e) {

            if (
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                navLinks.classList.remove("open");
            }

        });

    }

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");

    showPage(page || "home");

});


/* ===== FLOATING WHATSAPP BUTTON ===== */


function redirectToWhatsApp() {

    const phoneNumber = "6281234567890"; 
    const message = encodeURIComponent(
        "Halo Study Center, saya ingin bertanya mengenai program ini."
    );

    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
    );

}


const dragElement = document.querySelector(".whatsapp-float");

let isDragging = false;
let startX;
let startY;
let initialX;
let initialY;


if (dragElement) {

    // Desktop
    dragElement.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);


    // Mobile
    dragElement.addEventListener(
        "touchstart",
        startDrag,
        { passive: false }
    );

    document.addEventListener(
        "touchmove",
        drag,
        { passive: false }
    );

    document.addEventListener(
        "touchend",
        stopDrag
    );

}


