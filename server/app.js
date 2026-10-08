import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";


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

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "nexora-api",
  });
});

app.use("/api/auth", authRoutes);
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

export default app;