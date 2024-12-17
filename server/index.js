const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import the registeredUsers model
const registeredUsers = require("./model/registeredUsers");

let app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://bagdesameer92:bagdesameer92@cluster0.bf7nw.mongodb.net/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB!");
})
.catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// Registration route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if passwords match
        if (password !== req.body.cnfPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
          }

        // Check if the email is already registered
        const user = await registeredUsers.findOne({ email: email });

        if (user) {
            return res.json({ message: "Email already registered." });
        }

        // Create a new user with only password (not cnfPassword)
        const newUser = new registeredUsers({
            name,
            email,
            password,
        });

        await newUser.save();
        res.json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed. Please try again.", error: error.message });
    }
});


app.get("/users", async (req, res) => {
    try {
        const users = await registeredUsers.find(); // Retrieve all users from the database
        res.json({ users }); // Send the list of users as a response
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users. Please try again.", error: error.message });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;  // Get email and password from query params
        
        console.log("Received Email: ", email);  // Log the received email
        console.log("Received Password: ", password);  // Log the received password
        const user = await registeredUsers.findOne({ email: email });

        if (!user) {
            return res.json({ message: "User not found." });
        }

        if (user.password !== password) {
            return res.json({ message: "Invalid password." });
        }

        res.json({ message: "Login successful.", user: user });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed. Please try again.", error: error.message });
    }
});



// Setup the port to listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
