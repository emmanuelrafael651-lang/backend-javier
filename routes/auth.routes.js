const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", (req, res) => {
    console.log("🔥 LOGIN HIT");
    console.log("📦 BODY:", req.body);

    const { username, password } = req.body;

    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    if (!ADMIN_USER || !ADMIN_PASS) {
        return res.status(500).json({ message: "Faltan variables de entorno" });
    }

    if (
        username?.trim() === ADMIN_USER &&
        password?.trim() === ADMIN_PASS
    ) {
        const token = jwt.sign(
            { user: ADMIN_USER },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        return res.json({ token });
    }

    return res.status(401).json({ message: "Credenciales incorrectas" });
});

module.exports = router;