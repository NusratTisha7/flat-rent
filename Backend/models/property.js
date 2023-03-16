const { Schema, model } = require('mongoose');
const Joi = require('joi');

module.exports.Property = model('Property', Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    district: {
        type:Schema.Types.ObjectId,
        ref:'District',
        require:true,
    },
    area: String,
    type: String,
    address: String,
    description: String,
    rent_price: Number,
    bed: Number,
    bath: Number,
    belcony: Number,
    floor_no: Number,
    feet:Number,
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true }));

module.exports.validate = property => {
    const schema = Joi.object({
        district: Joi.string().required(),
        area: Joi.string().required(),
        type: Joi.string().required(),
        address:Joi.string().required(),
        description: Joi.string().min(10).max(2000).required(),
        rent_price: Joi.number().required(),
        bed: Joi.number().required(),
        bath: Joi.number().required(),
        belcony: Joi.number().required(),
        floor_no: Joi.number().required(),
        feet: Joi.number().required(),
    });
    return schema.validate(property);
}