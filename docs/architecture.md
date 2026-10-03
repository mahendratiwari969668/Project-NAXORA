# Architecture

## 1. App Flow and Architecture

### Platform Overview

The platform connects Students, Colleges/Universities, Companies, and
Admin through one shared Academia-Industry collaboration system.

``` text
Student <----> Platform <----> College / University
                    |
                    +----------> Company
```

Core relationship:

``` text
University
    |
    +-- Institution / College
            |
            +-- Department
            +-- Course
                    |
                    +-- Students
```

Institutional identity fields use controlled master records and IDs
wherever possible.

### Public App Flow

``` text
Landing Page
   |
   +-- Login
   |    +-- Student
   |    +-- College / University
   |    +-- Company
   |
   +-- Register
        +-- Student
        +-- College / University
        +-- Company
```

Admin is not publicly registerable.

### Student Flow

``` text
Register
 -> Select University / College
 -> Basic Profile
 -> Education
 -> Resume / Optional GitHub
 -> Resume Analysis
 -> Review Extracted Data
 -> Unified Skill Profile
 -> Career Goal
 -> Skill Mapping
 -> Skill Gap
 -> Learning Recommendations
 -> Opportunity Matching
 -> Apply
 -> Application Tracking
```

### College / University Flow

``` text
Register Institution
 -> Verification
 -> Admin Approval
 -> Dashboard
 -> Students
 -> Departments
 -> Skill Intelligence
 -> Internships
 -> Placements
 -> Companies
 -> Industry Collaboration
 -> Reports
```

College-level student data is scoped to that institution.
University-level access can aggregate data from its affiliated
institutions according to permissions.

### Company Flow

``` text
Register Company
 -> Verification
 -> Admin Approval
 -> Dashboard
 -> Jobs & Internships
 -> Candidates
 -> Applications
 -> Hiring Pipeline
 -> Colleges
 -> Analytics
```

Hiring flow:

``` text
Create Opportunity
 -> Publish
 -> Applications
 -> Eligibility Filtering
 -> Skill Matching
 -> Candidate Review
 -> Shortlist
 -> Interview
 -> Selected / Rejected
```

### Company-College Collaboration

``` text
Company
 -> Collaboration Request
 -> College Review
 -> Accept / Reject
 -> Collaboration
```

Supported collaboration types include internship drives, placement
drives, workshops, industry projects, and training programs.

------------------------------------------------------------------------

## 2. System Architecture

The initial application uses a modular full-stack architecture.

``` text
React + Vite
     |
     | REST API / HTTPS
     v
Node.js + Express
     |
     +--------------------+
     |                    |
     v                    v
MongoDB              AI Service Layer
                          |
                    Gemini / OpenAI
```

### Frontend

Responsible for:

-   UI
-   Routing
-   Forms
-   Client-side validation
-   Dashboards
-   API communication
-   Loading/error states
-   Role-based navigation
-   Displaying AI results

The frontend must never contain AI keys, database credentials, or
trusted server-only secrets.

### Backend

Responsible for:

-   Authentication
-   Authorization
-   RBAC
-   Organization scope
-   Validation
-   Business logic
-   Database operations
-   File handling
-   AI service calls
-   Matching
-   Applications
-   Notifications
-   Analytics

### Database

MongoDB stores:

-   Users
-   Universities
-   Institutions
-   Departments
-   Courses
-   Student profiles
-   Skills and skill evidence
-   Companies
-   Opportunities
-   Applications
-   Hiring pipeline states
-   Collaborations
-   Training programs
-   Notifications

### Organization Scope

Every organization-owned resource must be checked server-side.

For example:

``` text
Logged-in College A
       |
       +-- only College A students
       +-- only College A data
```

College A must not access College B's private student records.

### Controlled Institutional Selection

Student registration should use:

``` text
University -> College -> Course -> Department
```

as searchable controlled selectors.

If an institution does not exist:

``` text
New Institution Registration
 -> Verification
 -> Document Review
 -> Admin Approval
 -> Master Institution Record
```

This prevents duplicate and arbitrary institution names.

------------------------------------------------------------------------

## 3. Folder and File Structure

``` text
project-root/
|
|-- client/
|   |-- public/
|   `-- src/
|       |-- assets/
|       |-- components/
|       |   |-- common/
|       |   |-- forms/
|       |   |-- layout/
|       |   |-- charts/
|       |   `-- ui/
|       |
|       |-- pages/
|       |   |-- public/
|       |   |-- auth/
|       |   |-- student/
|       |   |   |-- Dashboard/
|       |   |   |-- Profile/
|       |   |   |-- SkillMapping/
|       |   |   |-- Opportunities/
|       |   |   |-- Applications/
|       |   |   |-- Learning/
|       |   |   |-- Notifications/
|       |   |   `-- Settings/
|       |   |
|       |   |-- institution/
|       |   |   |-- Dashboard/
|       |   |   |-- Students/
|       |   |   |-- Departments/
|       |   |   |-- SkillIntelligence/
|       |   |   |-- Internships/
|       |   |   |-- Placements/
|       |   |   |-- Companies/
|       |   |   |-- Collaboration/
|       |   |   |-- Reports/
|       |   |   |-- Notifications/
|       |   |   `-- Settings/
|       |   |
|       |   |-- company/
|       |   |   |-- Dashboard/
|       |   |   |-- Profile/
|       |   |   |-- Opportunities/
|       |   |   |-- Candidates/
|       |   |   |-- Applications/
|       |   |   |-- HiringPipeline/
|       |   |   |-- Colleges/
|       |   |   |-- Analytics/
|       |   |   |-- Notifications/
|       |   |   `-- Settings/
|       |   `-- admin/
|       |
|       |-- routes/
|       |   |-- AppRoutes.jsx
|       |   |-- ProtectedRoute.jsx
|       |   `-- RoleRoute.jsx
|       |
|       |-- services/
|       |   |-- api.js
|       |   |-- authApi.js
|       |   |-- studentApi.js
|       |   |-- institutionApi.js
|       |   |-- companyApi.js
|       |   `-- opportunityApi.js
|       |
|       |-- hooks/
|       |-- context/
|       |-- utils/
|       |-- constants/
|       |-- validations/
|       |-- App.jsx
|       `-- main.jsx
|
|-- server/
|   |-- config/
|   |   |-- db.js
|   |   |-- env.js
|   |   `-- storage.js
|   |
|   |-- models/
|   |   |-- User.js
|   |   |-- University.js
|   |   |-- Institution.js
|   |   |-- Department.js
|   |   |-- Course.js
|   |   |-- StudentProfile.js
|   |   |-- Skill.js
|   |   |-- SkillEvidence.js
|   |   |-- Company.js
|   |   |-- Opportunity.js
|   |   |-- Application.js
|   |   |-- Collaboration.js
|   |   |-- TrainingProgram.js
|   |   `-- Notification.js
|   |
|   |-- controllers/
|   |-- routes/
|   |-- middleware/
|   |   |-- auth.js
|   |   |-- role.js
|   |   |-- organizationScope.js
|   |   |-- validation.js
|   |   |-- upload.js
|   |   `-- errorHandler.js
|   |
|   |-- services/
|   |   |-- auth/
|   |   |-- student/
|   |   |-- institution/
|   |   |-- company/
|   |   |-- opportunity/
|   |   |-- matching/
|   |   |-- notifications/
|   |   `-- ai/
|   |       |-- provider.js
|   |       |-- resumeAnalyzer.js
|   |       |-- skillAnalyzer.js
|   |       |-- opportunityMatcher.js
|   |       |-- careerAdvisor.js
|   |       |-- opportunityAssistant.js
|   |       |-- candidateMatcher.js
|   |       |-- candidateSummary.js
|   |       `-- interviewAssistant.js
|   |
|   |-- validators/
|   |-- utils/
|   |-- jobs/
|   |-- app.js
|   `-- server.js
|
|-- docs/
|   |-- PRD.md
|   |-- architecture.md
|   |-- rules.md
|   |-- phases.md
|   |-- design.md
|   `-- student-ai-requirements.md
|
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

------------------------------------------------------------------------

## 4. Technology Stack

### Frontend

-   React.js
-   Vite
-   React Router
-   Tailwind CSS
-   JavaScript
-   Axios or centralized fetch wrapper
-   Recharts or another suitable charting library

### Backend

-   Node.js
-   Express.js
-   JavaScript
-   REST APIs
-   JWT-based authentication where appropriate
-   Secure cookie/session handling where appropriate
-   Mongoose

### Database

-   MongoDB
-   MongoDB Atlas
-   Mongoose ODM

### AI

Possible providers:

-   Google Gemini API
-   OpenAI API

The final provider can be selected during implementation.

AI keys are backend-only.

``` text
Frontend
   X
   |
Backend
   |
AI Provider
```

### Resume / File Storage

Uploaded resumes and assets should use dedicated object/file storage
rather than large binary files directly in MongoDB.

Possible options:

-   ImageKit
-   Cloudinary
-   S3-compatible storage

The final provider will be selected during implementation based on
requirements and cost.

### GitHub

-   Official GitHub OAuth
-   Minimum required permissions
-   Optional connection
-   Public repository data can be used for MVP
-   Private repositories require explicit permission
-   GitHub is supporting evidence, not proof of proficiency
-   Disconnect option must be available

### Authentication and RBAC

Roles:

``` text
Student
Institution User
Company User
Admin
```

Institution roles:

``` text
Institution Admin
Placement Officer
Department Coordinator
Authorized Staff
```

Company roles:

``` text
Company Admin
HR
Recruiter
Hiring Manager
```

### API Structure

``` text
/api/auth
/api/students
/api/institutions
/api/universities
/api/companies
/api/opportunities
/api/applications
/api/candidates
/api/collaborations
/api/notifications
/api/analytics
/api/ai
```

Example AI endpoints:

``` text
POST /api/ai/resume/analyze
POST /api/ai/opportunity/analyze
POST /api/ai/candidate/match
POST /api/ai/candidate/summary
POST /api/ai/interview/questions
```

### Matching Architecture

Candidate matching uses a layered approach:

``` text
Opportunity Requirements
        |
Deterministic Eligibility
        |
Required Skill Matching
        |
Skill Evidence
        |
Semantic Matching / Embeddings
        |
Explainable Candidate Insights
```

The system should not depend on an unexplained LLM-generated score.

### Analytics

Analytics must be generated from actual database data.

``` text
MongoDB
   |
Aggregation / Query Layer
   |
Analytics Service
   |
Dashboard
```

If there is insufficient data, show an insufficient-data state instead
of fabricated statistics.

------------------------------------------------------------------------

## 5. Core Architectural Principles

1.  Backend is the source of truth.
2.  Organization scope is enforced server-side.
3.  Institutional relationships use controlled master records and IDs.
4.  AI is assistive, not the source of truth.
5.  Core platform functionality must work if AI is unavailable.
6.  AI API keys remain server-side.
7.  GitHub integration is optional.
8.  Student data is visible only according to permissions.
9.  Hiring decisions remain human decisions.
10. Analytics use real data only.
11. Avoid unnecessary AI calls.
12. Keep frontend, backend, database, and AI responsibilities separated.
13. Build the system in phases.
14. Product functionality comes before visual effects.

## 3. File Storage Architecture

The platform uses a provider-agnostic storage abstraction so the application is not tightly coupled to one storage vendor.

Primary provider roles:

``` text
Cloudflare R2  -> Primary general-purpose object storage
ImageKit       -> Image storage / delivery / optimization
Cloudinary     -> Image/media transformation and delivery use cases
AWS S3         -> Fallback / overflow / backup provider
```

### Storage Service Layer

The frontend must never call storage providers directly for authenticated platform files. Uploads go through the backend storage service.

``` text
Frontend
   |
   | POST /api/files/upload
   v
Storage Service
   |
   +-- Provider selection
   +-- Capacity / quota check
   +-- File validation
   +-- Upload
   +-- Metadata persistence
   v
MongoDB
```

Recommended server structure:

``` text
server/services/storage/
├── storageService.js
├── providerSelector.js
├── r2Provider.js
├── imagekitProvider.js
├── cloudinaryProvider.js
└── s3Provider.js
```

### Provider Selection

Provider selection must be deterministic and configurable. The application should maintain a provider priority and a safety threshold rather than hard-coding vendor-specific logic throughout controllers.

Default priority:

``` text
1. Cloudflare R2
2. ImageKit
3. Cloudinary
4. AWS S3
```

For general documents, R2 is the preferred primary provider. ImageKit and Cloudinary are preferred when their image/media capabilities provide a clear benefit. S3 is the final fallback or backup provider.

A provider should not be selected merely because it has storage space. The selector should also consider the file type, provider capability, configured quota, current usage, operational health, and applicable free-tier or billing limits.

### Capacity Threshold

Use a configurable safety threshold instead of waiting until a provider is completely full.

Default:

``` text
Provider usage < 80%  -> eligible
Provider usage >= 80% -> avoid for new uploads
Provider unavailable   -> skip immediately
```

The threshold can later be changed to 85% or 90% without changing application code.

The system should reserve headroom for burst uploads and should never assume that a provider's advertised free tier is an unlimited permanent storage quota.

### File Metadata

Every uploaded file must have a provider-independent record in MongoDB.

Example:

``` js
{
  ownerId: ObjectId,
  ownerType: "student",
  fileType: "resume",
  originalName: "resume.pdf",
  mimeType: "application/pdf",
  sizeBytes: 284000,
  provider: "r2",
  objectKey: "students/123/resume/resume.pdf",
  fileUrl: "...",
  checksum: "...",
  status: "active",
  uploadedAt: Date
}
```

The application must be able to locate a file using this metadata without guessing which provider contains it.

### Failure and Fallback Flow

``` text
Upload request
      |
      v
Validate file
      |
      v
Select eligible provider
      |
      +---- upload succeeds ----> Save metadata
      |
      +---- provider fails ------> Try next eligible provider
                                      |
                                      +--> success -> Save metadata
                                      |
                                      +--> all fail -> return controlled error
```

If a provider fails after accepting an upload but before the application confirms success, the system must avoid creating duplicate logical file records. Idempotency keys or upload identifiers should be used for important uploads.

### File Categories

Suggested routing:

``` text
Resume / certificates / verification documents
    -> R2 first

Profile photos / logos / project images
    -> ImageKit first

Image transformations / generated variants
    -> Cloudinary where required

Overflow / backup / provider fallback
    -> S3
```

This is a logical routing policy, not a requirement that every category be permanently tied to one vendor.

### Storage and Security

- Private documents must not be exposed through permanent public URLs.
- Use signed or authenticated access for resumes, certificates, verification documents, and other private files.
- Validate MIME type and file signature where practical; do not trust the filename extension alone.
- Enforce file-size limits before upload and again at the provider boundary.
- Generate safe object keys server-side.
- Do not place user-controlled filenames directly into object paths without sanitization.
- Do not store provider API keys in frontend code.
- Keep provider credentials in server environment variables or secret management.
- Log provider, object ID/key, size, and status, but do not log private file contents.

### Free-Tier Awareness

Provider limits are external constraints and can change. The platform must therefore treat provider limits as configuration and monitored usage, not as business logic assumptions.

For the current design reference, Cloudflare R2 provides a monthly free tier of 10 GB-month Standard storage, 1 million Class A operations, 10 million Class B operations, and free internet egress. Cloudinary's Free plan currently provides 25 monthly credits shared across transformations, storage, and bandwidth. These values must be rechecked before production deployment because provider pricing and limits can change.
