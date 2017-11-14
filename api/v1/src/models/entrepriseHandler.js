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

    getEntreprise(id)
    {
        // Return promise
    }

    postEntreprise(array)
    {
        // Return promise
    }

    putEntreprise(id, array)
    {
        // Return promise
    }

    killEntreprise(id)
    {
        // Return promise
    }

}