require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// DEBUG: Log that we are starting
console.log("🛠️ Starting Server...");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DEBUG: Import Routes with logging
try {
    console.log("📂 Attempting to load authRoutes from ./src/routes/authRoutes...");
    const authRoutes = require('./src/routes/authRoutes');
    console.log("✅ authRoutes loaded successfully!");

    app.use('/auth', authRoutes);
    console.log("🔗 /auth route connected");
} catch (error) {
    console.error("❌ FAILED to load authRoutes:", error.message);
}

try {
    const bugRoutes = require('./src/routes/bugRoutes');
    app.use('/bugs', bugRoutes);
    console.log("🔗 /bugs route connected");
} catch (error) {
    console.error("❌ FAILED to load bugRoutes:", error.message);
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`👉 Test URL: http://localhost:${PORT}/auth/register`);
});