const router = require('express').Router();
const { createCar, getCars, updateCar, deleteCar,getCarById } = require('../controllers/carController');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize')


router.post('/', auth, authorize('admin'), createCar);
router.get('/',auth, getCars);
router.get('/:id', auth, getCarById);
router.put('/:id', auth, authorize('admin'), updateCar);
router.delete('/:id', auth, authorize('admin'), deleteCar);

module.exports = router;
