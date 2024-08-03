const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  const car = new Car(req.body);
  try {
    const savedCar = await car.save();
    res.json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getCarById = async (req, res) => {
  try {
    const carId = req.params.id;  
    const car = await Car.findById(carId);  
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });  
    }
    res.json(car);  
  } catch (err) {
    res.status(400).json({ message: err.message });  
  }
};

exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
