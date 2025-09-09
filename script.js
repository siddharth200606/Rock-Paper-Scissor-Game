let userScore = 0;
let computerScore = 0;

window.onload = function () {
  displayLeaderboard();
};

// Capitalizes username for consistency
function formatUsername(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function playGame(userChoice) {
  let usernameInput = document.getElementById('username').value.trim();
  if (!usernameInput) {
    alert("Please enter your name to play!");
    return;
  }

  const username = formatUsername(usernameInput);

  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let result = '';

  if (userChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = "You win! 🎉";
    userScore++;
    updateLeaderboard(username);
  } else {
    result = "You lose! 💀";
    computerScore++;
  }

  document.getElementById('result').innerText = 
    `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;

  document.getElementById('score').innerText = 
    `Your Score: ${userScore} | Computer Score: ${computerScore}`;
}

function updateLeaderboard(username) {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
  leaderboard[username] = (leaderboard[username] || 0) + 1;
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  displayLeaderboard();
}

function displayLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
  const leaderboardList = document.getElementById('leaderboard');
  leaderboardList.innerHTML = '';

  const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([name, score]) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${score}`;
    leaderboardList.appendChild(li);
  });
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  document.getElementById('score').innerText = `Your Score: 0 | Computer Score: 0`;
  document.getElementById('result').innerText = '';
}

// Optional: Reset leaderboard completely
function resetLeaderboard() {
  localStorage.removeItem('leaderboard');
  displayLeaderboard();
}

