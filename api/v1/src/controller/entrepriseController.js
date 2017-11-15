import EntrepriseHandler from "../models/entrepriseHandler";
import _ from "underscore";
import eV from "../models/entrepriseValidator";
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
        const that = this;
        this.entrepriseHandler.getEntreprises()
            .then(entreprise =>  that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
            .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err));
    }

    getEntrepriseById(req, res) {
        const that = this;
        const id = req.params.id;
        this.entrepriseHandler.getEntreprise(id)
            .then(entreprise =>  that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
            .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err));
    }

    putEntreprises(req, res) {
        const that = this;
        const id = req.params.id;
        let array = this.setArrayFromBody(req.body);
        this.entrepriseHandler.putEntreprise(id, array)
            .then(entreprise => that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
            .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err));
    }
  
   addCampaign(req, res)
   {
       this.entrepriseHandler.addCampaign()
           .then(entreprises => res.json(entreprises))
           .catch(err => reject(err))
   }

    sendJsonResponse(res, code, content) {
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
}