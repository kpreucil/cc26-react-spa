;
(function () {
	"use strict";

	var PORT = 3000;

	var fs = require('fs');

	var express = require('express');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var expressSession = require('express-session');

	var config = require('./config.js');
	var userInfo = require('./userInfo.js');
	var toolbox = require('./toolbox.js');
	var messages = require('./messages.js');

	var app = express();
	
	var userInfoArray = [];
	userInfo.read('userInfo.txt', function(data){
		data = JSON.parse(data);
		
		userInfoArray = data;
//		console.log(userInfo, "I'm Here" );
		
	});
	
	var messagesArray = [];
	messages.read('messages.txt', function(data){
		data = JSON.parse(data);
		messagesArray = data;
		console.log(messagesArray, "I'm Here" );	
	});

	/*MiddleWare*/

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(expressSession({
		secret: config.secret,
		resave: true,
		saveUninitialized: true
	}));

	/*
	var messages = ["Welcome to this chat.", "Introduce yourself and start posting :)"];
	*/
	
	/* functions */
	function CreateNewUser(username, password){
		this.username = username;
		this.password = password;
	};

	/*Routes*/

	app.get("/", function (req, res) {
		if (!req.session.username) {
			res.redirect("/login");
			return;
		}
		res.sendFile(__dirname + '/public/index.html');
	});

	app.get("/messages", function (req, res) {
		if (!req.session.username) {
			res.send("[]");
			return;
		}
		res.send(JSON.stringify(messagesArray));
	});


	app.post("/messages", function (req, res) {
		if (!req.session.username) {
			res.send("error");
			return;
		}
		if (!req.body.newMessage) {
			res.send("error");
			return;
		}
		messagesArray.push(req.session.username + ": " + req.body.newMessage);
		
		messages.write('messages.txt', JSON.stringify(messagesArray));
		
		res.send("success");
	});

	
	app.get("/signUp", function (req, res) {
		res.sendFile(__dirname + '/public/signUp.html');
	});
	
	app.post("/signUp", function (req, res) {
		if (toolbox.signUpUser(req.body.username, userInfoArray)) {
			var ourUser = new CreateNewUser(req.body.username, req.body.password);
			toolbox.addNewUser(ourUser, userInfoArray);
			userInfo.write('userInfo.txt', JSON.stringify(userInfoArray));
			req.session.username = req.body.username;
			res.redirect("/");
			return
		}
		
		res.redirect("/login");
	});

	app.get("/login", function (req, res) {
		res.sendFile(__dirname + '/public/login.html');
	});

	app.post("/login", function (req, res) {
		if (req.body.username && req.body.password) {
			if (toolbox.logInUser(req.body.username, req.body.password, userInfoArray)) {
				req.session.username = req.body.username;
				res.redirect("/");
				return
			}
		}
		res.redirect("/login");
	});
	
	

	/*Always put last because it is sequential*/

	app.use(express.static('public'));

	app.use(function (req, res, next) {
		res.status(404);
		res.send("File not found");
	});

	app.listen(PORT, function () {
		console.log("server started on port " + PORT);
	});

}());