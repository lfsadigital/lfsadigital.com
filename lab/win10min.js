const showcase = document.querySelector('.win-showcase');
const gallery = showcase.querySelector('.win-gallery');
const picker = showcase.querySelector('.win-picker');
const buttons = [...picker.querySelectorAll('button')];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let selected = 0;

function selectDevice(index) {
  selected = index;
  buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
}

function showDevice(index) {
  if (index < 0 || index >= buttons.length) return;
  selectDevice(index);
  gallery.scrollTo({left: gallery.clientWidth * index, behavior: motion.matches ? 'instant' : 'smooth'});
}

buttons.forEach((button, index) => button.addEventListener('click', () => showDevice(index)));
gallery.addEventListener('keydown', event => {
  const targets = {ArrowLeft: selected - 1, ArrowRight: selected + 1, Home: 0, End: buttons.length - 1};
  if (!Object.hasOwn(targets, event.key)) return;
  event.preventDefault();
  showDevice(targets[event.key]);
});
let scrollTimer;
gallery.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (gallery.clientWidth) selectDevice(Math.round(gallery.scrollLeft / gallery.clientWidth));
  }, 140);
}, {passive:true});
picker.hidden = false;

const spotlight = showcase.querySelector('.win-spotlight');
const canSpotlight = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
let frame;
showcase.addEventListener('pointermove', event => {
  if (!canSpotlight.matches || event.pointerType !== 'mouse') return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const bounds = showcase.getBoundingClientRect();
    spotlight.style.setProperty('--light-x', (event.clientX - bounds.left) + 'px');
    spotlight.style.setProperty('--light-y', (event.clientY - bounds.top) + 'px');
    showcase.setAttribute('data-lit', '');
  });
});
showcase.addEventListener('pointerleave', () => {
  cancelAnimationFrame(frame);
  showcase.removeAttribute('data-lit');
});

const filmLink = showcase.querySelector('.win-film-link');
const film = showcase.querySelector('.win-film');
const video = film.querySelector('video');
const errorMessage = film.querySelector('.win-film-error');
filmLink.addEventListener('click', event => {
  if (!film.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  errorMessage.hidden = true;
  film.showModal();
  video.src = video.canPlayType('video/webm; codecs="vp9"') ? video.dataset.film : filmLink.href;
  if (motion.matches) video.load();
  else video.play().catch(() => {});
});
video.addEventListener('error', () => { errorMessage.hidden = false; });
film.addEventListener('close', () => {
  video.pause();
  video.removeAttribute('src');
  video.load();
  filmLink.focus();
});
