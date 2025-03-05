# Job Application Portal with Resume Parsing

A modern web application built with the MERN stack (MongoDB, Express, React, Node.js) where recruiters can post job openings and candidates can apply by uploading their resumes. The application includes a resume parsing feature that extracts key information from uploaded resumes.

## Features

### For Recruiters

- Create and manage job postings
- View applications for each job posting
- See parsed resume data in a structured format
- Update application status (pending, reviewed, shortlisted, rejected)

### For Candidates

- Browse available job postings
- Apply to jobs by uploading resumes
- Track application status

### General Features

- User authentication (JWT-based)
- Role-based access control
- Resume parsing and data extraction
- Responsive design for all devices

## Technology Stack

### Backend

- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Express-fileupload for file handling

### Frontend

- React.js
- React Router for navigation
- Context API for state management
- Axios for API requests
- React Toastify for notifications

## Setup and Installation

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup

1. Clone the repository

```
git clone <repository-url>
cd job-portal
```

2. Install dependencies

```
cd server
npm install
```

3. Create a .env file in the server directory

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_here
```

4. Start the server

```
npm start
```

### Frontend Setup

1. Navigate to client directory

```
cd ../client
```

2. Install dependencies

```
npm install
```

3. Start the React application

```
npm start
```

The frontend will be available at http://localhost:3000 and will connect to the backend at http://localhost:5000.

## API Documentation

### Authentication Routes

| Method | Endpoint           | Description         | Request Body            | Access  |
| ------ | ------------------ | ------------------- | ----------------------- | ------- |
| POST   | /api/auth/register | Register a new user | {email, password, role} | Public  |
| POST   | /api/auth/login    | Login and get token | {email, password}       | Public  |
| GET    | /api/auth/me       | Get current user    | -                       | Private |

### Job Routes

| Method | Endpoint      | Description      | Request Body                       | Access                            |
| ------ | ------------- | ---------------- | ---------------------------------- | --------------------------------- |
| GET    | /api/jobs     | Get all jobs     | -                                  | Public (filtered for active jobs) |
| GET    | /api/jobs/:id | Get a single job | -                                  | Public                            |
| POST   | /api/jobs     | Create a job     | {title, description, status, etc.} | Recruiter                         |
| PUT    | /api/jobs/:id | Update a job     | {title, description, status, etc.} | Job Owner                         |
| DELETE | /api/jobs/:id | Delete a job     | -                                  | Job Owner                         |

### Application Routes

| Method | Endpoint                     | Description                  | Request Body                         | Access    |
| ------ | ---------------------------- | ---------------------------- | ------------------------------------ | --------- |
| POST   | /api/applications            | Apply for a job              | FormData with job id and resume file | Candidate |
| GET    | /api/applications/me         | Get candidate's applications | -                                    | Candidate |
| GET    | /api/applications/job/:jobId | Get applications for a job   | -                                    | Job Owner |
| PUT    | /api/applications/:id/status | Update application status    | {status}                             | Job Owner |

## Resume Parsing Integration

The project includes a mock resume parser service by default, which returns predefined structured data. In a production environment, you can integrate with real resume parsing APIs like:

1. **Affinda** - Comprehensive resume parsing with high accuracy
2. **Sovren** - Enterprise-grade parsing service
3. **HireAbility** - Multilingual resume parsing

To integrate a real service, update the `parseResume` function in `server/services/resumeParser.js` with your API implementation.

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- File type validation for resume uploads
- Maximum file size limits

## Deployment

### Backend Deployment

1. Set up environment variables for production
2. Set NODE_ENV=production
3. Configure MongoDB connection for production database
4. Deploy to your hosting provider (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment

1. Build the React application for production

```
cd client
npm run build
```

2. Deploy the build folder to a static hosting service (Netlify, Vercel, etc.)

## Future Improvements

- Email notifications for application status changes
- Advanced job search with filtering options
- Candidate profile customization
- In-app messaging between recruiters and candidates
- Analytics dashboard for recruiters
- Social media login integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Resume parsing API documentation and examples
- MongoDB Atlas for database hosting
- React community for component examples and best practices

## Contact

For questions or support, please contact the project maintainer:

- Aryan230 (GitHub: [aryan230](https://github.com/aryan230))

Last updated: March 5, 2025
