const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// To Setup Handlerbar we use a plugin hbs to work with express
// set() sets the value for express to identify
//Setup handlebars engine and views engine location
app.set("view engine", "hbs");
// Set the views to viewsPath
app.set("views", viewsPath);
// Setting up handlebars
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sandip",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sandip Swain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "We are here to help you",
    title: "Help",
    name: "Sandip",
  });
});

// Static Content
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error)
          return res.send({
            error: error,
          });
        return res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "Today's Weather is pleasant!",
  //   location: "Cuttack",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sandip",
    errorMessage: "Help Article Not Found",
  });
});

// Its a wildcharacter which matches everything else other than those of the specified
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sandip",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
