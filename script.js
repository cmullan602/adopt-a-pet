var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";


var searchForm = $("search-form");
var submitButton = $("#submit-btn");
var select = $("#dogs");
var dropdownMenu = "https://dogdummyapi.p.rapidapi.com/dogs/";

var resultsEl = $("#picture");

var dogUrl = 'https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true'



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
  .then((response) => getApiInfo(response))
  .catch((err) => console.error(err));

//submit click event
submitButton.click(async function (e) {
  e.preventDefault();
});

//Render results
function handleSearchSubmit(e) {
  if (!select.value) {
    return;
  }

  e.preventDefault();
  var search = select.value.trim();
  fetchCoords(search);
  select.value = "";
}

//function to display a dog image after result
// function renderImage(image) {
//   var iconUrl = `https://dogdummyapi.herokuapp.com/image/${image}.jpg`;
//   var dogIcon = document.createElement(`p`);

//   dogIcon.setAttribute("src", iconUrl);
// }

function getApiInfo(response) {
  for (var i = 0; i < response.length; i++) {
    var dogName = response[i].name;
    var dogOption = $(`<option value="${dogName}">${dogName}</option>`);

    select.append(dogOption);
  }

  console.log(response);
}

// searchForm.addEventListener("submit", handleSearchSubmit);
//Fetch images from shiba API
fetch(dogUrl, {
  method: 'GET',
  credentials: 'same-origin', 
  redirect: 'follow', 
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $('.img-container').append(
      `<img src='${data.message[0]}'>
      <img src='${data.message[1]}'>
      <img src='${data.message[2]}'>`
    )
  });


//Display shiba/bird images


//Save searches/favorites

//Display favorites
