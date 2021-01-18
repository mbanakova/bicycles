'use strict';
(function () {
  var body = document.querySelector('.body');
  var header = document.querySelector('.header');
  var mainNav = document.querySelector('.nav');
  var burger = document.querySelector('.nav__burger');
  var links = document.querySelectorAll('.nav__link');
  var form = document.querySelector('.form');
  var inputs = document.querySelectorAll('.form__input');
  var userName = document.querySelector('#user-name');
  var userPhone = document.querySelector('#user-phone');
  var submit = document.querySelector('.form__submit');
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  body.classList.remove('body--nojs');
  header.classList.remove('header--nojs');
  mainNav.classList.remove('nav--nojs');
  burger.classList.remove('nav__burger--opened');
  mainNav.classList.remove('nav--opened');

  burger.addEventListener('click', function () {
    burger.classList.toggle('nav__burger--opened');
    mainNav.classList.toggle('nav--opened');
  });

  links.forEach((elem), function () {
    elem.addEventListener('click', function () {
      burger.classList.toggle('nav__burger--opened');
      mainNav.classList.toggle('nav--opened');
    });
  });

  inputs.forEach(elem, function () {
    elem.removeAttribute('required');
  });

  try {
    storageName = localStorage.getItem('user');
    storagePhone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName && storagePhone) {
    userName.value = storageName;
    userPhone.value = storagePhone;
  } else {
    userName.focus();
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    inputs.forEach(elem, function () {
      if (!elem.value) {
        elem.classList.remove('error');
        elem.offsetWidth = elem.offsetWidth;
        elem.classList.add('error');
      } else {
        if (isStorageSupport) {
          localStorage.setItem('user', userName.value);
          localStorage.setItem('phone', userPhone.value);
        }
        if (userName.value && userPhone.value) {
          submit.textContent = 'Ожидайте звонка!';
        }
      }
    });
  });

  document.addEventListener('click', function () {
    inputs.forEach(elem, function () {
      elem.classList.remove('error');
    });
    submit.textContent = 'Подобрать велосипед мечты';
  });
})();
