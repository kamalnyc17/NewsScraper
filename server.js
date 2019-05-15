// importing all npm packages
var express     = require("express");
var exphbs      = require("express-handlebars");
var mongoose    = require("mongoose");
var path        = require('path');

// Require all models
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use("/public", express.static(path.join(__dirname, 'public')));

// API Routes
// =============================================================
require("./routes/html-routes.js")(app);

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsscraper", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
