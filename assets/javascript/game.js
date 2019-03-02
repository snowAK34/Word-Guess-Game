"use strict"

// Array of Possible Words to guess
const wordBank = ["GIRAFFE", "ZEBRA", "LION", "TIGER", "ORANGUTAN", "TAPIR", "GORILLA", "JAGUAR", "TOUCAN", "BEAR", "WOLF", "PORCUPINE", "WALLABY", "KANGAROO", "RHINO"];
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// Declare variables
let computerAnswer ;
let answerLetters = [];
let userGuess ;
let pastGuesses = [] ;
let matchCount = 0;
let wins = 0;
let losses = 0 ;
let guessesLeft = 10;
const slot = "_ ";
let slotArr = [];
let newSlotArr = [];
let gameRunning = false;

function getGoing() {
    if (gameRunning === false) {
        document.onkeyup = function() {
            gameStart();
        }
    };
};

function gameStart() {
    gameRunning = true
    console.log("Running(start of gameStart): " + gameRunning);

    // Reset Variables
    pastGuesses = [] ;
    guessesLeft = 10;
    matchCount = 0;

    // Hide Directions
    document.getElementById("instructions").style.display = "none";

    // Computer decides a random word for the game
    computerAnswer = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log("Answer: " + computerAnswer);

    // Split computer answer into individual letters
    answerLetters = computerAnswer.split("");
    console.log("Answer Letters: " + answerLetters);

    // Display blanks equal to answer length
    let slotStr = slot.repeat(answerLetters.length);
    slotArr = slotStr.split(" ");
    document.getElementById("letter-slots").textContent = slotArr.join(" ");

    gamePlay();
}


function gamePlay() {
    gameRunning = true
    console.log("Running(start of gamePlay): " + gameRunning);
    
    // Obtain guess from user on keypress, changes to uppercase, & stores in a list of guesses
    document.onkeyup = function (event) {
        userGuess = event.key.toUpperCase();

        // Check if answer has been tried
        if (pastGuesses.includes(userGuess)) {
            alert("You have already guessed that letter, try again.");
        }
        // Checks that answer is a letter
        else if (!letters.includes(userGuess)) {
            alert("To make a guess, try pressing a letter key.")
        }
        // A good answer will count toward number of matches in answer word
        // Display correct letter
        // When matches reach the answer length, user wins
        else if (answerLetters.includes(userGuess)) {
            for (let x = 0 ; x < answerLetters.length; x++) {
                if (answerLetters[x] === userGuess) {
                    slotArr.splice(x, 1, answerLetters[x]);
                    newSlotArr = slotArr.join(" ");
                    matchCount++;
                    console.log("matchCount: " + matchCount);
                }
            }
            document.getElementById("letter-slots").textContent = newSlotArr;
            gameEnd();    
        }
        // If both a new letter and not in the answer, counts down a guess
        else {
            pastGuesses.push(userGuess);
            --guessesLeft;
            console.log("Past Guesses: " + pastGuesses);
            console.log("Guesses Left: " + guessesLeft);
        gameEnd();
        }
        document.getElementById("win").textContent = wins;
        document.getElementById("loss").textContent = losses;
        document.getElementById("miss").textContent = guessesLeft;
        document.getElementById("past-guesses").textContent = pastGuesses;
    }
}

function gameEnd() {
    if (matchCount === answerLetters.length) {
        wins++;
        console.log("Wins: " + wins);
        gameRunning = false;
        console.log("Running(win condition): " + gameRunning);
        getGoing();
        alert("You won!  Press any key to play again.")
    }
    else if (guessesLeft === 0) {
        losses--;
        console.log("Losses: " + losses);
        gameRunning = false;
        console.log("Running(lose condition): " + gameRunning);
        getGoing();
        alert("You lost.  Press any key to play again.");
    }
    else {
        gamePlay();
    }
}

console.log("Running(start of code execution): " + gameRunning);
getGoing();