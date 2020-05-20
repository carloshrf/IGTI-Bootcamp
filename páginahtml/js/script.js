console.log('Foi!');

var title = document.querySelector('h1');
title.textContent = "Não é Fera Master";

var old = document.querySelectorAll('#old');
old.forEach(element => {
  element.textContent = "Você foi profanado...";
  element.style.color = "#7159c1";
});

var color = document.getElementById('color');
color.classList.add('brown');

var nameInput = document.querySelector('.inputName');
nameInput.value = "a vá";

const textarea = document.querySelector('textarea');
textarea.addEventListener('keyup', countName);

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function alternColor() {
  var element = document.querySelector('.brown');
  
  if (element) {
    element.classList.remove('brown');
  } else {
    element = document.querySelector('#color');
    element.classList.add('brown');
  }
};

function countName() {
  const span = document.querySelector('.keyCount');
  span.textContent = textarea.value.length;
};

function handleSubmit(event) {
  event.preventDefault();
  alert(nameInput.value + ' cadastrado com sucesso')
}