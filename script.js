var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";

var searchForm = $("search-form");
var submitButton = $("#submit-btn");
var select = $("#dogs");
var dropdownMenu = "https://dogdummyapi.p.rapidapi.com/dogs/";


const historyEl = $("#historyDisplay")
let searchHistory = JSON.parse(localStorage.getItem("search"))

var resultsEl = $("#picture");

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
function renderImage(image) {
  var iconUrl = `https://dogdummyapi.herokuapp.com/image/${image}.jpg`;
  var dogIcon = document.createElement(`p`);

  dogIcon.setAttribute("src", iconUrl);
}

function getApiInfo(response) {
  for (var i = 0; i < response.length; i++) {
    var dogName = response[i].name;
    var dogOption = $(`<option value="${dogName}">${dogName}</option>`);

    select.append(dogOption);
  }

  console.log(response);
}

//add search to history
submitButton.addEventListener("click", function () {
    const searchTerm = select.value;
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

function renderSearchHistory() { 
    historyEl.innerHTML = "";
    for (let i = 0; < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("class", "")
        historyItem.addEventListener("click", function () {
            // what does clicking a history item do?)
        })
        historyEl.append(historyItem);
     }

}


// searchForm.addEventListener("submit", handleSearchSubmit);

