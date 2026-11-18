const mobileMenu = document.querySelector('.mobile-card-nav');
const menuButton = mobileMenu.querySelector('summary');
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !mobileMenu.open) return;
  mobileMenu.open = false;
  menuButton.focus();
});
document.addEventListener('pointerdown', event => {
  if (mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
});
mobileMenu.addEventListener('click', event => {
  if (event.target.closest('a')) mobileMenu.open = false;
});
matchMedia('(max-width:980px)').addEventListener('change', () => { mobileMenu.open = false; });
