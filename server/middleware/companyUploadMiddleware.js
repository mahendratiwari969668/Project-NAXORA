import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads/companies");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = crypto.randomBytes(8).toString("hex");
    cb(null, `comp-doc-${Date.now()}-${safeBase}${ext}`);
  },
});

const allowedMimes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/pjpeg",
];

const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext) && allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Only PDF, JPG, and PNG documents are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export const uploadCompanyDocument = (req, res, next) => {
  upload.fields([
    { name: "companyVerification", maxCount: 1 },
    { name: "supportingDocument", maxCount: 1 },
  ])(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Supporting document exceeds the 10 MB size limit.",
        });
      }
      return res.status(400).json({
        success: false,
        message: `File upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Normalize to req.file
    if (req.files) {
      if (req.files.companyVerification?.[0]) {
        req.file = req.files.companyVerification[0];
      } else if (req.files.supportingDocument?.[0]) {
        req.file = req.files.supportingDocument[0];
      }
    }

    next();
  });
};
