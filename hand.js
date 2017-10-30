//Immediately Invoked Function Expression or IIFE

var Hand = (function () {

    //var playerCards = document.getElementById('playerHand');
    function Hand(cards) {
        //bring in an array of cards and loop throug
        this.cards = cards || [];
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
       

        if (isRoyalFlush) {
            return {
                name: "Royal Flush",
                multiplier: 250
            }
        }
        else if (isStraightFlush) {
            return {
                name: "Straight Flush",
                multiplier: 50
            }
        }
        else if (isFourOfaKind) {
            return {
                name: "4 of a Kind",
                multiplier: 40
            }
        }
        else if (isFullHouse) {
            return {
                name: "Full House",
                multiplier: 10
            }
        }
        else if (isFlush) {
            return {
                name: "Flush",
                multiplier: 7
            }
        }
        else if (isStraight) {
            return {
                name: "Straight",
                multiplier: 5
            }
        }
        else if (isThreeOfAKind) {
            return {
                name: "Three Of A Kind",
                multiplier: 3
            }
        }
        else if (isTwoPairs) {
            return {
                name: "Two Pairs",
                multiplier: 2
            }
        }
        else if (isOnePairJacksOrBetter) {
            return {
                name: "1 Pair Jacks or Better",
                multiplier: 1
            }
        }
        else {
            return {
                name: "Nada",
                multiplier: 0
            }
        }
        return bestHand;
    };

    function isRoyalFlush(isFlush, groups) {
        ///console.log(cards[0].suit);
        if (isFlush && "only have 10-A") {

        }

    }

    function isStraightFlush(cards, groups) {
        ///console.log(cards[0].suit);
        if (isFlush && "cards are in sequential order") {

        }
    }

    function isFourOfaKind(groups) {
        ///console.log(cards[0].suit);
        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 2) {
            return names.some(function (name) {
                return cardGroups[name] === 1;
            });
        };
    }

    function isFullHouse(cards, groups) {
        ///console.log(cards[0].suit);
        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 2) {
            return names.some(function (name) {
                return cardGroups[name] === 2;
            });
        };
    }

    function isFlush(cards) {
        ///console.log(cards[0].suit);
        return cards.length === 5 &&
            cards[0].suit === cards[1].suit &&
            cards[0].suit === cards[2].suit &&
            cards[0].suit === cards[3].suit &&
            cards[0].suit === cards[4].suit;

    }

    function isStraight(cards) {
        ///console.log(cards[0].suit);
        "cards are in sequential order"
        var m = 0; // counter for loop.
        var current_num;
        var next_num;
        var result = a;
        var test;
        if (a !== undefined) {
            if (a.constructor === Array) { // check if input a is array object.
                result = true;
                while (m < a.length) { // loop through array elements.
                    current_num = a[m];
                    next_num = a[m + 1];
                    if (typeof current_num === "number" &&
                            typeof next_num === "number") {
                        if (b === 1) {
                            test = current_num <= next_num; // descending.
                        } else {
                            test = current_num >= next_num; // ascending.
                        }
                        if (test) { // found unordered/same elements.
                            result = false;
                            break;
                        }
                    }
                    m += 1;
                }
            }
        }
        return result;
    }

    function isThreeOfAKind(groups) {

        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 3) {
            return names.some(function (name) {
                return cardGroups[name] === 1;
            });
        };
    };

    function isTwoOfAKind(groups) {

        var names = Object.getOwnPropertyNames(groups);
        if (names.length === 3) {
            return names.some(function (name) {
                return cardGroups[name] === 2;
            });
        };
    };

    function IsJacksorBetter(cards, groups) {
        var names = Object.getOwnPropertyNames(groups)
        if (names.length === 4) {
            names.some(function (name) {
                return groups[name] === 1
            })
        }
    }



    function getGroups(cards) {

        // because groups is an object - returning groups returns a key value pair
        var groups = {};

        var propertyName = " ";

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

        });
        return groups;
    }

    return Hand;
    //END IIFE - Don't code below this line
})();