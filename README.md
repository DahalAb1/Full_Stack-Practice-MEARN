# MERN CRUD notes app : Notes

  Basic practice project to get comfortable with HTTP + CRUD in the MERN stack.

## Tech used 
- React + Vite (frontend) → `frontend/`
- Tailwind + DaisyUI for UI → classes all over (`btn`, `card`, `form-control`)
- React Router v7 → `frontend/src/App.jsx`
- axios (single instance) → `frontend/src/lib/axios.js` (baseURL `http://localhost:5001/app`)
- Express + Node → `backend/`
- MongoDB + Mongoose → model in `backend/src/models/Notes.js`
- Controllers (CRUD) → `backend/src/controllers/notesControllers.js`
- CORS middleware → `backend/src/server.js` (`app.use(cors({ origin: "http://localhost:5173" }))`)
- Rate limiting with Upstash Redis → `backend/src/config/upstash.js` + `backend/src/middleware/rateLimiter.js`

## How to run 
Backend first:
```bash
cd backend
npm install
# create .env with the vars below
npm run dev  # http://localhost:5001
```

Frontend:
```bash
cd frontend
npm install  # or pnpm i
npm run dev  # http://localhost:5173
```

.env needed in `backend/`:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

## API I wired up (prefixed with /app/notes)
Base from frontend axios: `http://localhost:5001/app`

- GET    `/notes`         → all notes (newest first)
- GET    `/notes/:id`     → single note
- POST   `/notes`         → create `{ title, content }`
- PUT    `/notes/:id`     → update `{ title, content }`
- DELETE `/notes/:id`     → delete

Rate limit: 10 req / 20s (global key). If I see 429 on the frontend, the UI changes to a “slow down” state.


## Deployement 

- decided to run backend and front end on same port (have to remove cors implementaion to do this)
- 