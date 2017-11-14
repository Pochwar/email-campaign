import EntrepriseHandler from "../models/entrepriseHandler";
import _ from "underscore";
import eV from "../models/entrepriseValidator";

export default class EntrepriseController
{

    constructor() {
        this.entrepriseHandler = new EntrepriseHandler();
        this.eV = new eV();
        this.status = this.eV.getStatus();
    }

    index(req, res) {
        res.render('entreprise');
    }

    getEntreprises(req, res) {
        this.entrepriseHandler.getEntreprises()
            .then(entreprise => res.json(entreprise))
            .catch(err => res.json(err))
    }

    getEntrepriseById(req, res) {
        const id = req.params.id;

        this.entrepriseHandler.getEntreprise(id)
            .then(entreprise => res.json(entreprise))
            .catch(err => res.json(err))
    }

    putEntreprises(req, res) {
        const param = req.body;
        const id = req.params.id;

        let array = {
            label: (!_.isNull(param.label)) ? param.label : null,
            email: (!_.isNull(param.email)) ? param.email : null,
            password: (!_.isNull(param.password)) ? param.password : null,
            url_ad: (!_.isNull(param.url_ad)) ? param.url_ad : null,
            url_picture: (!_.isNull(param.url_picture)) ? param.url_picture : null,
            campaign: (!_.isNull(param.campaign)) ? param.campaign : null
        };

        this.entrepriseHandler.putEntreprise(id, array)
            .then(entreprise => res.json(entreprise))
            .catch(err => res.json(err));
    }
}