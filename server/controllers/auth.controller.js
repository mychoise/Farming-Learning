import { userTable } from "../db/schema/user.js";
import { db } from "../db.config.js";
import { validationResult } from "express-validator";
import { generateAccessToken, generateRefreshToken } from "./../utils/jwt.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors", errors.array());
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const [userExisted] = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.email, email));
    if (userExisted) {
      return res
        .status(400)
        .json({ success: false, message: "User already existed" });
    }
    const [adminExisted] = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.role, "admin"));
    if (role === "admin" && adminExisted) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already existed" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(userTable)
      .values({ email, password: hashedPassword, name, role })
      .returning();
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const securedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    await db
      .update(userTable)
      .set({ refreshToken: securedRefreshToken })
      .where(eq(userTable.id, user.id));
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: accessToken,
    });
  } catch (error) {
    console.log("error in register", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const securedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    await db
      .update(userTable)
      .set({ refreshToken: securedRefreshToken })
      .where(eq(userTable.id, user.id));
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: accessToken,
    });
  } catch (error) {
    console.log("error in login", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide refresh token" });
    }
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const [user] = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        name: userTable.name,
        role: userTable.role,
      })
      .from(userTable)
      .where(eq(userTable.refreshToken, hashedToken));
    console.log("User found", user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const accessToken = generateAccessToken(user.id);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token: accessToken,
    });
  } catch (error) {
    console.log("error in refresh", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
