/**
 * Utility for making HTTP requests
 */

function parseJsonSafely(jsonString: string | undefined): any {
  if (!jsonString) return null
  try {
    return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString
  } catch {
    return null
  }
}

function buildUrl(baseUrl: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }

  const url = new URL(baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value))
    }
  })

  return url.toString()
}

export interface HttpRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  data?: Record<string, any> | string
  params?: Record<string, any>
  timeout?: number
}

/**
 * Make HTTP request to target URL
 * @param options - HTTP request options
 * @returns Promise with response data
 */
export async function makeHttpRequest(
  options: HttpRequestOptions
): Promise<{ status: number; data: any }> {
  const {
    url,
    method = 'GET',
    headers = {},
    data,
    params,
    timeout = 30000, // 30 seconds default
  } = options

  try {
    // Build URL with params
    const fullUrl = buildUrl(url, params)

    // Prepare headers
    const fetchHeaders: HeadersInit = {
      'Accept': 'application/json',
      'User-Agent': 'GET2REST-Proxy/1.0',
      ...headers,
    }

    // Prepare body
    let body: string | undefined = undefined
    if (['POST', 'PUT', 'PATCH'].includes(method) && data) {
      if (typeof data === 'string') {
        body = data
        fetchHeaders['Content-Type'] = 'application/json'
      } else {
        body = JSON.stringify(data)
        fetchHeaders['Content-Type'] = 'application/json'
      }
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: fetchHeaders,
        body,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Parse response
      const contentType = response.headers.get('content-type')
      let responseData: any

      if (contentType?.includes('application/json')) {
        responseData = await response.json()
      } else if (contentType?.includes('text')) {
        responseData = await response.text()
      } else {
        responseData = await response.text()
      }

      return {
        status: response.status,
        data: responseData,
      }
    } catch (error: any) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`)
      }

      throw error
    }
  } catch (error) {
    throw error
  }
}
