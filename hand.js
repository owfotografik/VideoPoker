//Immediately Invoked Function Expression or IIFE

var Hand = (function () {

    //var playerCards = document.getElementById('playerHand');
    function Hand(cards) {

        //bring in an array of cards and loop throug
        this.cards = cards || [];
       this.cards.sort(cardSort);
        //console.log(this.cards);

    }
    //prototype function to add cards to the hand
    Hand.prototype.addCards = function (cards) {
        this.cards = this.cards.concat(cards);
    };
    ///prototype function to remove card from Hand
    Hand.prototype.deleteCards = function (names) {
        this.cards = this.cards.filter(function (item) {
            return !names.includes(item.name);
        });
    };

    //get best hand function
    Hand.prototype.getBestHand = function () {
        var groups = getGroups(this.cards);


        if (isThreeOfAKind(groups, this.cards)) {
            return {
                name: "Three Of A Kind Wins",
                multiplier: 3
            }
        }
        else if (isFourOfAKind(groups, this.cards)) {
            return {
                name: "4 of a Kind Wins",
                multiplier: 40
            }
        }
        else if (isFullHouse(groups, this.cards)) {
            return {
                name: "Full House Wins",
                multiplier: 10
            }
        }

        else if (isTwoPairs(groups, this.cards)) {
            return {
                name: "Two Pairs Wins",
                multiplier: 2
            }
        }

        else if (isRoyalFlush(groups, this.cards)) {
            return {
                name: "Royal Flush Wins",
                multiplier: 250
            }
        }
        else if (isStraightFlush(groups, this.cards)) {
            return {
                name: "Straight Flush Wins",
                multiplier: 50
            }
        }
        else if (isFlush(groups, this.cards)) {
            return {
                name: "Flush Wins",
                multiplier: 7
            }
        }

        else if (isStraight(groups, this.cards)) {
            return {
                name: "Straight Wins",
                multiplier: 5
            }
        }

        else if (isOnePairJacksOrBetter(groups, this.cards)) {
            return {
                name: "1 Pair Jacks or Better Gets You Your Bet Back",
                multiplier: 1
            }
        }
        else {
            return {
                name: "High Card Doesn't Win Anything",
                multiplier: 0
            }
        }
        return bestHand;
    };


    function isStraightFlush(cards, groups) {
        ///console.log(cards[0].suit);
        if (isStraight(groups, cards)) {
            if (isFlush(groups, cards)) {
            }
            {
            }
        }
    }
    function isRoyalFlush(groups, cards) {
        ///console.log(cards[0].suit);
        if (isFlush(groups, cards)) {
            if (cards[0].value === 10 && cards[4].value === 14) return true;
        }
    }

    function isStraight(groups, cards) {
        ///console.log(cards[0].suit);
        //"cards are in sequential order"
        var names = Object.getOwnPropertyNames(groups);

        if (names.length === 5) {
            if (cards[4].value === 14) {
                if (cards[0].value === 10) return true;
                if (cards[0].value === 2 && cards[3].value === 5) return true;
                return false
            }
            return cards[4].value - cards[0].value === 4;
        }

    }

    function isTwoPairs(groups, cards) {
        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 3) {
            return names.some(function (name) {
                return groups[name] === 2;
            });
        };
    }

    function isFullHouse(groups, cards) {
        ///console.log(cards[0].suit);
        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 2) {
            return names.some(function (name) {
                return groups[name] === 3;
            });
        };
    }

    function isFourOfAKind(groups, cards) {
        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 2) {
            return names.some(function (names) {
                return groups[names] === 4;
            });
        };
    };

    function isThreeOfAKind(groups, cards) {
        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 3) {
            return names.some(function (names) {
                return groups[names] === 3;
            });
        };
    };

    function isFlush(groups, cards) {
        ///console.log(cards[0].suit);
        if (!isStraight(groups, cards)) {
            
            return cards.length === 5 &&
                cards[0].suit === cards[1].suit &&
                cards[0].suit === cards[2].suit &&
                cards[0].suit === cards[3].suit &&
                cards[0].suit === cards[4].suit;
        }
        return true;

    }

    function isOnePairJacksOrBetter(groups, cards) {
        var names = Object.getOwnPropertyNames(groups)
        if (names.length === 4) {
            return names.some(function (name) {

                //console.log(groups[name] === 2, name > 10);
                return (groups[name] === 2 && name > 10);

            })
        }
    }

    //function isOnePair(groups, cards) {
    //var names = Object.getOwnPropertyNames(groups)
    //if (names.length === 4) {
    //names.some(function (name) {
    //return groups[name] === 2; 
    // })
    //}
    //}

    function cardSort(cardA, cardB) {
        return cardA.value - cardB.value;
    }


    function getGroups(cards) {

        // because groups is an object - returning groups returns a key value pair
        var groups = {};

        var propertyName = " ";

        //removed cards.forEach
        cards.forEach(function (card) {

            propertyName = card.value;

            //if there is a property with the name then add a number to the groups object
            if (groups[propertyName]) {
                groups[propertyName]++;
            }
            //if there isn't a property with the name then add the name to the groups object
            else {
                groups[propertyName] = 1;
            }

        });//console.log(groups);
        return groups;
    }

    return Hand;
    //END IIFE - Don't code below this line
})();