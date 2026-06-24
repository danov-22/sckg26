
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

/* ===== GALLERY DATA ===== */

const pembinaanGallery = {

kerohanian: [
"images/pembinaan.JPEG",
"images/kerohanian2.JPG"
],

topik: [
"images/topik_belajar_jepang.jpeg",
"images/topik2.JPG"
],

games: [
"images/games.jpg",
"images/games2.jpg"
],

seminar: [
"images/seminar_gigi.mp4",
"images/seminar2.mp4"
]

};


let currentCategory = [];
let currentIndex = 0;


function openPembinaan(category){

currentCategory = pembinaanGallery[category];

currentIndex = 0;

document
.getElementById("pembinaanModal")
.classList.add("show");

showSlide();

}


function showSlide(){

let file = currentCategory[currentIndex];

let container =
document.getElementById("slideContainer");


if(file.endsWith(".mp4")){

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
currentIndex = currentCategory.length - 1;


if(currentIndex >= currentCategory.length)
currentIndex = 0;


showSlide();

}


function closePembinaan(){

document
.getElementById("pembinaanModal")
.classList.remove("show");

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

  if (category === "pembinaan") {
    menu.classList.add("show");
  } else {
    menu.classList.remove("show");
  }
}