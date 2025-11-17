export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

export interface AcademicLevel {
  id: string
  name: string
}

export interface Career {
  id: string
  name: string
  academic: AcademicLevel
  academicId: string
}

export interface Character {
  id: string
  name: string
  description: string
  imageUrl: string
}

export interface RegisterDto {
  email: string
  password: string
}

export interface ProfileSettingsDto {
  firstName: string
  lastName: string
  gender: 'male' | 'female' | 'other'
  birthDate: string
  academicLevelId: string
  careerId?: string
  preferenceIds?: string[]
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
  }
}
