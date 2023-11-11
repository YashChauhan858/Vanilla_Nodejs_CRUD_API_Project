import movies from "../data/movie.json" assert { type: "json" };
// /api/movies -> getall
// /api/movies/:id -> fetch movie of particular id

const getMovie = (req, res) => {
  let id = req.url.split("/")[3];
  if (!req.url.includes("/api/movies")) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({ title: "Not found", message: "Route not found" })
    );
    res.end();
    return;
  }
  if (!!id) {
    const filteredMovie = movies.filter((movie) => movie.id === id);
    if (filteredMovie.length !== 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          title: "not found",
          message: "movie does'nt exist with the provided id",
        })
      );
      res.end();
    }
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(movies));
    res.end();
  }
};

export default getMovie;
