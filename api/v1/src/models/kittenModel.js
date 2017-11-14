import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const Kittens = new Schema(
    {
        name: { type: String, required: true, unique: true },
        color: { type: String, required: true },
        primaryQuality: { type: String, required: true },
        secondQuality: { type: String, required: false },
        primaryDefault: { type: String, required:true },
        kibbles: { type: String, required:true },
        isAvailable: { type: Boolean, required:true },
    });

module.exports = mongoose.model('Kittens', Kittens);