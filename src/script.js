'use strict'

const response = await fetch('../assets/pets.json');
const petsData = await response.json();

const overlay = document.querySelector('.overlay');

const popup = document.querySelector('.popup');

const menuLink = document.querySelectorAll('.menu__link');

const sliderItem = document.querySelectorAll('.slider__item');
const sliderContent = document.querySelector('.slider__content');

let petsId;

//////////////////////////////

//////////////////////////////

function showMenu() {
  if (document.querySelector('#nav__toggle').checked) {
    showOverlay();
    document.querySelector('.menu__link--act').style.pointerEvents = 'all';
  } else {
    hideOverlay();
  }
}

function showOverlay() {
  overlay.classList.add('overlay__show');
  document.documentElement.style.overflow = 'hidden';
  if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i)) {
    document.documentElement.style.paddingRight = '0';
  } else {
    document.documentElement.style.paddingRight = '15px';
  }
}

function hideOverlay() {
  overlay.classList.remove('overlay__show');
  document.documentElement.style.overflow = 'visible';
  document.querySelector('#nav__toggle').checked = false;
  popup.classList.remove('popup__show');
  document.documentElement.style.paddingRight = '0';
}

function generatePopup(petsData) {
  popup.innerHTML = `
        <button class="popup__close btn btn--circle btn--trans"><img src="../assets/icons/cancel.svg" alt=""></button>
        <div class="popup__wrapper">
          <img class="popup__img" src="${petsData[petsId].img}" alt="">
          <div class="popup__text">
            <h3 class="popup__title">${petsData[petsId].name}</h3>
            <h4 class="popup__sub">${petsData[petsId].type} - ${petsData[petsId].breed}</h4>
            <p class="popup__p">${petsData[petsId].description}</p>
            <ul class="popup__list">
              <li><span>Age:</span> ${petsData[petsId].age}</li>
              <li><span>Inoculations:</span> ${petsData[petsId].inoculations}</li>
              <li><span>Diseases:</span> ${petsData[petsId].diseases}</li>
              <li><span>Parasites:</span> ${petsData[petsId].parasites}</li>
            </ul>
          </div>
        </div>`
  return popup;
}

function showPopup() {
  if (popup.classList.contains('popup__show')) {
    hideOverlay()
  } else {
    showOverlay();
    popup.classList.add('popup__show');
  }
}

menuLink.forEach((elem) => {
  if (window.location.href === elem.href) {
    elem.classList.add('menu__link--act');
    elem.removeAttribute('href');
  }
  elem.addEventListener('click', hideOverlay);

});

//////////////////////////////

//////////////////////////////


sliderContent.onclick = function(event) {
  if (event.target.closest('div').className != 'slider__item') return;
  petsId = +event.target.closest('div').dataset.id;
  generatePopup(petsData);
  showPopup();
}

popup.onclick = function(event) {
  let button = event.target.closest('button');
  if (!button) return;
  if (!popup.contains(button)) return;
  hideOverlay();
}

overlay.addEventListener('click', hideOverlay);
document.querySelector('#nav__toggle').addEventListener('change', showMenu);
