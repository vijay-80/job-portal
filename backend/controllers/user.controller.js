import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, password, role } = req.body;
  
      // Validate required fields
      if (!fullname || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
          message: "All fields are required.",
          success: false,
        });
      }
  
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: { bio: "", skills: [] },
      });
  
      return res.status(201).json({
        message: "Account created successfully.",
        user: { id: newUser._id, fullname, email, phoneNumber, role },
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while registering the user.",
        success: false,
      });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validate input
      if (!email || !password || !role) {
        return res.status(400).json({
          message: "All fields are required.",
          success: false,
        });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
  
      // Verify password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false,
        });
      }
  
      // Check role
      if (role !== user.role) {
        return res.status(400).json({
          message: "Account doesn't exist for this role.",
          success: false,
        });
      }
  
      // Generate JWT token
      const tokenData = { userId: user._id };
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
  
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({
          message: `Welcome back, ${user.fullname}!`,
          user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile,
          },
          success: true,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while logging in.",
        success: false,
      });
    }
  };
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while logging out.",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
  
      const userId = req.id; // User ID from authentication middleware
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
  
      // Update fields
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skills.split(",").map((skill) => skill.trim());
  
      await user.save();
  
      return res.status(200).json({
        message: "Profile updated successfully.",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profile: user.profile,
        },
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while updating the profile.",
        success: false,
      });
    }
  };
  
