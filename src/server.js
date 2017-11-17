import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import EntrepriseController from './controller/entrepriseController';
import AccessGranted from './middleware/accessGranted';
import MockingService from './services/mockingService';


export default class Server {
    constructor()
    {
        this._app = express();

        this._app.use(express.static(path.join(__dirname, '/../public')));


        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: true}));


        this._app.set('view engine', 'twig');
        this._app.set('views', path.join(__dirname, '../src/views/'));

        this.port = process.env.PORT || 3000;
    }


    // todo -> put 'api/v1' to config file
    _initControllers()
    {
        const entrepriseController = new EntrepriseController();
        const accessGranted = new AccessGranted();
        const mockingService = new MockingService();

        this._app.get('/', accessGranted.public, entrepriseController.index.bind(entrepriseController));

        this._app.get('/entreprise', accessGranted.restricted, entrepriseController.entreprise.bind(entrepriseController));

        this._app.get('/register', entrepriseController.register.bind(entrepriseController));

        this._app.get('/mocking/campaigns', accessGranted.public, mockingService.generateCampaigns.bind(mockingService));

        this._app.get('/getCampaigns', accessGranted.restricted, entrepriseController.getCampaigns.bind(entrepriseController));
         /**
         * @api {post} /api/v1/login Login
         * @apiGroup Entreprises
         * @apiParam {String} email Email of entreprise
         * @apiParam {String} password Password of entreprise
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "id": "monid"
         *         "token": "unsupertokenavecdes123etdeslettres"
         *     }
         */
        this._app.post('/api/v1/login', accessGranted.public, entrepriseController.login.bind(entrepriseController));
         /**
         * @api {get} /api/v1/entreprises Get all entreprises
         * @apiGroup Entreprises
         * @apiHeader Authorization a valid access token
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "Authorization": "YOUR_TOKEN"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     [
         *       {
         *           "id": "5a0c42394b2d38635f474b4b",
         *           "label": "IMIE",
         *           "url_ad": "http://perdu.com/img.jpg",
         *           "url_picture": "http://perdu.com/img.jpg",
         *           "campaigns": [456789,123456]
         *       },
         *       {
         *           "id": "5a0c42394b2d38635f474b4c",
         *           "label": "Intel",
         *           "url_ad": "http://perdu.com/img.jpg",
         *           "url_picture": "http://perdu.com/img.jpg",
         *           "campaigns": [456789,123456]
         *       }
         *     ]
         */
        this._app.get('/api/v1/entreprises', accessGranted.restricted, entrepriseController.getEntreprises.bind(entrepriseController));
         /**
         * @api {get} /api/v1/entreprises/:entrepriseId Get one entreprise
         * @apiGroup Entreprises
         * @apiHeader Authorization a valid access token
         * @apiParam {String} :id Entreprise's id
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "Authorization": "YOUR_TOKEN"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "id": "5a0c42394b2d38635f474b4b",
         *         "label": "IMIE",
         *         "url_ad": "http://perdu.com/img.jpg",
         *         "url_picture": "http://perdu.com/img.jpg",
         *         "campaigns": [456789,123456]
         *     }
         */
        this._app.get('/api/v1/entreprises/:id', accessGranted.restricted, entrepriseController.getEntrepriseById.bind(entrepriseController));
         /**
         * @api {post} /api/v1/entreprises Create one entreprise
         * @apiGroup Entreprises
         * @apiParam {String} label Name of entreprise
         * @apiParam {String} email Email of entreprise
         * @apiParam {String} password Password of entreprise
         * @apiParam {String} url_ad Url of redirect
         * @apiParam {String} url_picture Url of picture
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "create": "ok"
         *     }
         */
        this._app.post('/api/v1/entreprises', accessGranted.public, entrepriseController.postEntreprise.bind(entrepriseController));
         /**
         * @api {put} /api/v1/entreprises/:entrepriseId Edit one entreprise
         * @apiGroup Entreprises
         * @apiHeader Authorization a valid access token
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "Authorization": "YOUR_TOKEN"
         *     }
         * @apiParam {String} :id Entreprise's id
         * @apiParam {String} label Name of entreprise
         * @apiParam {String} email Email of entreprise
         * @apiParam {String} password Password of entreprise
         * @apiParam {String} url_ad Url of redirect
         * @apiParam {String} url_picture Url of picture
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "modified": "6"
         *     }
         */
        this._app.put('/api/v1/entreprises/:id', accessGranted.restricted, entrepriseController.putEntreprises.bind(entrepriseController));
         /**
         * @api {delete} /api/v1/entreprises/:entrepriseId Delete one entreprise
         * @apiGroup Entreprises
         * @apiHeader Authorization a valid access token
         * @apiParam {String} :id Entreprise's id
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "Authorization": "YOUR_TOKEN"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "success": true
         *     }
         */
        this._app.delete('/api/v1/entreprises/:id', accessGranted.restricted, entrepriseController.deleteEntreprises.bind(entrepriseController));
         /**
         * @api {put} /api/v1/entreprises/:entrepriseId/:campaignId/add Add a campaign for a company
         * @apiGroup Entreprises
         * @apiHeader Authorization a valid access token
         * @apiParam {String} :entrepriseId Entreprise's id
         * @apiParam {String} :campaignId Campaign's id
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "Authorization": "YOUR_TOKEN"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "success": true
         *     }
         */
        this._app.put('/api/v1/entreprises/:entrepriseId/:campaignId/add', accessGranted.restricted, entrepriseController.addCampaign.bind(entrepriseController));
         /**
         * @api {put} /api/v1/entreprises/:entrepriseId/:campaignId/remove Remove a campaign for a company
         * @apiGroup Entreprises
         * @apiHeader Authorization a valid access token
         * @apiParam {String} :entrepriseId Entreprise's id
         * @apiParam {String} :campaignId Campaign's id
         * @apiHeaderExample {json} Header-Example:
         *     {
         *       "Authorization": "YOUR_TOKEN"
         *     }
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "success": true
         *     }
         */
        this._app.put('/api/v1/entreprises/:entrepriseId/:campaignId/remove', accessGranted.restricted, entrepriseController.removeCampaign.bind(entrepriseController));
    }

    run()
    {
        this._initControllers();

        this._app.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
    }
}