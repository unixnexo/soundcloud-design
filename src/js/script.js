/**
 * Ui activation for top menu
 */
document.querySelectorAll('.black-when-active').forEach(el => {
  const id = el.getAttribute('data-target');
  const menu = document.getElementById(id);

  el.addEventListener('click', () => {
    if (menu.hasAttribute('open')) {
      el.classList.add('bg-soundcloud-black');
    }
  });

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'open') {
        if (!menu.hasAttribute('open')) {
          el.classList.remove('bg-soundcloud-black');
        }
      }
    });
  });
  observer.observe(menu, { attributes: true });
});




////////// test //////////////
// const slider = document.querySelector('.slider');
// const prevBtn = document.querySelector('.prevBtn');
// const nextBtn = document.querySelector('.nextBtn');

// function updateButtonStates() {
//   // Check if the slider has reached the end of the left
//   if (slider.scrollLeft <= 50) {
//     prevBtn.classList.add('hidden');
//   } else {
//     prevBtn.classList.remove('hidden');
//   }

//   // Check if the slider has reached the end of the right
//   if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
//     nextBtn.classList.add('hidden');
//   } else {
//     nextBtn.classList.remove('hidden');
//   }
// }
// if (window.innerWidth >= 768) {
//   updateButtonStates();
//   slider.addEventListener('scroll', () => updateButtonStates());
// }

// nextBtn.addEventListener('click', () => {
//   slider.scrollBy({left: 500, behavior: 'smooth'});
//   updateButtonStates();
// });

// prevBtn.addEventListener('click', () => {
//   slider.scrollBy({left: -500, behavior: 'smooth'});
//   updateButtonStates();
// });
