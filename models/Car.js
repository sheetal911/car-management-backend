const mongoose = require('mongoose');

// Define the schema for the Car
const carSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Car title (e.g., "Toyota Camry")
  description: { type: String, required: true },  // Car description (e.g., "A reliable sedan")
  images: [{ type: String }], // Store image URLs as an array of strings (URLs or paths)
  tags: [{ type: String }], // Tags related to the car (e.g., "sedan", "Toyota", "new")
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model (each car is associated with a user)
    required: true 
  },
});

// Create the Car model
const Car = mongoose.model('Car', carSchema);

// Export the Car model for use in other files
module.exports = Car;
