const jwt = require("jsonwebtoken");
const prisma = require("../configs/db");

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract JWT token from request header
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized forr token" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWTSECRET); // Replace 'your_secret_key' with your JWT secret key

    // Fetch user information from the database based on the decoded user ID or email
    const { password, ...user } = await prisma.user.findUnique({
      where: {
        id: decoded.userId, // Assuming user ID is stored in the JWT payload
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user information to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;

// module.exports = isAuthenticated;

// const jwt = require("jsonwebtoken");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const authenticate = async (req, res, next) => {
//   try {
//     // Extract JWT token from request header
//     const token =
//       req.headers.authorization && req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Verify JWT token
//     const decoded = jwt.verify(token, "your_secret_key"); // Replace 'your_secret_key' with your JWT secret key

//     // Fetch user information from the database based on the decoded user ID or email
//     const user = await prisma.user.findUnique({
//       where: {
//         id: decoded.userId, // Assuming user ID is stored in the JWT payload
//       },
//     });

//     if (!user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Attach user information to the request object
//     req.user = user;

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };
// module.exports = authenticate;
