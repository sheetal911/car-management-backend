const express = require('express');
const Car = require('../models/Car');
const authenticate = require('../middleware/authenticate');  // We'll create this middleware later.
const router = express.Router();

// Create Car
router.post('/add', authenticate, async (req, res) => {
  const { title, description, images, tags } = req.body;
  try {
    const newCar = new Car({
      title,
      description,
      images,
      tags,
      userId: req.userId
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List Cars
router.get('/list', authenticate, async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.userId });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// View Specific Car
router.get('/:id', authenticate, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.userId });
    if (!car) return res.status(404).json({ message: 'Car not found' });

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Car
router.put('/:id', authenticate, async (req, res) => {
  const { title, description, images, tags } = req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, images, tags },
      { new: true }
    );

    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });

    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Car
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedCar = await Car.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
