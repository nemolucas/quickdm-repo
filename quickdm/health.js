const form = document.querySelector('form');
const hpBarFill = document.querySelector('.hp-bar-fill');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const hpValue = parseInt(document.querySelector('#hp').value);
  hpBarFill.style.width = hpValue + '%';
});