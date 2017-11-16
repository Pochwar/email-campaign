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
        res.render('index');
    }

    register(req, res) {
        res.render('register');
    }

    login(req, res) {
        const that = this;
        const param = req.body;

        let array = {
            email: param.email,
            password: param.password
        };

        this.entrepriseHandler.login(array)
            .then(data =>  that.sendJsonResponse(res, that.httpStatusService.ok, data))
            .catch(err => {
                console.log(err);
                that.sendJsonResponse(res, that.httpStatusService.internalServerError, err)
            });
    }

    entreprise(req, res) {
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
        this.entrepriseHandler.getEntreprisesById(id)
            .then(entreprise =>  that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
            .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err));
    }

    // TODO BCRYPT
    postEntreprise(req, res) {
        const that = this;
        let array = this.setArrayFromBody(req.body);
        Object.entries(array).forEach(([key, value]) => {
            if(_.isNull(value)) {
                this.sendJsonResponse(res, that.httpStatusService.internalServerError, {message: "Missing parameters"});
            }
        });
        this.entrepriseHandler.postEntreprise(array)
            .then(entreprise => that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
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
  
    deleteEntreprises(req, res)
    {
        const id = req.params.id;
        const that = this;
        this.entrepriseHandler.deleteEntreprises(id)
            .then(entreprise => that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
            .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err));
    }
  
   addCampaign(req, res)
   {
     const entrepriseId = req.params.entrepriseId;
     const campaignId = req.params.campaignId;
     const that = this;
       this.entrepriseHandler.addCampaign(entrepriseId, campaignId)
           .then(entreprises => that.sendJsonResponse(res, that.httpStatusService.ok, entreprises))
           .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err))
   }

    removeCampaign(req, res) {
        const that = this;
        const entrepriseId = req.params.entrepriseId;
        const campaignId = req.params.campaignId;
        this.entrepriseHandler.removeCampaign(entrepriseId, campaignId)
            .then(entreprise => that.sendJsonResponse(res, that.httpStatusService.ok, entreprise))
            .catch(err => that.sendJsonResponse(res, that.httpStatusService.internalServerError, err));
    }

    sendJsonResponse(res, code, content) {
        res.status(code);
        res.json(content);
    }

    setArrayFromBody(body) {
        let array = {};
        array.label = (!_.isNull(body.label) && typeof body.label !== "undefined") ? body.label : null;
        array.email = (!_.isNull(body.email) && typeof body.email !== "undefined") ? body.email : null;
        array.password = (!_.isNull(body.password) && typeof body.password !== "undefined") ? body.password : null;
        array.url_ad = (!_.isNull(body.url_ad) && typeof body.url_ad !== "undefined") ? body.url_ad : null;
        array.url_picture = (!_.isNull(body.url_picture) && typeof body.url_picture !== "undefined") ? body.url_picture : null;
        array.campaign = (!_.isNull(body.campaign) && typeof body.campaign !== "undefined") ? body.campaign : null;
        return array
    }
}