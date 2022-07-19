var dogUrl = 'https://dog.ceo/api/breeds/image/random/5'

fetch(dogUrl, {
    method: 'GET',
    credentials: 'same-origin', 
    redirect: 'follow', 
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('.saved-container').append(
        `<img id="column" src='${data.message[0]}'>
        <img id="column" src='${data.message[1]}'>
        <img id="column" src='${data.message[2]}'>
        <img id="column" src='${data.message[3]}'>
        <img id="column" src='${data.message[4]}'>`
      )
    });