import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "kasuli");
    req.userId = decoded.userId; // Attach userId to request for later use
    next();
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(401).json({ error: "Invalid token", token });
  }
}
