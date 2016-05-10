var React = require("react");
var Message = require("./Message.jsx");
var MessageForm = require("./MessageForm.jsx")

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

module.exports = MessageApp;