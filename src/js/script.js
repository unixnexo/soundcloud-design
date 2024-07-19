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
document.addEventListener('drag', () => {
  console.log('draaagin');
});
