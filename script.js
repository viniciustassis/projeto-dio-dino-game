const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const pontuacao = document.querySelector('.pontuacao');
const pontuacaoAtual = document.querySelector('.pontuacao_atual');

let isJumping = false;
let isGameOver = false;
let position = 0;
let pontuacaoTimer;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      gameOver();
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function inicializarPontuacao() {
  var num = 0;
  var tempo = 100;
  pontuacaoAtual.innerText = num;
  pontuacaoTimer = setInterval( () => {
    pontuacaoAtual.innerText = parseInt(pontuacaoAtual.innerText) + pontuacaoTimer;
  }, tempo);
}

function gameOver() {
  isGameOver = true;
  document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1><p class="game-over">Pontuação: ${pontuacaoAtual.innerText}</p>`;
  clearInterval(pontuacaoTimer);
}

inicializarPontuacao();
createCactus();
document.addEventListener('keyup', handleKeyUp);
