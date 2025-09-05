# Video Screening MVP

A simple prototype of a Video Screening Feature built with Python (FastAPI + GraphQL) backend and React + TypeScript frontend.

## 🎯 Features

- **Create Invites**: Generate invite links for candidates
- **Video Recording**: Candidates can record videos (max 2 minutes) directly in the browser
- **Video Upload**: Videos are uploaded and stored locally
- **Video Playback**: Customers can play back recorded videos
- **Tagging System**: Add classification tags to candidate videos (Proceed, Revisit, Reject)

## 🛠️ Tech Stack

### Backend

- **Python 3.12+** with FastAPI
- **GraphQL** with Strawberry GraphQL
- **Local File Storage** (can be extended to AWS S3)
- **In-Memory Database** (can be extended to MongoDB)
- **CORS** enabled for frontend integration

### Frontend

- **React 19** with TypeScript
- **Material-UI (MUI)** for components
- **Apollo Client** for GraphQL
- **React Router** for navigation
- **Vite** for build tooling

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:

   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📋 API Endpoints

### GraphQL (http://localhost:8000/graphql)

**Queries:**

- `video(inviteId: String!)` - Get video details by invite ID

**Mutations:**

- `createInvite(inviteId: String!)` - Create a new invite
- `addTag(inviteId: String!, tag: String!)` - Add a tag to a video

### REST Endpoints

- `POST /upload/{invite_id}` - Upload a video file
- `GET /health` - Health check
- `GET /app/uploads/{filename}` - Serve uploaded video files

## 🎬 Usage Flow

1. **Create Invite**: Use the dashboard to create an invite with a unique ID
2. **Share Link**: Share the invite link (`/invite/{id}`) with candidates
3. **Record Video**: Candidates visit the link and record their video (max 2 minutes)
4. **Review**: Use the dashboard to view uploaded videos and add classification tags
5. **Manage**: Tag videos as "Proceed", "Revisit", or "Reject"

## 🏗️ Project Structure

```
Video-Screening-MVP/
├── backend/
│   ├── app/
│   │   ├── graphql/
│   │   │   ├── schema.py      # GraphQL schema definition
│   │   │   └── types.py       # GraphQL types
│   │   ├── repo/
│   │   │   ├── base.py        # Repository interface
│   │   │   ├── memory.py      # In-memory implementation
│   │   │   └── mongo.py       # MongoDB implementation
│   │   ├── storage/
│   │   │   ├── base.py        # Storage interface
│   │   │   └── local.py       # Local file storage
│   │   ├── main.py            # FastAPI application
│   │   └── settings.py        # Configuration
│   ├── main.py                # Simple standalone version
│   └── requirements.txt       # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Recorder.tsx   # Video recording component
    │   │   ├── VideoPlayer.tsx # Video playback component
    │   │   └── Tagger.tsx     # Tag management component
    │   ├── pages/
    │   ├── api/
    │   │   └── graphql.ts     # GraphQL queries and mutations
    │   ├── App.tsx            # Main app component
    │   └── main.tsx           # Application entry point
    └── package.json           # Node.js dependencies
```

## ✅ What's Working

- ✅ Complete invite creation flow
- ✅ Video recording in browser (WebRTC)
- ✅ Video upload and storage
- ✅ Video playback with proper URL handling
- ✅ Tag management system
- ✅ GraphQL API with proper type safety
- ✅ CORS configuration for frontend integration
- ✅ Static file serving for uploaded videos
- ✅ Responsive Material-UI design
- ✅ TypeScript type safety
- ✅ ESLint configuration

## 🔧 Configuration

### Backend Settings (app/settings.py)

- `REPO_BACKEND`: "memory" or "mongo"
- `STORAGE_BACKEND`: "local" (extensible to "s3")
- `CORS_ORIGINS`: Comma-separated list of allowed origins
- `UPLOAD_DIR`: Directory for storing uploaded files

### Frontend Environment

- `VITE_API_BASE`: GraphQL endpoint URL (defaults to http://localhost:8000/graphql)

## 🚧 Known Limitations & Trade-offs

1. **No Authentication**: Uses simple tokenized links (as per requirements)
2. **Local Storage**: Videos stored locally (can be extended to AWS S3)
3. **In-Memory Database**: Data lost on restart (can be extended to MongoDB)
4. **No Video Compression**: Raw WebM files (could add compression)
5. **No File Size Limits**: Only time limits (2 minutes)
6. **No Error Handling**: Basic error handling (production would need more)

## 🔮 Future Enhancements

- [ ] AWS S3 integration for video storage
- [ ] MongoDB integration for persistent data
- [ ] Video compression and optimization
- [ ] User authentication system
- [ ] Email notifications for invites
- [ ] Video analytics and insights
- [ ] Batch operations for multiple candidates
- [ ] Video thumbnails and previews
- [ ] Advanced tagging with categories
- [ ] Export functionality for reports

## 🧪 Testing

### Backend Tests

```bash
cd backend
python -m pytest  # When tests are added
```

### Frontend Tests

```bash
cd frontend
npm test  # When tests are added
```

### Manual Testing

1. Start both backend and frontend servers
2. Open http://localhost:5173
3. Create an invite with ID "test-123"
4. Open http://localhost:5173/invite/test-123 in a new tab
5. Record a video and verify upload
6. Return to dashboard and verify video playback
7. Add tags and verify they persist

## 📝 Development Notes

- The project uses a modular architecture with clear separation of concerns
- GraphQL provides type-safe API communication
- Material-UI ensures consistent, accessible UI components
- The recorder component handles WebRTC permissions and media constraints
- Static file serving enables direct video playback
- CORS is properly configured for development

## 🤝 Contributing

This is a prototype MVP built for demonstration purposes. The codebase is structured to be easily extensible for production use.

---

**Built with ❤️ for the recruiting process demonstration**
