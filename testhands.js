//Immediately Invoked Function Expression or IIFE

(function () {

  
    ////////end deck shuffle test

    //var hand = new Hand(deck.deal(5));

    //////////////////////////test hands by creating a ton of hands


    //////Royal Flush - 250:1 - including ace, king, queen, jack, and ten all in the same suit, 
    ///which is the hand of the highest possible value when wild cards are not in use.

    var handRoyalFlush = new Hand([
        new Card('AH'),
        new Card('KH'),
        new Card('QH'),
        new Card('JH'),
        new Card('10H')
    ]);

    //////Straight Flush - 50:1 - five cards of sequential rank, all the same suit

    var handStraightFlush = new Hand([
        new Card('2H'),
        new Card('3H'),
        new Card('4H'),
        new Card('5H'),
        new Card('6H')
    ]);

    //////test 4 of a kind - 40:1 -is a poker hand containing four cards of the same rank and one card of another rank 

    var fourOfaKind = new Hand([
        new Card('2S'),
        new Card('2H'),
        new Card('2D'),
        new Card('2C'),
        new Card('6S')
    ]);

    //////Full House - 10:1 -  is a poker hand containing three cards of one rank and two cards of another rank, 

    var fullHouse = new Deck(true);

    var hand = new Hand([
        new Card('3H'),
        new Card('3S'),
        new Card('3C'),
        new Card('6H'),
        new Card('6C')
    ]);

    /////////- Flush - 7:1 - is a poker hand containing five cards all of the same suit, not all of sequential rank,

    var flush = new Deck(true);

    var hand = new Hand([
        new Card('2H'),
        new Card('5H'),
        new Card('9H'),
        new Card('JH'),
        new Card('AH')
    ]);
    /////////- Straight - 5:1 -  is a poker hand containing five cards of sequential rank, not all of the same suit, 

    var straight = new Deck(true);

    var hand = new Hand([
        new Card('2H'),
        new Card('3C'),
        new Card('4S'),
        new Card('5C'),
        new Card('6H')
    ]);

    /////////- 3 of a Kind - 3:1 -  is a poker hand containing three cards of the same rank and two cards of two other ranks 

    var threeOfaKind = new Deck(true);

    var hand = new Hand([
        new Card('2H'),
        new Card('2C'),
        new Card('2S'),
        new Card('5C'),
        new Card('6H')
    ]);

    /////////- 2 Pairs - 2:1 -is a poker hand containing two cards of the same rank, two cards of another rank and one card of a third rank 

    var twoPair = new Deck(true);

    var hand = new Hand([
        new Card('JH'),
        new Card('JC'),
        new Card('3S'),
        new Card('3C'),
        new Card('6H')
    ]);

  /////////- 1 Pair Jacks or Better - 1:1 - or simply a pair, is a poker hand containing two cards of the same rank and three cards of three other ranks

  var onePairJacksorBetter = new Deck(true);
  
      var hand = new Hand([
          new Card('JH'),
          new Card('JC'),
          new Card('2S'),
          new Card('7C'),
          new Card('6H')
      ]);
  


    //see if best hand works
    console.log(hand.getBestHand());


    //END IIFE - Don't code below this line
})();