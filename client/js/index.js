if (!localStorage.getItem('token')) {
  $('#show-login').show()
  $('#content').hide()
  $('#show-signout').hide()
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

// hidelogin()

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
}