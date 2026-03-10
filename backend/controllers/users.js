require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users");

const getUsersController = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
/**
 * Add Users Controller is used to add new users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 * @returns {Object} - Response object
 */
const addUserController = async (req, res) => {
  try {
    // Check if all required fields are providedget user data from request body
    const { username, email, password, role } = req.body;

    // Check if the role is valid
    if (!["manager", "salesAgent", "director"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Check if the username or email already exists
    const existing = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existing) return res.status(400).json({ error: "User already exists" });

    // create new user
    const user = new UserModel({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
      role: role,
    });

    await user.save();

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ Massage: "User Not Added !" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: err.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const deleteUserCotroller = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOneAndDelete(username);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ Massage: "User Not Deleted !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};
/**
 * User Login Controller is used to login users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 * @returns {Object} - Response object
 */
const userLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username or email already exists
    const _user = await UserModel.findOne({
      username: username,
    });

    // Compare the password
    const match = await bcrypt.compare(password, _user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    if (_user) {
      // create user object
      let user = {
        id: _user._id,
        username: _user.username,
        email: _user.email,
        role: _user.role,
      };
      // Generate JWT Token
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ user });
    } else {
      res.status(400).json({ Message: "User Not Found !" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: err.message });
  }
};

module.exports = {
  addUserController,
  userLoginController,
  getUsersController,
  deleteUserCotroller,
};
