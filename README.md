# GET2REST - GET to REST Wrapper 🚀

Convert HTTP methods (POST, PUT, DELETE, PATCH) to GET for easier API usage on platforms that only support GET requests.

## Features

✅ **Simple Proxy Endpoint** - Make any HTTP request using GET parameters  
✅ **All HTTP Methods** - GET, POST, PUT, DELETE, PATCH  
✅ **Query Parameters** - Pass URL params, headers, and body data  
✅ **TypeScript Support** - Full type safety with interfaces  
✅ **Vercel Ready** - Deploy instantly on Vercel  

---

## Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/isnandar1471/get2rest.git
cd get2rest

# Install dependencies
npm install

# Start development server
npm run dev
```

### First Request

```bash
# Simple GET
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts/1"

# POST with data
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&method=POST&data={\"title\":\"test\"}"

# With query params
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&params={\"_limit\":5}"
```

---

## API Endpoint

### `GET /api/proxy`

Make HTTP requests to any URL with any HTTP method using query parameters.

**Query Parameters:**
- `url` (required) - Target URL
- `method` (optional) - HTTP method (GET, POST, PUT, DELETE, PATCH) - default: GET
- `data` (optional) - Request body as JSON string
- `headers` (optional) - Custom headers as JSON string
- `params` (optional) - Query parameters as JSON string
- `timeout` (optional) - Timeout in milliseconds (default: 30000)

**Response:**
```json
{
  "success": true,
  "status": 200,
  "data": { ... },
  "timestamp": "2024-04-20T10:30:00.000Z"
}
```

---

## Examples

### GET Request
```bash
curl "http://localhost:3000/api/proxy?url=https://api.github.com/users/octocat"
```

### POST Request
```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&method=POST&data={\"title\":\"Hello\",\"userId\":1}"
```

### With Query Parameters
```bash
curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts&params={\"_limit\":10}"
```

### With Custom Headers
```bash
curl "http://localhost:3000/api/proxy?url=https://api.example.com&headers={\"Authorization\":\"Bearer token\"}"
```

---

## Use Cases

### 1. Testing APIs
Quick testing without setting up a full client:
```bash
curl "http://localhost:3000/api/proxy?url=https://api.example.com/endpoint"
```

### 2. Bypassing GET-only Platforms
Use on platforms (like Slack, Discord) that only support GET requests:
```bash
# In webhook URL
https://your-get2rest.app/api/proxy?url=https://your-api.com&method=POST&data={"message":"hello"}
```

### 3. CORS Workarounds
Make cross-origin requests without CORS issues:
```bash
curl "http://localhost:3000/api/proxy?url=https://api-with-cors-issues.com"
```

### 4. API Exploration
Explore APIs before integrating them into your app.

---

## Project Structure

```
get2rest/
├── api/
│   └── proxy.ts                    # Proxy endpoint
├── lib/
│   └── http-client.ts              # HTTP request utility
├── types/
│   └── index.ts                    # TypeScript interfaces
├── API_DOCUMENTATION.md            # Full API reference
└── README.md                       # This file
```

---

## Development

### Prerequisites
- Node.js 17+
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build
```

---

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Go to production
vercel --prod
```

**Live Example:**
- https://get2rest.vercel.app/api/proxy?url=https://jsonplaceholder.typicode.com/posts/1

### Other Platforms

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
```

**Docker:**
```bash
docker build -t get2rest .
docker run -p 3000:3000 get2rest
```

---

## Documentation

- 📖 [API Documentation](API_DOCUMENTATION.md) - Complete API reference with detailed examples

---

## How It Works

1. You send a GET request with target URL and parameters
2. GET2REST makes the actual HTTP request to the target URL
3. Response is returned back to you

```
Your Client
    ↓
GET /api/proxy?url=...&method=POST&data=...
    ↓
GET2REST Proxy
    ↓
Makes POST request to target URL
    ↓
Target API
    ↓
Response back through GET2REST
    ↓
Your Client
```

---

## Limitations

- Maximum request timeout: 5 minutes (300000ms)
- Target URL must be publicly accessible
- Response data is limited by Vercel/server limits
- No response streaming (full response buffered before return)

---

## Security Considerations

⚠️ **This endpoint is public by default**

For production use, consider:
- Adding authentication/API keys
- Implementing URL whitelist/blacklist
- Adding rate limiting
- Monitoring for abuse
- Using HTTPS (automatic on Vercel)

---

## Common Errors

### "Invalid URL format"
- Ensure URL starts with `http://` or `https://`
- Example: `https://api.example.com` ✅

### "Invalid JSON format"
- Verify parameters are valid JSON
- Example: `{"limit": 10}` ✅

### "Request timeout"
- Increase timeout parameter (max 300000ms)
- Check if target API is responding

### "Method Not Allowed"
- This endpoint only accepts GET requests
- Parameters go in query string

---

## Tips & Best Practices

1. **URL Encoding** - Ensure parameters are properly URL encoded
2. **JSON Validation** - Use JSON validators for complex data
3. **Timeout Tuning** - Adjust based on target API speed
4. **Error Handling** - Check `success` field in response
5. **Rate Limiting** - Add on production (not built-in yet)

---

## Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## Roadmap

- [x] Basic proxy endpoint
- [x] All HTTP methods support
- [x] TypeScript support
- [ ] Rate limiting
- [ ] API key authentication
- [ ] IP whitelist/blacklist
- [ ] Response caching
- [ ] Analytics dashboard
- [ ] Webhook support

---

## License

MIT License - See [LICENSE](LICENSE) for details

---

## Author

[Isnandar Fajar Pangestu](https://github.com/isnandar1471)

---

## Support

- 📖 [API Documentation](API_DOCUMENTATION.md)
- 🐛 [GitHub Issues](https://github.com/isnandar1471/get2rest/issues)
- 💬 [GitHub Discussions](https://github.com/isnandar1471/get2rest/discussions)

---

**Made with ❤️ for developers who need simple HTTP wrapper solutions.**
