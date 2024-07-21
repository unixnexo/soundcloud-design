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


/**
 * range input for player
 */
const rangePlayerInput = document.querySelector('.custom-range');
rangePlayerInput.addEventListener('input', () => {
  if (rangePlayerInput.value >= 100 || rangePlayerInput.value <= 0) {
    rangePlayerInput.style.setProperty('--slider-track-opacity', '1');
  } else {
    rangePlayerInput.style.setProperty('--slider-track-opacity', '0');
  }
});



////////// test //////////////
/**
 * so the menus that have hover overlay stay open even if element is not being hovered
 */

// let dataTargetOverlay;
// let dataTargetMenu;
// document.querySelectorAll('[data-target]').forEach(el => {
//   el.addEventListener('click', () => {
//     event.stopPropagation();
//     const id = el.getAttribute('data-target');
//     const menu = document.getElementById(id);
//     const hoverOverlay = document.getElementById(`hover-overlay-${id}`);
//     if (hoverOverlay) {
//       dataTargetOverlay = hoverOverlay;
//       dataTargetMenu = menu;
//       if (menu.hasAttribute('open')) {
//         hoverOverlay.classList.remove('hidden');
//         hoverOverlay.classList.add('flex');
//       } else {
//         hoverOverlay.classList.remove('flex');
//         hoverOverlay.classList.add('hidden');
//       }
//     }
//   });
// });

// document.addEventListener('click', () => {
//   console.log('clicked');
//   if (dataTargetOverlay && dataTargetMenu) {
//     console.log(dataTargetOverlay, '---', dataTargetMenu);
//     if (dataTargetMenu.hasAttribute('open')) {
//       console.log('all stages passed');
//       dataTargetOverlay.classList.remove('flex');
//       dataTargetOverlay.classList.add('hidden');
//     }
//   }
// });

// id="hover-overlay-${menuId}"


