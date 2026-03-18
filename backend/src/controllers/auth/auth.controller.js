import { generateToken } from "../../utils/generateToken.js";

export const googleCallback = async (req, res) => {

  try {

    const user = req.user;

    const token = generateToken(user._id);

    res.cookie("token", token, {
     httpOnly: true,
     secure: false,
     sameSite: "lax"
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