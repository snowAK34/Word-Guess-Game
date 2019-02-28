// Array of Possible Words to guess
wordBank = ["GIRAFFE", "ZEBRA", "LION", "TIGER", "ORANGUTAN", "TAPIR", "GORILLA", "JAGUAR", "TOUCAN", "BEAR", "WOLF", "PORCUPINE", "WALLABY", "KANGAROO", "RHINO"];

// Declare variables
let computerAnswer ;
let answerLetters = [];
let answerLength ;
let userGuess ;
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let pastGuesses = [] ;
let matchCount = 0;
let wins = 0;
let losses = 0 ;
let guessesLeft = 10;



// Computer decides a random word for the game
computerAnswer = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log("Answer: " + computerAnswer);

// Split computer answer into individual letters
answerLetters = computerAnswer.split("");
console.log("Answer Letters: " + answerLetters);
answerLength = answerLetters.length;
console.log("Answer Length: " + answerLength);

// Obtain guess from user on keypress, changes to uppercase, & stores in a list of guesses
document.onkeyup = function (event) {
    userGuess = event.key.toUpperCase();

// Check if answer has been tried
    if (pastGuesses.includes(userGuess)) {
        alert("You have already guessed that letter, try again.");
    }
// Checks that answer is a letter
    else if (!letters.includes(userGuess)) {
        alert("That is not a letter. Try pressing a letter key.")
    }
// If both a new letter and not in the answer, counts down a guess
    else if (!answerLetters.includes(userGuess) && !pastGuesses.includes(userGuess) && letters.includes(userGuess)) {
        pastGuesses.push(userGuess);
        --guessesLeft;
        console.log(pastGuesses);
        console.log("Guesses Left: " + guessesLeft);
        if (guessesLeft === 0) {
            losses--;
        }
        console.log("Losses: " + losses);
    }
// A good answer will count toward number of matches in answer word
// When matches reach the answer length, user wins
    else {
        pastGuesses.push(userGuess);
        for (x = 0 ; x < answerLetters.length; x++) {
            if (answerLetters[x] === userGuess) {
                matchCount++;
                console.log("matchCount: " + matchCount);
                if (matchCount === answerLength) {
                    wins++;
                    console.log("Wins: " + wins);
                }
            }
        }
    }
    document.getElementById("win").textContent = wins;
    document.getElementById("loss").textContent = losses;
    document.getElementById("miss").textContent = guessesLeft;
}

