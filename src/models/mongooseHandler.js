import Mongoose from "mongoose";

export default class mongooseHandler
{
    constructor()
    {
        this.mongoose = Mongoose;

        let dbConnect;
        if(process.env.ENV == 'production') {
            dbConnect = `mongodb://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`
        } else {
            dbConnect = `mongodb://${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`
        }
        this.mongoose.connect(dbConnect, err =>
        {
            if(err)
                console.log(err);
            else
                console.log("Mongoose connected");
        });
    }
}