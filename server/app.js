import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import masterDataRoutes from "./routes/masterDataRoutes.js";


import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import skillMappingRoutes from "./routes/skillMappingRoutes.js";
import studentDashboardRoutes from "./routes/studentDashboardRoutes.js";
import studentSettingsRoutes from "./routes/studentSettingsRoutes.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js";


import companyProfileRoutes from "./routes/companyProfileRoutes.js";
import institutionProfileRoutes from "./routes/institutionProfileRoutes.js";

import companyOpportunityRoutes from "./routes/companyOpportunityRoutes.js";
import companyApplicationRoutes from "./routes/companyApplicationRoutes.js";
import companyDashboardRoutes from "./routes/companyDashboardRoutes.js";

import institutionDashboardRoutes from "./routes/institutionDashboardRoutes.js";
import institutionStudentRoutes from "./routes/institutionStudentRoutes.js";
import institutionStudentOverviewRoutes from "./routes/institutionStudentOverviewRoutes.js";
import institutionOpportunityRoutes from "./routes/institutionOpportunityRoutes.js";
import institutionApplicationRoutes from "./routes/institutionApplicationRoutes.js";
import institutionNotificationRoutes from "./routes/institutionNotificationRoutes.js";


import aiResumeRoutes from "./routes/aiResumeRoutes.js";

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
];

const envOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : [];

const allowedOrigins = [
  ...new Set([...defaultAllowedOrigins, ...envOrigins]),
].filter(Boolean);

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "nexora-api",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/master-data", masterDataRoutes);
app.use("/api/student", studentProfileRoutes);
app.use("/api/student/education", educationRoutes);
app.use("/api/student/skills", skillRoutes);
app.use("/api/student/projects", projectRoutes);
app.use("/api/student/certifications", certificationRoutes);
app.use("/api/student/resume", resumeRoutes);
app.use("/api/student/notifications", notificationRoutes);
app.use("/api/student/opportunities", opportunityRoutes);
app.use("/api/student/applications", applicationRoutes);
app.use("/api/student/learning", learningRoutes);
app.use("/api/student/skill-mapping", skillMappingRoutes);
app.use("/api/student/dashboard", studentDashboardRoutes);
app.use("/api/student/settings", studentSettingsRoutes);
app.use("/api/auth/password", passwordResetRoutes);
app.use("/api/company/profile", companyProfileRoutes);
app.use("/api/institution/profile", institutionProfileRoutes);
app.use("/api/company/opportunities", companyOpportunityRoutes);
app.use("/api/company/applications", companyApplicationRoutes);
app.use("/api/company/dashboard", companyDashboardRoutes);
app.use("/api/institution/dashboard",institutionDashboardRoutes);
app.use("/api/institution/students", institutionStudentRoutes);
app.use("/api/institution/students/overview", institutionStudentOverviewRoutes);
app.use("/api/institution/opportunities", institutionOpportunityRoutes);
app.use("/api/institution/applications", institutionApplicationRoutes);
app.use("/api/institution/notifications", institutionNotificationRoutes);
app.use("/api/student/ai-resume", aiResumeRoutes);

export default app;