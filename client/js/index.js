if (!localStorage.getItem('token')) {
  $('#show-login').show()
  $('#content').hide()
  $('#show-signout').hide()
  $('#show-register').hide()
} else {
  $('#content').show()
  $('#show-signout').show()
  $('#show-login').hide()
  $('#show-register').hide()
}
// $('#show-login').hide()

function registerForm() {
  event.preventDefault()
  $('#show-register').show()
  $('#show-login').hide()
}

function backRegister() {
  event.preventDefault()
  $('#show-register').hide()
  $('#show-login').show()
}


function register() {
  event.preventDefault()
  let email = $('#inputEmail4').val()
  let password = $('#inputPassword4').val()
  let name = $('#fullname4').val()

  $.ajax({
      method: 'POST',
      url: `http://localhost:3000/users/register`,
      data: {
        name,
        email,
        password
      }
    })
    .done(response => {
      console.log(response)
      $('#show-login').show()
      $('#show-register').hide()


    })
    .fail((jqXHR, textStatus) => {
      console.log(`request failed ${textStatus}`)
    })
}


function normalLogin() {
  event.preventDefault()
  let email = $('#exampleInputEmail1').val()
  let password = $('#exampleInputPassword1').val()

  $.ajax({
      method: 'POST',
      url: `http://localhost:3000/users/userlogin`,
      data: {
        email,
        password
      }
    })
    .done((response) => {
      localStorage.setItem('token', response)
      $('#show-login').hide()
      $('#content').show()
      $('#show-signout').show()

    })
    .fail((jqXHR, textStatus) => {
      console.log(`request failed ${textStatus}`)
    })
}


function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  const {
    id_token
  } = googleUser.getAuthResponse()

  $.ajax({
      method: "POST",
      url: `http://localhost:3000/users/`,
      data: {
        token: id_token
      }
    })
    .done(response => {
      localStorage.setItem('token', response)
      $('#show-login').hide()
      $('#content').show()
      $('#show-signout').show()
    })
    .fail((jqXHR, textStatus) => {
      console.log(`request failed ${textStatus}`)
    })

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.removeItem('token')
    $('#show-login').show()
    $('#content').hide()
    $('#show-signout').hide()
    console.log('User signed out.');
  });
<<<<<<< HEAD
}
=======
}


function listNews(){
  $.ajax({
    url: 'http://localhost:3000/news',
    method: 'GET'
  })
  .done(function(response){
    console.log(response.articles)
    for(news of response.articles){
      // $('#listNews').append("tes")

      let publish = new Date()-Number(new Date(news.publishedAt))
      let time = Math.ceil(publish/(60*1000))
      let teks = ''
      if(time>(24*60)){
        time = Math.floor(time/(24*60))
        teks = `${time} day${time > 1 && 's' || ''} ago`
      }else if(time>60){
        time = Math.floor(time/60)
        teks = `${time} hour${time > 1 && 's' || ''} ago`
      }else{
        teks = `${time} minute${time > 1 && 's' || ''} ago`
      }
      //507
      $('#listNews').append(`
      <a href="${news.url}" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${news.title}</h5>
                <small>${teks}</small>
              </div>
              <p class="mb-1">${news.description}</p>
              <small><i>Source: ${news.source.name}</i></small>
            </a> `)
    }
  })
  .fail(function(jqXHR, textStatus){
    console.log('request failed', textStatus)    
  })
}

$(document).ready(function(){
  listNews()
})
>>>>>>> Create server and client about news
