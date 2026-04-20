import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { ProxyQuery, ProxyResponse } from '../types'
import { makeHttpRequest } from '../lib/http-client'

/**
 * Proxy Endpoint
 * 
 * Allows users to make HTTP requests to any URL with any HTTP method
 * using GET parameters.
 * 
 * Query Parameters:
 * - url (required): Target URL to request
 * - method (optional): HTTP method - GET, POST, PUT, DELETE, PATCH (default: GET)
 * - data (optional): Request body/data (JSON string format)
 * - headers (optional): Custom headers (JSON string format)
 * - params (optional): Query parameters (JSON string format)
 * - timeout (optional): Timeout in milliseconds (default: 30000)
 * 
 * Usage examples:
 * GET /api/proxy?url=https://jsonplaceholder.typicode.com/posts/1
 * GET /api/proxy?url=https://api.github.com/users/octocat&method=GET
 * GET /api/proxy?url=https://jsonplaceholder.typicode.com/posts&method=POST&data={"title":"test","body":"hello"}&params={"_limit":"5"}
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only accept GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only GET requests are supported.',
      timestamp: new Date().toISOString(),
    } as ProxyResponse)
    return
  }

  try {
    const query = req.query as unknown as ProxyQuery

    // Validate URL
    if (!query.url) {
      res.status(400).json({
        success: false,
        error: 'Missing required parameter: url',
        timestamp: new Date().toISOString(),
      } as ProxyResponse)
      return
    }

    // Validate URL format
    try {
      new URL(query.url)
    } catch {
      res.status(400).json({
        success: false,
        error: 'Invalid URL format',
        timestamp: new Date().toISOString(),
      } as ProxyResponse)
      return
    }

    // Parse and validate query parameters
    const method = (query.method || 'GET') as
      | 'GET'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'PATCH'

    let headers: Record<string, string> = {}
    if (query.headers) {
      try {
        headers = JSON.parse(query.headers)
        if (typeof headers !== 'object' || Array.isArray(headers)) {
          throw new Error('Headers must be an object')
        }
      } catch (e: any) {
        res.status(400).json({
          success: false,
          error: `Invalid headers format: ${e.message}`,
          timestamp: new Date().toISOString(),
        } as ProxyResponse)
        return
      }
    }

    let params: Record<string, any> | undefined
    if (query.params) {
      try {
        params = JSON.parse(query.params)
        if (typeof params !== 'object' || Array.isArray(params)) {
          throw new Error('Params must be an object')
        }
      } catch (e: any) {
        res.status(400).json({
          success: false,
          error: `Invalid params format: ${e.message}`,
          timestamp: new Date().toISOString(),
        } as ProxyResponse)
        return
      }
    }

    let data: any
    if (query.data) {
      try {
        data = JSON.parse(query.data)
      } catch (e: any) {
        res.status(400).json({
          success: false,
          error: `Invalid data format: ${e.message}`,
          timestamp: new Date().toISOString(),
        } as ProxyResponse)
        return
      }
    }

    const timeout = query.timeout ? parseInt(query.timeout, 10) : 30000

    // Validate timeout
    if (isNaN(timeout) || timeout < 100 || timeout > 300000) {
      res.status(400).json({
        success: false,
        error:
          'Invalid timeout. Must be a number between 100 and 300000 milliseconds',
        timestamp: new Date().toISOString(),
      } as ProxyResponse)
      return
    }

    // Make HTTP request
    const result = await makeHttpRequest({
      url: query.url,
      method,
      headers,
      data,
      params,
      timeout,
    })

    // Return response with data
    res.status(200).json({
      success: true,
      status: result.status,
      data: result.data,
      timestamp: new Date().toISOString(),
    } as ProxyResponse)
  } catch (error: any) {
    console.error('[Proxy Error]', error)

    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      timestamp: new Date().toISOString(),
    } as ProxyResponse)
  }
}
