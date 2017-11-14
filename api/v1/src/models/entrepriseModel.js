import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const Entreprises = new Schema(
    {
        name: { type: String, required: true, unique: true }
    });

module.exports = mongoose.model('Entreprises', Entreprises);