const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // If the password is not modified, no need to hash it again.
  this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds of 10
  next(); // Continue to save the user
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model for use in other files
module.exports = User;
