# Campus Events API

A REST API for discovering campus events and browsing the sessions that belong to each event. Built with **NestJS** and **TypeScript** for the CodeOps Module 4 practical exercise.

Data is stored **in memory** (plain arrays), so it resets every time the server restarts. No database is needed.

## What it practises

- Routing and controllers (`@Controller`, `@Get`, `@Post`)
- Request decorators: `@Param()`, `@Query()`, `@Body()`
- Filtering, sorting and pagination
- DTO validation with `class-validator`
- HTTP status codes (200, 201, 400, 401, 404)
- **Middleware** (request logging)
- **Guards** (API key protection)
- **Interceptors** (execution timing)
- **Pipes** (`ParseIntPipe`, `ValidationPipe`)

## Installation and run

Requirements: Node.js and pnpm.

```bash
pnpm install
cp .env.example .env      # on Windows PowerShell: copy .env.example .env
pnpm start:dev
```

Then open `.env` and set a classroom key:

```
CLASSROOM_API_KEY=classroom-demo-key-123
```

The API runs at `http://localhost:3001`. Every route starts with the global prefix `/api`.

> Environment variables are read **only at startup**. If you change `.env`, stop and restart the server.

### Environment variables

| Variable | Purpose |
|---|---|
| `CLASSROOM_API_KEY` | Shared key the guard expects in the `x-api-key` header for `POST /api/events` |

The `.env` file is listed in `.gitignore` and is never committed. `.env.example` is committed with an empty value so others know which variables are needed. `ConfigModule.forRoot({ isGlobal: true })` in `app.module.ts` loads `.env` into `process.env`. Without it, NestJS does not read `.env` files and the guard would see an empty key.

## Project structure

```
src/
  main.ts                      # app setup: global prefix /api, global ValidationPipe
  app.module.ts                # root module, ConfigModule, registers the middleware
  common/
    logger.middleware.ts       # logs every request
    api-key.guard.ts           # protects POST /api/events with x-api-key
    timing.interceptor.ts      # logs how long each request takes
  events/
    events.module.ts           # connects the events feature
    events.controller.ts       # defines routes, applies guard and interceptor
    events.service.ts          # data, filtering, sorting, pagination
    event.types.ts             # Event, Session, PaginatedEvents
    dto/
      create-event.dto.ts      # body validation for POST /api/events
      find-events-query.dto.ts # query validation for GET /api/events
```

Responsibilities are kept separate: the **module** connects the feature, the **controller** defines routes and reads request data, the **service** does the finding, filtering, sorting and pagination, and the **types/DTOs** describe and validate data. The files in `common/` hold the cross-cutting pieces (middleware, guard, interceptor).

## Data model

**Event**: `id`, `title`, `description`, `location`, `eventDate`, `category`, `isPublished`

**Session**: `id`, `eventId`, `title`, `startsAt`, `endsAt`, `room`

The app starts with sample events and sessions (some events have two or more sessions).

## Routes

| Method | Endpoint | Behaviour | Protected |
|---|---|---|---|
| GET | `/api/events` | List events (supports query options below) | No |
| GET | `/api/events/upcoming` | Events whose date is today or later | No |
| GET | `/api/events/:id` | One event by ID | No |
| GET | `/api/events/:id/sessions` | Sessions of that event | No |
| GET | `/api/events/:id/sessions/:sessionId` | One session, only if it belongs to that event | No |
| POST | `/api/events` | Create an event (validated body) | **Yes, needs `x-api-key`** |

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
x-api-key: classroom-demo-key-123

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
| Missing or wrong `x-api-key` on `POST /api/events` | 401 Unauthorized |
| Event not found | 404 Not Found |
| Session not found, or it belongs to a different event | 404 Not Found |

## Request lifecycle

Every request passes through these stages in order:

```
Request
  -> Middleware      (LoggerMiddleware)     log the request
  -> Guard           (ApiKeyGuard)          is this request allowed?
  -> Interceptor     (TimingInterceptor)    start the timer
  -> Pipe            (ValidationPipe)       validate / transform input
  -> Controller                             choose the operation
  -> Service                                run the business logic
  -> Interceptor                            log the elapsed time
Response
```

If a stage rejects the request (guard returns 401, pipe returns 400), the later stages do not run. A request can pass the middleware and still be rejected by the guard.

| Component | Question it answers | In this project |
|---|---|---|
| Middleware | What should happen to the request first? | Logs `METHOD URL` |
| Guard | Is this request allowed? | Checks the `x-api-key` header on `POST /api/events` |
| Interceptor | What should happen before and after the handler? | Logs how long the request took |
| Pipe | Is the incoming data valid? | Validates the body and query, converts types |
| Controller | Which operation should run? | Routes in `events.controller.ts` |
| Service | How is the operation performed? | Logic in `events.service.ts` |

### Middleware: `LoggerMiddleware`

Runs for every route (`forRoutes('*')` in `AppModule`). It prints `METHOD URL` and calls `next()` so the request continues. Without `next()` the request would hang.

### Guard: `ApiKeyGuard`

Applied with `@UseGuards(ApiKeyGuard)` on the `POST /api/events` handler only. It reads the `x-api-key` header and compares it with `process.env.CLASSROOM_API_KEY`. If the key is missing or does not match, it throws `UnauthorizedException` (401). Reading events stays public.

> **Security note:** this is a learning example with a non-sensitive classroom key. A real secret must never be placed in browser-side code or a `NEXT_PUBLIC_` variable, because anything the browser receives can be inspected. Real applications should use proper server-verified authentication and authorization.

### Interceptor: `TimingInterceptor`

Applied with `@UseInterceptors(TimingInterceptor)` on the events controller. It records `Date.now()` before the handler runs, calls `next.handle()`, and uses `tap()` to log `Request completed in Xms` afterwards. It does not change the response body.

### Pipes and validation

- **`ValidationPipe`** is registered globally in `main.ts` with `whitelist: true` (unknown properties are removed) and `transform: true` (values are converted to the types declared in the DTOs). The DTOs `CreateEventDto` and `FindEventsQueryDto` carry the rules.
- **`ParseIntPipe`** converts a string query value to an integer and returns 400 if it is not a number.

Validation rules for `POST /api/events`:

| Field | Rule |
|---|---|
| `title` | non-empty string |
| `description` | non-empty string |
| `location` | non-empty string |
| `eventDate` | ISO 8601 date string |
| `category` | non-empty string |
| `isPublished` | optional boolean (default `false`) |

When validation fails, NestJS returns **400 Bad Request** with a `message` array listing every problem, and the controller and service never run.

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

## How to test

Start the server with `pnpm start:dev` and keep its terminal visible, because the middleware and interceptor write to the console. Send requests with the REST Client extension using `requests.http` (click **Send Request** above each request), or with `curl` (use `curl.exe` in PowerShell).

| Component | How to test | What to look for |
|---|---|---|
| Middleware | Send any request | Server console prints `METHOD /api/...` |
| Guard | `POST /api/events` without `x-api-key`, then with the correct key | 401, then 201 |
| Interceptor | Send any request to an events route | Console prints `Request started` and `Request completed in Xms` |
| ParseIntPipe | Call the demo route with `?page=hello`, then `?page=2` | 400, then 200 |
| ValidationPipe | `POST /api/events` with a missing title or a wrong type | 400 with a list of messages |

## Test results

Fill in the actual status code you got for each request. Expected values are shown.

| No. | Test | Request | Expected | Actual |
|---|---|---|---|---|
| 1 | Get all events | `GET /api/events` | 200 | 200|
| 2 | Filter by category | `GET /api/events?category=technology` | 200 | 200|
| 3 | Filter by publication status | `GET /api/events?isPublished=true` | 200 | 200|
| 4 | Sort and paginate | `GET /api/events?sortBy=eventDate&order=asc&page=2&limit=2` | 200 | 200|
| 5 | Get upcoming events | `GET /api/events/upcoming` | 200 |200 |
| 6 | Get an existing event | `GET /api/events/evt-101` | 200 | 200|
| 7 | Request a missing event | `GET /api/events/not-real` | 404 |404 |
| 8 | Get sessions for an event | `GET /api/events/evt-101/sessions` | 200 | 200|
| 9 | Get a session under its event | `GET /api/events/evt-101/sessions/ses-201` | 200 |200 |
| 10 | Create a valid event (with key) | `POST /api/events` + `x-api-key` | 201 | 201|
| 11 | Create an event with missing title (with key) | `POST /api/events` + `x-api-key` | 400 |400 |
| 12 | Middleware logs the request | any request | line in console | |
| 13 | Guard: no key | `POST /api/events` without `x-api-key` | 401 |401 |
| 14 | Guard: correct key | `POST /api/events` + `x-api-key` | 201 | 201|
| 15 | Interceptor logs execution time | any events request | `Request completed in Xms` in console | |
| 16 | ParseIntPipe: invalid number | `GET /api/events/example?page=hello` | 400 |400 |
| 17 | ValidationPipe: wrong field types | `POST /api/events` + `x-api-key`, `isPublished: "yes"` | 400 | |

A `requests.http` file with these requests can be run with the REST Client extension in VS Code.