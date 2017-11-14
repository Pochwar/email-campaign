import entrepriseModel from "./entrepriseModel";
import _ from "underscore";


export default class entrepriseHandler {
    constructor()
    {
        this.EntrepriseModel = entrepriseModel;
    }

    getEntreprises()
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.find({})
                .then(entreprises => resolve(entreprises))
                .catch(err => reject(err));
        });
    }

    getEntreprisesById(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.find({"_id": id})
                .then(entreprises => resolve(entreprises))
                .catch(err => reject(err));
        });
    }
    postEntreprises(array)
    {
        // Return promise
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
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.remove({'_id': id}).then(result => resolve(result))
                .catch(e => reject(e));
        });
    }
    removeCampaign(entrepriseId, campaignId)
    {
        // Return promise
    }
    addCampaign(entrepriseId, campaignId)
    {
        return new Promise((resolve, reject) =>
        {
            this.getEntreprisesById(entrepriseId).then(entreprises =>
            {
                if(!_.isNull(campaignId))
                    entreprises.campaign.push(campaignId);
                entreprises.save();
                resolve(entreprises);
            }).catch(err => reject(err));
        })
    }
}