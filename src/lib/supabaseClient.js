import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://hjlhgufuajswdepewbnm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqbGhndWZ1YWpzd2RlcGV3Ym5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMzAzMDYsImV4cCI6MjAyMjcwNjMwNn0.E06nLBpiKklt4rG0nVIuMMcF6-X7hFEIV27ha5r-JvM')