# Client - Eugene Subrado Jr. Portfolio + Analytics Dashboard

This folder contains the React client for the portfolio site and the Edge Real-Time Analytics Dashboard demo.

The app is built with React Router 7, React 19, TypeScript, Redux Toolkit, Tailwind CSS, Material UI, Recharts, and Socket.io Client. It is configured as a client-rendered React Router app with `ssr: false`.

## Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `routes/Portfolio.tsx` | Portfolio landing page with intro, skills, featured projects, contact links, and links to the dashboard and full profile. |
| `/about-the-developer` | `routes/AboutTheDeveloper.tsx` | Detailed developer portfolio loaded from `/api/about-developer`. |
| `/dashboard` | `routes/Index.tsx` | Live analytics dashboard demo with charts, event table, top event list, and event creation flow. |

## Client Features

- Portfolio landing page for Eugene Subrado Jr.
- Dynamic detailed profile page powered by Redux Toolkit and the About Developer API.
- Live analytics dashboard with line chart, pie chart, top event list, and event table.
- Create-event modal with validation through React Hook Form and Material UI controls.
- Real-time dashboard updates through Socket.io.
- API access through Axios using `VITE_API_URL`.
- Responsive styling with Tailwind CSS and Material UI.
- Iconography through React Icons.

## Environment

The API base URL is configured in `app/base-client.tsx`:

```ts
const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://edgeanalytics-server.onrender.com";
```

Create `client/.env` when running against a local server:

```env
VITE_API_URL=http://localhost:3001
```

If `VITE_API_URL` is not set, the client uses the hosted Render API.

The Vite dev server also proxies local `/api` and `/socket.io` requests to `http://localhost:3001`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app is configured to run on:

```text
http://localhost:5000
```

Make sure the server is running on `http://localhost:3001` if you are using the local API.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the React Router/Vite dev server. |
| `npm run build` | Creates a production build in `build/`. |
| `npm run start` | Serves the built React Router app with `react-router-serve`. |
| `npm run typecheck` | Generates React Router types and runs TypeScript checking. |

## Important Files

```text
client
|-- app
|   |-- routes.ts
|   |-- root.tsx
|   |-- app.css
|   |-- base-client.tsx
|   |-- routes
|   |   |-- Portfolio.tsx
|   |   |-- AboutTheDeveloper.tsx
|   |   |-- AboutDeveloperHeader.tsx
|   |   |-- Index.tsx
|   |   |-- TopBar.tsx
|   |   |-- AnalyticGraph.tsx
|   |   |-- AnalyticPieChart.tsx
|   |   |-- AnalyticEventTable.tsx
|   |   `-- AnalyticTop5Table.tsx
|   |-- store
|   |   |-- store.tsx
|   |   `-- slices
|   |       |-- sliceAboutDeveloper.tsx
|   |       `-- sliceGraph.tsx
|   |-- context
|   |   |-- AppContext.tsx
|   |   `-- DataSamples.tsx
|   |-- components
|   |   |-- EventFormModal.tsx
|   |   |-- LoadingIcon.tsx
|   |   `-- card.tsx
|   |-- hooks
|   |   `-- parse-string.tsx
|   `-- models
|       `-- analytics-model.tsx
|-- public
|   |-- myProfilePhoto.jpg
|   |-- favicon.ico
|   `-- dashboard_icon.ico
|-- Dockerfile
|-- docker-compose.yml
|-- react-router.config.ts
|-- vite.config.ts
`-- package.json
```

## API Usage

The client expects these server endpoints:

| Endpoint | Used By |
| --- | --- |
| `GET /api/about-developer` | Full developer portfolio page. |
| `GET /api/analytics` | Dashboard event table and totals. |
| `GET /api/analytics/topanalytic` | Top event list. |
| `GET /api/analytics/analyticchart?type=hour/day/month` | Analytics line chart. |
| `POST /api/analytics` | Event creation modal. |
| Socket.io `mongoChange` event | Real-time dashboard refresh. |

## Production Build

Create a build:

```bash
npm run build
```

Preview/serve the React Router build:

```bash
npm run start
```

The static client assets are generated under:

```text
build/client
```

## Docker

Build and run the client with Docker Compose:

```bash
docker compose up --build
```

The container serves the production client through Nginx and maps:

```text
http://localhost:5173 -> container port 80
```

## Styling Notes

- `app/app.css` contains global CSS and Tailwind imports.
- Tailwind CSS is registered through `@tailwindcss/vite` in `vite.config.ts`.
- Material UI is used for dashboard tables, form controls, snackbars, and related UI pieces.
- Recharts is used for analytics visualizations.

## Related Server

The matching Express/MongoDB API lives in `../server`. Start it before local dashboard testing:

```bash
cd ../server
npm install
npm run dev
```
