const options = ['Rock', 'Paper', 'Scissors'];
const instructions = document.getElementById('instructions');
const scoreText = document.getElementById('score');
const scoreValue = document.getElementById('score-value');
const resultText = document.getElementById('result');
const rockImage = document.getElementById('rock-image');
const paperImage = document.getElementById('paper-image');
const scissorsImage = document.getElementById('scissors-image');
const playBtn = document.getElementById('play');
const duckImage = document.getElementById('duck-image');

let score = 0;

const startGame = () => {
  playBtn.classList.add('hidden');
  instructions.classList.add('hidden');
  updateScore();
  scoreText.classList.remove('hidden');
  resultText.classList.remove('hidden');
  rockImage.classList.replace('image__disabled', 'image');
  paperImage.classList.replace('image__disabled', 'image');
  scissorsImage.classList.replace('image__disabled', 'image');
};

const playGame = (userChoice) => {
  const result = getResult(userChoice);
  result === 'WIN' && showDuck();
  getScore(result);
  updateResult(result);
  updateScore();
}

const getResult = (userChoice) => {
  const pcChoice = options[randomChoice()];

  if (userChoice === pcChoice) {
    return 'TIE';
  }

  switch (userChoice) {
    case 'Rock':
      if (pcChoice === 'Scissors') {
        return 'WIN';
      }
      if (pcChoice === 'Paper') {
        return 'LOSE';
      }
      break;
    case 'Paper':
      if (pcChoice === 'Rock') {
        return 'WIN';
      }
      if (pcChoice === 'Scissors') {
        return 'LOSE';
      }
      break;
    case 'Scissors':
      if (pcChoice === 'Paper') {
        return 'WIN';
      }
      if (pcChoice === 'Rock') {
        return 'LOSE';
      }
      break;
  }
}

const getScore = (result) => {
  switch (result) {
    case 'WIN':
      score += 10;
      break;
    case 'LOSE':
      score -= 10;
      break;
  }
}

const updateScore = () => {
  scoreValue.textContent = score;
}

const updateResult = (result) => {
  resultText.textContent = result;
}

const showDuck = async () => {
  duckImage.classList.remove('hidden');
  try {
    const imageUrl = await getDuck();
    duckImage.setAttribute('src', imageUrl);
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}

const getDuck = async () => {
  //Completar usando async await o fech then :)
  //fetch("https://random-d.uk/api/random");

  let url = 'https://random-d.uk/api/96.jpg';

  try {
    const response = await fetch('https://random-d.uk/api/random');
    const data = await response.json();
    url = data.url;
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }

  return url;
}

const randomChoice = () => randomNumber = Math.round(Math.random() * 2);

playBtn.addEventListener('click', startGame);
rockImage.addEventListener('click', () => playGame(options[0]));
paperImage.addEventListener('click', () => playGame(options[1]));
scissorsImage.addEventListener('click', () => playGame(options[2]));
