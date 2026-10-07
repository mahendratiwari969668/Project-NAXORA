import LearningResource from "../models/LearningResource.js";
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
      message: "Only students can access learning resources",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getLearningResources = async (req, res) => {
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
      type,
      category,
      level,
      search,
      isFree,
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (level) {
      filter.level = {
        $in: [level, "all"],
      };
    }

    if (isFree !== undefined) {
      filter.isFree = isFree === "true";
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { provider: searchRegex },
        { category: searchRegex },
        { skills: searchRegex },
      ];
    }

    const resources = await LearningResource.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      resources,
      count: resources.length,
    });
  } catch (error) {
    console.error("Get learning resources error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch learning resources",
    });
  }
};

export const getLearningResourceById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { resourceId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const resource = await LearningResource.findOne({
      _id: resourceId,
      isActive: true,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Learning resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      resource,
    });
  } catch (error) {
    console.error("Get learning resource error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch learning resource",
    });
  }
};

export const addLearningResource = async (req, res) => {
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
      provider,
      type,
      category,
      skills,
      level,
      duration,
      url,
      thumbnail,
      isFree,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Learning resource title is required",
      });
    }

    if (!provider || !provider.trim()) {
      return res.status(400).json({
        success: false,
        message: "Provider is required",
      });
    }

    const resource = await LearningResource.create({
      title: title.trim(),
      description: description?.trim() || "",
      provider: provider.trim(),
      type: type || "course",
      category: category?.trim() || "",
      skills: Array.isArray(skills)
        ? skills.map((skill) => skill.trim()).filter(Boolean)
        : [],
      level: level || "all",
      duration: duration?.trim() || "",
      url: url?.trim() || "",
      thumbnail: thumbnail?.trim() || "",
      isFree:
        isFree !== undefined ? Boolean(isFree) : true,
    });

    return res.status(201).json({
      success: true,
      message: "Learning resource created successfully",
      resource,
    });
  } catch (error) {
    console.error("Add learning resource error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create learning resource",
    });
  }
};

export const updateLearningResource = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { resourceId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const resource = await LearningResource.findById(
      resourceId
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Learning resource not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "provider",
      "type",
      "category",
      "skills",
      "level",
      "duration",
      "url",
      "thumbnail",
      "isFree",
      "isActive",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        resource[field] = req.body[field];
      }
    }

    if (resource.title) {
      resource.title = resource.title.trim();
    }

    if (resource.description) {
      resource.description = resource.description.trim();
    }

    if (resource.provider) {
      resource.provider = resource.provider.trim();
    }

    if (resource.category) {
      resource.category = resource.category.trim();
    }

    if (resource.duration) {
      resource.duration = resource.duration.trim();
    }

    if (resource.url) {
      resource.url = resource.url.trim();
    }

    if (resource.thumbnail) {
      resource.thumbnail = resource.thumbnail.trim();
    }

    if (Array.isArray(resource.skills)) {
      resource.skills = resource.skills
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    await resource.save();

    return res.status(200).json({
      success: true,
      message: "Learning resource updated successfully",
      resource,
    });
  } catch (error) {
    console.error("Update learning resource error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update learning resource",
    });
  }
};

export const deleteLearningResource = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { resourceId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const resource = await LearningResource.findByIdAndDelete(
      resourceId
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Learning resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Learning resource deleted successfully",
    });
  } catch (error) {
    console.error("Delete learning resource error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete learning resource",
    });
  }
};