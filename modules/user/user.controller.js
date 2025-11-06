import { dbConnection } from "../../connection/dbConnection.js";
import bcrypt from "bcryptjs";

const pool = dbConnection();

// 🟢 Register User
export const registerUser = async (req, res) => {
  const { name, email, user_password } = req.body;

  if (!name || !email || !user_password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    // check if email exists
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    // hash password
    const hashedPassword = bcrypt.hashSync(user_password, 10);

    // insert new user
    const insertUser =
      "INSERT INTO users (name, email, user_password) VALUES (?, ?, ?)";
    await pool.query(insertUser, [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// 🟡 Login User
export const loginUser = async (req, res) => {
  const { email, user_password } = req.body;

  try {
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (result.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = result[0];
    const isMatch = bcrypt.compareSync(user_password, user.user_password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// 🔵 Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updateQuery = "UPDATE users SET name = ?, email = ? WHERE _id = ?";
    await pool.query(updateQuery, [name, email, id]);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
};

// 🔴 Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = "DELETE FROM users WHERE _id = ?";
    await pool.query(deleteQuery, [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};
