Platform Rules

1. Core Engineering Rules

Build deterministic platform functionality before adding AI features.

The platform must remain usable when AI services are unavailable.

Business-critical decisions must not depend solely on an LLM response.

Keep frontend, backend, database, AI, and storage responsibilities separated.

Prefer reusable services and components over duplicated logic.

Validate important input on both client and server, with the server as the trusted boundary.

Never trust role, organization, ownership, eligibility, or permissions supplied by the frontend.

2. Authentication and Authorization

Use server-side authentication and authorization for every protected API.

Apply RBAC for Student, Institution, Company, and Admin roles.

Apply organization-level authorization after role authorization.

A college user may access only resources belonging to that institution unless explicitly authorized for a wider university scope.

Admin registration is not public.

Sensitive actions should require an authenticated user and explicit permission.

3. Master Data Rules

Prefer IDs and controlled records over arbitrary repeated text for University, Institution, Course, Department, and related entities.

Student registration follows University -> Institution -> Course -> Department.

New institutions must pass the defined verification and approval flow before becoming trusted master records.

Do not duplicate institution names as the primary relationship field when a master-record ID exists.

4. API Rules

Use REST APIs with predictable resource naming.

Controllers should remain thin; business logic belongs in services.

Validate request bodies, query parameters, route parameters, and uploaded files.

Return consistent success and error response structures.

Do not expose stack traces, secrets, database errors, provider credentials, or internal implementation details to clients.

Add pagination to potentially large list endpoints.

Add filtering and sorting only through validated parameters.

Use rate limiting for authentication, uploads, AI endpoints, and other abuse-sensitive routes.

5. File Storage Rules

5.1 Storage Abstraction

The application must use a provider-independent storage service.

Frontend
  -> Backend File API
  -> Storage Service
  -> Provider Adapter
  -> Storage Provider

Controllers must not contain direct Cloudinary or ImageKit SDK calls.

5.2 Provider Roles

Provider policy:

ImageKit   -> Images and optimized image delivery
Cloudinary -> Image/media transformation and media storage use cases

The policy must remain configurable.

5.3 Capacity Threshold

Do not wait for 100% provider utilization.

Default threshold:

Below 80% usage -> eligible
80% or higher   -> skip for new uploads
Provider error  -> skip and try next provider

The threshold must be configurable through server configuration.

The system must consider both storage capacity and provider-specific operational limits. A provider can be skipped even when storage is available if its relevant request, bandwidth, transformation, or account limit is exhausted.

5.4 Fallback

If upload to the selected provider fails:

Record the failure internally.

Try the next eligible provider.

Save exactly one logical file record after successful completion.

If all providers fail, return a controlled upload error.

Do not silently create multiple database records for one logical upload.

5.5 File Metadata

Every file record must include enough information to retrieve and manage the object independently of the provider.

Required concepts:

ownerId
ownerType
fileType
originalName
mimeType
sizeBytes
provider
objectKey / providerAssetId
fileUrl or access reference
status
createdAt

A checksum should be stored for important files when practical.

5.6 Private Files

The following should be treated as private by default:

Student resumes

Certificates

Institution verification documents

Company verification documents

Internal hiring documents

Other personal or restricted uploads

Use signed URLs, authenticated download endpoints, or equivalent access control.

Public assets such as approved company logos can use public delivery only when their visibility is intentionally configured as public.

5.7 Upload Validation

Enforce maximum file size.

Validate MIME type.

Validate file signature/magic bytes where practical.

Sanitize filenames.

Generate object keys on the server.

Reject unsupported extensions and MIME types.

Never execute uploaded files.

Scan uploaded files for malware when the production threat model requires it.

Do not store raw file contents in application logs.

5.8 File Deletion

Deleting a file from the platform must also remove or invalidate the corresponding provider object according to retention rules.

If provider deletion temporarily fails, mark the file for retry rather than pretending deletion succeeded.

5.9 Provider Credentials

Provider credentials exist only on the server.

Never expose ImageKit or Cloudinary secret keys in React/Vite environment variables intended for the browser.

Use server-side environment variables or a proper secret manager.

Rotate credentials when necessary.

6. AI Rules

AI is assistive, not authoritative.

Validate structured AI output before saving it.

Never let an LLM directly modify critical records without validation and user/system approval.

Candidate matching must provide evidence and explanation.

AI must not automatically reject, shortlist, or hire candidates.

Keep AI provider keys on the backend.

Add rate limits and usage controls.

Handle AI timeout, invalid output, quota exhaustion, and provider failure gracefully.

7. Data and Privacy

Collect only information required for the platform feature.

Resume, GitHub, application, and verification data should be treated as personal or sensitive platform data where applicable.

Do not log resume contents or private repository contents.

Clearly distinguish public profile information from private information.

Store only the minimum GitHub permissions needed for the requested feature.

Provide disconnect/delete flows for integrations and uploaded files where required.

8. UI and Product Rules

No fake metrics, fake reviews, fake user counts, or fabricated platform statistics.

Demo data must be clearly identified as demo data.

No purple-gradient-heavy visual system.

No pill-shaped navigation or buttons.

No emoji icons in the product UI.

No unnecessary cursor effects or excessive scroll animations.

Use consistent line icons such as Lucide.

Keep AI UI integrated into workflows instead of turning every page into a chatbot.

Prioritize usability and information hierarchy over decorative effects.

9. Error Handling

Every major workflow needs:

Loading
Empty
Success
Validation Error
Permission Error
Not Found
Server Error
External Service Failure

External services such as AI providers and storage providers must fail gracefully without breaking unrelated platform functionality.

10. Development Priority

Foundation
 -> Landing
 -> Authentication
 -> Student
 -> Institution
 -> Company
 -> Opportunities
 -> Applications
 -> Hiring / Collaboration
 -> AI
 -> Notifications
 -> Analytics
 -> Admin
 -> Security / Privacy
 -> Testing
 -> Deployment
 -> Polish

The core platform must be functional before AI becomes a dependency.