var dogdummyApiKey = `9f30d9f26amsh0792997f4f9723dp171d82jsn8d8b6b792556`;
var dogdummyApiRootUrl = "https://dogdummyapi.p.rapidapi.com";
var dogUrl = "https://dog.ceo/api/breeds/image/random/5";

var dogAsAServiceApi = "ae97bf11-f094-404e-bf4f-08550f9ba818"

var submitButton = $("#submit-btn");
var select = $("#dogs");
var dropdownMenu = "https://dogdummyapi.p.rapidapi.com/dogs/";

var searchHistoryEL = $("#historyDisplay");
let searchHistory = JSON.parse(localStorage.getItem("search"));

var selectBreed = "";
var searchHistoryArr = [];
var clearEl = $(".clear");

const dogFacts = [
  "Their sense of smell is at least 40x better than ours",
  "Some have such good noses they can sniff out medical problems",
  "Dogs can sniff at the same time as breathing",
  "Some dogs are incredible swimmers",
  "Some are fast and could even beat a cheetah!",
  "Dogs don’t sweat like we do",
  "Your dog could be left or right-pawed",
  "Along with their noses, their hearing is super sensitive",
  "Dogs have 18 muscles controlling their ears",
  "Dogs are about as intelligent as a two-year-old"
  ]
  
  let index = Math.floor(Math.random() * dogFacts.length)
  dogFacts[index]

  $(".facts").append(`
  <p>Random Dog Fact:<p> ${dogFacts[index]}`)

// api
var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": dogdummyApiKey,
    "X-RapidAPI-Host": "dogdummyapi.p.rapidapi.com",
  },
};

dogCeoRender(dogUrl)
//Fetch images from Dog API
function dogCeoRender(url){
fetch(url, {
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
}

//generate list of dog names in the search bar
function getApiInfo(response) {
  for (var i = 0; i < response.length; i++) {
    var dogName = response[i].name;
    var dogOption = $(`<option value="${dogName}">${dogName}</option>`);

    select.append(dogOption);
  }
  if (selectBreed === "") return;
}

//render the image and the description from dropdown menu

function renderResponse(response){

  const [result] = response.filter((breed) => breed.name === selectBreed);
  const { image, description } = result;

  $("#picture").html(`
  <h2>${selectBreed}<h2>
  <img src="${image}"/>`);


  $("#picture").html(`<img src="${image}"/>`);

  $("#facts").html(

    `<h2>Dog Facts:<h2> 
    <p>${description}</p>`
  );
  

}



function renderDescripFromSearch(dog){
  var descrio= dog.description;
  var imagio = dog.image;
  console.log(descrio)
  console.log(imagio)

  $("#picture").html(`
      <h2>${selectBreed}<h2>
      <img src="${imagio}"/>`);
    
      $("#facts").html(
    
        `<h2>Dog Facts:<h2> 
        <p>${descrio}</p>`
      );

}



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
    .then((response) => renderResponse(response))
    .catch((err) => console.error(err));
});



select.change(function () {
  selectBreed = select.val();
});


//render buttons of previous searches
function renderSearches() {
  $(searchHistoryEL).empty();
  $(searchHistoryArr).each(function (i, searchHistory) {
    $(searchHistoryEL).append(
      $("<button/>", {
        text: searchHistory,
        click: function (e) {
          e.preventDefault()
          var searchVal = $(this).text();
          var queryURL = `https://dogdummyapi.herokuapp.com/dog/name/${searchVal}`;
          fetch(queryURL, options)
            .then((res) => res.json())
            .then((res) => {
              renderDescripFromSearch(res)
            });
        },
      })
    );
  });
}


function initSearchHistory(){
  var storedHistory = localStorage.getItem('search-history');
  if(storedHistory){
     searchHistoryArr = JSON.parse(storedHistory);
  }
 
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

var options2 = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Headers": "Content-Type"
  },
};



    
fetch('https://sochain.com//api/v2/get_price/DOGE/USD')
              .then((response) => response.json())
              
              .then((response) => {
                console.log(response)
              renderDoge(response.data.prices[1])
              })
              
              
              .catch((err) => console.error(err));      
              
              
function renderDoge(doge)  {
  console.log(doge.price)
  console.log(doge.time)

  var dogePrice = doge.price 
  var dogeTime = doge.time

  $('.doge').append(`
  <img src="Dogecoin_logo.0.jpeg"/>
  <div class="column">
  <p>Doge Coin Price: </p>
  <p>${moment.unix(dogeTime).format("MM/DD/YYYY")}<p>
  <p>$ ${dogePrice}<p>
  </div>`)
}