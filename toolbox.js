
var toolbox ={
	logInUser: function (username, password, userInfo) {
		for (var i = 0; i < userInfo.length; i++) {
			if (username == userInfo[i].username && password == userInfo[i].password) {
				console.log("success!");
				return true;
			}
		}
		return false;
	},
	signUpUser: function (username, userInfo) {
		for (var i = 0; i < userInfo.length; i++) {
			if (username == userInfo[i].username){
				res.send("This username is taken, please go back and choose a new one");
				return false;
			}
		}
		return true;
	},
	
	addNewUser: function(theUser, ourArray){
      ourArray.push(theUser);
  },
	addNewMessage: function(theMessage, arr) {
		arr.push(theMessage);
	}
};

module.exports = toolbox;