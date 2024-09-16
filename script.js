// === How to play ===
// ver 1. rolls 2 dice and turns the output for Player 1; Player 1 chooses the dice order and get the correct return output
// ver 2. refactored code to include Player 2
//      - global variable for current Player; all Player Score
//      - an array to store the scores of all players
// ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page

// Global variables
var gameStateDiceRoll = "Game State Dice Roll";
var gameStatePlayerChooseDiceOrder = "Game State Choose Dice Order";
var gameStateCompareScores = "Game State Compare Scores";
var gameState = gameStateDiceRoll;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

// Helper Function
var rollDice = function () {
  console.log("start of rollDice()");
  // produces a random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // take off the decimal to an integer -> 0 to 5
  var randomInteger = Math.floor(randomDecimal);
  // it's a number from 0 - 5 ... add 1 -> 1 to 6
  var diceNumber = randomInteger + 1;

  console.log("rollDice output, diceNumber: ", randomInteger);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log("start of rollDiceForPlayer()");
  // Initialise a counter to 0.
  var counter = 0;
  // Set the while loop condition to continue when counter is less than 2.
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    // Increment the counter by 1 at the end of each loop iteration.
    counter = counter + 1;
  }
  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );

  return `Hello, Player ${currentPlayer}! You have rolled: <br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]} <br><br> Choose either '1' or '2' to be used as the first digit of your final value.`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // Input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("input validation, invalid input not 1 and 2");
    return `Invalid input! Choose either '1' or '2' to be used as the first digit of your final value. <br><br>Your dice rolls are: <br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}`;
  }
  // If input is 1
  if (playerInput == 1) {
    console.log("input == 1");
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  // If input is 2
  if (playerInput == 2) {
    console.log("input == 2");
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  allPlayerScore.push(playerScore);
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your chosen value is ${playerScore}`;
};

var comparePlayersScores = function () {
  var compareMessage = `Player 1 score: ${allPlayerScore[0]} <br>Player 2 score: ${allPlayerScore[1]}`;

  // If Player 1 wins
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + `<br><br> Player 1 wins!`;
  }
  // If Player 2 wins
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + `<br><br> Player 2 wins!`;
  }
  // If it's a draw
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + `<br><br> It's a tie!`;
  }
  return compareMessage;
};

var resetGame = function () {
  console.log("Check game state with Submit click:", gameState);
  console.log("Check current player when Submit click:", currentPlayer);
  gameState = gameStateDiceRoll;
  currentPlayer = 1;
};

var main = function (input) {
  console.log("Check game state when Submit click: ", gameState);
  console.log("Check currentPlayer when Submit click: ", currentPlayer);
  var outputMessage = "";
  if (gameState == gameStateDiceRoll) {
    console.log("gameState == gameStateDiceRoll");
    outputMessage = rollDiceForPlayer();

    // Change the game state
    gameState = gameStatePlayerChooseDiceOrder;

    return `Hello, Player ${currentPlayer}! You have rolled: <br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]} <br><br> Choose either '1' or '2' to be used as the first digit of your final value.`;
  }

  if (gameState == gameStatePlayerChooseDiceOrder) {
    console.log("gameState == gameStatePlayerChooseDiceOrder");

    // Call player score function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("end of Player 1 turn, Player 2 turn now");
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return outputMessage + `<br><br>It is now Player 2's turn!`;
    }

    if (currentPlayer == 2) {
      console.log("end of Player 2 turn, submit click will calculate score");
      gameState = gameStateCompareScores;
      return outputMessage + `<br><br>Press submit to calculate scores!`;
    }
  }
  if (gameState == gameStateCompareScores) {
    console.log("game state == game state compare score");

    outputMessage = compareMessage();

    // Reset the game
    resetGame();
    return outputMessage;
  }
};
