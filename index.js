const dotenv = require("dotenv");
const fs = require("fs");
const { Client, IntentsBitField } = require("discord.js");
const omdb = require("./utils/omdb");

dotenv.config();

const bot = new Client({
  intents: [
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
  ],
});

bot.on("ready", () => {
  console.log("Movies bot is ready!");
});

bot.on("messageCreate", async (message) => {
  if (message.content.split(" ")[0] === "!movie") {
    try {
      const movieName = message.content.split(" ").slice(1).join(" ");
      omdb.movieFinder(movieName).then((response) => {
        const data = response.data;
        if (data.Response === "True") {
          const embed = {
            title: data.Title,
            description: data.Plot,
            color: 0x0099ff,
            fields: [
              {
                name: "Director",
                value: data.Director,
              },
              {
                name: "Actors",
                value: data.Actors,
              },
              {
                name: "Released",
                value: data.Released,
              },
              {
                name: "Genre",
                value: data.Genre,
              },
              {
                name: "Runtime",
                value: data.Runtime,
              },
              {
                name: "IMDB Rating",
                value: data.imdbRating,
              },
              {
                name: "Metascore",
                value: data.Metascore,
              },
              {
                name: "Awards",
                value: data.Awards,
              },
            ],
            image: {
              url: data.Poster,
            },
          };
          message.channel.send({ embeds: [embed] });
        } else {
          message.channel.send("Movie not found!");
        }
      });
    } catch (error) {
      let errorfinal = error.substring(0, 2000);
      console.log(`Error: ${errorfinal}`);
    }
  }

  if (message.content.split(" ")[0] === "!movie-year") {
    try {
      const movieName = message.content.split(" ").slice(1, -1).join(" ");
      const year = message.content.split(" ").slice(-1).join(" ");
      omdb.movieWithYear(movieName, year).then((response) => {
        const data = response.data;
        if (data.Response === "True") {
          const embed = {
            title: data.Title,
            description: data.Plot,
            color: 0x0099ff,
            fields: [
              {
                name: "Director",
                value: data.Director,
              },
              {
                name: "Actors",
                value: data.Actors,
              },
              {
                name: "Released",
                value: data.Released,
              },
              {
                name: "Genre",
                value: data.Genre,
              },
              {
                name: "Runtime",
                value: data.Runtime,
              },
              {
                name: "IMDB Rating",
                value: data.imdbRating,
              },
              {
                name: "Metascore",
                value: data.Metascore,
              },
              {
                name: "Awards",
                value: data.Awards,
              },
            ],
            image: {
              url: data.Poster,
            },
          };
          message.channel.send({ embeds: [embed] });
        } else {
          message.channel.send("Movie not found!");
        }
      });
    } catch (error) {
      let errorfinal = error.substring(0, 2000);
      console.log(`Error: ${errorfinal}`);
    }
  }
});

bot.login(process.env.BOT_KEY);
