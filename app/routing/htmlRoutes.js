// Pull in required dependencies
var path = require('path');

// Export HTML Routes
module.exports = function(app) {
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));

});
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
};
