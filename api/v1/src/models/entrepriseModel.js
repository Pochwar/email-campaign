import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const Entreprises = new Schema(
    {
        _id: { type: String, required: true, unique: true },
        label: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        url_ad: { type: String, required: true },
        url_picture: { type: String, required: true },
        campaign: [[Number]],
    });

module.exports = mongoose.model('Entreprises', Entreprises);