import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 8000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Define routes properly
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend is running!" });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Backend is healthy!" });
});

app.get(
  "/cache-control",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // res.setHeader(
      //   "Cache-Control",
      //   "public, max-age = 3600, s-maxage = 86000"
      // );
      res.setHeader("Cache-Control", "private, max-age=5 must-revalidate");
      // res.setHeader("Cache-Control", "no-cache, no-store");
      // res.setHeader(
      //   "Cache-Control",
      //   "public, max-age=300 stale-while-revalidate = 300"
      // );
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "An unknown error occurred" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
