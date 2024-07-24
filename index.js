//creating a blackjack game
let userChoice = prompt("Do you want to play a game of blackjack? (yes/no)");
let balance = 100;
const deck = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

//creating a function to get the dealer hand the deck ai
function dealerDeck() {
    let dealerHand = [];
    for (let i = 0; i < 2; i++) {
        dealerHand.push(deck[Math.floor(Math.random() * deck.length)]);
    }
    return dealerHand;
}

//creating a function to get the player hand
function playerDeck() {
    let playerHand = [];
    for (let i = 0; i < 2; i++) {
        playerHand.push(deck[Math.floor(Math.random() * deck.length)]);
    }
    return playerHand;
}

// Function to calculate the value of a hand
function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    for (let card of hand) {
        if (card === "J" || card === "Q" || card === "K") {
            value += 10;
        } else if (card === "A") {
            aceCount++;
            value += 11;
        } else {
            value += parseInt(card);
        }
    }
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

// Function to play the main game
function mainGame() {
    let dealerHand = dealerDeck();
    let playerHand = playerDeck();
    let playerValue = calculateHandValue(playerHand);
    let dealerValue = calculateHandValue(dealerHand);

    console.log("Dealer's hand:", dealerHand);
    console.log("Player's hand:", playerHand);

    let playerTurn = true;
    while (playerTurn) {
        let action = prompt("Your hand: " + playerHand.join(", ") + " (value: " + playerValue + "). Do you want to hit or stand?");
        if (action === "hit") {
            playerHand.push(deck[Math.floor(Math.random() * deck.length)]);
            playerValue = calculateHandValue(playerHand);
            if (playerValue > 21) {
                console.log("You busted! Your hand:", playerHand);
                return -1;
            }
        } else if (action === "stand") {
            playerTurn = false;
        }
    }

    while (dealerValue < 17) {
        dealerHand.push(deck[Math.floor(Math.random() * deck.length)]);
        dealerValue = calculateHandValue(dealerHand);
    }

    console.log("Dealer's final hand:", dealerHand, "value:", dealerValue);
    console.log("Player's final hand:", playerHand, "value:", playerValue);

    if (dealerValue > 21 || playerValue > dealerValue) {
        console.log("You win!");
        return 1;
    } else if (playerValue < dealerValue) {
        console.log("Dealer wins!");
        return -1;
    } else {
        console.log("It's a tie!");
        return 0;
    }
}

do {
    let betting = parseInt(prompt("How much would you like to bet? Your current balance is $" + balance));
    if (betting > balance) {
        console.log("You cannot bet more than your current balance.");
        continue;
    }
    balance -= betting;
    let result = mainGame();
    if (result === 1) {
        balance += betting * 2;
    } else if (result === 0) {
        balance += betting;
    }
    userChoice = prompt("Do you want to play another game of blackjack? (yes/no)");
} while (userChoice === "yes");

console.log("Game over! Your final balance is $" + balance);