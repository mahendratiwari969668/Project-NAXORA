# Student AI System Requirements

## 1. Purpose

The Student AI system will use AI only where it provides meaningful
value to the student experience.

AI will assist with:

-   Resume information extraction
-   Skill analysis
-   Skill-gap identification
-   Opportunity matching
-   Career and learning recommendations
-   Profile improvement suggestions

AI will not control core application logic such as authentication,
authorization, application status, or eligibility rules.

------------------------------------------------------------------------

# 2. AI Design Principles

## 2.1 AI is an assistant, not the source of truth

AI-generated results must be treated as recommendations or extracted
information.

The platform must not:

-   Guarantee placement
-   Guarantee selection
-   Make hiring decisions
-   Invent student information
-   Invent company requirements
-   Present unsupported AI conclusions as facts

Users should be able to review and correct AI-extracted information
where appropriate.

## 2.2 Deterministic logic comes first

Normal application logic should be handled by the backend.

Examples:

-   Authentication
-   Authorization
-   User roles
-   Profile CRUD
-   Eligibility filtering
-   Application status
-   Deadlines
-   Notifications
-   Database operations

AI should be used for tasks involving language understanding, semantic
interpretation, extraction, or personalized recommendations.

## 2.3 AI must be accessed through the backend

The frontend must never expose AI provider API keys.

Correct flow:

``` text
React Frontend
      ↓
Node.js / Express API
      ↓
AI Service Layer
      ↓
AI Provider
      ↓
Response Validation
      ↓
Backend
      ↓
React Frontend
```

------------------------------------------------------------------------

# 3. AI Feature 1: Resume Analyzer

## Objective

Allow students to upload a resume and automatically extract useful
structured information.

## Input

-   PDF resume
-   Supported document formats decided during implementation

## Processing

``` text
Resume Upload
     ↓
Backend File Validation
     ↓
Text Extraction
     ↓
AI Analysis
     ↓
Structured JSON
     ↓
Validation
     ↓
Student Review
     ↓
Profile Update
```

## Information to extract

-   Name
-   Education
-   Degree
-   Institution
-   Graduation year
-   Skills
-   Projects
-   Experience
-   Certifications
-   Relevant links

## Example

Input:

``` text
Rahul Sharma
BCA, 2027

Skills:
JavaScript, React, Node.js, MongoDB

Project:
E-commerce Website
```

Possible structured result:

``` json
{
  "skills": [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],
  "education": [
    {
      "degree": "BCA",
      "graduationYear": 2027
    }
  ],
  "projects": [
    {
      "name": "E-commerce Website"
    }
  ]
}
```

## Important rules

-   AI output must be validated before storing it.
-   Existing student information should not be silently overwritten.
-   Extracted information should be reviewable by the student.
-   If information is missing, return `null` or an empty field instead
    of inventing data.

------------------------------------------------------------------------

# 4. AI Feature 2: Skill Gap Analysis

## Objective

Identify the difference between a student's current skills and the
skills required for a selected career role or opportunity.

## Input

-   Student skill profile
-   Target role or opportunity
-   Required skills
-   Preferred skills, when available

## Processing

``` text
Student Skills
      +
Role / Opportunity Requirements
      ↓
Skill Comparison
      ↓
AI Interpretation
      ↓
Matching Skills
Missing Skills
Related Skills
Learning Suggestions
```

## Example

Student skills:

``` text
JavaScript
React
Node.js
MongoDB
Git
```

Target role requirements:

``` text
JavaScript
React
Node.js
MongoDB
Git
TypeScript
Docker
Testing
```

Output:

``` text
Matching Skills
- JavaScript
- React
- Node.js
- MongoDB
- Git

Skills to Improve
- TypeScript
- Docker
- Testing
```

## Important rules

The platform should not rely on an LLM alone to determine whether a
skill exists.

The system should maintain a normalized skill representation.

AI may help with:

-   Skill aliases
-   Related technologies
-   Semantic interpretation
-   Explanation
-   Learning recommendations

Example:

``` text
"JS" → JavaScript
"ReactJS" → React
"Node" → Node.js
```

A deterministic skill normalization layer should be used wherever
possible.

------------------------------------------------------------------------

# 5. AI Feature 3: Opportunity Matching

## Objective

Help students discover internships and jobs that are relevant to their
profile.

## Matching architecture

The system should use two stages.

### Stage 1: Deterministic filtering

Backend checks:

-   Education eligibility
-   Graduation year
-   Location, if applicable
-   Work mode
-   Deadline
-   Other mandatory criteria

``` text
All Opportunities
      ↓
Eligibility Filtering
      ↓
Eligible Opportunities
```

### Stage 2: Skill / semantic matching

Relevant opportunities are compared against:

-   Student skills
-   Projects
-   Experience
-   Target role
-   Opportunity requirements

``` text
Eligible Opportunities
      ↓
Skill / Semantic Matching
      ↓
Relevant Opportunities
```

## Example

Student:

``` text
React
JavaScript
Node.js
MongoDB
```

Opportunity:

``` text
Frontend Developer Intern

Required:
React
JavaScript
Git
TypeScript
```

System can show:

``` text
Strong Skill Match

Matches:
✓ React
✓ JavaScript

Potential gaps:
○ Git
○ TypeScript
```

## Match score

If a numeric match score is displayed, its calculation must be defined
and explainable.

Do not ask an LLM to randomly generate:

``` text
"86% Match"
```

Instead, calculate the score using defined factors such as:

-   Required skill coverage
-   Preferred skill coverage
-   Education eligibility
-   Relevant experience
-   Other explicitly defined criteria

The UI should also explain why an opportunity matches.

------------------------------------------------------------------------

# 6. AI Feature 4: Career and Learning Roadmap

## Objective

Provide personalized learning suggestions based on:

-   Current skills
-   Target role
-   Identified skill gaps
-   Student-selected goals

## Example

Target:

``` text
Full Stack Developer
```

Current skills:

``` text
JavaScript
React
Node.js
MongoDB
```

Suggested roadmap:

``` text
01. TypeScript
02. Advanced React
03. REST API Design
04. Automated Testing
05. Docker
06. Build a Full Stack Project
```

## AI role

AI should:

-   Explain why a skill is useful
-   Suggest learning sequence
-   Suggest project ideas
-   Adapt explanations to the student's current level

The platform should avoid presenting AI recommendations as guaranteed
career paths.

------------------------------------------------------------------------

# 7. AI Feature 5: Profile Improvement Assistant

## Objective

Help students improve the completeness and quality of their professional
profile.

The system can identify:

-   Missing profile information
-   Weak project descriptions
-   Missing links
-   Skills mentioned in a resume but missing from the profile
-   Inconsistencies that require user review

Example:

``` text
Profile

✓ Education
✓ Skills
✓ Projects
✗ Resume
✗ GitHub
```

Possible recommendation:

> Add your GitHub profile and provide short descriptions for your
> projects so recruiters can better understand your work.

The AI should suggest improvements, not fabricate achievements or
experience.

------------------------------------------------------------------------

# 8. AI Provider

The initial implementation should use one primary AI provider rather
than unnecessarily integrating multiple providers.

Suitable options include:

-   Google Gemini API
-   OpenAI API

The provider should be accessed through an internal AI service
abstraction.

Example:

``` text
server/
└── services/
    └── ai/
        ├── provider.js
        ├── resumeAnalyzer.js
        ├── skillAnalyzer.js
        ├── opportunityMatcher.js
        └── careerAdvisor.js
```

This makes it possible to change providers later without rewriting the
entire application.

------------------------------------------------------------------------

# 9. Embeddings and Semantic Matching

Embeddings may be used for semantic similarity between:

-   Student skills
-   Job descriptions
-   Required skills
-   Project descriptions
-   Career roles

Possible flow:

``` text
Student Profile
      ↓
Embedding
      ↓
Vector Representation
      ↓
Compare with Opportunity
      ↓
Semantic Similarity
```

A vector database may be introduced if the number of students and
opportunities becomes large enough to justify it.

The initial MVP should avoid unnecessary infrastructure if normal
database filtering and a small-scale matching system are sufficient.

------------------------------------------------------------------------

# 10. AI API Boundaries

## API keys

-   Store AI provider keys only on the server.
-   Never expose keys in React environment variables intended for
    browser use.
-   Never commit keys to Git.

## Input limits

The backend should enforce:

-   Maximum resume file size
-   Maximum supported document pages where practical
-   Maximum text length sent to AI
-   Maximum prompt/input size
-   Request rate limits

## Output limits

AI responses should:

-   Use structured output where possible.
-   Be validated against a schema.
-   Reject malformed responses.
-   Have reasonable token/output limits.
-   Never be directly trusted as database records without validation.

## Failure handling

If AI is unavailable:

``` text
AI Request
   ↓
Failure
   ↓
Graceful fallback
```

The core platform must continue working.

For example:

-   Student can still edit skills manually.
-   Student can still browse opportunities.
-   Application workflows remain available.
-   AI-specific features show an appropriate unavailable state.

------------------------------------------------------------------------

# 11. AI Error Handling

Possible errors:

### Invalid AI response

Action:

-   Validate response
-   Reject invalid data
-   Log the failure
-   Ask the service to retry only when appropriate

### AI provider timeout

Action:

-   Stop waiting after configured timeout
-   Return a user-friendly error
-   Do not block the rest of the application

### Rate limit

Action:

-   Respect provider limits
-   Apply retry/backoff where appropriate
-   Avoid unlimited retries

### AI provider unavailable

Action:

-   Fall back to non-AI functionality where possible
-   Inform the user that the AI feature is temporarily unavailable

------------------------------------------------------------------------

# 12. Privacy and Student Data

Student resumes and profiles may contain personal information.

The system should:

-   Minimize unnecessary AI data transmission.
-   Send only information required for the requested AI operation.
-   Avoid logging raw resumes or sensitive personal data unnecessarily.
-   Define retention rules for uploaded files and AI processing data.
-   Restrict profile data according to user permissions.

AI output should never expose another student's private information.

------------------------------------------------------------------------

# 13. AI Assistant Boundaries

The student AI assistant should not:

-   Guarantee a job.
-   Guarantee selection.
-   Pretend to be a recruiter.
-   Invent qualifications.
-   Invent work experience.
-   Falsify resume information.
-   Make unsupported claims about a company.
-   Make decisions on behalf of a recruiter.
-   Override platform eligibility rules.

It may:

-   Explain skills.
-   Explain skill gaps.
-   Suggest learning paths.
-   Help understand opportunities.
-   Suggest profile improvements.
-   Explain why a recommendation was made.

------------------------------------------------------------------------

# 14. Recommended MVP AI Scope

## Phase 1

Implement only:

1.  Resume Analyzer
2.  Skill Extraction
3.  Skill Gap Analysis

## Phase 2

Add:

4.  Opportunity Matching
5.  Explainable Match Reasons

## Phase 3

Add:

6.  Learning Roadmap
7.  Career Recommendations
8.  Profile Improvement Assistant

This keeps AI development aligned with the actual product instead of
making the application unnecessarily dependent on AI.

------------------------------------------------------------------------

# 15. Complete Student AI Flow

``` text
                    STUDENT
                       │
                       ▼
                 Upload Resume
                       │
                       ▼
                Resume Analyzer
                       │
                       ▼
                Extracted Skills
                       │
                       ▼
                Student Profile
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       Select Career        Browse Opportunities
             │                   │
             ▼                   ▼
       Skill Gap Analysis   Eligibility Filter
             │                   │
             ▼                   ▼
       Missing Skills       Skill Matching
             │                   │
             └─────────┬─────────┘
                       ▼
                Recommendations
                       │
                       ▼
                Student Applies
                       │
                       ▼
              Application Tracking
```

------------------------------------------------------------------------

# 16. AI Technology Direction

Initial stack can be:

``` text
Frontend
React + Vite

Backend
Node.js + Express

Database
MongoDB

AI
Gemini API OR OpenAI API

Semantic Matching
Embeddings

File Processing
Resume/PDF text extraction

Validation
Schema validation before database writes
```

The exact AI provider and embedding infrastructure will be finalized in
`architecture.md`.

------------------------------------------------------------------------

# 17. Core Principle

The product should remain useful even if the AI service is temporarily
unavailable.

``` text
Core Product
     │
     ├── Authentication
     ├── Profiles
     ├── Skills
     ├── Opportunities
     ├── Applications
     └── Notifications

AI Layer
     │
     ├── Resume Analysis
     ├── Skill Intelligence
     ├── Matching
     └── Recommendations
```

**The AI layer enhances the product; it does not become the product
itself.**
