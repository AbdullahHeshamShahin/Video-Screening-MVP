# Video Screening MVP

A complete video screening application that allows recruiters to create invites for candidates, who can then record short video responses that are stored and can be reviewed with classification tags.

## Features

### ✅ Complete Feature Set

1. **Invite Creation** - Recruiters can create unique invite links for candidates
2. **Video Recording** - Candidates can record videos directly in the browser (max 2 minutes)
3. **Video Upload & Storage** - Videos are automatically uploaded and stored on the server
4. **Video Playback** - Recruiters can play back candidate videos in the dashboard
5. **Candidate Classification** - Rich tagging system for categorizing candidates and next steps

### 🎯 Key Capabilities

- **Real-time Video Recording**: Browser-based recording with live preview
- **Time Management**: Automatic 2-minute limit with visual progress indicator
- **Smart Tagging**: Predefined tags for skills, experience, decision status, and next steps
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern UI**: Clean, professional interface built with Material-UI

## Tech Stack

### Backend

- **FastAPI 0.115.11** - Modern Python web framework with automatic API documentation
- **Strawberry GraphQL 0.281.0** - Type-safe GraphQL implementation for Python
- **Motor 3.7.1** - Async MongoDB driver for Python
- **PyMongo 4.14.1** - MongoDB database driver
- **Pydantic Settings 2.8.1** - Settings management with environment variable support
- **Python Multipart 0.0.20** - File upload handling
- **Uvicorn 0.34.0** - ASGI server for production deployment

### Frontend

- **React 19.1.1** - Latest React with modern hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript with strict type checking
- **Material-UI 7.3.2** - Professional React component library with theming
- **Apollo Client 4.0.4** - GraphQL client with intelligent caching and state management
- **React Router DOM 7.8.2** - Client-side routing for single-page application
- **Vite 7.1.2** - Lightning-fast build tool and development server
- **RxJS 7.8.2** - Reactive programming library for handling async operations

## Architecture Overview

### Frontend Architecture

The frontend is a modern React application built with TypeScript and Material-UI, featuring:

#### Core Components

- **App.tsx** - Main application wrapper with navigation bar and layout
- **Dashboard.tsx** - Recruiter interface for creating invites and managing videos
- **InviteRecord.tsx** - Candidate interface for recording video responses
- **Recorder.tsx** - Reusable video recording component with timer and controls
- **VideoPlayer.tsx** - Video playback component with standard controls
- **Tagger.tsx** - Tagging interface for candidate classification

#### Key Features

- **Client-side Routing** - React Router for navigation between dashboard and invite pages
- **GraphQL Integration** - Apollo Client for efficient data fetching and caching
- **Real-time Recording** - Browser MediaRecorder API with live preview
- **Responsive Design** - Material-UI components that work on all screen sizes
- **Type Safety** - Full TypeScript implementation with strict type checking

#### State Management

- **Apollo Client Cache** - Automatic caching of GraphQL queries and mutations
- **React Hooks** - useState and useEffect for component state management
- **Context-free Design** - No global state management needed for this MVP

### Backend Architecture

The backend is a FastAPI application with GraphQL API and file storage capabilities:

#### Core Modules

- **main.py** - FastAPI application setup with CORS, routing, and middleware
- **graphql/schema.py** - GraphQL schema definition with queries and mutations
- **graphql/types.py** - GraphQL type definitions for data models
- **repo/base.py** - Abstract repository interface for data persistence
- **repo/memory.py** - In-memory data storage implementation
- **repo/mongo.py** - MongoDB data storage implementation
- **storage/base.py** - Abstract storage interface for file management
- **storage/local.py** - Local filesystem storage implementation
- **settings.py** - Configuration management with environment variables

#### Key Features

- **GraphQL API** - Type-safe API with automatic schema generation
- **Flexible Storage** - Pluggable storage backends (local filesystem, MongoDB)
- **File Upload** - REST endpoint for video file uploads
- **CORS Support** - Configurable cross-origin resource sharing
- **Health Monitoring** - Health check endpoint for monitoring

#### Data Flow

1. **Invite Creation** - GraphQL mutation creates invite in repository
2. **Video Upload** - REST endpoint receives video file and stores it
3. **Video Retrieval** - GraphQL query fetches video metadata and URL
4. **Tag Management** - GraphQL mutations add/remove classification tags

## Quick Start

### Prerequisites

- **Node.js 18+** and npm/yarn for frontend development
- **Python 3.8+** for backend development
- **MongoDB** (optional - uses in-memory storage by default)

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment (optional):**

   ```bash
   cp env.example .env
   # Edit .env file with your MongoDB URI if using MongoDB
   ```

5. **Start the server:**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Access the Application

- **Frontend Dashboard**: http://localhost:5173 (for recruiters)
- **Candidate Recording**: http://localhost:5173/invite/{invite-id} (for candidates)
- **GraphQL API**: http://localhost:8000/graphql
- **API Documentation**: http://localhost:8000/docs (FastAPI auto-generated docs)
- **Health Check**: http://localhost:8000/health

## How to Use

### For Recruiters (Dashboard) - Frontend

The recruiter dashboard (`/`) provides a comprehensive interface for managing video interviews:

#### 1. Creating Invites

- **Enter Invite ID**: Type a unique identifier (e.g., "candidate-john-doe")
- **Create Invite**: Click the "Create Invite" button to generate the invite
- **Copy Link**: Use the "Open Invite Link" button to get the candidate URL
- **Share with Candidate**: Send the generated link to your candidate

#### 2. Managing Videos

- **Automatic Updates**: Videos appear in the dashboard as soon as candidates upload them
- **Video Player**: Built-in video player with standard controls (play, pause, seek, volume)
- **Real-time Status**: See upload progress and completion status
- **Error Handling**: Clear error messages if uploads fail

#### 3. Candidate Classification

- **Quick Tags**: Use predefined tags for common classifications:
  - **Decision**: ✅ Proceed, 🔄 Revisit, ❌ Reject
  - **Skills**: 💻 Technical, 🗣️ Communication, 🎯 Problem Solving, 👥 Leadership
  - **Experience**: 🌟 Senior, 📈 Mid-level, 🌱 Junior, 🎓 Entry-level
  - **Fit**: 🎯 Perfect Match, 🤔 Maybe, ❌ Not a Fit
  - **Next Steps**: 📞 Phone Interview, 💼 On-site, 📝 Technical Test, ⏰ Follow-up
- **Custom Tags**: Add your own tags for specific notes or requirements
- **Tag Management**: Remove tags by clicking the ❌ button on existing tags

### For Candidates (Invite Page) - Frontend

The candidate interface (`/invite/{id}`) provides a streamlined recording experience:

#### 1. Accessing the Invite

- **Direct Link**: Use the invite link provided by the recruiter
- **Permission Grant**: Allow camera and microphone access when prompted
- **Browser Compatibility**: Works on Chrome, Firefox, Safari, and Edge

#### 2. Recording Process

- **Live Preview**: See yourself in the video preview before recording
- **Start Recording**: Click "Start Recording" to begin
- **Timer Display**: Visual countdown showing remaining time (max 2 minutes)
- **Progress Bar**: Linear progress indicator showing recording progress
- **Stop Early**: Click "Stop Recording" to finish before the time limit

#### 3. Upload and Confirmation

- **Automatic Upload**: Video uploads immediately after recording stops
- **Upload Progress**: Visual feedback during the upload process
- **Success Confirmation**: Clear success message when upload completes
- **Error Handling**: Helpful error messages if upload fails

### Backend API Usage

#### GraphQL Endpoints

**Query Videos:**

```graphql
query GetVideo($id: String!) {
  video(inviteId: $id) {
    inviteId
    url
    tags
  }
}
```

**Create Invite:**

```graphql
mutation CreateInvite($id: String!) {
  createInvite(inviteId: $id)
}
```

**Add Tags:**

```graphql
mutation AddTag($id: String!, $tag: String!) {
  addTag(inviteId: $id, tag: $tag) {
    inviteId
    url
    tags
  }
}
```

**Remove Tags:**

```graphql
mutation RemoveTag($id: String!, $tag: String!) {
  removeTag(inviteId: $id, tag: $tag) {
    inviteId
    url
    tags
  }
}
```

#### REST Endpoints

**Upload Video:**

```bash
POST /upload/{invite_id}
Content-Type: multipart/form-data
Body: video file (WebM format)
```

**Health Check:**

```bash
GET /health
Response: {"healthy": true}
```

**Serve Videos:**

```bash
GET /app/uploads/{filename}
Response: Video file stream
```

## Tagging System

The application includes a comprehensive tagging system for candidate classification:

### Decision Tags

- ✅ Proceed - Move to next stage
- 🔄 Revisit - Review again later
- ❌ Reject - Not a good fit

### Skills Tags

- 💻 Technical - Strong technical skills
- 🗣️ Communication - Good communication skills
- 🎯 Problem Solving - Strong problem-solving ability
- 👥 Leadership - Leadership potential

### Experience Tags

- 🌟 Senior - Senior-level candidate
- 📈 Mid-level - Mid-level experience
- 🌱 Junior - Junior-level candidate
- 🎓 Entry-level - Entry-level candidate

### Fit Tags

- 🎯 Perfect Match - Ideal candidate
- 🤔 Maybe - Uncertain fit
- ❌ Not a Fit - Not suitable

### Next Steps Tags

- 📞 Phone Interview - Schedule phone interview
- 💼 On-site - Invite for on-site interview
- 📝 Technical Test - Assign technical assessment
- ⏰ Follow-up - Follow up later

## API Reference

### GraphQL Endpoints

#### Queries

```graphql
query GetVideo($id: String!) {
  video(inviteId: $id) {
    inviteId
    url
    tags
  }
}
```

#### Mutations

```graphql
mutation CreateInvite($id: String!) {
  createInvite(inviteId: $id)
}

mutation AddTag($id: String!, $tag: String!) {
  addTag(inviteId: $id, tag: $tag) {
    inviteId
    url
    tags
  }
}
```

### REST Endpoints

- `POST /upload/{invite_id}` - Upload video file
- `GET /health` - Health check
- `GET /app/uploads/{filename}` - Serve uploaded videos

## Configuration

### Backend Settings

The backend uses Pydantic Settings for configuration management. Edit `backend/app/settings.py` or create a `.env` file:

```python
class Settings(BaseSettings):
    # Application Environment
    APP_ENV: str = "dev"  # "dev" | "prod"

    # CORS Configuration
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:5174,http://localhost:5175"

    # Repository Backend (Data Storage)
    REPO_BACKEND: str = "mongo"  # "memory" | "mongo"
    MONGO_URI: str = ""  # MongoDB connection string
    MONGO_DB: str = "video_mvp"  # Database name

    # Storage Backend (File Storage)
    STORAGE_BACKEND: str = "local"  # "local" | "s3" (future)
    UPLOAD_DIR: str = "app/uploads"  # Local upload directory

    class Config:
        env_file = ".env"  # Load from .env file
```

#### Environment Variables

Create a `.env` file in the backend directory:

```bash
# .env
APP_ENV=dev
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
REPO_BACKEND=mongo
MONGO_URI=mongodb://localhost:27017
MONGO_DB=video_mvp
STORAGE_BACKEND=local
UPLOAD_DIR=app/uploads
```

#### Storage Backends

**Memory Storage (Default):**

- No database required
- Data lost on server restart
- Perfect for development and testing

**MongoDB Storage:**

- Persistent data storage
- Requires MongoDB instance
- Production-ready data persistence

### Frontend Configuration

The frontend configuration is managed through Apollo Client and Vite:

#### Apollo Client Configuration (`frontend/src/apollo.ts`)

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql", // Backend GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

#### Vite Configuration (`frontend/vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
});
```

#### Environment Variables

Create a `.env` file in the frontend directory for environment-specific settings:

```bash
# .env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Video Screening MVP
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## File Structure

```
Video-Screening-MVP/
├── backend/                          # Python FastAPI Backend
│   ├── app/                         # Main application package
│   │   ├── graphql/                 # GraphQL implementation
│   │   │   ├── schema.py            # GraphQL schema definitions
│   │   │   └── types.py             # GraphQL type definitions
│   │   ├── repo/                    # Data repository layer
│   │   │   ├── base.py              # Abstract repository interface
│   │   │   ├── memory.py            # In-memory data storage
│   │   │   └── mongo.py             # MongoDB data storage
│   │   ├── storage/                 # File storage layer
│   │   │   ├── base.py              # Abstract storage interface
│   │   │   └── local.py             # Local filesystem storage
│   │   ├── uploads/                 # Video file storage directory
│   │   │   ├── demo-123.webm        # Example video files
│   │   │   └── test-*.webm          # Test video files
│   │   ├── main.py                  # FastAPI application entry point
│   │   └── settings.py              # Configuration management
│   ├── .venv/                       # Python virtual environment
│   ├── .env                         # Environment variables (create from env.example)
│   ├── env.example                  # Environment variables template
│   ├── main.py                      # Alternative entry point
│   ├── requirements.txt             # Python dependencies
│   ├── server.log                   # Application logs
│   └── .gitignore                   # Git ignore rules
├── frontend/                        # React TypeScript Frontend
│   ├── src/                         # Source code
│   │   ├── components/              # Reusable React components
│   │   │   ├── Recorder.tsx         # Video recording component
│   │   │   ├── VideoPlayer.tsx      # Video playback component
│   │   │   └── Tagger.tsx           # Tagging interface component
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.tsx        # Recruiter dashboard page
│   │   │   └── InviteRecord.tsx     # Candidate recording page
│   │   ├── api/                     # API integration
│   │   │   └── graphql.ts           # GraphQL queries and mutations
│   │   ├── styles/                  # Global styles
│   │   │   └── globals.css          # Global CSS styles
│   │   ├── assets/                  # Static assets
│   │   │   └── react.svg            # React logo
│   │   ├── App.tsx                  # Main application component
│   │   ├── App.css                  # Application styles
│   │   ├── main.tsx                 # Application entry point
│   │   ├── index.css                # Global CSS imports
│   │   ├── routes.tsx               # React Router configuration
│   │   ├── apollo.ts                # Apollo Client configuration
│   │   └── vite-env.d.ts            # Vite type definitions
│   ├── public/                      # Public static assets
│   │   └── vite.svg                 # Vite logo
│   ├── dist/                        # Production build output
│   │   ├── assets/                  # Bundled assets
│   │   ├── index.html               # Production HTML
│   │   └── vite.svg                 # Static assets
│   ├── node_modules/                # Node.js dependencies
│   ├── .env                         # Frontend environment variables
│   ├── .gitignore                   # Git ignore rules
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # Development HTML template
│   ├── package.json                 # Node.js dependencies and scripts
│   ├── package-lock.json            # NPM lock file
│   ├── yarn.lock                    # Yarn lock file
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tsconfig.app.json            # App-specific TypeScript config
│   ├── tsconfig.node.json           # Node-specific TypeScript config
│   ├── vite.config.ts               # Vite configuration
│   └── README.md                    # Frontend-specific documentation
└── README.md                        # Main project documentation
```

### Key Directories Explained

#### Backend (`/backend/`)

- **`app/`** - Main Python package containing all application logic
- **`app/graphql/`** - GraphQL API implementation with schema and types
- **`app/repo/`** - Data access layer with pluggable storage backends
- **`app/storage/`** - File storage abstraction with local filesystem implementation
- **`app/uploads/`** - Directory where video files are stored
- **`requirements.txt`** - Python dependencies with pinned versions

#### Frontend (`/frontend/`)

- **`src/`** - Source code directory with all React components and logic
- **`src/components/`** - Reusable UI components (Recorder, VideoPlayer, Tagger)
- **`src/pages/`** - Page-level components (Dashboard, InviteRecord)
- **`src/api/`** - GraphQL queries and mutations
- **`public/`** - Static assets served directly
- **`dist/`** - Production build output (generated by `npm run build`)
- **`package.json`** - Node.js dependencies and build scripts

## Development

### Running in Development Mode

Both backend and frontend support hot reloading for efficient development:

#### Backend Development

```bash
# Terminal 1 - Backend
cd backend

# Activate virtual environment (if using one)
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Start with hot reload
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend Features:**

- **Hot Reload**: Automatically restarts server when code changes
- **GraphQL Playground**: Available at http://localhost:8000/graphql
- **API Documentation**: Auto-generated docs at http://localhost:8000/docs
- **Debug Logging**: Detailed logs in `server.log`

#### Frontend Development

```bash
# Terminal 2 - Frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend Features:**

- **Hot Module Replacement**: Instant updates without page refresh
- **TypeScript Checking**: Real-time type checking and error reporting
- **ESLint Integration**: Code quality checks and auto-fixing
- **Vite Dev Server**: Lightning-fast build and reload

### Development Workflow

#### 1. Setting Up Development Environment

```bash
# Clone the repository
git clone <repository-url>
cd Video-Screening-MVP

# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

#### 2. Running Both Services

```bash
# Terminal 1 - Backend
cd backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 3. Development Tools

**Backend Tools:**

- **FastAPI Docs**: http://localhost:8000/docs (Interactive API documentation)
- **GraphQL Playground**: http://localhost:8000/graphql (GraphQL query interface)
- **Health Check**: http://localhost:8000/health (Service status)

**Frontend Tools:**

- **Development Server**: http://localhost:5173 (Main application)
- **React DevTools**: Browser extension for React debugging
- **Apollo DevTools**: Browser extension for GraphQL debugging

### Building for Production

#### Frontend Production Build

```bash
cd frontend

# Install production dependencies
npm ci

# Build for production
npm run build

# Preview production build locally
npm run preview
```

**Production Build Features:**

- **Code Splitting**: Automatic code splitting for optimal loading
- **Asset Optimization**: Minified CSS and JavaScript
- **Tree Shaking**: Removes unused code
- **TypeScript Compilation**: Full type checking and compilation

#### Backend Production Deployment

```bash
cd backend

# Install production dependencies
pip install -r requirements.txt

# Run production server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Production Considerations:**

- **Environment Variables**: Set production environment variables
- **Database**: Configure MongoDB for persistent storage
- **File Storage**: Consider cloud storage for video files
- **CORS**: Update CORS origins for production domains
- **Logging**: Configure production logging levels

### Code Quality and Testing

#### Frontend Code Quality

```bash
cd frontend

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

#### Backend Code Quality

```bash
cd backend

# Run Python linting (if configured)
flake8 app/

# Type checking with mypy (if configured)
mypy app/
```

### Debugging

#### Frontend Debugging

1. **React DevTools**: Install browser extension for component inspection
2. **Apollo DevTools**: Install browser extension for GraphQL debugging
3. **Browser Console**: Check for JavaScript errors and warnings
4. **Network Tab**: Monitor API calls and responses

#### Backend Debugging

1. **FastAPI Docs**: Use interactive documentation at `/docs`
2. **GraphQL Playground**: Test queries and mutations at `/graphql`
3. **Server Logs**: Check `server.log` for detailed error information
4. **Python Debugger**: Add breakpoints with `pdb` or IDE debugger

## Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**1. Port Already in Use**

```bash
# Error: Address already in use
# Solution: Use a different port
python -m uvicorn app.main:app --reload --port 8001
```

**2. MongoDB Connection Issues**

```bash
# Error: Connection refused
# Solution: Check MongoDB is running
mongod --dbpath /path/to/your/db

# Or use memory storage instead
# Edit backend/app/settings.py
REPO_BACKEND = "memory"
```

**3. CORS Issues**

```bash
# Error: CORS policy blocks request
# Solution: Add your frontend URL to CORS_ORIGINS
# Edit backend/app/settings.py
CORS_ORIGINS = "http://localhost:5173,http://localhost:3000"
```

**4. File Upload Issues**

```bash
# Error: Upload directory not found
# Solution: Create uploads directory
mkdir -p backend/app/uploads
```

#### Frontend Issues

**1. GraphQL Connection Issues**

```bash
# Error: Failed to fetch
# Solution: Check backend is running on correct port
# Edit frontend/src/apollo.ts
uri: 'http://localhost:8000/graphql'
```

**2. Video Recording Issues**

```bash
# Error: getUserMedia not supported
# Solution: Use HTTPS or localhost
# Modern browsers require secure context for camera access
```

**3. Build Issues**

```bash
# Error: TypeScript compilation failed
# Solution: Check types and fix errors
npx tsc --noEmit

# Error: ESLint errors
# Solution: Fix linting issues
npm run lint -- --fix
```

**4. Hot Reload Not Working**

```bash
# Solution: Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### General Issues

**1. Environment Variables Not Loading**

```bash
# Backend: Create .env file
cp backend/env.example backend/.env
# Edit .env with your values

# Frontend: Use VITE_ prefix
# .env
VITE_API_URL=http://localhost:8000
```

**2. Video Files Not Playing**

```bash
# Check file format (should be WebM)
# Check file permissions
chmod 644 backend/app/uploads/*.webm
```

**3. Database Data Not Persisting**

```bash
# Check MongoDB is running
# Check connection string in .env
# Verify database name matches settings
```

### Debugging Steps

1. **Check Service Status**

   - Backend: http://localhost:8000/health
   - Frontend: http://localhost:5173

2. **Check Logs**

   - Backend: `tail -f backend/server.log`
   - Frontend: Browser console (F12)

3. **Verify Dependencies**

   - Backend: `pip list`
   - Frontend: `npm list`

4. **Test API Endpoints**
   - GraphQL: http://localhost:8000/graphql
   - REST: http://localhost:8000/docs

### Performance Optimization

#### Backend Optimization

- Use MongoDB for production (persistent storage)
- Implement video compression
- Add request rate limiting
- Use async/await properly

#### Frontend Optimization

- Enable code splitting
- Optimize bundle size
- Implement lazy loading
- Use React.memo for expensive components

## Security Considerations

### Current Security Status

- **Video Files**: Stored locally and served statically
- **Authentication**: Not implemented (suitable for MVP)
- **CORS**: Configured for development origins only
- **File Uploads**: Limited to video formats
- **Data Validation**: Basic validation on file uploads

### Security Recommendations for Production

- Implement user authentication and authorization
- Add input validation and sanitization
- Use HTTPS in production
- Implement rate limiting
- Add file size and type restrictions
- Use environment variables for sensitive data
- Implement proper error handling (don't expose internal details)

## Future Enhancements

### Short-term Improvements

- **User Authentication**: JWT-based auth system
- **Email Notifications**: Notify recruiters of new submissions
- **Video Compression**: Automatic video optimization
- **Better Error Handling**: User-friendly error messages
- **Mobile Optimization**: Touch-friendly interface

### Medium-term Features

- **Cloud Storage**: AWS S3 or Google Cloud integration
- **Advanced Analytics**: Viewing statistics and insights
- **Bulk Operations**: Manage multiple candidates
- **Export Features**: Download candidate data
- **Search and Filtering**: Find specific candidates

### Long-term Vision

- **Mobile App**: Native iOS/Android applications
- **ATS Integration**: Connect with existing recruitment systems
- **AI Features**: Automated candidate screening
- **Video Analytics**: Facial expression and sentiment analysis
- **Multi-language Support**: Internationalization
- **Advanced Reporting**: Comprehensive analytics dashboard

## Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style

- **Frontend**: Follow ESLint configuration
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use conventional commit messages
- **Documentation**: Update README for new features

## License

This project is created as an MVP for demonstration purposes. Feel free to use and modify for your own projects.

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the GitHub issues
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce
