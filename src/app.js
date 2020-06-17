import express from "express";
import routes from "./routes";
import mongoose from "mongoose";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/webcoding",
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new App().server;
