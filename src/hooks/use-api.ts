import { useState } from 'react'
import { ApiClient } from '@/src/lib/api/client'
import type { RegisterDto, ProfileSettingsDto } from '@/src/lib/api/types'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (data: RegisterDto) => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiClient.register(data)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}

export function useProfile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = async (data: ProfileSettingsDto) => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiClient.updateProfileSettings(data)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Profile update failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const uploadAvatar = async (file?: File, avatarUrl?: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiClient.uploadAvatar(file, avatarUrl)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Avatar upload failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { updateProfile, uploadAvatar, loading, error }
}

export function useAcademicData() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAcademicLevels = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiClient.getAcademicLevels()
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch academic levels'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getCareersByAcademic = async (academicId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiClient.getCareersByAcademic(academicId)
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch careers'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getCharacters = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await ApiClient.getCharacters()
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch characters'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { getAcademicLevels, getCareersByAcademic, getCharacters, loading, error }
}