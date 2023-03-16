const router = require('express').Router();

const {
    createProperty,
    getProperties,
    getPropertyById,
    getPhoto,
    updateProperty,
    deleteProperty,
    searchProperties
} = require('../controllers/propertyControllers');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize], createProperty)
    .get(getProperties)

router.route('/:id')
    .get(getPropertyById)
    .put([authorize], updateProperty)
    .delete([authorize], deleteProperty)

router.route('/photo/:id')
    .get(getPhoto)

router.route('/filter')
    .post(searchProperties)
module.exports = router;