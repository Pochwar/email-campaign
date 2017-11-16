import mongooseHandler from "./models/mongooseHandler";
import Server from "./server";

// get .env vars
require('dotenv').config();

const server = new Server();

const mongoose = new mongooseHandler();

server.run();



