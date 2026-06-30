# Eugene Subrado Jr. Portfolio + Edge Analytics Dashboard

A full-stack MERN portfolio site for Eugene Subrado Jr. with a live real-time analytics dashboard as the featured project demo.

The application now works as both a personal developer portfolio and a production-style analytics sample. The root page introduces the portfolio, the detailed About Developer page loads profile data from MongoDB, and the dashboard demonstrates live event tracking with charts, tables, validation, and Socket.io updates.

## Live Site

- Portfolio and dashboard: https://eugenesubradoportfolio.onrender.com
- API server: https://edgeanalytics-server.onrender.com/
- Source code: https://github.com/ESubrado/EdgeAnalyticsDashboard

Render free-tier services may sleep after inactivity, so the first request can take a moment to wake up.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Portfolio landing page with introduction, tech stack, featured projects, contact links, and dashboard CTA. |
| `/about-the-developer` | Detailed portfolio profile with skills, work history, education, certificates, awards, and project cards loaded from the API. |
| `/dashboard` | Real-time analytics dashboard demo. |

## Features

- Portfolio landing page for Eugene Subrado Jr. with GitHub, LinkedIn, email, availability, skills, and featured work.
- Dynamic About Developer page backed by MongoDB data from `/api/about-developer`.
- Auto-seeded developer profile data when the server starts and the MongoDB record does not exist.
- Real-time analytics dashboard with event totals, line chart, top event types, pie chart, and event log table.
- Event creation form with validation and automatic dashboard refresh after new records are posted.
- Socket.io integration with MongoDB Change Streams for real-time client updates.
- Responsive React Router app using Tailwind CSS, Material UI, Recharts, Redux Toolkit, and React Icons.
- Express + TypeScript API using Mongoose models and MVC-style routes/controllers.

## Tech Stack

### Client

- React 19
- React Router 7
- TypeScript
- Redux Toolkit and React Redux
- Tailwind CSS
- Material UI
- Recharts
- Axios
- Socket.io Client
- Vite / React Router build tools

### Server

- Node.js
- Express 5
- TypeScript
- MongoDB and Mongoose
- Socket.io
- MongoDB Change Streams
- dotenv
- cors
- moment

### Deployment

- Render for hosted client and server
- Dockerfiles for client and server builds
- Nginx for serving the production client image

## API Endpoints

Base URL for production:

```text
https://edgeanalytics-server.onrender.com
```

### Portfolio

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/about-developer` | Returns the public developer profile, contact items, sections, skills, experience, certificates, awards, and projects. |

### Analytics

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/analytics` | Returns all analytics events sorted by creation date. |
| `GET` | `/api/analytics/topanalytic` | Returns event type counts sorted by highest count. |
| `GET` | `/api/analytics/analyticchart?type=hour` | Returns chart-ready analytics data for the last hour. |
| `GET` | `/api/analytics/analyticchart?type=day` | Returns chart-ready analytics data for the last day. |
| `GET` | `/api/analytics/analyticchart?type=month` | Returns chart-ready analytics data for the last month. |
| `POST` | `/api/analytics` | Creates a new analytics event. |

Example `POST /api/analytics` body:

```json
{
  "eventType": "page_view",
  "userId": "user123",
  "timestamp": "2026-06-30T10:30:00.000Z"
}
```

## Project Structure

```text
.
|-- client
|   |-- app
|   |   |-- routes
|   |   |   |-- Portfolio.tsx
|   |   |   |-- AboutTheDeveloper.tsx
|   |   |   |-- AboutDeveloperHeader.tsx
|   |   |   |-- Index.tsx
|   |   |   |-- AnalyticGraph.tsx
|   |   |   |-- AnalyticPieChart.tsx
|   |   |   |-- AnalyticEventTable.tsx
|   |   |   |-- AnalyticTop5Table.tsx
|   |   |   `-- TopBar.tsx
|   |   |-- store
|   |   |   `-- slices
|   |   |       |-- sliceAboutDeveloper.tsx
|   |   |       `-- sliceGraph.tsx
|   |   |-- context
|   |   |-- components
|   |   |-- base-client.tsx
|   |   |-- root.tsx
|   |   `-- routes.ts
|   |-- public
|   |-- Dockerfile
|   `-- package.json
|-- server
|   |-- src
|   |   |-- controllers
|   |   |   |-- analytics.controller.ts
|   |   |   `-- aboutDeveloper.controller.ts
|   |   |-- models
|   |   |   |-- analytics.ts
|   |   |   `-- aboutDeveloper.ts
|   |   |-- routes
|   |   |   |-- analytics.routes.ts
|   |   |   `-- aboutDeveloper.routes.ts
|   |   |-- seed
|   |   |   `-- aboutDeveloperData.ts
|   |   |-- app.ts
|   |   |-- interface.ts
|   |   `-- server.ts
|   |-- Dockerfile
|   `-- package.json
|-- Dockerfile
|-- nginx.conf
`-- README.md
```

## Local Setup

### Prerequisites

- Node.js 20 or newer
- npm
- MongoDB connection string from MongoDB Atlas or a local MongoDB instance

### 1. Configure the Server

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

Install and run the API:

```bash
cd server
npm install
npm run dev
```

The API will run on `http://localhost:3001`.

### 2. Configure the Client

Create `client/.env` if you want to point the client to a local API:

```env
VITE_API_URL=http://localhost:3001
```

If `VITE_API_URL` is not set, the client falls back to the hosted Render API.

Install and run the client:

```bash
cd client
npm install
npm run dev
```

The React Router dev server will print the local URL in the terminal.

## Build Commands

Client:

```bash
cd client
npm run build
npm run start
```

Server:

```bash
cd server
npm run build
npm run start
```

Type-check the client:

```bash
cd client
npm run typecheck
```

## Docker

Run the client container from the `client` folder:

```bash
cd client
docker compose up --build
```

Run the server container from the `server` folder:

```bash
cd server
docker compose up --build
```

For the server, make sure `server/.env` contains a valid `MONGODB_URI`.

## Testing the Dashboard

### Through the UI

1. Open `/dashboard`.
2. Click the add-event action in the top bar.
3. Fill in the event type, user ID, and timestamp.
4. Submit the form.
5. Confirm that the table and charts refresh after the new event is created.

The user ID field is limited to 10 characters and does not accept special characters.

### Through an API Client

Send a `POST` request to:

```text
https://edgeanalytics-server.onrender.com/api/analytics
```

With a JSON body like:

```json
{
  "eventType": "page_view",
  "userId": "user123",
  "timestamp": "2026-06-30T10:30:00.000Z"
}
```

The new event should appear in the dashboard after the API accepts it.

## Current TODO

- Add server-side pagination for the analytics event table.
- Continue expanding portfolio projects and credentials as new work is completed.

---

Built by Eugene Subrado Jr.
