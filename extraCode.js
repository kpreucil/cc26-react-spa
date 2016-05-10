function logInUser(username, password) {
		if (username == "kpreucil" && password == "password") {
			console.log("success!");
			return true;
		} else if (username == "guest" && password == "guest") {
			console.log("success!");
			return true;
		}
		return false;
	}

	function logInUser(username, password) {
		for (var i = 0; i < userInfo.length; i++) {
			if (username == userInfo[i].username && password == userInfo[i].password) {
				console.log("success!");
				return true;
			}
		}
		return false;
	}

app.post("/messages", function (req, res) {
		if (!req.session.username) {
			res.send("error");
			return;
		}
		if (!req.body.newMessage) {
			res.send("error");
			return;
		}
		messages.push(req.session.username + ": " + req.body.newMessage);
		res.send("success");
	});

///

var MessageApp = React.createClass({
    render: function(){
        var messages = this.state.messages;
        var messageHTML = [];
        for (var i = 0; i < messages.length; i++){
            messageHTML.push(<Message key={i} text={messages[i]} />)
        }
        return (<div>
                   <MessageForm getMessages={this.getMessages}/>
                    {messageHTML}
                </div>);
    },
    getInitialState: function(){
        return{
            messages: []
        };
    },
    getMessages: function(){
		console.log("where am I");
        var that = this;
        $.get('/messages', function(result){
            that.setState({
                messages: result
            });
        }, 'json');
    },
    componentDidMount: function() {
        this.getMessages();
    }
});