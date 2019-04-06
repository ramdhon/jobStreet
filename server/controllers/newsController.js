const axios = require('axios')
let ax = axios.create()

class News {
    static getData(req, res){
        let date = new Date().getDate()
        let month = new Date().getMonth()+1
        let year = new Date().getFullYear()

        if(date<10) date = 0+String(date)
        if(month<10) month = 0+String(month)

        // let teks = `${year}-${month}-${date}`
        let teks = `${year}-${month}-03`
        ax
            .get(`https://newsapi.org/v2/everything?q=job-recruitment-hiring&from=${teks}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`)
            .then(({data})=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }
}

module.exports = News