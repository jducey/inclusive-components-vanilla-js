window.addEventListener(
  'touchstart',
  function touched() {
    document.body.classList.add('touch');
    window.removeEventListener('touchstart', touched, false);
  },
  false
);

// Intersection Observer for lazy loading images
window.addEventListener('load', function () {
  const galleryContainer = document.querySelector('.gallery-container');
  galleryContainer.classList.remove('no-js');
  const galleryImages = document.querySelectorAll('.gallery-container img');

  if ('IntersectionObserver' in window) {
    // Create a new observer
    const observer = new IntersectionObserver(function (images) {
      images.forEach((image) => {
        image.target.classList.remove('visible');
        if (!image.isIntersecting) {
          return;
        }
        image.target.onload = () => image.target.classList.remove('dots');
        if (image.target.dataset.src) {
          image.target.setAttribute('src', image.target.dataset.src);
          image.target.removeAttribute('data-src');
        }
        image.target.classList.add('visible');
      });
    });

    // Start observing the target element
    galleryImages.forEach((image) => {
      observer.observe(image);
    });
  } else {
    galleryImages.forEach((image) => {
      image.setAttribute('src', image.getAttribute('data-src'));
      image.classList.remove('dots');
    });
  }
});

// Scroll the gallery
const gallery = document.querySelector('.gallery');
const galleryControls = document.querySelector('.gallery-controls');
const slides = document.querySelectorAll('.gallery li');
galleryControls.classList.remove('visually-hidden');

function scrollIt(slideToShow) {
  let slidesArray = Array.from(slides);
  let scrollPos =
    slidesArray.indexOf(slideToShow) * (gallery.scrollWidth / slides.length);
  gallery.scrollLeft = scrollPos;
}

function showSlide(dir) {
  let visible = document.querySelectorAll('.gallery .visible');
  let index = dir === 'previous' ? 0 : 1;

  if (visible.length > 1) {
    scrollIt(visible[index]);
  } else {
    let newSlide =
      index === 0
        ? visible[0].parentElement.parentElement.previousElementSibling
        : visible[0].parentElement.parentElement.nextElementSibling;
    if (newSlide) {
      scrollIt(newSlide);
    }
  }
}

galleryControls.addEventListener('click', (e) => {
  showSlide(e.target.closest('button').id);
});
