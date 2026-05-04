const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// Middleware
app.use((req, res, next) => {
    console.log("Request:", req.method, req.url);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.json({ message: "Server Running" });
});

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Add user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json({ message: "Name and email required" });
    }

    for (let u of users) {
        if (u.email === email) {
            return res.json({ message: "Email already exists" });
        }
    }

    const user = {
        id: users.length + 1,
        name,
        email
    };

    users.push(user);

    res.json({ message: "User added", user });
});

// Delete user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const newUsers = users.filter(u => u.id !== id);

    if (newUsers.length === users.length) {
        return res.json({ message: "User not found" });
    }

    users = newUsers;

    res.json({ message: "User deleted" });
});

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "All fields required" });
    }

    if (email === "admin@gmail.com" && password === "1234") {
        res.json({ message: "Login Success" });
    } else {
        res.json({ message: "Invalid Credentials" });
    }
});

// Server
app.listen(3000, () => {
    console.log("Server started");
});