import jwt from "jsonwebtoken";
import { UserDto } from "../dto/user.dto";
import { User, UserModel } from "../models/user";
import bcrypt from "bcryptjs";

export const createUser = async (request: UserDto) => {
  // Validate required fields
  if (
    !request.firstName ||
    !request.firstName.trim() ||
    !request.lastName ||
    !request.lastName.trim()
  ) {
    throw new Error("First name and last name are required.");
  }

  if (!request.phoneNumber || !/^\+?\d{10,15}$/.test(request.phoneNumber)) {
    throw new Error("Invalid phone number format.");
  }

  if (!request.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
    throw new Error("Invalid email address.");
  }

  if (!request.password || request.password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const fullName = `${request.firstName.trim()} ${request.lastName.trim()}`;

  // Check if user already exists
  const existingUser = await UserModel.findOne({
    $or: [{ email: request.email }, { phoneNumber: request.phoneNumber }],
  });
  if (existingUser) {
    throw new Error("User with this email or phone number already exists.");
  }

  const hashPassword = await bcrypt.hash(request.password, 10);

  // Create user
  const user = new UserModel({
    id: request.id,
    fullName,
    phoneNumber: request.phoneNumber,
    email: request.email,
    password: hashPassword,
    role: request?.role || "user",
  });

  return await user.save();
};

export const loginUser = async (email: string, password: string) => {
  try {
    // Validate input
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error("Invalid email address.");
    }

    if (!password || password.trim() === "") {
      throw new Error("Password is required.");
    }

    // Check if user exists
    const userData = await UserModel.findOne({ email: email.trim() });
    if (!userData) {
      throw new Error("No user found with the given email.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userData._id, email: userData.email },
      "your_secret_key",
      { expiresIn: "1h" } // token valid for 1 hour
    );

    // ✅ Return success response
    return {
      message: "Login successful.",
      token,
      user: {
        email: userData.email,
      },
    };
  } catch (error: any) {
    throw new Error(error.message || "Login failed.");
  }
};
