const Car = require('../models/carModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'yourCloudName',
    api_key: 'yourApiKey',
    api_secret: 'yourApiSecret',
});

// Create a car
exports.createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const images = req.files.map(file => file.path);

        const car = new Car({
            title,
            description,
            tags,
            images,
            createdBy: req.user._id,
        });

        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// List all cars of a user
exports.listCars = async (req, res) => {
    try {
        const cars = await Car.find({ createdBy: req.user._id });
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get particular car
exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const car = await Car.findById(req.params.id);

        if (car.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        car.title = title;
        car.description = description;
        car.tags = tags;

        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (car.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await car.remove();
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
