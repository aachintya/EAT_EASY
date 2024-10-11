const express = require("express");
const app = express();
require("dotenv").config();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// socketio
const http = require("http");
const socketserver = http.createServer(app);
const socket = require("./config/socket");
const io = socket.init(socketserver);

// Config
const db = require("./config/db");
db.connect();
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// Import the passport configuration
require('./passport');

// Initialize Passport middleware
app.use(passport.initialize());

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Routes
const userRoutes = require('./routes/user');
const complaintRoutes = require('./routes/complaint');
const profileRoutes = require('./routes/profile');
const menuRoutes = require('./routes/menu');
const committeeRoutes = require('./routes/committee');
const dailyExpense = require('./routes/expense');
const ratingRoutes = require('./routes/rating');
const authRoutes = require('./routes/auth'); // Import your OAuth routes

app.use("/auth", authRoutes); // Attach authRoutes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/committee", committeeRoutes);
app.use("/api/v1/expense", dailyExpense);
app.use("/api/v1/rating", ratingRoutes);

app.get("/test", (req, res) => {
    return res.json({
        success: true,
        message: "Test route is working!",
    });
});

// Adding default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error occurred:", err.message);  // Log the error message
    console.error(err.stack);  // Log the error stack trace for debugging

    // Send error response to the client
    res.status(500).json({
        success: false,
        message: "An error occurred on the server",
        error: err.message,
    });
});

// Listen on the port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

const socketport = process.env.SOCKET_SERVER_PORT || 5000;
socketserver.listen(socketport, () => {
  console.log(`Socket server is running on port ${socketport}`);
});
