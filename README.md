# GET2REST - GET to REST Wrapper

A simple Vercel proxy that lets you send HTTP requests using only GET query parameters.

## Quick Start

### Installation

```bash
npm install
```

### Run locally

```bash
vercel dev
```

### First request

```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts/1"
```

## API Endpoint

### `GET /api/proxy`

Send a request to any URL and let the proxy forward it.

Query parameters:
- `url` (required): target URL
- `method` (optional): HTTP method, one of GET, POST, PUT, DELETE, PATCH. Default is GET.
- `data` (optional): request body as a JSON string
- `headers` (optional): custom headers as a JSON string
- `params` (optional): query parameters as a JSON string
- `timeout` (optional): timeout in milliseconds, default is 30000

Response example:

```json
{
  "success": true,
  "status": 200,
  "data": { ... },
  "timestamp": "2026-04-20T10:30:00.000Z"
}
```

## Examples

GET request:

```bash
curl "http://localhost:3000/api/proxy?url=https://api.github.com/users/octocat"
```

POST request:

```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&method=POST&data={\"title\":\"Hello\",\"userId\":1}"
```

With query parameters:

```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&params={\"_limit\":10}"
```

With headers:

```bash
curl "http://localhost:3000/api/proxy?url=https://api.example.com&headers={\"Authorization\":\"Bearer token\"}"
```

## Project structure

```
api/
  proxy.ts
lib/
  http-client.ts
types/
  index.ts
API_DOCUMENTATION.md
README.md
```

## Development

### Requirements
- Node.js 17+
- npm

### Commands

```bash
npm install
vercel dev
```

The local development server should be available at `http://localhost:3000`.

## Deployment

Deployment is handled by your existing Vercel setup. There is no manual deploy command included here.

## Common issues

### Invalid JSON in `headers` or `data`
The proxy expects valid JSON strings for `headers` and `data`:

```bash
headers={"Accept":"application/json"}
```

### Invalid URL format
Make sure the `url` parameter starts with `http://` or `https://`.

### Method not allowed
This endpoint only accepts GET requests.
