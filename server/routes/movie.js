const {
  controller,
  get,
  post,
  put
} = require('../lib/decorator')
const {
  getAllMovies,
  getMovieDetail,
  getRelativeMovies
} = require('../service/movie')

//http://127.0.0.1:4455/api/v0/movies
@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies (ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)
    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}