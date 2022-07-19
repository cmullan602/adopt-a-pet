var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";

var searchForm = $("search-form");

var submitButton = $("#submit-btn");
var select = $("#dogs");
var dropdownMenu = "https://dogdummyapi.p.rapidapi.com/dogs/";

const historyEl = $("#historyDisplay");
let searchHistory = JSON.parse(localStorage.getItem("search"));

var selectBreed = "";

var dogUrl = 'https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true'


// api
var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": dogdummyApiKey,
    "X-RapidAPI-Host": "dogdummyapi.p.rapidapi.com",
  },
};

function getApiInfo(response) {
  for (var i = 0; i < response.length; i++) {
    var dogName = response[i].name;
    var dogOption = $(`<option value="${dogName}">${dogName}</option>`);

    select.append(dogOption);
  }
  if (selectBreed === "") return;

  const [result] = response.filter((breed) => breed.name === selectBreed);
  const { image, description } = result;

  console.log(image, description);

  $("#picture").append(`<img src="${image}"/>`);
  $("#facts").append(`<p> ${description}</p>`);
}

//add search to history
// submitButton.addEventListener("click", function () {
//   const searchTerm = select.value;
//   searchHistory.push(searchTerm);
//   localStorage.setItem("search", JSON.stringify(searchHistory));
//   renderSearchHistory();
// });

// function renderSearchHistory() {
//     historyEl.innerHTML = "";
//     for (let i = 0; < searchHistory.length; i++) {
//         const historyItem = document.createElement("input");
//         historyItem.setAttribute("type", "text");
//         historyItem.setAttribute("class", "")
//         historyItem.addEventListener("click", function () {
//             // what does clicking a history item do?)
//         })
//         historyEl.append(historyItem);
//      }

// }

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



fetch("https://dogdummyapi.p.rapidapi.com/dogs/", options)
  .then((response) => response.json())
  .then((response) => getApiInfo(response))
  .catch((err) => console.error(err));

//submit click event
submitButton.click(async function (e) {
  e.preventDefault();

  fetch("https://dogdummyapi.p.rapidapi.com/dogs/", options)
    .then((response) => response.json())
    .then((response) => getApiInfo(response))
    .catch((err) => console.error(err));
});

select.change(function () {
  selectBreed = select.val();
});

