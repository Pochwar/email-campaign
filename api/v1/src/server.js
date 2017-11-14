import path from 'path';
import _ from 'underscore';
import express from 'express';
import bodyParser from 'body-parser';

import EntrepriseController from './controller/entrepriseController';


export default class Server {
    constructor()
    {
        this._app = express();

        this._app.use(express.static(path.join(__dirname, '/../public')));


        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: true}));


        this._app.set('view engine', 'twig');
        this._app.set('views', path.join(__dirname, '../src/views/'));
    }

    setPort(port)
    {
        if (_.isEmpty(port))
        {
            port = 3000;
        }

        this.port = port;
    }

    _initControllers()
    {
        const entrepriseController = new EntrepriseController();

        this._app.get('/', entrepriseController.index.bind(entrepriseController));

        /**
         * @api {get} /v1/entreprises 1 Get all entreprises
         * @apiName GetEntreprises
         * @apiGroup entreprise
         *
         * @apiSuccess {Array[]} array List of kittens
         * @apiSuccess {Object} array.kittens Detail of a kitten
         * @apiSuccess {String} array.kittens.id The kitten id is 24 character length auto-generated by mongoDB
         * @apiSuccess {String} array.kittens.name The name of the kitten, is required and should be unique
         * @apiSuccess {String} array.kittens.color The color of the kitten, is required
         * @apiSuccess {String} array.kittens.primaryQuality The primary quality of the kitten, is required
         * @apiSuccess {String} array.kittens.secondQuality The second quality of the kitten, is optionnal
         * @apiSuccess {String} array.kittens.primaryDefault The primary default of the kitten, is required
         * @apiSuccess {String} array.kittens.kibbles The prefered brand of kibbles for the kitten
         * @apiSuccess {Boolean} array.kittens.isAvailable Is the kitten already adopted or not
         */
        this._app.get('/api/v1/entreprises/:id', entrepriseController.getEntrepriseById.bind(entrepriseController));
        this._app.get('/api/v1/entreprises', entrepriseController.getEntreprises.bind(entrepriseController));
    }

    run()
    {
        this._initControllers();

        this._app.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
    }
}