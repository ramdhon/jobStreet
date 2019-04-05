const router = require('express').Router()
const news = require('../../controllers/newsController')

router.get('/', news.getData)

module.exports=router