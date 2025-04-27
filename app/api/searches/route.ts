import { NextResponse } from "next/server"
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if Supabase is configured before attempting to use it
    if (!isSupabaseConfigured()) {
      console.log("Supabase is not configured, returning empty array")
      return NextResponse.json([])
    }

    // Try to get searches from Supabase
    try {
      // Get Supabase client
      const supabase = createServerSupabaseClient()

      // Check if the table exists first
      const { error: tableCheckError } = await supabase.from("searches").select("id").limit(1).maybeSingle()

      if (tableCheckError) {
        // Table doesn't exist, return empty array
        console.log("Searches table doesn't exist yet, returning empty array")
        return NextResponse.json([])
      }

      // Get searches from the database, ordered by timestamp descending
      const { data, error } = await supabase
        .from("searches")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(20)

      if (error) {
        console.error("Supabase error details:", error)
        return NextResponse.json([])
      }

      // Ensure we always return an array
      return NextResponse.json(Array.isArray(data) ? data : [])
    } catch (dbError) {
      console.error("Database error, falling back to localStorage:", dbError)
      // Return empty array for server-side rendering
      return NextResponse.json([])
    }
  } catch (error) {
    console.error("Error fetching searches:", error)
    return NextResponse.json([], { status: 500 }) // Return empty array on error
  }
}
