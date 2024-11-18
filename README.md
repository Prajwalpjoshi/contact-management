# contact-management

Project Description
This project is a Contact Management System built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to perform CRUD (Create, Read, Update, Delete) operations on a contact list, with features like sorting, pagination, and a responsive UI built with Material-UI.

The app is divided into:

Frontend: Built with React.js and Material-UI, providing a dynamic and user-friendly interface for managing contacts.
Backend: Built with Node.js and Express.js to handle API requests, data validation, and error handling.
Database: MongoDB (hosted on MongoDB Atlas) for efficient storage and retrieval of contact data.

Setup Instructions
Prerequisites
Node.js installed on your system.
MongoDB Atlas account for cloud database hosting.
Git to clone the repository.

Step 1: Clone the Repository
git clone https://github.com/Prajwalpjoshi/contact-management.git
cd contact-management-app

Step 2: Backend Setup
Navigate to the backend folder:

cd backend
Install dependencies:

npm install
Create a .env file for environment variables:

env

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/contactDB?retryWrites=true&w=majority
(i added my mongodb MONGO_URI connection for security reason i unable to share here)

Start the backend server:
npm start

Step 3: Frontend Setup
Navigate to the frontend folder:

cd ../frontend
Install dependencies:

npm install
Start the development server:

npm start

Open your browser and go to http://localhost:3000 to view the app.

Database Schema(mongodb)
Collection Name: contacts

Document Structure:
json
{
"\_id": "ObjectId",
"firstName": "string",
"lastName": "string",
"email": "string",
"phone": "string",
"company": "string",
"jobTitle": "string"
}

Why MongoDB?

Flexibility: The schema-less nature of MongoDB allows easy updates and modifications to the contact model.
JSON Compatibility: MongoDB stores data in a JSON-like format, making it straightforward to use with a Node.js backend.
Scalability: MongoDB Atlas provides horizontal scaling, which is beneficial for future expansion.
