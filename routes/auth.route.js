const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../configs/db");

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // compare the hashed password before login
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    }); // Replace 'your_secret_key' with your JWT secret key
    res.json({ user, token });
    // Login successful
    // res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("hello");
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash the password using bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const { password: userPassword, ...user } = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Hash password before saving to DB in production
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
