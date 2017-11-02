//Immediately Invoked Function Expression or IIFE

var Deck = (function () {

    //establish a deck

    function Deck(shuffleNow) {
        this.cards = [
            '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
            '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
            '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
            '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
        ];

        if (shuffleNow) this.shuffle();
    }
    //end deck constructor function

    //function to shuffle the deck

    Deck.prototype.shuffle = function () {

        var m = this.cards.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }

    };
    ////end shuffle function

    /////deal function - anone who calls deal will get a card
    Deck.prototype.deal = function (howMany) {
        //this will set a default value on a paramater - if howMany is undefined, this code will set to 1
        howMany = howMany || 0;

        var newCards = this.cards.splice(0, howMany);

        return newCards.map(function (item) {
            return new Card(item);
        });
    }

    /////end deal




return Deck;
//END IIFE - Don't code below this line
})();