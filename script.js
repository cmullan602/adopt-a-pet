var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";

var submitButton = $("#search");
var searchInput = $("#search-input");

submitButton.click(async function (e) {
  e.preventDefault();

  console.log("yes");
});

// api
var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": dogdummyApiKey,
    "X-RapidAPI-Host": "dogdummyapi.p.rapidapi.com",
  },
};

fetch("https://dogdummyapi.p.rapidapi.com/dogs/", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//function to display a dog image after clicking option from drop down bar

function renderImage(image) {
  var iconUrl = `https://dogdummyapi.herokuapp.com/image/${image}.jpg`;
  var dogIcon = document.createElement(`p`);

  dogIcon.setAttribute("src", iconUrl);
}

//Render results
function handleSearchSubmit(e) {
  if (!searchInput.value) {
    return;
  }

  e.preventDefault();
  var search = searchInput.value.trim();
  fetchCoords(search);
  searchInput.value = "";
}
//Buttons to navigate results

//Give user option to filter search results

//Fetch images from shiba API

//Display shiba/bird images

//Save searches/favorites

//Display favorites
