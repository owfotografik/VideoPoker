//Immediately Invoked Function Expression or IIFE

///card constructor function
var Card = (function () {

    function Card(name) {
        //this.name 
        this.name = name;
        this.value = getCardValue(name);
        this.suit = getCardSuit(name);
    }

    /////get card value function

    function getCardValue(name) {
        if (name[0] === "1") return 10;
        if (name[0] === "J") return 11;
        if (name[0] === "Q") return 12;
        if (name[0] === "K") return 13;
        if (name[0] === "A") return 14;
        return parseInt(name[0]);
    }

    //get card suit function

    function getCardSuit(name) {
        var suit = name[name.length - 1];
        if (suit === "H") return "Hearts";
        if (suit === "D") return "Diamonds";
        if (suit === "C") return "Clubs";
        return "Spades";

    }
    return Card;
    //END IIFE - Don't code below this line
})();