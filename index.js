//builds class for each individual card
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
//assigns a value to each card depending on what rank or value is on the card
    getValue() {
        if (this.rank === 'A') {
            return 11;
        } else if (['K', 'Q', 'J'].includes(this.rank)) {
            return 10;
        } else {
            return parseInt(this.rank);
        }
    }
//produces a string that states the suit and value of a card
    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}
//creates deck class to pull cards from when main game loop is played
class Deck {
    constructor() {
        this.cards = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//for loop assigns all the suits and ranks together which will creater a single standard deck based on the information we porivded in the Deck constructor. can be easily ajusted to make more than one deck if required.
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }
//used to randomly organize the cards within the deck 
    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }
//used to take a card out of the deck after dealing it to the player or dealer to simulate how it works in real life
    deal() {
        return this.cards.pop();
    }
}
//function that takes the cards in a hand and calculates what the number value of those cards are when put together
function calculateHandValue(hand) {
    let value = hand.reduce((sum, card) => sum + card.getValue(), 0);
    let aces = hand.filter(card => card.rank === 'A').length;
//if there is an ace in play and the total hand vlaue is > 21 then it reverts the ace to the lower value
    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }

    return value;
}
//main game loop function
function playBlackjack() {
    const deck = new Deck();
    deck.shuffle();

    let playerHand = [deck.deal(), deck.deal()];
    let dealerHand = [deck.deal(), deck.deal()];

    console.log("Player's hand: ", playerHand.map(card => card.toString()));
    console.log("Dealer's Hand: ", dealerHand.map(card => card.toString()));

    //players turn
    let playerTurn = true;
    while (playerTurn && calculateHandValue(playerHand) < 21) {
        const action = prompt("Hit or Stand? (h/s): ").toLowerCase();
        if (action === 'h') {
            playerHand.push(deck.deal());
            console.log( "Player's hand ", playerHand.map(card => card.toString()));
        } else {
            playerTurn = false;
        }
    }

    //dealers turn
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(deck.deal());
    }

    console.log("Final Player's hand: ", playerHand.map(card => card.toString()));
    console.log("Final Dealer's hand: ", dealerHand.map(card => card.toString()));

    //determine who won
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
        console.log('Player busted! The dealer wins.');
    } else if (dealerValue > 21) {
        console.log('The dealer busted! Player wins.');
    } else if (playerValue > dealerValue) {
        console.log('Player wins!');
    } else if (playerValue < dealerValue) {
        console.log('Dealer wins.')
    } else {
        console.log('Its a push! (tie).')
    }
}

//play using live server and right click > inspect to view the console. purpose of this project was the javascript so front end is a little lax
playBlackjack();