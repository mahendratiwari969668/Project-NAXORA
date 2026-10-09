NAXORA

Academia–Industry Collaboration Platform for Skill Mapping, Internships and Placement

NAXORA connects students, colleges, and companies through skill mapping, career development, internship opportunities, and placement management.

Tech Stack

Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Zod
- Lucide React

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

Cloud Storage and Media

- Cloudinary
- ImageKit

Authentication and Integrations

- GitHub OAuth
- AI API integration through the backend
- Email OTP verification, if configured

---

APIs and External Services

1. MongoDB Atlas

Purpose: Stores user accounts, student profiles, college information, company details, skills, internships, and placement data.

How to access:

1. Visit https://www.mongodb.com/cloud/atlas
2. Create an account or sign in.
3. Create a project and deploy a database cluster.
4. Create a database user.
5. Configure network access for your development environment.
6. Open the cluster's Connect option and select Drivers.
7. Copy the MongoDB connection string.

Environment variable:
"MONGODB_URI"

Keep your database credentials private.

2. Cloudinary API

Purpose: Stores and manages media files such as profile images, company logos, and other supported uploads.

How to access:

1. Visit https://cloudinary.com/
2. Create an account or sign in.
3. Open the Cloudinary Console.
4. Find your cloud name, API key, and API secret.

Environment variables:

- "CLOUDINARY_CLOUD_NAME"
- "CLOUDINARY_API_KEY"
- "CLOUDINARY_API_SECRET"

Perform authenticated uploads through the backend. Never expose your API secret in frontend code.

3. ImageKit API

Purpose: Image hosting, image delivery, optimization, and transformations.

How to access:

1. Visit https://imagekit.io/
2. Create an account or sign in.
3. Open the developer or API settings in your dashboard.
4. Obtain the credentials required for your integration.

Common environment variables:

- "IMAGEKIT_PUBLIC_KEY"
- "IMAGEKIT_PRIVATE_KEY"
- "IMAGEKIT_URL_ENDPOINT"

The private key must remain on the server.

4. AI API

Purpose: Provides AI-assisted functionality for features such as resume analysis, skill extraction, career recommendations, and skill-gap analysis, depending on the implemented features.

How to access:

1. Select an AI provider, such as Google AI Studio.
2. Visit https://aistudio.google.com/
3. Sign in and create an API key.
4. Configure the key in the backend environment.

Environment variable example:
"AI_API_KEY"

The exact variable name depends on the AI provider and the existing backend implementation.

Security: AI requests should be sent through the backend rather than directly from the frontend. Never commit API keys to GitHub.

5. GitHub OAuth

Purpose: Allows students to connect their GitHub accounts so the platform can retrieve permitted information about their repositories and development activity for skill profiling.

How to access:

1. Visit https://github.com/settings/developers
2. Open OAuth Apps.
3. Register a new OAuth application.
4. Configure the application homepage and callback URL.
5. Generate a client secret if required by your OAuth flow.
6. Configure the credentials in your backend.

Environment variables:

- "GITHUB_CLIENT_ID"
- "GITHUB_CLIENT_SECRET"
- "GITHUB_CALLBACK_URL"

Use the callback URL configured in your application. Request only the permissions your features actually need.

6. Email OTP Service

Purpose: Sends verification codes to users during registration or login, if email verification is implemented.

How to access:

Choose an email provider, such as Brevo or Resend, and create an account.

- Brevo: https://www.brevo.com/
- Resend: https://resend.com/

Then:

1. Create an API key.
2. Configure a verified sender email address or domain as required.
3. Add the credentials to your backend environment.
4. Configure the OTP generation, email delivery, expiry, and verification logic.

Environment variable examples:

- "EMAIL_API_KEY"
- "EMAIL_FROM"

These variable names are examples. Use the names expected by your implementation.

---

Environment Configuration

Create a ".env" file in the server directory.

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

AI_API_KEY=your_ai_api_key

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

EMAIL_API_KEY=your_email_api_key
EMAIL_FROM=your_verified_sender_email

Important: These are example variable names. Match them to the actual names used in your server code. Remove variables for services that are not implemented.

Add ".env" to ".gitignore". Never upload secrets to GitHub.

---

Installation and Development

Prerequisites

- Node.js and npm
- MongoDB Atlas account or a configured MongoDB instance
- Credentials for any external services you intend to use

Install Dependencies

npm install
npm install --prefix client
npm install --prefix server

Start Development Servers

npm run dev

Local URLs

- Frontend: http://localhost:5173
- API Health Check: http://localhost:5000/api/health

The health-check endpoint can be used to verify that the backend is running.

---

Security Guidelines

- Keep API secrets in backend environment variables.
- Never expose private keys in React components or frontend environment variables.
- Never commit ".env" files to GitHub.
- Validate incoming requests on the backend.
- Restrict OAuth permissions to the minimum required.
- Protect user data and verify access permissions before returning profile information.
- Implement OTP expiry, rate limiting, and secure verification.
- Configure production callback URLs and allowed origins before deployment.

---

Project Goal

NAXORA aims to bridge the gap between academic education and industry requirements by connecting students, colleges, and companies through skill mapping, internships, and placement opportunities.
