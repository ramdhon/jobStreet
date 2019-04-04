function hidelogin() {
  $('#show-login').hide()
  $('#show-signout').hide()
}

if(localStorage) {
  // $('#show-login').hide()
  // $('#show-signout').hide()
}


// hidelogin()

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); 
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); 
  const { id_token } = googleUser.getAuthResponse()

  $.ajax({
    method: "POST",
    url : `http://localhost:3000/users/`,
    data : {
      token : id_token
    }
  })
    .done( response => {
      localStorage.setItem('token', response)
    })
    .fail((jqXHR, textStatus) => {
      console.log(`request failed ${textStatus}`)
    }) 
  
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
