const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const baseURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;

function movieFinder(movieName) {
  return axios.get(`${baseURL}&t=${movieName}&plot=full`);
}

function movieWithYear(movieName, year) {
  return axios.get(`${baseURL}&t=${movieName}&y=${year}&plot=full`);
}

module.exports = {
  movieFinder,
  movieWithYear,
};
