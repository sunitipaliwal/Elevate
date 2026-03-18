import { generateToken } from "../../utils/generateToken.js";

export const googleCallback = async (req, res) => {

  try {

    const user = req.user;

    const token = generateToken(user._id);

   const isProd = process.env.NODE_ENV === "production";

   res.cookie("token", token, {
     httpOnly: true,
     secure: isProd,
     sameSite: isProd ? "none" : "lax"
   });

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);

  } catch (error) {

    res.status(500).json({
      message: "Auth failed"
    });

  }
};

export const getCurrentUser = async (req, res) => {


  res.json(req.user);

};

export const logout = async (req, res) => {

  res.clearCookie("token");

  res.json({
    message: "Logged out"
  });

};