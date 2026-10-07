import Project from "../models/Project.js";
import User from "../models/User.js";

const checkStudent = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      valid: false,
      status: 404,
      message: "User not found",
    };
  }

  if (user.role !== "student") {
    return {
      valid: false,
      status: 403,
      message: "Only students can manage projects",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const projects = await Project.find({
      student: userId,
    }).sort({
      isFeatured: -1,
      startDate: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch projects",
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const {
      title,
      description,
      technologies,
      projectUrl,
      githubUrl,
      startDate,
      endDate,
      isCurrentlyWorking,
      role,
      status,
      isFeatured,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    const project = await Project.create({
      student: userId,
      title: title.trim(),
      description: description?.trim() || "",
      technologies: Array.isArray(technologies)
        ? technologies.map((technology) => technology.trim()).filter(Boolean)
        : [],
      projectUrl: projectUrl?.trim() || "",
      githubUrl: githubUrl?.trim() || "",
      startDate: startDate || null,
      endDate: isCurrentlyWorking ? null : endDate || null,
      isCurrentlyWorking: Boolean(isCurrentlyWorking),
      role: role?.trim() || "",
      status: status || "completed",
      isFeatured:
        isFeatured !== undefined ? Boolean(isFeatured) : false,
    });

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("Add project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      student: userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "technologies",
      "projectUrl",
      "githubUrl",
      "startDate",
      "endDate",
      "isCurrentlyWorking",
      "role",
      "status",
      "isFeatured",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    }

    if (project.title) {
      project.title = project.title.trim();
    }

    if (project.description) {
      project.description = project.description.trim();
    }

    if (project.role) {
      project.role = project.role.trim();
    }

    if (project.projectUrl) {
      project.projectUrl = project.projectUrl.trim();
    }

    if (project.githubUrl) {
      project.githubUrl = project.githubUrl.trim();
    }

    if (Array.isArray(project.technologies)) {
      project.technologies = project.technologies
        .map((technology) => technology.trim())
        .filter(Boolean);
    }

    if (project.isCurrentlyWorking) {
      project.endDate = null;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const project = await Project.findOneAndDelete({
      _id: projectId,
      student: userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete project",
    });
  }
};