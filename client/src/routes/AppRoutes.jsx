import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/public/Landing/LandingPage";
import RoleSelection from "../pages/auth/RoleSelection/RoleSelection";
import RolePlaceholder from "../pages/auth/RoleSelection/RolePlaceholder";

/* =========================================================
   STUDENT AUTHENTICATION
========================================================= */

import StudentLogin from "../pages/auth/Login/StudentLogin";
import StudentRegister from "../pages/auth/Register/StudentRegister";

/* =========================================================
   STUDENT LAYOUT
========================================================= */

import StudentLayout from "../components/layout/StudentLayout/StudentLayout";

/* =========================================================
   STUDENT DASHBOARD
========================================================= */

import StudentDashboard from "../pages/student/Dashboard/StudentDashboard";

/* =========================================================
   STUDENT PROFILE
========================================================= */

import StudentProfile from "../pages/student/Profile/StudentProfile";
import StudentEducation from "../pages/student/Profile/StudentEducation";
import StudentProfileLayout from "../pages/student/Profile/StudentProfileLayout";
import StudentSkills from "../pages/student/Profile/StudentSkills";
import StudentProjects from "../pages/student/Profile/StudentProjects";
import StudentCertifications from "../pages/student/Profile/StudentCertifications";
import StudentResume from "../pages/student/Profile/StudentResume";

/* =========================================================
   STUDENT FEATURES
========================================================= */

import StudentSkillMapping from "../pages/student/SkillMapping/StudentSkillMapping";
import StudentOpportunities from "../pages/student/Opportunities/StudentOpportunities";
import StudentApplications from "../pages/student/Applications/StudentApplications";
import StudentLearning from "../pages/student/Learning/StudentLearning";
import StudentNotifications from "../pages/student/Notifications/StudentNotifications";
import StudentSettings from "../pages/student/Settings/StudentSettings";

/* =========================================================
   INSTITUTION AUTHENTICATION
========================================================= */

import InstitutionLogin from "../pages/auth/Login/InstitutionLogin";
import InstitutionRegister from "../pages/auth/Register/InstitutionRegister";

/* =========================================================
   INSTITUTION PORTAL
========================================================= */

import InstitutionLayout from "../components/layout/InstitutionLayout/InstitutionLayout";

import InstitutionDashboard from "../pages/institution/Dashboard/InstitutionDashboard";
import InstitutionStudents from "../pages/institution/Students/InstitutionStudents";
import InstitutionSkillIntelligence from "../pages/institution/SkillIntelligence/InstitutionSkillIntelligence";
import InstitutionInternships from "../pages/institution/Internships/InstitutionInternships";
import InstitutionPlacements from "../pages/institution/Placements/InstitutionPlacements";
import InstitutionCompanies from "../pages/institution/Companies/InstitutionCompanies";
import InstitutionIndustryCollaboration from "../pages/institution/IndustryCollaboration/InstitutionIndustryCollaboration";
import InstitutionReports from "../pages/institution/Reports/InstitutionReports";
import InstitutionNotifications from "../pages/institution/Notifications/InstitutionNotifications";
import InstitutionSettings from "../pages/institution/Settings/InstitutionSettings";

/* =========================================================
   COMPANY AUTHENTICATION
========================================================= */

import CompanyLogin from "../pages/auth/Login/CompanyLogin";
import CompanyRegister from "../pages/auth/Register/CompanyRegister";

/* =========================================================
   COMPANY LAYOUT
========================================================= */

import CompanyLayout from "../components/layout/CompanyLayout/CompanyLayout";

/* =========================================================
   COMPANY PORTAL
========================================================= */

import CompanyDashboard from "../pages/company/Dashboard/CompanyDashboard";
import CompanyProfile from "../pages/company/Profile/CompanyProfile";
import CompanyJobs from "../pages/company/Jobs/CompanyJobs";
import CompanyCandidates from "../pages/company/Candidates/CompanyCandidates";
import CompanyApplications from "../pages/company/Applications/CompanyApplications";
import CompanyHiringPipeline from "../pages/company/HiringPipeline/CompanyHiringPipeline";
import CompanyColleges from "../pages/company/Colleges/CompanyColleges";
import CompanyAnalytics from "../pages/company/Analytics/CompanyAnalytics";
import CompanyNotifications from "../pages/company/Notifications/CompanyNotifications";
import CompanySettings from "../pages/company/Settings/CompanySettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC
      ====================================================== */}

      <Route path="/" element={<LandingPage />} />

      {/* =====================================================
          ROLE SELECTION
      ====================================================== */}

      <Route
        path="/auth/role-selection"
        element={<RoleSelection />}
      />

      {/* =====================================================
          STUDENT AUTHENTICATION
      ====================================================== */}

      <Route
        path="/auth/student/login"
        element={<StudentLogin />}
      />

      <Route
        path="/auth/student/register"
        element={<StudentRegister />}
      />

      {/* =====================================================
          INSTITUTION AUTHENTICATION
      ====================================================== */}

      <Route
        path="/auth/institution/login"
        element={<InstitutionLogin />}
      />

      <Route
        path="/auth/institution/register"
        element={<InstitutionRegister />}
      />

      {/* =====================================================
          COMPANY AUTHENTICATION
      ====================================================== */}

      <Route
        path="/auth/company/login"
        element={<CompanyLogin />}
      />

      <Route
        path="/auth/company/register"
        element={<CompanyRegister />}
      />

      {/* =====================================================
          STUDENT PORTAL
      ====================================================== */}

      <Route
        path="/student"
        element={<StudentLayout />}
      >
        {/* /student -> /student/dashboard */}

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />

        {/* =================================================
            PROFILE
        ================================================= */}

        <Route
          path="profile"
          element={<StudentProfileLayout />}
        >
          <Route
            index
            element={<StudentProfile />}
          />

          <Route
            path="education"
            element={<StudentEducation />}
          />

          <Route
            path="skills"
            element={<StudentSkills />}
          />

          <Route
            path="projects"
            element={<StudentProjects />}
          />

          <Route
            path="certifications"
            element={<StudentCertifications />}
          />

          <Route
            path="resume"
            element={<StudentResume />}
          />
        </Route>

        {/* =================================================
            SKILL MAPPING
        ================================================= */}

        {/* My Skills */}
        <Route
          path="skill-mapping"
          element={<StudentSkillMapping />}
        />

        {/* Assessment */}
        <Route
          path="skill-mapping/assessment"
          element={<StudentSkillMapping />}
        />

        {/* Skill Gap */}
        <Route
          path="skill-mapping/skill-gap"
          element={<StudentSkillMapping />}
        />

        {/* Career Goals */}
        <Route
          path="skill-mapping/career-goals"
          element={<StudentSkillMapping />}
        />

        {/* =================================================
            OTHER STUDENT FEATURES
        ================================================= */}

        <Route
          path="opportunities"
          element={<StudentOpportunities />}
        />

        {/* Opportunity Details
            Added only for View Details functionality.
        */}
        <Route
          path="opportunities/:opportunityId"
          element={<StudentOpportunities />}
        />

        <Route
          path="applications"
          element={<StudentApplications />}
        />
        <Route
  path="applications/:applicationId"
  element={<StudentApplications />}
/>
        <Route
          path="learning"
          element={<StudentLearning />}
        />


        <Route
  path="learning/:resourceId"
  element={<StudentLearning />}
/>

        <Route
          path="notifications"
          element={<StudentNotifications />}
        />

        <Route
          path="settings"
          element={<StudentSettings />}
        />
      </Route>

      {/* =====================================================
          INSTITUTION PORTAL
      ====================================================== */}

      <Route
        path="/institution"
        element={<InstitutionLayout />}
      >
        {/* /institution -> /institution/dashboard */}

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        {/* Dashboard */}

        <Route
          path="dashboard"
          element={<InstitutionDashboard />}
        />

        {/* Students */}

        <Route
          path="students"
          element={<InstitutionStudents />}
        />

        {/* Skill Intelligence */}

        <Route
          path="skill-intelligence"
          element={<InstitutionSkillIntelligence />}
        />

        {/* Internships */}

        <Route
          path="internships"
          element={<InstitutionInternships />}
        />

        {/* Placements */}

        <Route
          path="placements"
          element={<InstitutionPlacements />}
        />

        {/* Companies */}

        <Route
          path="companies"
          element={<InstitutionCompanies />}
        />

        {/* Industry Collaboration */}

        <Route
          path="industry-collaboration"
          element={<InstitutionIndustryCollaboration />}
        />

        {/* Reports */}

        <Route
          path="reports"
          element={<InstitutionReports />}
        />

        {/* Notifications */}

        <Route
          path="notifications"
          element={<InstitutionNotifications />}
        />

        {/* Settings */}

        <Route
          path="settings"
          element={<InstitutionSettings />}
        />
      </Route>

      {/* =====================================================
          COMPANY PORTAL
      ====================================================== */}

      <Route
        path="/company"
        element={<CompanyLayout />}
      >
        {/* /company -> /company/dashboard */}

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        {/* Dashboard */}

        <Route
          path="dashboard"
          element={<CompanyDashboard />}
        />

        {/* Company Profile */}

        <Route
          path="profile"
          element={<CompanyProfile />}
        />

        {/* Jobs & Internships */}

        <Route
          path="jobs"
          element={<CompanyJobs />}
        />

        {/* Candidates */}

        <Route
          path="candidates"
          element={<CompanyCandidates />}
        />

        {/* Applications */}

        <Route
          path="applications"
          element={<CompanyApplications />}
        />

        {/* Hiring Pipeline */}

        <Route
          path="hiring-pipeline"
          element={<CompanyHiringPipeline />}
        />

        {/* Colleges */}

        <Route
          path="colleges"
          element={<CompanyColleges />}
        />

        {/* Analytics & Reports */}

        <Route
          path="analytics"
          element={<CompanyAnalytics />}
        />

        {/* Notifications */}

        <Route
          path="notifications"
          element={<CompanyNotifications />}
        />

        {/* Settings */}

        <Route
          path="settings"
          element={<CompanySettings />}
        />
      </Route>

      {/* =====================================================
          TEMPORARY ROLE PLACEHOLDER
      ====================================================== */}

      <Route
        path="/auth/:role"
        element={<RolePlaceholder />}
      />

      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}