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
      $('#show-login').show()
      $('#show-register').hide()
     $('#inputEmail4').val('')
      $('#inputPassword4').val('')
     $('#fullname4').val('') 


    })
    .fail((err, textStatus) => {
      let errors = ''
      for (let keys in err.responseJSON.err.errors) {
        if(err.responseJSON.err.errors[keys].message) {
          errors+= `${err.responseJSON.err.errors[keys].message} \n`
        }
      }
      console.log(errors)
      swal({
        text: errors,
        icon: "warning",
        button: "Awwttss",
      });
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
    .fail((err, textStatus) => {
      let errors = err.responseJSON.message
      swal({
        text: errors,
        icon: "warning",
        button: "Awwttss",
      });
      console.log(`request failed ${textStatus}`)
    })
}


function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
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

function getCurrency() {
  event.preventDefault()
  $.ajax({
    method: "GET",
    url : 'https://api.exchangeratesapi.io/latest?symbols=IDR,GBP,EUR&base=USD'
  })
    .done(response=> {
      let data = ''
      for( rate in response.rates) {
        data += `${rate}: ${response.rates[rate].toFixed(2)}  \n`
      }
      swal({
        title: "Salary",
        text: `${data}`,
        button: "ok",
      });
    })
    .fail((jqXHR, textStatus) => {
      console.log(`request failed ${textStatus}`)
    })

}

