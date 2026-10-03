# Development Phases

This document defines the implementation order for the Academia–Industry collaboration platform.

The project will be built incrementally. Each phase should produce a usable part of the system before moving to the next major phase.

## Phase 0 - Project Foundation

### Goal
Set up the development environment and basic project structure.

### Tasks
- Initialize Git repository
- Create React + Vite frontend
- Create Node.js + Express backend
- Connect MongoDB
- Configure environment variables
- Configure routing and API client
- Create reusable UI/component structure
- Create database connection and error handling

## Phase 1 - Landing Page

### Goal
Build the complete public-facing landing page first.

### Sections
1. Navbar: Brand, Platform, For Students, For Colleges, For Companies, About, Login, Register
2. Hero: specific product message and real product UI preview
3. Problem: student skill gaps, college visibility, company talent discovery, fragmented collaboration
4. Platform Overview: Students, Colleges/Universities, Companies
5. Student Experience: Profile -> Skills -> Skill Gap -> Learning -> Opportunities -> Applications
6. College Experience: Student Data -> Skill Intelligence -> Industry Demand -> Training -> Placement/Internships
7. Company Experience: Opportunity -> Candidates -> Applications -> Evaluation -> Hiring
8. How It Works
9. Skill Mapping Demo
10. Opportunities: internships, jobs, placement drives, industry projects
11. AI Assistance overview
12. Final CTA
13. Footer

### Acceptance Criteria
- Fully responsive
- Navigation works
- Login/Register buttons work
- No fake metrics, reviews, counters, or statistics
- No purple-gradient-heavy styling
- No pill-shaped button design
- No generic AI-generated hero people
- No excessive animations
- Product UI is the main visual focus

## Phase 2 - Authentication and Role Selection

### Flow
```text
Landing
  -> Login / Register
  -> Select Role
       -> Student
       -> College / University
       -> Company
```

Admin is not publicly registerable.

### Student Registration
- University
- College / Institution
- Course
- Department
- Graduation Year
- Basic account information

Use searchable controlled selectors and store IDs/relationships rather than arbitrary institution names.

### College / University Registration
- Institution name
- Institution type
- Affiliated university
- Official email
- Website
- Address
- Authorized person
- Contact information
- Verification documents

Flow: Registration -> Email/Domain Verification -> Document Verification -> Admin Review -> Approved -> Dashboard.

### Company Registration
- Company name
- Industry
- Company type
- Official email
- Website
- Company size
- Location
- Authorized person
- Verification details

Flow: Registration -> Email Verification -> Company Verification -> Admin Review -> Approved -> Dashboard.

## Phase 3 - Student Portal

### Navigation
```text
Dashboard
Profile
  - Personal
  - Education
  - Skills
  - Projects
  - Certifications
  - Resume
Skill Mapping
  - My Skills
  - Skill Assessment
  - Skill Gap
  - Career Goals
Opportunities
  - All
  - Internships
  - Jobs
  - Saved
  - Opportunity Details
Applications
  - All
  - In Review
  - Interviews
  - Completed
Learning
  - Recommendations
  - Roadmap
  - Saved Resources
Notifications
Settings
```

### Core Flow
```text
Profile -> Resume / Optional GitHub -> Unified Skill Profile -> Career Goal -> Skill Mapping -> Skill Gap -> Learning -> Opportunity Matching -> Apply -> Application Tracking
```

## Phase 4 - College / University Portal

### Navigation
```text
Dashboard
Students
  - All Students
  - Departments
  - Student Profiles
Skill Intelligence
  - Skill Overview
  - Skill Gaps
  - Department Analysis
  - Industry Demand
Internships
  - Opportunities
  - Applications
  - Tracking
Placements
  - Drives
  - Applications
  - Shortlisted
  - Records
Companies
  - Connected Companies
  - Opportunities
  - Collaborations
Industry Collaboration
  - Partnerships
  - Workshops
  - Projects
  - Training Programs
Reports
Notifications
Settings
```

College student data is scoped to that institution. A college sees only students linked to it. University-level access can aggregate affiliated institutions according to permissions.

## Phase 5 - Company Portal

### Navigation
```text
Dashboard
Company Profile
Jobs & Internships
  - All Opportunities
  - Jobs
  - Internships
  - Drafts
  - Active
  - Closed
Candidates
  - Discover Candidates
  - Saved Candidates
  - Candidate Pools
Applications
  - All
  - Under Review
  - Shortlisted
  - Interviews
  - Selected
  - Rejected
Hiring Pipeline
Colleges
  - Connected Colleges
  - College Opportunities
  - Collaborations
Analytics & Reports
Notifications
Settings
```

### Core Hiring Flow
```text
Create Opportunity -> Publish -> Applications -> Eligibility Filtering -> Skill Matching -> Candidate Review -> Shortlist -> Interview -> Selected / Rejected
```

## Phase 6 - Opportunity and Application System

### Opportunity Creation
Support Jobs and Internships with:
- Title
- Description
- Department
- Openings
- Required skills
- Preferred skills
- Education
- Graduation year
- Experience
- Location
- Work mode
- Duration
- Compensation
- Deadline
- Selection process

### Application Flow
```text
Student -> Opportunity -> Apply -> Application -> Company Review -> Shortlist / Reject -> Interview -> Selected / Rejected
```

## Phase 7 - Hiring Pipeline and College Collaboration

### Hiring Pipeline
```text
Applied -> Under Review -> Shortlisted -> Interview -> Selected
```
Alternative states: Rejected, Withdrawn.

### College Collaboration
Support:
- Internship drives
- Placement drives
- Workshops
- Industry projects
- Training programs

Flow: Company -> Collaboration Request -> College Review -> Accept / Reject -> Collaboration.

## Phase 8 - Student AI

Add after the core student platform works.

Features:
1. Resume Analyzer
2. Skill Extraction
3. Skill Gap Analysis
4. Opportunity Matching
5. Career / Learning Roadmap
6. Profile Improvement Assistant

AI extraction must be reviewable and must not silently overwrite student data.

## Phase 9 - Company AI

Features:
1. Opportunity Description Assistant
2. Candidate Matching
3. Explainable Candidate Insights
4. Candidate Summary
5. Interview Assistant

Later:
6. Natural Language Candidate Search
7. College Talent Discovery
8. Industry Skill Insights

Candidate matching:
```text
Opportunity Requirements
 -> Deterministic Eligibility
 -> Skill Matching
 -> Skill Evidence
 -> Semantic Matching
 -> Explainable Candidate Insights
```

AI does not make the final hiring decision.

## Phase 10 - College / University AI

Features:
1. Skill Trend Analysis
2. Department Skill Gap Analysis
3. Training Recommendations
4. Industry Demand Insights
5. Student Group Recommendations

Flow:
```text
Student Skill Data + Opportunity Requirements + Industry Data
 -> Skill Intelligence
 -> AI Analysis
 -> Skill Gaps / Demand Trends / Training Needs
 -> College Action
```

Industry demand must be based on actual platform opportunity data within a defined period.

## Phase 11 - Notifications and Communication

Student notifications:
- Application updates
- Interview notifications
- Opportunity deadlines
- Learning recommendations
- Events/collaboration

College notifications:
- New opportunities
- Placement drives
- Collaboration requests
- Training/workshop updates

Company notifications:
- New applications
- Shortlist updates
- Interview reminders
- Collaboration responses
- Candidate matches
- Opportunity deadlines

## Phase 12 - Analytics and Reports

### Student
- Skills
- Skill gaps
- Application history
- Opportunity activity

### College
- Student skill distribution
- Department skill gaps
- Industry demand
- Internship/placement activity
- Training needs

### Company
- Applications
- Shortlisting
- Interviews
- Selection
- Opportunity performance
- Candidate/skill insights

All analytics must use real data. If data is insufficient, show an insufficient-data state.

## Phase 13 - Admin Portal

Admin responsibilities:
- Institution verification
- Company verification
- User management
- Organization management
- Moderation
- Platform configuration
- Duplicate record review
- Master data management
- Audit-sensitive actions

Admin is internal and has no public registration.

## Phase 14 - Security, Privacy and Reliability

- Authentication security
- Authorization and RBAC
- Organization-level access control
- Input validation
- File validation
- Rate limiting
- Secure cookies/tokens
- API error handling
- AI failure handling
- Sensitive data protection
- Audit logs for important actions
- Privacy controls
- GitHub disconnect/revocation handling

Core platform functionality must remain usable if AI is unavailable.

## Phase 15 - Testing

### Frontend
- Routes
- Forms
- Role selection
- Dashboard navigation
- Loading/empty/error states
- Responsive layouts

### Backend
- Authentication
- Authorization
- Organization scope
- Student-college relationships
- CRUD operations
- Applications
- Hiring pipeline
- Collaboration
- AI failure cases

Important security test: a College A user must not access College B student data by changing an ID in a request.

## Phase 16 - Deployment

```text
Frontend -> Hosting
Backend -> Node.js Hosting
Database -> MongoDB Atlas
File Storage -> Object/File Storage Provider
AI -> External AI API
```

Tasks:
- Production environment variables
- Production database
- File storage
- AI configuration
- CORS
- Secure cookies
- Error monitoring
- Logging
- Build/deployment pipeline

## Phase 17 - Final Product Polish

Improve:
- Responsive design
- Accessibility
- Typography
- Spacing
- Empty states
- Loading states
- Error feedback
- Table usability
- Dashboard hierarchy
- Navigation consistency
- Performance

Visual direction: modern, premium, clean, restrained, contemporary 2026 design language.

Avoid:
- Purple-gradient-heavy layouts
- Pill-shaped buttons
- Fake reviews
- Fake metrics
- Fake customer counters
- AI-slop layouts
- Generic AI-generated people
- Excessive scroll animations
- Cursor animations
- Visual effects that reduce usability

# Recommended Implementation Order

```text
Phase 0  Foundation
   ↓
Phase 1  Landing Page
   ↓
Phase 2  Login / Register / Role Selection
   ↓
Phase 3  Student Portal
   ↓
Phase 4  College / University Portal
   ↓
Phase 5  Company Portal
   ↓
Phase 6  Opportunity + Application System
   ↓
Phase 7  Hiring + Collaboration
   ↓
Phase 8  Student AI
   ↓
Phase 9  Company AI
   ↓
Phase 10 College AI
   ↓
Phase 11 Notifications
   ↓
Phase 12 Analytics
   ↓
Phase 13 Admin
   ↓
Phase 14 Security
   ↓
Phase 15 Testing
   ↓
Phase 16 Deployment
   ↓
Phase 17 Final Polish
```

## Core Development Rule

Do not build the entire application as one giant implementation. Each phase should produce a working part of the product.

```text
Foundation
   ↓
Public Experience
   ↓
Authentication
   ↓
Core Portals
   ↓
Core Business Workflows
   ↓
AI Assistance
   ↓
Analytics
   ↓
Security & Testing
   ↓
Deployment
```

AI must never be a dependency for basic platform functionality. Build the reliable platform first, then add intelligence where it creates real product value.
