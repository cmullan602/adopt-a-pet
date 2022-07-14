var petAPI = "3hvyI5BUAOX5wj6E3kJD0X5S3hXIbr6PQWYC4PxDDeeNAaMFbg";

var submitButton = $("#submit");

var selectChoice = $("#select1");

submitButton.click(async function (e) {
  e.preventDefault();

  const res = await api("someurl");

  console.log("yes");
  console.log(selectChoice.val());
});

async function api(url) {
  const response = await fetch(url);
  const json = await response.json();
  // api("someurl").then(function(res){console.log(res)};

  return json;
}

api("https://jsonplaceholder.typicode.com/todos/1");

//Get search input from user an well as location (zip code?)

//Submit button

//Render results

//Buttons to navigate results

//Give user option to filter search results

//Link results to Petfinder site

//Fetch images from shiba API

//Display shiba/bird images

//Save searches/favorites

//Display favorites
