const BASE_URL = 'http://localhost:8084/api'

const getToken = () => localStorage.getItem('jwtToken')

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    throw new Error('Token expired')
  }
  return response
}

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken()
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  return handleResponse(response)
}

export const api = {
  get: (endpoint: string) => 
    fetchWithAuth(endpoint, {
      method: 'GET',
    }),

  post: (endpoint: string, data: Record<string, unknown>) => 
    fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data: Record<string, unknown>) => 
    fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string) => 
    fetchWithAuth(endpoint, {
      method: 'DELETE',
    }),
}