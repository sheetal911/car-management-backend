🚗 Car Management Application - Backend

📌 Overview
The Car Management Backend provides RESTful APIs to manage car listings, including user authentication, CRUD operations for cars, image uploads, and search functionality. It ensures users can only manage their own listings.

🎯 Features

✅ User authentication (Signup/Login)

✅ Add a car with up to 10 images, title, description, and tags (car_type, company, dealer, etc.)

✅ View all cars added by the logged-in user

✅ Global search for cars based on title, description, or tags

✅ View detailed information for a specific car

✅ Update a car’s title, description, tags, or images

✅ Delete a car

✅ Secure API with authentication

🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (MongoDB Atlas)
Authentication: JWT (JSON Web Token)
Cloud Storage: Multer (for image uploads)

🚀 Getting Started
🔹 1. Clone the Repository

git clone https://github.com/your-github-username/car-management-backend.git
cd car-management-backend

🔹 2. Install Dependencies

npm install

🔹 3. Configure Environment Variables
Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url   # If using Cloudinary for image storage

🔹 4. Run the Server

npm start 

📌 API Endpoints
🔹 User Authentication
POST /api/users/signup → Register a new user
POST /api/users/login → Authenticate and get JWT token
🔹 Car Management
POST /api/cars → Add a new car (Requires Authentication)
GET /api/cars → Get all cars of the logged-in user
GET /api/cars/:id → Get details of a specific car
PUT /api/cars/:id → Update car details (title, description, tags, images)
DELETE /api/cars/:id → Delete a car
🔹 Search
GET /api/cars/search?query=keyword → Search cars by title, description, or tags

🏗️ Future Enhancements
Deploy the backend on Heroku/Vercel
Implement pagination for car listings
Add role-based access control (RBAC)
Improve image optimization and cloud storage options
