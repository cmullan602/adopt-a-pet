var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";
var submitButton = $("#submit-btn");
var select = $("#dogs");
var dropdownMenu = "https://dogdummyapi.p.rapidapi.com/dogs/";

var searchHistoryEL = $("#historyDisplay");
let searchHistory = JSON.parse(localStorage.getItem("search"));

var selectBreed = "";

var searchHistoryArr = [];



var dogUrl = 'https://dog.ceo/api/breeds/image/random/3'


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

  $("#picture").html(`<img src="${image}"/>`);
    $("#facts").html(`<p> ${description}</p>`);
    
    
}

function setHistory(response) {
    if (searchHistoryArr.indexOf(response) !== -1) {
      return;
    }
    searchHistoryArr.push(response);
    localStorage.setItem('search-history', JSON.stringify(searchHistoryArr));
    // renderSearches();
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

function renderSearches() {
    for(let i = 0 ; i<searchHistoryArr.length)
    // $(searchHistoryEL).empty();
    // $(searchHistoryArr).each(function (i, selectBreed) {
    //   $(searchHistoryEL).append(`
    //       <button class="button btn-history is-fullwidth mt-2" data-search="${selectBreed}">${selectBreed}</button>
    //       `)

        
    // });
  
  }


select.change(function () {
  selectBreed = select.val();
});

renderSearches(); 