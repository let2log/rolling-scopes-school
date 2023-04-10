document.querySelectorAll('.menu__link').forEach((elem) => {
  if (window.location.href == elem.href) {
    elem.classList.add('menu__link--act');
  }
});