

var Player = (function () {

	//can save info to local storage to use later
	const LOCAL_STORAGE_KEY = "VideoPokerAccount";

	function Player(balance) {
		//new player instance and sets this account equal to the value of balance 
		//balance should be defalut to 1000
		this.account = balance || 0;
		if (this.account === 0) {
			this.account = loadFromLocalStorage();
		}
	}

	//update account function
	Player.prototype.updateAccount = function (amount) {
		this.account += amount;

		saveToLocalStorage(this.account);

		function loadFromLocalStorage() {
			return parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) || '0');

		}
		function saveToLocalStorage(account) {
			localStorage.setItem(LOCAL_STORAGE_KEY, account);
		}
	};


	return Player;

})();