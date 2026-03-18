export const validateResume = (req, res, next) => {

  if (!req.file) {
    return res.status(400).json({
      message: "Resume file required"
    });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({
      message: "Only PDF files allowed"
    });
  }

  next();
};