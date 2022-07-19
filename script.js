var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";
var dogUrl = "https://dog.ceo/api/breeds/image/random/5";

var submitButton = $("#submit-btn");
var select = $("#dogs");
var dropdownMenu = "https://dogdummyapi.p.rapidapi.com/dogs/";

var searchHistoryEL = $("#historyDisplay");
let searchHistory = JSON.parse(localStorage.getItem("search"));

var selectBreed = "";
var searchHistoryArr = [];
var clearEl = $(".clear");

// api
var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": dogdummyApiKey,
    "X-RapidAPI-Host": "dogdummyapi.p.rapidapi.com",
  },
};

//generate list of dog names in the search bar
function getApiInfo(response) {
  for (var i = 0; i < response.length; i++) {
    var dogName = response[i].name;
    var dogOption = $(`<option value="${dogName}">${dogName}</option>`);

    select.append(dogOption);
  }
  if (selectBreed === "") return;
  //render the image and the description
  const [result] = response.filter((breed) => breed.name === selectBreed);
  const { image, description } = result;

  setHistory(selectBreed)

  $("#picture").html(`
  <h2>${selectBreed}<h2>
  <img src="${image}"/>`);


  $("#picture").html(`<img src="${image}"/>`);

  $("#facts").html(

    `<h2>Dog Facts:<h2> 
    <p>${description}</p>`
  );
  
}



//Fetch images from shiba API
fetch(dogUrl, {
  method: "GET",
  credentials: "same-origin",
  redirect: "follow",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $(".img-container").append(
      `<img id="column" src='${data.message[0]}'>
      <img id="column" src='${data.message[1]}'>
      <img id="column" src='${data.message[2]}'>
      <img id="column" src='${data.message[3]}'>
      <img id="column" src='${data.message[4]}'>`
    );
  });

//fetch dogdummy api
fetch("https://dogdummyapi.p.rapidapi.com/dogs/", options)
  .then((response) => response.json())
  .then((response) => getApiInfo(response))
  .catch((err) => console.error(err));

//submit click event
submitButton.click(async function (e) {
  e.preventDefault();

  setHistory(selectBreed);

  fetch("https://dogdummyapi.p.rapidapi.com/dogs/", options)
    .then((response) => response.json())
    .then((response) => getApiInfo(response))
    .catch((err) => console.error(err));
});



select.change(function () {
  selectBreed = select.val();
});



function renderSearches() {
  $(searchHistoryEL).empty();
  $(searchHistoryArr).each(function (i, searchHistory) {
    $(searchHistoryEL).append(`
        <button class="button btn-history is-fullwidth mt-2" data-search="${searchHistory}">${searchHistory}</button>
        `)

        $('.btn-history').on('click', function() {
          var string = $(this).attr('data-search')
          getApiInfo(string)
        });
      
  });

}


function initSearchHistory(){
  var storedHistory = localStorage.getItem('search-history');
  if(storedHistory){
     searchHistoryArr = JSON.parse(storedHistory);
  }
  renderSearches()
}

initSearchHistory();

function setHistory(search) {
  if (searchHistoryArr.indexOf(search) !== -1) {
    return;
  }
  searchHistoryArr.push(search);
  localStorage.setItem('search-history', JSON.stringify(searchHistoryArr));
  renderSearches();
}


renderSearches();

clearEl.on("click", function () {
  localStorage.clear(searchHistoryArr);
  $(searchHistoryEL).empty();
  searchHistory = [];
  renderSearches();
})