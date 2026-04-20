# GET2REST - Proxy API Documentation

Convert HTTP methods to GET for easy API usage on platforms that only support GET requests.

---

## Overview

GET2REST provides a simple proxy endpoint that allows you to make HTTP requests (GET, POST, PUT, DELETE, PATCH) using GET parameters.

**Base URL:**
```
http://localhost:3000/api/proxy
https://get2rest.vercel.app/api/proxy (production)
```

---

## Proxy Endpoint

### `GET /api/proxy`

Make HTTP requests to any URL using query parameters.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string | ✅ | - | Target URL to request |
| `method` | string | ❌ | GET | HTTP method (GET, POST, PUT, DELETE, PATCH) |
| `data` | string | ❌ | - | Request body (JSON string) |
| `headers` | string | ❌ | - | Custom headers (JSON string) |
| `params` | string | ❌ | - | Query parameters (JSON string) |
| `timeout` | number | ❌ | 30000 | Timeout in milliseconds (100-300000) |

#### Response Format

**Success (200):**
```json
{
  "success": true,
  "status": 200,
  "data": { ... },
  "timestamp": "2024-04-20T10:30:00.000Z"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-04-20T10:30:00.000Z"
}
```

---

## Examples

### 1. Simple GET Request
```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts/1"
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "data": {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident",
    "body": "quia et suscipit..."
  },
  "timestamp": "2024-04-20T10:30:00.000Z"
}
```

### 2. GET with Query Parameters
```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&params={\"_limit\":5}"
```

### 3. POST Request with Data
```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&method=POST&data={\"title\":\"Hello\",\"body\":\"World\",\"userId\":1}"
```

### 4. Request with Custom Headers
```bash
curl "http://localhost:3000/api/proxy?url=https://api.github.com/users/octocat&headers={\"Accept\":\"application/vnd.github.v3+json\"}"
```

### 5. Complex Request (POST with headers, data, and params)
```bash
curl "http://localhost:3000/api/proxy?url=https://api.example.com/search&method=POST&data={\"query\":\"typescript\"}&headers={\"Authorization\":\"Bearer token\"}&params={\"limit\":10}"
```

---

## HTTP Methods Supported

- **GET** - Retrieve data
- **POST** - Create new resource
- **PUT** - Replace entire resource
- **DELETE** - Remove resource
- **PATCH** - Partial update

---

## Tips & Best Practices

### 1. JSON String Format
All JSON parameters must be valid JSON strings:
```
✅ CORRECT: params={"limit":10}
❌ WRONG: params={limit:10}
❌ WRONG: params=limit=10
```

### 2. URL Encoding
When using special characters, ensure proper URL encoding:
```bash
# With proper URL encoding
curl "http://localhost/api/proxy?url=https://api.example.com&headers={\"Authorization\":\"Bearer%20token\"}"
```

### 3. Timeout Configuration
Adjust timeout based on target API responsiveness:
```bash
# Fast API: 5 second timeout
curl "http://localhost:3000/api/proxy?url=https://fast-api.com&timeout=5000"

# Slow API: 60 second timeout
curl "http://localhost:3000/api/proxy?url=https://slow-api.com&timeout=60000"
```

### 4. Error Handling
Always check the `success` field in response:
```json
{
  "success": false,
  "error": "Invalid URL format",
  "timestamp": "..."
}
```

---

## Error Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Invalid parameters, malformed JSON |
| 405 | Method Not Allowed | Endpoint only accepts GET |
| 500 | Server Error | Proxy request failed, network error |

---

## Common Errors & Solutions

### "Invalid URL format"
- Check if URL is valid and starts with `http://` or `https://`
- Example: `https://api.example.com/endpoint` ✅

### "Invalid JSON format"
- Verify JSON parameters are properly formatted
- Use JSON validator: https://jsonlint.com
- Example: `{"limit": 10}` ✅

### "Request timeout"
- Increase timeout parameter (max 300000ms = 5 minutes)
- Check if target API is responding
- Example: `&timeout=60000`

### "Method Not Allowed"
- Ensure you're using GET method for this endpoint
- Parameters go in query string, not request body

---

## Rate Limiting

By default, no rate limiting is applied. For production use, consider:
- Implementing rate limiting per IP
- Using API keys for access control
- Adding request logging

---

## Security Considerations

⚠️ **Important for Public Use:**
- This endpoint can access any URL
- Implement authentication if exposing publicly
- Add URL whitelist/blacklist
- Monitor for abuse
- Use HTTPS in production

---

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t get2rest .
docker run -p 3000:3000 get2rest
```

### Custom Hosting
Requires Node.js 17+
```bash
npm install
npm start
```

---

## File Structure

```
api/
  proxy.ts              # Proxy endpoint
lib/
  http-client.ts        # HTTP request utility
types/
  index.ts              # TypeScript interfaces
```

---

## Support

- 📖 Documentation: See this file
- 🐛 Issues: Report on GitHub
- 💡 Suggestions: Open GitHub discussion

