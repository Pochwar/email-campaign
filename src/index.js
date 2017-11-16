import mongooseHandler from "./models/mongooseHandler";
import Server from "./server";

const server = new Server();

const mongoose = new mongooseHandler();

server.setPort();

server.run();



