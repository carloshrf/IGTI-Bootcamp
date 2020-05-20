window.addEventListener('load', start);

function start() {
  var [redInput, greenInput, blueInput] = document.querySelectorAll('input');
 
  var redLi = document.querySelector('.redValue');
  var greenLi = document.querySelector('.greenValue');
  var blueLi = document.querySelector('.blueValue');

  redInput.addEventListener('input', handleValues);
  greenInput.addEventListener('input', handleValues);
  blueInput.addEventListener('input', handleValues);

  var rgbText = document.querySelector('#preview');

  var preview = document.querySelector('.preview');
  changeBackgroundColor(0, 0, 0);

  function handleValues(event) {
    const {value} = event.target;
    const {className} = event.target;

    if (className === 'red') {
      redLi.textContent = value;
    } 
    if (className === 'green') {
      greenLi.textContent = value;
    }
    if (className === 'blue') {
      blueLi.textContent = value;
    }

    changeBackgroundColor(redLi.textContent, greenLi.textContent, blueLi.textContent);
  }

  function changeBackgroundColor(r, g, b) {
    preview.style.background = `rgb(${r}, ${g}, ${b})`;

    setRGBInfo(r, g, b);
  }

  function setRGBInfo(r, g, b) {
    rgbText.textContent = `rgb(${r}, ${g}, ${b})`;
  }
}