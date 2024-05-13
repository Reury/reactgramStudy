const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connection = async () => {
    try {
        // console.log("DB_USER:", dbUser); // Verify username
        // console.log("DB_PASSWORD:", dbPassword); // Verify password

        const dbConnection = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.m9aqo4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log("Successfully connected to the database!");

        return dbConnection;
    } catch (error) {
        console.error("Database connection error:", error); 
    }
};

connection();

module.exports = connection;
