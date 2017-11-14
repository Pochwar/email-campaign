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

    getEntrepriseById(req, res) {
        const id = req.params.id;

        this.entrepriseHandler.getEntreprise(id)
            .then(entreprise => res.json(entreprise))
            .catch(err => res.json(err))
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
        if(!this.eV.checkId(req.body.id))
        {
            this.EntrepriseHandler.deleteEntreprise(req.body.id).then(result =>
            {
                res.status(this.status.ok).json(result);
            }).catch(e => console.log(e));
        }
        else
        {
            res.status(this.status.internalServerError).json({message: "Oops something gone wrong"});
        }
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