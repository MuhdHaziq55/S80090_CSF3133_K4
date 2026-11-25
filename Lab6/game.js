// ---------- Game state ----------
var gameStarted = false;   // becomes true after Start Game
var wins = 0;              // score counters
var losses = 0;
var draws = 0;
var results = [];          // stores "Win", "Lose" or "Draw" for every round

// ---------- startGame(): read name, welcome the player, allow play ----------
function startGame() {
  var name = document.getElementById("playerName").value;

  // Stop if the name is empty
  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  // Show welcome message and start date/time
  document.getElementById("welcome").innerHTML = "Welcome, " + name + "!";
  document.getElementById("startTime").innerHTML = "Started: " + new Date();

  gameStarted = true;
}

// ---------- getComputerChoice(): random choice from the array ----------
function getComputerChoice() {
  var options = ["rock", "paper", "scissors"];
  var index = Math.floor(Math.random() * 3);
  return options[index];
}

// ---------- playRound(): play one round ----------
function playRound(playerChoice) {
  // Game must be started first
  if (gameStarted === false) {
    alert("Click Start Game first.");
    return;
  }

  var computerChoice = getComputerChoice();
  var outcome;

  // Decide the result: rock beats scissors, scissors beats paper, paper beats rock
  if (playerChoice === computerChoice) {
    outcome = "Draw";
  } else if (playerChoice === "rock" && computerChoice === "scissors") {
    outcome = "Win";
  } else if (playerChoice === "scissors" && computerChoice === "paper") {
    outcome = "Win";
  } else if (playerChoice === "paper" && computerChoice === "rock") {
    outcome = "Win";
  } else {
    outcome = "Lose";
  }

  // Change both pictures
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  // Show the result and colour it: green = Win, red = Lose, grey = Draw
  var resultBox = document.getElementById("result");
  resultBox.innerHTML = "Result: " + outcome;
  if (outcome === "Win") {
    resultBox.style.color = "green";
    wins++;
  } else if (outcome === "Lose") {
    resultBox.style.color = "red";
    losses++;
  } else {
    resultBox.style.color = "grey";
    draws++;
  }

  // Update the scoreboard
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store the result and add a row to the history table
  results.push(outcome);
  document.getElementById("history").innerHTML +=
    "<tr><td>" + results.length + "</td><td>" + playerChoice +
    "</td><td>" + computerChoice + "</td><td>" + outcome + "</td></tr>";
}

// ---------- showSummary(): rounds played and win percentage ----------
function showSummary() {
  var winCount = 0;

  // Count the wins with a for loop
  for (var i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  if (results.length === 0) {
    document.getElementById("summary").innerHTML = "You have not played any rounds yet.";
    return;
  }

  var percent = Math.round((winCount / results.length) * 100);
  document.getElementById("summary").innerHTML =
    "You played " + results.length + " rounds and won " + percent + "%";
}

// ---------- resetGame(): put everything back to the start ----------
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  results = [];

  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";

  // Keep only the header row in the history table
  document.getElementById("history").innerHTML =
    "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";
}