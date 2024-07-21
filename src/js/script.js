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


/**
 * volume changer
 */
const volumeRangeInput = document.getElementById('volume-range');
const volumeSvg = document.getElementById('volume-svg');
const volumeSvgPath1 = document.querySelector('.path1');
const volumeSvgPath2 = document.querySelector('.path2');
const volumeSvgPathX = document.querySelector('.pathX');
volumeRangeInput.addEventListener('input', () => {
  if (volumeRangeInput.value <= 80) {
    volumeSvgPath1.classList.add('hidden');
  } else {
    volumeSvgPath1.classList.remove('hidden');
  }

  if (volumeRangeInput.value == 0) {
    volumeSvgPath2.classList.add('hidden');
    volumeSvgPathX.classList.remove('hidden');
  } else {
    volumeSvgPath2.classList.remove('hidden');
    volumeSvgPathX.classList.add('hidden');
  }
});

volumeSvg.addEventListener('click', () => {
  volumeSvgPath1.classList.toggle('hidden');
  volumeSvgPath2.classList.toggle('hidden');
  volumeSvgPathX.classList.toggle('hidden');
  volumeRangeInput.value = volumeRangeInput.value == 0 ? '100' : '0';
});


/**
 * next up menu
 */
const nextUpMenu = document.getElementById('nextup-menu');
const nextUpMenuToggler = document.getElementById('nextup-menu-toggler');
const closeNextUpMenu = document.getElementById('close-nextup-menu');
nextUpMenuToggler.addEventListener('click', () => {
  if (nextUpMenu.hasAttribute('open')) {
    nextUpMenu.classList.add('hidden');
    nextUpMenu.removeAttribute('open');
  } else {
    nextUpMenu.classList.remove('hidden');
    nextUpMenu.setAttribute('open', '');
  }
});

closeNextUpMenu.addEventListener('click', () => {
  if (nextUpMenu.hasAttribute('open')) {
    nextUpMenu.classList.add('hidden');
    nextUpMenu.removeAttribute('open');
  }
});



////////// test //////////////
/**
 * so the menus that have hover overlay stay open even if element is not being hovered
 */
let dataTargetOverlay;
let dataTargetMenu;
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    const id = el.getAttribute('data-target');
    const menu = document.getElementById(id);
    const hoverOverlay = document.getElementById(`hover-overlay-${id}`);
    if (hoverOverlay) {
      // dataTargetOverlay = hoverOverlay;
      // dataTargetMenu = menu;
      if (menu.hasAttribute('open')) {
        hoverOverlay.classList.remove('hidden');
        hoverOverlay.classList.add('flex');
      } else {
        hoverOverlay.classList.remove('flex');
        hoverOverlay.classList.add('hidden');
      }
    }
  });
});

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


