const _ = require('lodash');
const { District, validate } = require('../models/district');
const {Property}=require('../models/property');

module.exports.createDistrict = async (req, res) => {
    const { error } = validate(_.pick(req.body, ['name']))
    if (error) return res.status(400).send(error.details[0].message);

    const district = new District(_.pick(req.body, ['name']));
    const result = await district.save();
    return res.status(201).send({
            name: result.name
    })
}

module.exports.getDistrict = async (req, res) => {
    const districts = await District.find()
        .select({ _id: 1, name: 1 })
        .sort({ name: 1 }) 
    return res.status(200).send(districts)
}

