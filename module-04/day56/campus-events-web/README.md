# Campus Events Web Application

The frontend of a Campus Events platform, built with **Next.js** and **TypeScript**. Students can discover campus events, filter, sort and search them, view event and session details, and create new events. All data comes from an existing **NestJS** backend API, using the native **Fetch API**.

Built for the CodeOps Module 4 frontend project.

## Technologies used

- **Next.js** (App Router): pages, routing and Server Components
- **TypeScript**: types for events, sessions and API responses
- **React**: reusable components and Client Components for interactive parts
- **Tailwind CSS**: styling and responsive layout
- **Fetch API**: all communication with the backend (no Axios, no React Router)
- **lucide-react**: icons

## Prerequisites

- Node.js and npm
- The Campus Events **NestJS backend** running locally (see [Backend URL configuration](#backend-url-configuration))

## Installation

```bash
git clone <your-repository-url>
cd campus-events-frontend
npm install
```

## Backend URL configuration

Create a file named `.env.local` in the project root:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Change the URL if your backend uses a different port or address. Restart the development server after changing environment variables.

The backend must:
- be running and listening on the port in the URL above (this project assumes **4000**)
- allow requests from the frontend's origin with CORS (`app.enableCors({ origin: 'http://localhost:3000' })` in the backend's `main.ts`, placed before `listen`), because the create-event form calls the API from the browser

## Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm start       # run the production build
npm run lint    # check the code
```

## Main features

- **Home page:** welcome section and the next upcoming published events
- **All events:** event cards with title, short description, location, date, category and publication status
- **Filtering:** by category, location and publication status
- **Sorting:** by date or title, ascending or descending
- **Pagination:** page controls that keep the current filters
- **Title search:** search box that filters the events on the current page
- **Event details:** full event information and the sessions that belong to it
- **Session details:** title, date, start and end time, room, and the related event
- **Create event:** form with validation, success message and the backend's error messages
- **Application states:** loading, error (for example when the backend is stopped), empty results, event not found, session not found, and form validation
- **Responsive design:** works on phones, tablets and desktop screens

## Pages

| Route | Page |
|---|---|
| `/` | Home / dashboard |
| `/events` | All events (filters, sorting, pagination, search) |
| `/events/[id]` | Event details and its sessions |
| `/events/[id]/sessions/[sessionId]` | Session details |
| `/create-event` | Create a new event |

## Backend API used

| Method | Endpoint | Used for |
|---|---|---|
| GET | `/api/events` | Event list with filter, sort and pagination query parameters |
| GET | `/api/events/upcoming` | Upcoming events on the home page |
| GET | `/api/events/:id` | Event details |
| GET | `/api/events/:id/sessions` | Sessions of an event |
| GET | `/api/events/:id/sessions/:sessionId` | Session details |
| POST | `/api/events` | Create an event |

Query parameters for `GET /api/events`: `category`, `location`, `isPublished`, `sortBy` (`eventDate` or `title`), `order` (`asc` or `desc`), `page`, `limit`.

## Project structure

```
src/
  app/
    layout.tsx                  # shared layout: Navbar, content, Footer
    page.tsx                    # home page
    loading.tsx                 # loading state
    error.tsx                   # error state
    events/
      page.tsx                  # all events
      [id]/
        page.tsx                # event details
        not-found.tsx
        sessions/[sessionId]/
          page.tsx              # session details
          not-found.tsx
    create-event/
      page.tsx                  # create event page
  components/
    Navbar.tsx
    Footer.tsx
    EventCard.tsx
    EventFilters.tsx
    EventList.tsx               # client component: title search + cards
    SearchBar.tsx
    Pagination.tsx
    CreateEventForm.tsx         # client component: form and POST request
    Loading.tsx
  services/
    eventService.ts             # all fetch calls to the backend
  types/
    event.ts                    # Event, Session, PaginatedEvents
  utils/
    format.ts                   # date and time formatting
```

## How the frontend talks to the backend

The functions in `src/services/eventService.ts` use the built-in `fetch` to call the NestJS API at the URL from `NEXT_PUBLIC_API_BASE_URL`. Each function checks `response.ok` and returns the parsed JSON, typed with the interfaces in `src/types/event.ts`.

- Pages such as the event list and details are **Server Components**: they call the service functions on the server and send finished HTML to the browser.
- Filters, sorting and pagination live in the **URL query string** (for example `/events?category=technology&page=2`), so pages can be shared and refreshed. The page reads `searchParams` and passes them to the API.
- The create-event form is a **Client Component** because it uses state and a submit handler. It sends a `POST` request with `fetch` from the browser and shows the success message or the backend's validation messages.
- A `404` from the API for a single event or session becomes the "not found" page, and other failures show the error page.

## Design notes

- The backend has no search route, so title search is done on the frontend and only searches the events on the current page.
- The home page only shows **published** upcoming events, sorted with the soonest first.
- Dates and times are shown in the Africa/Addis_Ababa time zone.

## Testing

Tested manually against the backend:

| No. | Test | Result |
|---|---|---|
| 1 | Open the home page |shows some events and welcome|
| 2 | Open all events |lists all events paginated  |
| 3 | Filter by category |filters based on category |
| 4 | Filter by location | also filter based on location|
| 5 | Search by title | It searches events by title on every key stroke|
| 6 | Change sorting | applies the sorting based on the direction|
| 7 | Navigate pagination |it gives navigation access between pages |
| 8 | Open event details | gives detail information about the event|
| 9 | View event sessions | shows all event's sessions|
| 10 | Open an invalid event ID |shows not found message |
| 11 | Submit a valid event | will create the event and gives confirmation|
| 12 | Submit an incomplete form |shows appropriate error message  |
| 13 | Stop the backend |shows user friendly message and retry button   |

## Screenshots

Add screenshots of the main pages here (home, all events, event details, session details, create event).

## Author

Abenezer Tariku