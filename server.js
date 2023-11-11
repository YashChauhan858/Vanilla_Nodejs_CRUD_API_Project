import "dotenv/config";
import http from "http";
// Methods
import getMovie from "./method/getMovie.js";
import postMovie from "./method/postMovie.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      getMovie(req, res);
      break;
    case "POST":
      postMovie(req, res);
      break;
    case "PUT":
      putMovie(req, res);
      break;
    case "DELETE":
      deleteMovie(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server starting on port: ${PORT}`);
});
