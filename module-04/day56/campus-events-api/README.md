# Campus Events API

A REST API for discovering campus events and browsing the sessions that belong to each event. Built with **NestJS** and **TypeScript** for the CodeOps Module 4, Day 56 practical exercise.

Data is stored **in memory** (plain arrays), so it resets every time the server restarts. No database is needed.

## What it practises

- Routing and controllers (`@Controller`, `@Get`, `@Post`)
- Request decorators: `@Param()`, `@Query()`, `@Body()`
- Filtering, sorting and pagination
- DTO validation with `class-validator`
- HTTP status codes (200, 201, 400, 404)

## Installation and run

Requirements: Node.js and npm.

```bash
npm install
npm run start:dev
```

The API runs at `http://localhost:3000`. Set the `PORT` environment variable to use another port. Every route starts with the global prefix `/api`.

## Project structure

```
src/
  main.ts                      # app setup: global prefix /api, ValidationPipe
  app.module.ts                # root module
  events/
    events.module.ts           # connects the events feature
    events.controller.ts       # defines routes, reads request data
    events.service.ts          # data, filtering, sorting, pagination
    event.types.ts             # Event, Session, PaginatedEvents
    dto/
      create-event.dto.ts      # body validation for POST /api/events
      find-events-query.dto.ts # query validation for GET /api/events
```

Responsibilities are kept separate: the **module** connects the feature, the **controller** defines routes and reads request data, the **service** does the finding, filtering, sorting and pagination, and the **types/DTOs** describe and validate data.

## Data model

**Event**: `id`, `title`, `description`, `location`, `eventDate`, `category`, `isPublished`

**Session**: `id`, `eventId`, `title`, `startsAt`, `endsAt`, `room`

The app starts with sample events and sessions (some events have two or more sessions).

## Routes

| Method | Endpoint | Behaviour |
|---|---|---|
| GET | `/api/events` | List events (supports query options below) |
| GET | `/api/events/upcoming` | Events whose date is today or later |
| GET | `/api/events/:id` | One event by ID |
| GET | `/api/events/:id/sessions` | Sessions of that event |
| GET | `/api/events/:id/sessions/:sessionId` | One session, only if it belongs to that event |
| POST | `/api/events` | Create an event (validated body) |

`/upcoming` is declared **before** `/:id` in the controller. Nest matches routes in declaration order, so otherwise `upcoming` would be treated as an event ID.

### Query options for `GET /api/events`

All are optional.

| Query | Meaning | Example |
|---|---|---|
| `category` | Exact match, ignoring case | `?category=technology` |
| `location` | Partial match, ignoring case | `?location=main` |
| `isPublished` | `true` or `false` | `?isPublished=true` |
| `sortBy` | `eventDate` or `title` | `?sortBy=eventDate` |
| `order` | `asc` (default) or `desc` | `?order=desc` |
| `page` | Page number, starting at 1 (default 1) | `?page=2` |
| `limit` | Items per page (default 5) | `?limit=3` |

### Response format for `GET /api/events`

```json
{
  "items": [],
  "total": 8,
  "page": 2,
  "limit": 3,
  "totalPages": 3
}
```

- `items`: the events on this page
- `total`: how many events match the filters (before pagination)
- `totalPages`: `Math.ceil(total / limit)`

### Example: create an event

```http
POST /api/events
Content-Type: application/json

{
  "title": "Intro to Cloud Computing",
  "description": "A beginner-friendly campus workshop.",
  "location": "Engineering Block, Room 2",
  "eventDate": "2026-12-04T09:00:00.000Z",
  "category": "technology",
  "isPublished": true
}
```

`title`, `description`, `location`, `eventDate` (ISO 8601) and `category` are required. `isPublished` is optional and defaults to `false`.

## Status codes

| Situation | Status |
|---|---|
| Successful GET | 200 OK |
| Event created | 201 Created |
| Invalid or missing body fields, invalid query values (for example `page=0`, `sortBy=price`, `isPublished=banana`) | 400 Bad Request |
| Event not found | 404 Not Found |
| Session not found, or it belongs to a different event | 404 Not Found |

## How filtering, sorting and pagination work

`GET /api/events` applies three steps **in this order**, all inside `EventsService.findAll`:

1. **Filter.** Start with all events. If `category`, `location` or `isPublished` was sent, keep only the matching events. `category` is compared in lowercase, `location` uses a lowercase `includes` check, and `isPublished` is only applied when it was sent (so `false` is a valid filter).
2. **Sort.** If `sortBy` was sent, sort a **copy** of the filtered list (`[...result].sort(...)`) by title or by date. `order=desc` flips the direction. Sorting a copy matters: `sort` changes the array it is called on, and without filters the list is the same array as the original data, so sorting it directly would reorder the stored events for every later request.
3. **Paginate.** Cut the sorted list into a page:

   ```
   offset = (page - 1) * limit
   items  = sortedList.slice(offset, offset + limit)
   ```

   `total` is the length of the list **before** slicing, and `totalPages = Math.ceil(total / limit)`.

The order matters. Filtering must come first so `total` and the pages describe only matching events, and sorting must come before slicing so each page shows the right part of the sorted order.

Query values arrive as strings, so the query DTO converts `page` and `limit` to numbers (`@Type(() => Number)`) and `isPublished` to a boolean, then validates them. Only `eventDate` and `title` are accepted for `sortBy`, and only `asc` and `desc` for `order`.

## Test results

Fill in the actual status code you got for each request. Expected values are shown.

| No. | Test | Request | Expected |
|---|---|---|---|
| 1 | Get all events | `GET /api/events` | 200 |
| 2 | Filter by category | `GET /api/events?category=technology` | 200 |
| 3 | Filter by publication status | `GET /api/events?isPublished=true` | 200 |
| 4 | Sort and paginate | `GET /api/events?sortBy=eventDate&order=asc&page=2&limit=2` | 200 |
| 5 | Get upcoming events | `GET /api/events/upcoming` | 200 |
| 6 | Get an existing event | `GET /api/events/evt-101` | 200 |
| 7 | Request a missing event | `GET /api/events/not-real` | 404 |
| 8 | Get sessions for an event | `GET /api/events/evt-101/sessions` | 200 |
| 9 | Get a session under its event | `GET /api/events/evt-101/sessions/ses-201` | 200 |
| 10 | Create a valid event | `POST /api/events` | 201 |
| 11 | Create an event with missing title | `POST /api/events` | 400 |

A `requests.http` file with these requests can be run with the REST Client extension in VS Code.