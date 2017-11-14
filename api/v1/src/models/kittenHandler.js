import kittenModel from "./kittenModel";
import _ from "underscore";


export default class kittenHandler {
    constructor()
    {
        this.KittenModel = kittenModel;
    }

    getKittens()
    {
        return new Promise((resolve, reject) =>
        {
            this.KittenModel.find({})
                .then(kittens => resolve(kittens))
                .catch(err => reject(err));
        });
    }

    getKitten(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.KittenModel.findOne({"_id": id})
                .then(result => resolve(result))
                .catch(e => reject(e));
        })
    }

    postKitten(array)
    {
        return new Promise((resolve, reject) =>
        {
            this.KittenModel.create(
                {
                    name: array.name,
                    color: array.color,
                    primaryQuality: array.primaryQuality,
                    secondQuality: array.secondQuality,
                    primaryDefault: array.primaryDefault,
                    kibbles: array.kibbles,
                    isAvailable: true

                }).then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    putKitten(id, array)
    {
        return new Promise((resolve, reject) =>
        {
            this.getKitten(id).then(kitten =>
            {
                if(!_.isNull(array.name))
                    kitten.name = array.name;

                if(!_.isNull(array.color))
                    kitten.color = array.color;

                if(!_.isNull(array.primaryQuality))
                    kitten.primaryQuality = array.primaryQuality;

                if(!_.isNull(array.primaryDefault))
                    kitten.primaryDefault = array.primaryDefault;

                if(!_.isNull(array.kibbles))
                    kitten.kibbles = array.kibbles;

                if(!_.isNull(array.secondQuality))
                    kitten.secondQuality = array.secondQuality;

                kitten.save();
                resolve(kitten);
            }).catch(e => reject(e));
        })
    }

    killKitten(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.KittenModel.remove({'_id': id}).then(result => resolve(result))
                .catch(e => reject(e));
        });
    }

}