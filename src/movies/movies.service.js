
const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  return db("movies").where({ movie_id }).first();
}

function listReviewsByMovieId(movieId) {
  return db("reviews")
    .select("*")
    .where({ movie_id: movieId })
    .then((movieReviews) => {
      const criticsInfo = movieReviews.map((mov) => {
        return db("critics")
          .select("*")
          .where({ critic_id: mov.critic_id })
          .then((thisCritic) => {
            mov.critic = thisCritic[0];
            return mov;
          });
      });
      const allCriticsMovieReviews = Promise.all(criticsInfo);
      return allCriticsMovieReviews;
    });
}

function listOfShowing() {
  return knex("movies_theaters")
      .join("movies", "movies.movie_id", "movies_theaters.movie_id")
      .select("*")
      .where("is_showing", true)
      .groupBy("movies_theaters.movie_id");
}

module.exports = {
  list,
  read,
  listReviewsByMovieId,
  listOfShowing
};
