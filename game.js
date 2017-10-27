//Immediately Invoked Function Expression or IIFE
var Game = (function () {


	function Game() {

		this.player = new Player(1000);
		this.deck = new Deck(true);
		this.hand = new Hand();
		this.newHand = true;
		this.cardImages = [];
		this.playerBet = 0;

	}

	Game.prototype.play = function () {

		var self = this;

		var dealButton = document.getElementById("deal");
		
//removes the disabled class on the deal button
		document.getElementById('playerBetInput').addEventListener('click', function (event) {
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

	}

	Game.prototype.deal = function () {

		this.playerBet = document.getElementById("playerBetInput").valueAsNumber;
		let playerBank = document.getElementById('playerBankSpan');
		let showHandName = document.getElementById('showHandName');

		var self = this;

		if (this.newHand) {

			this.player.updateAccount(-this.playerBet);

			playerBank.innerHTML = this.player.account;

			var cards = this.deck.deal(5);
			//console.log(cards);
			showCardOnTable(this.cardImages[0], cards[0]);
			showCardOnTable(this.cardImages[1], cards[1]);
			showCardOnTable(this.cardImages[2], cards[2]);
			showCardOnTable(this.cardImages[3], cards[3]);
			showCardOnTable(this.cardImages[4], cards[4]);

			this.hand = new Hand(cards);
			this.newHand = false;
			console.log(this.newHand);
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
			var winnings = this.playerBet * bestHand.multiplier + this.playerBet;

			this.player.updateAccount(winnings);
			playerBank.innerHTML = this.player.account;
			showHandName.innerHTML = bestHand.name;

			
			//sets newHand to true again
			this.newHand = true;
			console.log(this.newHand);

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