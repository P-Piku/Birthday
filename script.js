
let currentPuzzle = '';
let puzzleImages = {
  'mom': "C:\Users\mkeny\Downloads\Birthday1\assets\images\mom.jpg",
  'dad': "C:\Users\mkeny\Downloads\Birthday1\assets\images\dad.jpg",
  'lolia': "C:\Users\mkeny\Downloads\Birthday1\assets\images\lolia.jpg",
  'payine': "C:\Users\mkeny\Downloads\Birthday1\assets\images\payine.jpg",
  'kasayia': "C:\Users\mkeny\Downloads\Birthday1\assets\images\kasayia.jpg"
};

function startPuzzle(person) {
  currentPuzzle = person;
  document.querySelector('.puzzle-selection').style.display = 'none';
  document.getElementById('puzzle-game').style.display = 'block';
  createPuzzle(person);
}

function createPuzzle(person) {
  const grid = document.getElementById('puzzle-grid');
  grid.innerHTML = '';
  let positions = [...Array(9).keys()];
  positions = positions.sort(() => Math.random() - 0.5); // Shuffle

  positions.forEach(pos => {
    let piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.style.backgroundImage = `url(${puzzleImages[person]})`;
    piece.style.backgroundPosition = `-${(pos % 3) * 100}px -${Math.floor(pos / 3) * 100}px`;
    piece.dataset.correct = pos;
    piece.onclick = () => swapPiece(piece);
    grid.appendChild(piece);
  });

  let empty = document.createElement('div');
  empty.className = 'puzzle-piece empty-piece';
  empty.style.backgroundColor = '#fff';
  grid.appendChild(empty);
}

function swapPiece(clickedPiece) {
  let emptyPiece = document.querySelector('.empty-piece');
  if (clickedPiece === emptyPiece) return;

  let temp = clickedPiece.style.backgroundPosition;
  clickedPiece.style.backgroundPosition = emptyPiece.style.backgroundPosition;
  emptyPiece.style.backgroundPosition = temp;

  let tempImage = clickedPiece.style.backgroundImage;
  clickedPiece.style.backgroundImage = emptyPiece.style.backgroundImage;
  emptyPiece.style.backgroundImage = tempImage;

  checkPuzzleSolved();
}

function checkPuzzleSolved() {
  let pieces = document.querySelectorAll('.puzzle-piece:not(.empty-piece)');
  let correct = true;
  pieces.forEach((piece, idx) => {
    let expectedPos = `-${(idx % 3) * 100}px -${Math.floor(idx / 3) * 100}px`;
    if (piece.style.backgroundPosition !== expectedPos) {
      correct = false;
    }
  });
  if (correct) {
    alert('Puzzle Solved! 🎉 Unlocking your message...');
    document.getElementById(currentPuzzle + '_audio').play();
    triggerDogTapCat();
    setTimeout(() => {
      document.getElementById('puzzle-game').style.display = 'none';
      document.querySelector('.puzzle-selection').style.display = 'block';
    }, 3000);
  }
}

function triggerDogTapCat() {
  const dog = document.getElementById('dog');
  dog.style.animation = 'dogHappyTap 1s 3';
}
