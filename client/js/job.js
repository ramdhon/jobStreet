function fetchData(page) {
  // $('#search').serialize();
  const what=$('#what').val();
  const where=$('#where').val();
  console.log('>>>', what)
  console.log('>>>', where)
  // for(let i=0; i<10; i++) {
  //   $('#list-jobs').append(`<li class="list-group-item">
  //   ${what}
  //   <br>${where}
  //   <span class="h3">Accountant</span>
  //   <br><span>London Company</span>
  //   <div class="text-muted" style="padding-left:20px">
  //   <br><span>📍 London</span>
  //   <br><span>Full Time</span>
  //   <br><span>Permanent</span>
  //   <br><span>Salary max = £10000</span>
  //   <br><span>Salary min = £5000</span>
  //   <br><span>"Very nice job"</span>
  //   </div>
  //   </li>`)
  // }
  if (event) {
    event.preventDefault();
  }
  console.log(event)
  
  $.ajax({
    url: `http://localhost:3000/jobs/gb/${page}?what=${what}&where=${where}`,
    method: 'GET'
  })
    .done(response => {
      // console.log('>>',response)
      $('#list-jobs').empty()
      for(job of response) {
        $('#list-jobs').append(`<li class="list-group-item">
        <a href="${job.redirect_url}"><span class="h3">${job.title}</span></a>
        <br><span>${job.company.display_name}</span>
        <div class="text-muted" style="padding-left:20px">
          <br><span>📍 ${job.location.display_name}</span>
          <br><span>${job.contract_time && job.contract_time.split('_').join(' ') || 'contract time not stated'}</span>
          <br><span>${job.contract_type || 'contract type not stated'}</span>
          <br><br><span>Salary: ${(job.salary_min&&job.salary_max) && `£${job.salary_min} - £${job.salary_max}` || 'not stated'}</span>
          <br><br><span>"${job.description}"</span>
        </div>
        ${what}
        </li>`)
      }  
    })
    .fail((jqXHR, textStatus) => {
      console.log('request failed =>', textStatus);
    })
}

$(document).ready(function() {
  fetchData(1);
  $('#search').submit(function() {
    fetchData(1);
  })
})