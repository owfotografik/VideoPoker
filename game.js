//Immediately Invoked Function Expression or IIFE
var Game = (function () {


	function Game() {

		this.player = new Player(0);
		document.getElementById("playerBankSpan").innerHTML = this.player.account;
		this.deck = new Deck(true);
		this.hand = new Hand();
		this.newHand = true;
		this.cardImages = [];
		//this.playerBet = 0;
	}

	var dealButton = document.getElementById("deal");
	//hit button hidden by default to start game
	var hitButton = document.getElementById("hit");
	//play again button hidden by default to start game
	var playAgainButton = document.getElementById("playAgain");
	var playerBetInputField = document.getElementById('playerBetInput');
	var playerHandDiv = document.getElementById('playerHandDiv');

	Game.prototype.play = function () {
		var self = this;

		//removes the disabled class on the deal button
		playerBetInputField.addEventListener('click', function (event) {
			//pretty sure I don't need this if statement - remove it later and test
			if (self.player.account >= playerBetInputField.value) {
				dealButton.removeAttribute("disabled");
			}

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
			//pretty sure I don't need this code anymore
			//playerHandDiv.classList.remove("hidden");
		})
		hitButton.addEventListener('click', function () {
			self.deal();
			//pretty sure I don't need this code anymore
			//playerHandDiv.classList.remove("hidden");
		})
		playAgainButton.addEventListener('click', function () {
			//self.deal();
			playAgainButton.classList.add("hidden");
			this.deck = new Deck(true);
			console.log(this.deck);
			playerBetInputField.removeAttribute("disabled");
			dealButton.classList.remove("hidden");
			self.cardImages[0].classList.remove("hold");
			self.cardImages[1].classList.remove("hold");
			self.cardImages[2].classList.remove("hold");
			self.cardImages[3].classList.remove("hold");
			self.cardImages[4].classList.remove("hold");
			//remove cards from table
			document.getElementById("showHandName").innerHTML = "Are You Feeling Lucky?";
			self.cardImages[0].src = "img/back.png";
			self.cardImages[1].src = "img/back.png";
			self.cardImages[2].src = "img/back.png";
			self.cardImages[3].src = "img/back.png";
			self.cardImages[4].src = "img/back.png";
		})

	}

	Game.prototype.deal = function () {

		this.playerBet = document.getElementById("playerBetInput").valueAsNumber;
		let playerBank = document.getElementById('playerBankSpan');
		let showHandName = document.getElementById('showHandName');

		var self = this;

		if (this.newHand) {
			if (self.playerBet > this.player.account) {
				playerBetInputField.value = 0;
				return alert("Try Again With A Lower Bet")
			}
			else if (self.playerBet === 0) {
				return alert("Try Again With An Actual Bet")
			}
			this.player.updateAccount(-this.playerBet);
			playerBank.innerHTML = this.player.account;
			//var cards = [new Card('AC'), new Card('KC'), new Card('QC'), new Card('JC'), new Card('10C')];
			var cards = this.deck.deal(5);
			this.hand = new Hand(cards);
			//console.log(cards);
			showCardOnTable(this.cardImages[0], cards[0]);
			showCardOnTable(this.cardImages[1], cards[1]);
			showCardOnTable(this.cardImages[2], cards[2]);
			showCardOnTable(this.cardImages[3], cards[3]);
			showCardOnTable(this.cardImages[4], cards[4]);

			this.newHand = false;
			playerBetInputField.setAttribute("disabled", true);
			hitButton.classList.remove("hidden");
			dealButton.classList.add("hidden");
			//console.log(this.newHand);
		}
		else {
			var removeCards = document.querySelectorAll("img:not(.hold)")
			//console.log(removeCards);
			var newCards = this.deck.deal(removeCards.length);
			var removeCardNames = [];

			for (var i = 0; i < removeCards.length; i++) {
				removeCardNames.push(removeCards[i].getAttribute("card-name"));
				showCardOnTable(removeCards[i], newCards[i]);
			}

			this.hand.deleteCards(removeCardNames.join(","));
			//console.log(this.hand);

			this.hand.addCards(newCards);
			//console.log(this.hand);
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
			

			//console.log(this.newHand);
			//clear the cards on the table


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