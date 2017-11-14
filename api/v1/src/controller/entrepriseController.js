import EntrepriseHandler from "../models/entrepriseHandler";
import _ from "underscore";
import HttpStatusService from "../services/httpStatusService";

export default class EntrepriseController
{

    constructor() {
        this.entrepriseHandler = new EntrepriseHandler();
        this.httpStatusService = new HttpStatusService();
    }

    index(req, res) {
        res.render('entreprise');
    }

    getEntreprises(req, res) {
        this.entrepriseHandler.getEntreprises()
            .then(entreprise =>  this.sendJsonResponse(res, this.httpStatusService.ok, entreprise))
            .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
    }

    getEntrepriseById(req, res) {
        const id = req.params.id;

        this.entrepriseHandler.getEntreprise(id)
            .then(entreprise =>  this.sendJsonResponse(res, this.httpStatusService.ok, entreprise))
            .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
    }


    putEntreprises(req, res) {
        const id = req.params.id;
        let array = this.setArrayFromBody(req.body);
        this.entrepriseHandler.putEntreprise(id, array)
            .then(entreprise => this.sendJsonResponse(res, this.httpStatusService.ok, entreprise))
            .catch(err => this.sendJsonResponse(res, this.httpStatusService.internalServerError, err));
    }

    static sendJsonResponse(res, code, content) {
        res.status(code);
        res.json(content);
    }

    static setArrayFromBody(body) {
        let array = {};
        array.label = (!_.isNull(body.label)) ? body.label : null;
        array.email = (!_.isNull(body.email)) ? body.email : null;
        array.password = (!_.isNull(body.password)) ? body.password : null;
        array.url_ad = (!_.isNull(body.url_ad)) ? body.url_ad : null;
        array.url_picture = (!_.isNull(body.url_picture)) ? body.url_picture : null;
        array.campaign = (!_.isNull(body.campaign)) ? body.campaign : null;
        return array
    }

    putEntreprises(id)
    {
        // Return promise
    }

    removeEntreprises(id)
    {
        // Return promise
    }
    deleteEntreprises(id)
    {
        // Return promise
    }
    removeCampaign(entrepriseId, campaignId)
    {
        // Return promise
    }
    addCampaign(req, res)
    {
        this.entrepriseHandler.addCampaign()
            .then(entreprises => res.json(entreprises))
            .catch(err => reject(err))
    }
}