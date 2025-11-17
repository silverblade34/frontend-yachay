import { AcademicLevel, ApiResponse, AuthResponse, Career, Character, ProfileSettingsDto, RegisterDto } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yachay.maquiadev.com/api/v1'

export class ApiClient {
  private static getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (includeAuth) {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || 'Request failed')
    }

    return response.json()
  }

  // Auth endpoints
  static async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    // Store token
    if (response.data && 'access_token' in response.data) {
      localStorage.setItem('access_token', response.data.access_token)
    }
    
    return response.data
  }

  // Profile endpoints
  static async updateProfileSettings(data: ProfileSettingsDto) {
    return this.request('/user/profile-settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true)
  }

  static async getProfileSettings() {
    return this.request('/user/profile-settings', {}, true)
  }

  // Avatar endpoints
  static async uploadAvatar(file?: File, avatarUrl?: string) {
    const formData = new FormData()
    if (file) {
      formData.append('image', file)
    }
    if (avatarUrl) {
      formData.append('avatarUrl', avatarUrl)
    }

    const token = localStorage.getItem('access_token')
    const response = await fetch(`${API_BASE_URL}/user/avatar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload avatar')
    }

    return response.json()
  }

  // Academic levels
  static async getAcademicLevels() {
    return this.request<AcademicLevel[]>('/academic/all')
  }

  // Careers
  static async getCareersByAcademic(academicId: string) {
    return this.request<Career[]>(`/careers/all-by-academic?academicId=${academicId}`)
  }

  // Characters
  static async getCharacters() {
    return this.request<Character[]>('/characters/all')
  }

  // User info
  static async getGeneralInformation() {
    return this.request('/user/general-information', {}, true)
  }
}