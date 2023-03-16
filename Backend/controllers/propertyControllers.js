const _ = require('lodash');
const { Property, validate } = require('../models/property');
const formidable = require('formidable');
const fs = require('fs');

module.exports.createProperty = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send('Something Went wrong!')

        const { error } = validate(_.pick(fields, ['district', 'area', 'type', 'address', 'description', 'rent_price', 'bed', 'bath', 'belcony', 'floor_no', 'feet']))
        if (error) return res.status(400).send(error.details[0].message);
        
        let user_id = req.user._id;
        Object.assign(fields, { userId: user_id });

        const property = new Property(fields);

        if (files.photo) {
            fs.readFile(files.photo.path, (err, data) => {
                if (err) return res.status(400).send('Problem in file data!');
                property.photo.data = data;
                property.photo.contentType = files.photo.type;
                property.save((err, result) => {
                    if (err) return res.status(400).send('Internal Server Error!');
                    else return res.status(201).send({
                        message: 'Successfully Create Property',
                        data: _.pick(result, ['userId','district', 'area', 'type', 'address', 'description', 'rent_price', 'bed', 'bath', 'belcony', 'floor_no', 'feet'])
                    })
                })
            })
        } else {
            return res.status(400).send('No Image Provided!')
        }
    })
}

module.exports.getProperties = async (req, res) => {
    const properties = await Property.find()
        .select({ photo: 0 })
        .sort({ createdAt: -1 })
    return res.status(200).send(properties);
}

module.exports.getPropertyById = async (req, res) => {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId)
        .select({ photo: 0 })
    if (!property) return res.status(404).send('Not Found!');
    return res.status(200).send(property);
}

module.exports.getPhoto = async (req, res) => {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId)
        .select({ photo: 1, _id: 0 })
    res.set('Content-Type', property.photo.contentType)
    return res.status(200).send(property.photo.data);
}

module.exports.updateProperty = async (req, res) => {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send('Something Wrong!');

        const updatedFields = _.pick(fields, ['district', 'area', 'type', 'address', 'description', 'rent_price', 'bed', 'bath', 'belcony', 'floor_no', 'feet']);
        _.assignIn(property, updatedFields);

        if (files.photo) {
            fs.readFile(files.photo.path, (err, data) => {
                if (err) return res.status(400).send('Something Wrong!');
                property.photo.data = data;
                property.photo.contentType = files.photo.type;

                property.save((err, result) => {
                    if (err) return res.status(500).send('Something Failed!');
                    else return res.status(200).send({
                        message: 'Property Updated Successfully!'
                    })
                })
            })
        } else {
            property.save((err, result) => {
                if (err) return res.status(500).send('Something Failed!');
                else return res.status(200).send({
                    message: 'Property Updated Successfully!'
                })
            })
        }
    })
}

module.exports.deleteProperty = async (req, res) => {
    const propertyId = req.params.id;
    const property = await Property.findOneAndDelete(propertyId);

    if (!property) return res.status(404).send('Not Found!');
    return res.status(200).send('Property has been deleted!');
}

module.exports.searchProperties = async (req, res) => {
    let filters = req.body.filters;
    let args = {}
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === 'district') {
                args['district'] = {
                    $in: filters['district']
                }
            }
            if (key === 'area') {
                args['area'] = {
                    $in: filters['area']
                }
            }
            if (key === 'type') {
                args['type'] = {
                    $in: filters['type']
                }
            }
        }
    }
    const property = await Property.find(args)
        .sort({ createdAt: -1 })
        .select({ photo: 0 })
    return res.status(200).send(property)
}
