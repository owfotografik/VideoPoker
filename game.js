//Immediately Invoked Function Expression or IIFE
var Game = (function () {
	
	function Game() {

		this.player = new Player(0);
		document.getElementById("playerBankSpan").innerHTML = this.player.account;
		this.deck = new Deck(true);
		this.hand = new Hand();
		//console.log("first place hand shows:", this.hand);
		this.newHand = true;
		this.cardImages = [];
	}

	var dealButton = document.getElementById("deal");
	var hitButton = document.getElementById("hit");
	var playAgainButton = document.getElementById("playAgain");
	var playerBetInputField = document.getElementById('playerBetInput');
	var playerHandDiv = document.getElementById('playerHandDiv');

	Game.prototype.play = function () {
		var self = this;

		playerBetInputField.addEventListener('click', function (event) {
			dealButton.removeAttribute("disabled");
		})

		this.cardImages[0] = document.getElementById('playerCard1');
		this.cardImages[1] = document.getElementById('playerCard2');
		this.cardImages[2] = document.getElementById('playerCard3');
		this.cardImages[3] = document.getElementById('playerCard4');
		this.cardImages[4] = document.getElementById('playerCard5');

		this.cardImages[0].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[1].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[2].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[3].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[4].addEventListener("click", function (event) {
			self.hold(event.target)
		})
	
		dealButton.addEventListener('click', function () {
			self.deal();
		})
		hitButton.addEventListener('click', function () {
			self.deal();
		})

		//play again button - ends current hand - removes hold class - hide show buttons
		playAgainButton.addEventListener('click', function () {
			playAgainButton.classList.add("hidden");
			playerBetInputField.removeAttribute("disabled");
			dealButton.classList.remove("hidden");
		
			self.cardImages[0].classList.remove("hold");
			self.cardImages[1].classList.remove("hold");
			self.cardImages[2].classList.remove("hold");
			self.cardImages[3].classList.remove("hold");
			self.cardImages[4].classList.remove("hold");
			
			document.getElementById("showHandName").innerHTML = "Are You Feeling Lucky?";
	
			self.cardImages[0].src = "img/back.png";
			self.cardImages[1].src = "img/back.png";
			self.cardImages[2].src = "img/back.png";
			self.cardImages[3].src = "img/back.png";
			self.cardImages[4].src = "img/back.png";
			this.hand = [];
		})

	}

	Game.prototype.deal = function () {
		//this.hand = new Hand();
		this.playerBet = document.getElementById("playerBetInput").valueAsNumber;
		let playerBank = document.getElementById('playerBankSpan');
		let showHandName = document.getElementById('showHandName');
		//assigns the current instance of the game to the variable self
		var self = this;
		//first part of if / else conditions is if this is a new hand
		//if it is a new hand, then the player needs to make a bet greater than 0 to proceed
		if (this.newHand) {
			if (self.playerBet > this.player.account) {
				playerBetInputField.value = 0;
				return alert("Try Again With A Lower Bet")
			}
			else if (self.playerBet === 0) {
				return alert("Try Again With An Actual Bet")
			}
			//update the amount in the player account to remove the bet amount
			this.player.updateAccount(-this.playerBet);
			//show the new player balance on the index page
			playerBank.innerHTML = this.player.account;
			//test hand to use if you want to hard code a hand
			//var cards = [new Card('AC'), new Card('KC'), new Card('QC'), new Card('JC'), new Card('10C')];
			//this.hand = new Hand();
			//console to see contents of the current hand - should show an empty array until cards
			//are dealt to it
			//console.log("this.hand:", this.hand);
			//console to see the contents of the current cards dealt that make up the new hand.
			//this should be the cards taken from the deck
			var cards = this.deck.deal(5);
			//this.hand.addCards(cards);
			this.hand = new Hand(cards);
			console.log("first new deal:", cards);
			//the show card on table function takes the cards in the array and assigns an image
			//to a place in the array of cards
			showCardOnTable(this.cardImages[0], cards[0]);
			showCardOnTable(this.cardImages[1], cards[1]);
			showCardOnTable(this.cardImages[2], cards[2]);
			showCardOnTable(this.cardImages[3], cards[3]);
			showCardOnTable(this.cardImages[4], cards[4]);
			//sets the variable this.newHand to false indicating that the next time the deal function
			//is called to skip the first part and go to the else
			this.newHand = false;
			//removes the ability to change the bet in the bet input field
			playerBetInputField.setAttribute("disabled", true);
			//shows the hit button 
			hitButton.classList.remove("hidden");
			//hides the deal button
			dealButton.classList.add("hidden");
			//console.log(this.newHand);
			//console.log("deck after first run through the deal:", this.deck);
		}
		//second part of if / else conditions is if this is not a new hand

		//sets variables for these functions to use
		else {
			var removeCards = document.querySelectorAll("img:not(.hold)")
			//console.log(removeCards);
			var newCards = this.deck.deal(removeCards.length);
			var removeCardNames = [];
			
			//runs through the array of removeCards variable set above. These will be cards that don't have 
			//the hold class assigned to them
			for (var i = 0; i < removeCards.length; i++) {
				removeCardNames.push(removeCards[i].getAttribute("card-name"));
				showCardOnTable(removeCards[i], newCards[i]);
			}
			console.log("deck after second run through the deal:", this.deck);
			//take the cards from one arry and join them to another
			this.hand.deleteCards(removeCardNames.join(","));
			//console.log(this.hand);
			//add new cards to the hand instance
			this.hand.addCards(newCards);
			console.log("new cards:", newCards);
			console.log("total hand after add new cards:", this.hand)
			//console.log(this.hand);
			//run the get best hand function
			var bestHand = this.hand.getBestHand();
			//if statement is to check if we need to give the player their bet back or not. If multiplier is greater than 0 then give them back
			if (bestHand.multiplier > 0) {
				var winnings = this.playerBet * bestHand.multiplier + this.playerBet;
				//return winnings;
			}
			else {
				var winnings = 0;
			}


			this.player.updateAccount(winnings);
			playerBank.innerHTML = this.player.account;
			showHandName.innerHTML = bestHand.name;

			dealButton.classList.add("hidden");
			hitButton.classList.add("hidden");
			playAgainButton.classList.remove("hidden");
			playerBetInputField.value = "0";
			//console.log(playerBetInputField);
			this.newHand = true;
			//console.log("self.deck: ", this.deck);
			//this.hand = [];
			//console.log("self.hand: ", this.hand);
			this.deck = new Deck(true);
			//console.log("self.deck: ", this.deck);

		}
	}

	Game.prototype.hold = function (img) {
		img.classList.toggle("hold");
	}
	//This function shows the front of the card if the card is showing isFaceUp

	function showCardOnTable(img, card) {
		var self = this;
		img.src = 'img/' + card.name + '.png';
		img.setAttribute("card-name", card.name);

	}


	return Game;



	//END IIFE - Don't code below this line
})();