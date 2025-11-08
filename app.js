import express from "express";

import { swaggerDocs } from "./swagger.js";
import { dbConnection } from "./connection/dbConnection.js";
import userRouter from "./modules/user/user.routes.js";
import postRouter from "./modules/post/post.routes.js";

const app = express();
const port = 5002;

app.use(express.json());

// Test route
app.get("/", (req, res) => res.json({ message: "Hello World!" }));

// Routes
app.use("/user", userRouter);
app.use("/api/posts", postRouter);

swaggerDocs(app);
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);
