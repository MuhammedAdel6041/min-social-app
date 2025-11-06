import { dbConnection } from "../../connection/dbConnection.js";
const pool = dbConnection();

// 🟢 Create Post
export const createPost = async (req, res) => {
  const { title, description, user_id } = req.body;
  const query = "INSERT INTO posts (title, description, user_id) VALUES (?, ?, ?)";
  try {
    await pool.query(query, [title, description, user_id]);
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Error creating post" });
  }
};

// 🟡 Update Post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query = "UPDATE posts SET title = ?, description = ? WHERE post_id = ?";
  try {
    await pool.query(query, [title, description, id]);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Error updating post" });
  }
};

// 🔴 Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM posts WHERE post_id = ?";
  try {
    await pool.query(query, [id]);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post" });
  }
};

// 🔵 Get All Posts
export const getAllPosts = async (req, res) => {
  const query = `
    SELECT posts.*, users.name AS author
    FROM posts
    JOIN users ON posts.user_id = users._id
  `;
  try {
    const [result] = await pool.query(query);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// 🟣 Get Single Post
export const getSinglePost = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT posts.*, users.name AS author
    FROM posts
    JOIN users ON posts.user_id = users._id
    WHERE post_id = ?
  `;
  try {
    const [result] = await pool.query(query, [id]);
    if (result.length === 0)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Error fetching post" });
  }
};
