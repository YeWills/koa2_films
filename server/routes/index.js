const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()

// http://127.0.0.1:4455/movies/all
router.get('/movies/all', async (ctx, next) => {
    const Movie = mongoose.model('Movie');
    const movies = await Movie.find({}).sort({
        'meta.createdAt': -1
    })
    ctx.body = {
        movies
    }
})
// http://127.0.0.1:4455/movies/detail/5c7576ff72fde1318ce1739a
router.get('/movies/detail/:id', async (ctx, next) => {
    const Movie = mongoose.model('Movie');
    const id = ctx.params.id;
    const movie = await Movie.findOne({_id: id})
    ctx.body = {
        movie
    }
})

module.exports = router