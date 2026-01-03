const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const activityRoutes = require("./routes/activityRoutes");
const tripStopRoutes = require("./routes/tripStopRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

/* 🔥 CORS MUST BE FIRST */
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // frontend origin
    credentials: true,
  })
);

app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/tripstops", tripStopRoutes);
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => {
  res.send("GlobalTrotters API is running");
});

module.exports = app;
