
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(request, response) {
    const data = await service.list(request.query.is_showing);
    response.json({ data });
  }

  // async function list(req, res) {
  //   const { is_showing } = req.query
  //   let data;
  //   if ( is_showing === "true") {
  //     data = await service.listofShowing(movieId);
  //   } else {
  //     data = await service.list();
  //   }
  //   // const data = await service.list(req.params.movieId);
  //   res.json({ data });
  // }

  async function movieExists(request, response, next) {
    const movie = await service.read(request.params.movieId);
    if (movie) {
      response.locals.movie = movie;
      return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
  }
  
  async function read(request, response) {
    response.json({ data: response.locals.movie });
  }

  async function listReviewsByMovieId(req, res){
    const {movieId} = req.params
    const data = await service.listReviewsByMovieId(Number(movieId))
    res.json({ data })
  }

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listReviewsByMovieId: [asyncErrorBoundary(listReviewsByMovieId)],
  movieExists,
};
