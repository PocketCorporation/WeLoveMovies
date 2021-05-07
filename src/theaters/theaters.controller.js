
const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// async function list(req, response) {
//   const data = await service.list(req.params.movieId);
//   response.json({ data });
// }

async function list(req, res) {
  const movieId = req.params.movie_id;
  let data;
  if (movieId) {
    data = await service.listTheatersByMovieId(movieId);
  } else {
    data = await service.list();
  }
  // const data = await service.list(req.params.movieId);
  res.json({ data });
}



module.exports = {
  list: asyncErrorBoundary(list),
};
