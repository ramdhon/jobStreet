const axios = require('axios');
const _axios = axios.create({
  baseURL: 'http://api.adzuna.com/v1/api'
});

class Controller {
  static getJobList(req, res) {
    _axios
      .get(`/jobs/${req.params.country}/search/${req.params.page}?app_id=${process.env.ADZUNAJOB_ID}&app_key=${process.env.ADZUNAJOB_KEY}&what=${req.query.what}&where=${req.query.where}`)
      .then(( { data } ) => {
        res.status(200).json(data.results);
      })
      .catch(err => {
        // console.log(err.message);
        res.status(500).json(err);
      })
  }
}


module.exports = Controller;