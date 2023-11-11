import bodyParser from "../utils/body-parser.js";
import crypto from "crypto";
import movies from "../data/movie.json" assert { type: "json" };

const postMovie = async (req, res) => {
  if (!req.url.includes("/api/movies")) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({ title: "Not found", message: "Route not found" })
    );
    res.end();
    return;
  }

  try {
    let data = await bodyParser(req);
    data.id = crypto.randomUUID();
    movies.push(data);
    res.statusCode = 201;
    res.setHeader("Content-type", "application/json");
    res.write(
      JSON.stringify({ title: "Success", message: "Movie added successfully" })
    );
    res.end();
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-type", "application/json");
    res.write(
      JSON.stringify({
        title: "Validation failed",
        message: "request body is not valid",
      })
    );
  }
};

export default postMovie;
