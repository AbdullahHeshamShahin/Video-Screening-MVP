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

- **FastAPI** - Modern Python web framework
- **GraphQL** - Flexible API with Strawberry GraphQL
- **MongoDB** - Document database for storing video metadata
- **Local Storage** - File system storage for video files
- **Uvicorn** - ASGI server

### Frontend

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Material-UI** - Professional component library
- **Apollo Client** - GraphQL client with caching
- **Vite** - Fast build tool and dev server

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+
- MongoDB (optional - uses in-memory storage by default)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Access the Application

- **Dashboard**: http://localhost:5173 (for recruiters)
- **API**: http://localhost:8000/graphql
- **Health Check**: http://localhost:8000/health

## How to Use

### For Recruiters (Dashboard)

1. **Create an Invite**

   - Enter a unique invite ID
   - Click "Create Invite"
   - Click "Open Invite Link" to get the candidate URL

2. **Review Videos**

   - Videos appear automatically when candidates upload them
   - Use the video player to watch recordings
   - Add custom tags or use quick tags for classification

3. **Classify Candidates**
   - Use predefined tags for skills, experience, and decisions
   - Add custom tags for specific notes
   - Track next steps in the recruitment process

### For Candidates (Invite Page)

1. **Access the Invite**

   - Use the invite link provided by the recruiter
   - Grant camera and microphone permissions when prompted

2. **Record Your Video**

   - Click "Start Recording" to begin
   - Speak clearly and maintain good lighting
   - Recording automatically stops at 2 minutes
   - Click "Stop Recording" to finish early

3. **Upload Your Response**
   - Video uploads automatically after recording
   - You'll see a success message when complete

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

Edit `backend/app/settings.py`:

```python
class Settings(BaseSettings):
    APP_ENV: str = "dev"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:5174"
    REPO_BACKEND: str = "memory"  # "memory" | "mongo"
    MONGO_URI: str = "your-mongodb-connection-string"
    MONGO_DB: str = "video_mvp"
    STORAGE_BACKEND: str = "local"
    UPLOAD_DIR: str = "app/uploads"
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:8000` for the API. To change this, update the Apollo Client configuration in `frontend/src/apollo.ts`.

## File Structure

```
Video-Screening-MVP/
├── backend/
│   ├── app/
│   │   ├── graphql/
│   │   │   ├── schema.py      # GraphQL schema
│   │   │   └── types.py       # GraphQL types
│   │   ├── repo/
│   │   │   ├── base.py        # Repository interface
│   │   │   ├── memory.py      # In-memory storage
│   │   │   └── mongo.py       # MongoDB storage
│   │   ├── storage/
│   │   │   ├── base.py        # Storage interface
│   │   │   └── local.py       # Local file storage
│   │   ├── main.py            # FastAPI app
│   │   └── settings.py        # Configuration
│   ├── uploads/               # Video storage directory
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Recorder.tsx   # Video recording component
│   │   │   ├── VideoPlayer.tsx # Video playback component
│   │   │   └── Tagger.tsx     # Tagging component
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx  # Recruiter dashboard
│   │   │   └── InviteRecord.tsx # Candidate recording page
│   │   ├── api/
│   │   │   └── graphql.ts     # GraphQL queries
│   │   └── apollo.ts          # Apollo Client setup
│   └── package.json
└── README.md
```

## Development

### Running in Development Mode

Both backend and frontend support hot reloading:

```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Security Considerations

- Video files are stored locally and served statically
- No authentication is implemented (suitable for MVP)
- CORS is configured for development origins
- File uploads are limited to video formats

## Future Enhancements

- User authentication and authorization
- Cloud storage integration (AWS S3, Google Cloud)
- Video compression and optimization
- Email notifications for new submissions
- Advanced analytics and reporting
- Mobile app development
- Integration with ATS systems

## License

This project is created as an MVP for demonstration purposes.
