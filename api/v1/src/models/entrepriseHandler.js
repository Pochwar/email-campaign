import entrepriseModel from "./entrepriseModel";
import _ from "underscore";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default class entrepriseHandler {
    constructor()
    {
        this.EntrepriseModel = entrepriseModel;
    }

    login(array)
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.findOne({"email": array.email})
                .then(entreprise => {
                    bcrypt.compare(array.password, entreprise.password, (err, res) => {
                        if (res) {
                            const token = jwt.sign({ _id: entreprise._id}, 'secret',{ expiresIn: 60 * 60 });
                            resolve({
                                id: entreprise.id,
                                token: token
                            })
                        } else {
                            reject(err)
                        }
                    })

                })
                .catch(err => reject(err));
        });
    }

    getEntreprises()
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.find({})
                .then(entreprises => {
                    let arrayOfObject = [];
                    entreprises.forEach(entreprise => {
                        arrayOfObject.push({
                            id: entreprise._id,
                            label: entreprise.label,
                            url_ad: entreprise.url_ad,
                            url_picture: entreprise.url_picture,
                            campaigns: entreprise.campaign
                        })
                    });
                    resolve(arrayOfObject)
                })
                .catch(err => reject(err));
        });
    }

    getEntreprisesById(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.findOne({"_id": id})
                .then(entreprise => resolve({
                    id: entreprise._id,
                    label: entreprise.label,
                    url_ad: entreprise.url_ad,
                    url_picture: entreprise.url_picture,
                    campaigns: entreprise.campaign
                }))
                .catch(err => reject(err));
        });
    }

    postEntreprise(array)
    {
        const password = bcrypt.hashSync(array.password, 10);console.log(password);
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.create({
                label: array.label,
                email: array.email,
                password: password,
                url_ad: array.url_ad,
                url_picture: array.url_picture,
                campaign: []
            }).then(entreprise => resolve({create: 'ok'})).catch(err => reject(err))
        })
    }

    putEntreprise(id, array)
    {
        return new Promise((resolve, reject) =>
        {
            this.getEntreprisesById(id).then(entreprise =>
            {
                let modifiedEntreprise = this.checkArrayAndModifyEntreprise(entreprise, array);
                modifiedEntreprise.entreprise.save();
                resolve({
                    modified: modifiedEntreprise.modified
                });
            }).catch(err => reject(err));
        })
    }

    deleteEntreprises(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.remove({'_id': id}).then(result => resolve({success: true}))
                .catch(e => reject(e));
        });
    }

    removeCampaign(entrepriseId, campaignId)
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.findOne({"_id": entrepriseId}).then(entreprise => {
                if(!_.isNull(campaignId))
                {
                    let index = entreprise.campaign.indexOf(campaignId);
                    if(index !== -1) {
                        entreprise.campaign.splice(index, 1);
                        entreprise.save();
                        resolve({success: true});
                    } else {
                        resolve({success: false});
                    }
                }
            }).catch(err => reject(err));
        })
    }

    addCampaign(entrepriseId, campaignId)
    {
        return new Promise((resolve, reject) =>
        {
            this.EntrepriseModel.findOne({"_id": entrepriseId}).then(entreprise => {
                if(!_.isNull(campaignId))
                {
                    let index = entreprise.campaign.indexOf(campaignId);
                    if(index === -1) {
                        entreprise.campaign.push(campaignId);
                        entreprise.save();
                        resolve({success: true});
                    } else {
                        resolve({success: false});
                    }
                }
            }).catch(err => reject(err));
        })
    }

    checkArrayAndModifyEntreprise(entreprise, array) {
        let numberModifiedLigne = 0;
        if (!_.isNull(array.email)) {
            entreprise.email = array.email;
            numberModifiedLigne++;
        }

        if (!_.isNull(array.label)) {
            entreprise.label = array.label;
            numberModifiedLigne++;
        }


        if (!_.isNull(array.password)) {
            entreprise.password = array.password;
            numberModifiedLigne++;
        }

        if (!_.isNull(array.url_ad)) {
            entreprise.url_ad = array.url_ad;
            numberModifiedLigne++;
        }

        if (!_.isNull(array.url_picture)) {
            entreprise.url_picture = array.url_picture;
            numberModifiedLigne++;
        }

        return {
            entreprise: entreprise,
            modified: numberModifiedLigne
        };
    }
}