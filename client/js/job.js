function fetchData(page) {
  const what = $('#what').val();
  const where = $('#where').val();
  if (event) {
    event.preventDefault();
  }
  $.ajax({
      url: `http://localhost:3000/jobs/gb/${page}?what=${what}&where=${where}`,
      method: 'GET'
    })
    .done(response => {
      $('#list-jobs').empty()
      for (job of response) {
        $('#list-jobs').append(`<li class="list-group-item">
        <a href="${job.redirect_url}"><span class="h3">${job.title}</span></a>
        <br><span>${job.company.display_name}</span>
        <div class="text-muted" style="padding-left:20px">
          <br><span>📍 ${job.location.display_name}</span>
          <br><span>${job.contract_time && job.contract_time.split('_').join(' ') || 'contract time not stated'}</span>
          <br><span>${job.contract_type || 'contract type not stated'}</span>
          <br><br><span class=""><a href="" onclick="getCurrency(${job.salary_min})"id="show-salary">salary</a></span><br>
          <br><span>"${job.description}"</span>
        </div>
        </li>`)
      }
    })
    .fail((jqXHR, textStatus) => {
      console.log('request failed =>', textStatus);
    })
}

$(document).ready(function () {
  fetchData(1);
  $('#search').submit(function () {
    fetchData(1);
  })
})



function getCurrency(curr) {
  event.preventDefault()
  $.ajax({
      method: "GET",
      url: 'https://api.exchangeratesapi.io/latest?symbols=IDR,GBP,EUR&base=USD'
    })
    .done(response => {
      let data = ''
      for (rate in response.rates) {
        data += `${rate}: ${(curr * response.rates[rate]).toFixed(2)}  \n`
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
