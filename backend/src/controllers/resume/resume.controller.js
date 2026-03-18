import Resume from "../../models/resume.model.js";
import User from "../../models/user.model.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload.js";
import cloudinary from "../../config/cloudinary.js";

export const uploadResume = async (req, res) => {
  try {
    // Pass 'req.file' (the whole object) so we can access the filename
    const uploadResult = await uploadToCloudinary(
      req.file, 
      req.user._id
    );

    const lastResume = await Resume.findOne({
      user: req.user._id
    }).sort({ version: -1 });

    const version = lastResume ? lastResume.version + 1 : 1;

    const resume = await Resume.create({
      user: req.user._id,
      // Optional: Save the original filename as the title in your DB too
      title: req.file.originalname.split(".")[0], 
      version,
      fileUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { resumes: resume._id } }
    );

    res.status(201).json(resume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};

export const getUserResumes = async (req, res) => {

  try {

    const resumes = await Resume.find({
      user: req.user._id
    }).sort({ version: -1 });

    res.json(resumes);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch resumes"
    });

  }

};


export const getResumeById = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    res.json(resume)

  } catch (error) {

    res.status(500).json({
      message: "Error fetching resume"
    })

  }

}

export const deleteResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    await cloudinary.uploader.destroy(resume.cloudinaryId, {
      resource_type: "raw"
    });

    await resume.deleteOne();

    res.json({
      message: "Resume deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed"
    });

  }

};