//ui 

var scores, roundScore, activePlayer, inPlay, playTill, lastRoll;

newGame();

document.querySelector(".inst").addEventListener("click", function() {
  document.getElementById("instructions").style.height = "100%";
});

document.querySelector(".closebtn").addEventListener("click", function() {
  document.getElementById("instructions").style.height = "0%";
});

//roll dice button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (inPlay) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.visibility = "visible";
    diceDOM.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/243004/dice-' + dice + '.png';
    //3. Update round score, only if rolled number was not a 1
    if (dice !== 1) {
      //add the score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
    lastRoll = dice;
  }
});

//hold && next player button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (inPlay) {
    //add current score to players global score
    scores[activePlayer] += roundScore;
    playTill = document.querySelector(".playTill").value;
    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //check if player won game
    var input = document.querySelector(".playTill").value;

    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent =
        "Winner!";
      document.querySelector(".dice").style.visibility = "hidden";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      inPlay = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

//new game button
document.querySelector(".btn-new").addEventListener("click", newGame);

//game constuctor 
function newGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  inPlay = true;
  document.querySelector(".dice").style.display = "block";
  
  document.querySelector(".dice").src = "https://carterrink.com/assets/images/dice-5.png";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
