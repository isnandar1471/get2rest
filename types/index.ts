/**
 * Query parameters for proxy endpoint
 */
export interface ProxyQuery {
  /** Target URL to request */
  url: string
  /** HTTP method (GET, POST, PUT, DELETE, PATCH) */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** Request body/data (JSON string format) */
  data?: string
  /** Custom headers (JSON string format) */
  headers?: string
  /** Query parameters for target URL (JSON string format) */
  params?: string
  /** Timeout in milliseconds */
  timeout?: string
}

/**
 * Response format for proxy endpoint
 */
export interface ProxyResponse {
  success: boolean
  status?: number
  data?: any
  error?: string
  timestamp: string
}
