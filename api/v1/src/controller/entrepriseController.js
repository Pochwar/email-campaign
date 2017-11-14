import EntrepriseHandler from "../models/entrepriseHandler";
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

}