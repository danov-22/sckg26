
/* ===== LIGHTBOX GALlERY (ZOOM IMAGE & VIDEO) ===== */

function zoomImage(element) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVid = document.getElementById('lightboxVid');

    if (!lightbox || !lightboxImg) return;

    if (lightboxVid) {
        lightboxVid.style.display = 'none';
        lightboxVid.pause();
        lightboxVid.src = "";
    }

    lightboxImg.style.display = 'block';
    lightboxImg.src = element.src;
    lightboxImg.alt = element.alt;

    lightbox.classList.add('show');
}

function zoomVideo(element) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVid = document.getElementById('lightboxVid');

    if (!lightbox || !lightboxVid) return;

    const source = element.querySelector('source');
    if (!source) return;

    if (lightboxImg) {
        lightboxImg.style.display = 'none';
    }

    lightboxVid.style.display = 'block';
    lightboxVid.src = source.src;
    lightboxVid.load();
    lightboxVid.play();

    lightbox.classList.add('show');
}

function closeZoom() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxVid = document.getElementById('lightboxVid');

    if (!lightbox) return;

    lightbox.classList.remove('show');

    if (lightboxVid) {
        lightboxVid.pause();
        lightboxVid.src = "";
    }
}

/* ===== GALLERY DATA ===== */

const galleryData = {

    ekskul: {

        gitar: [
        "images/kelas-gitar.JPG",
        "images/pameran-gitar.jpg"
        ],

        inggris: [
        "images/english_intermediate.JPG",
        "images/english-basic.JPG"
        ],

        coding: [
        "images/coding.jpg"
        ]

    },

    akademik: {

        smp: [
        "images/mtk.JPG"
        ],

        sma: [
        "images/kelas-SMA.JPG"
        ]

    },

    pembinaan: {

        kerohanian: [
        "images/singing.mp4",
        "images/pembinaan.JPEG"
        ],

        topik: [
        "images/self-acceptance.mp4",
        "images/jatidiri.mp4",
        "images/public-speaking.mp4",
        "images/topik_belajar_jepang.jpeg"
        ],

        games: [
        "images/recapgames.mp4"
        ],

        seminar: [
        "images/brain-food-101.mp4",
        "images/seminar_gigi.mp4"
        ]

    },

    lainnya: {
        
        outing: [
        "images/LAI-2024.mp4",
        "images/LAI-2024.jpg",
        "images/art-museum.jpg"
        ]

    }

};

let currentSection = "";
let currentCategory = "";

let currentGallery = [];
let currentIndex = 0;

function openGallery(section, category){

    if (!galleryData[section] || !galleryData[section][category]) {
        console.error("Gallery not found:", section, category);
        return;
    }

    currentSection = section;
    currentCategory = category;
    
    currentGallery = galleryData[section][category];

    currentIndex = 0;

    document
        .getElementById("galleryModal")
        .classList.add("show");

    showSlide();

}


function showSlide(){

if (!currentGallery || currentGallery.length === 0) return; 

let file = currentGallery[currentIndex];

let container =
document.getElementById("slideContainer");


if(file.toLowerCase().endsWith(".mp4")){

container.innerHTML = `
<video controls autoplay>
<source src="${file}">
</video>
`;

}

else{

container.innerHTML = `
<img src="${file}">
`;

}

}


function changeSlide(direction){

currentIndex += direction;


if(currentIndex < 0)
currentIndex = currentGallery.length - 1;


if(currentIndex >= currentGallery.length)
currentIndex = 0;


showSlide();

}


function closeGallery(){

const modal = document.getElementById("galleryModal");
const container = document.getElementById("slideContainer");

modal.classList.remove("show");
container.innerHTML = "";

}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

/* ===== HERO PARALLAX EFFECT ===== */
window.addEventListener("scroll", function() {
  var img = document.querySelector(".hero-bg img");
  if (!img) return;

  var offset = window.innerWidth <= 767 ? -120 : 0;
  img.style.transform =
    `translateY(${offset + window.scrollY * 0.12}px)`;
});

function filterGallery(category, button) {

  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".filter-btn");
  const menu = document.getElementById("pembinaanMenu");

  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  items.forEach(item => {

    if (
      category === "all" ||
      item.classList.contains(category)
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

  });

  if (menu) {
    if (category === "pembinaan") {
        menu.classList.add("show");
    } else {
        menu.classList.remove("show");
    }
  }

}