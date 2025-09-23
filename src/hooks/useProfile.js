import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useProfile = (userId) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        setLoading(true)
        const profileData = await getProfile(userId)
        setProfile(profileData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  return { profile, loading, error }
}