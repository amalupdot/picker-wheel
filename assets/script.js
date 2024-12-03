const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const addOptionButton = document.getElementById('add-option');
const optionInput = document.getElementById('option-input');
const optionsList = document.getElementById('options-list');

let options = ['Option 1', 'Option 2', 'Option 3'];
let angle = 0;

function drawWheel() {
  const arcSize = (2 * Math.PI) / options.length;
  const colors = ['#2b580c', '#afa939', '#fce7b5', '#d79e17'];

  options.forEach((option, i) => {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, arcSize * i, arcSize * (i + 1));
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(arcSize * i + arcSize / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(option, 220, 10);
    ctx.restore();
  });
}

function spinWheel() {
  let spinAngle = Math.random() * 2000 + 1000; 
  let currentAngle = 0;

  const spinInterval = setInterval(() => {
    currentAngle += spinAngle / 100;
    drawRotated(currentAngle);
    spinAngle *= 0.97;

    if (spinAngle < 5) {
      clearInterval(spinInterval);

      // Calculate the top position index
      const resultIndex = getResultIndex(currentAngle);
      alert(`You got: ${options[resultIndex]}`);
    }
  }, 20);
}
spinButton.addEventListener('click', spinWheel);
// get the result
function getResultIndex(currentAngle) {
  const numSegments = options.length;
  const segmentAngle = 360 / numSegments; 
  const normalizedAngle = (360 - (currentAngle % 360) + 270) % 360; 
  return Math.floor(normalizedAngle / segmentAngle) % numSegments; 
}

function drawRotated(rotationAngle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotationAngle * (Math.PI / 180));
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  drawWheel();
  ctx.restore();
}

// add new option
function addOption() {
  const newOption = optionInput.value.trim();
  if (newOption && !options.includes(newOption)) {
    options.push(newOption);
    updateOptionsList();
    drawWheel();
    optionInput.value = '';
  }
}

addOptionButton.addEventListener('click', addOption);

// update the option in the list
function updateOptionsList() {
  optionsList.innerHTML = '';
  options.forEach((option) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${option}</span> <button class="remove">X</button>`;
    optionsList.appendChild(li);
  });

  // removes frm the list
  document.querySelectorAll('.remove').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      options.splice(index, 1);
      updateOptionsList();
      drawWheel();
    });
  });
}


updateOptionsList();
drawWheel();
