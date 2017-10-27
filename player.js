

var Player = (function () {

	

	function Player(balance) {
		
		//new player instance and sets this account equal to the value of balance 
		//balance should be defalut to 1000
		this.account = balance || 1000;
	}

	//update account function
	Player.prototype.updateAccount = function (amount) {
		this.account += amount;

	};

	return Player;

})();