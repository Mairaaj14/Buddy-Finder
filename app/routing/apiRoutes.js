// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {
	
    // Total list of friend entries
    // A GET route which will be used to display a JSON of all possible friends.
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

    // Add new friend entry
    // A POST route which will be used to handle incoming survey results.
//Route will also be used to handle the compability logic.
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchPhoto = '';
		var totalDifference = 100; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differences for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchPhoto = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchPhoto: matchPhoto});
	});
};//API Routes
// A GET route with the url /api/friends which will be used to display a JSON of all possible friends.

app.get("/api/friends", function(req, res) {
    return res.json(friends);
});

// A POST routes with url /api/friends which will be used to handle incoming survey results.
//Route will also be used to handle the compability logic.

app.post("api/friends")