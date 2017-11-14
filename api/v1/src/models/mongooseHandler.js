const yaml_config = require('node-yaml-config');
import Mongoose from "mongoose";

export default class mongooseHandler
{
    constructor()
    {
        this.mongoose = Mongoose;
        this.config = yaml_config.load('config/config.yml');

        this.mongoose.connect(`mongodb://${ this.config.dbConfig.host }:${ this.config.dbConfig.port }/${ this.config.dbConfig.dbName }`, err =>
        {
            if(err)
                console.log(err);
            else
                console.log("Mongoose connected");
        });
    }
}