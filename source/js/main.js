'use strict';

(function () {
  var body = document.querySelector('body');
  var header = document.querySelector('.header');
  var mainNav = document.querySelector('.nav');
  var burger = document.querySelector('.nav__burger');
  var links = document.querySelectorAll('.nav__link');
  var form = document.querySelector('form');
  var inputs = document.querySelectorAll('form input');
  var userName = document.querySelector('#user-name');
  var userPhone = document.querySelector('#user-phone');
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  var removeNoJs = function () {
    if (body) {
      body.classList.remove('nojs');
    }
    if (header) {
      header.classList.remove('header--nojs');
    }
    if (mainNav) {
      mainNav.classList.remove('nav--nojs');
      mainNav.classList.remove('nav--opened');
    }
    if (burger) {
      burger.classList.remove('nav__burger--opened');
      burger.addEventListener('click', function () {
        burger.classList.toggle('nav__burger--opened');
        mainNav.classList.toggle('nav--opened');
      });
    }
    if (inputs) {
      inputs.forEach(function (elem) {
        elem.removeAttribute('required');
      });
    }
  };
  removeNoJs();

  links.forEach(function (elem) {
    elem.addEventListener('click', function () {
      burger.classList.toggle('nav__burger--opened');
      mainNav.classList.toggle('nav--opened');
    });
  });

  try {
    storageName = localStorage.getItem('user');
    storagePhone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName && storagePhone) {
    if (userName || userPhone) {
      userName.value = storageName;
      userPhone.value = storagePhone;
    }
  } else {
    userName.focus();
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      inputs.forEach(function (elem) {
        if (!elem.value) {
          event.preventDefault();
          elem.classList.remove('error');
          elem.classList.add('error');
        } else {
          if (isStorageSupport) {
            localStorage.setItem('user', userName.value);
            localStorage.setItem('phone', userPhone.value);
          }
        }
      });
    });
  }

  document.addEventListener('click', function () {
    inputs.forEach(function (elem) {
      if (elem.classList.contains('error')) {
        elem.classList.remove('error');
      }
    });
  });
})();
