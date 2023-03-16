const router = require('express').Router();
const {
    createDistrict,
    getDistrict,
} = require('../controllers/districtController');
const authorize = require('../middlewares/authorize');

router.route('/')
    .get(getDistrict)
    .post([authorize], createDistrict)

module.exports = router;