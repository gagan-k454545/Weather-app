import { NextResponse } from "next/server"
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { city } = await request.json()

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 })
    }

    // Check if Supabase is configured before attempting to use it
    if (!isSupabaseConfigured()) {
      console.log("Supabase is not configured, saving search to localStorage only")
      return NextResponse.json({
        success: true,
        warning: "Search saved locally only. Database not configured.",
      })
    }

    try {
      // Get Supabase client
      const supabase = createServerSupabaseClient()

      // First, try to create the table if it doesn't exist
      try {
        // Check if the table exists first
        const { error: tableCheckError } = await supabase.from("searches").select("id").limit(1).maybeSingle()

        if (tableCheckError) {
          // Table doesn't exist, try to create it
          const createTableSQL = `
            CREATE TABLE IF NOT EXISTS searches (
              id SERIAL PRIMARY KEY,
              city TEXT NOT NULL,
              timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS searches_timestamp_idx ON searches (timestamp DESC);
          `

          // Try to execute the SQL directly
          const { error: createTableError } = await supabase.rpc("exec_sql", { sql: createTableSQL })

          if (createTableError) {
            console.error("Failed to create table:", createTableError)
            // Continue anyway, we'll use localStorage as fallback
          }
        }
      } catch (tableError) {
        console.error("Error checking/creating table:", tableError)
        // Continue anyway, we'll use localStorage as fallback
      }

      // Insert the search into the database
      const { error } = await supabase.from("searches").insert([{ city, timestamp: new Date().toISOString() }])

      if (error) {
        console.error("Supabase insert error details:", error)
        // Return success anyway since we have the localStorage fallback
        return NextResponse.json({
          success: true,
          warning: "Search saved locally but not to database",
          error: error.message,
        })
      }

      return NextResponse.json({ success: true })
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Return success anyway since we have the localStorage fallback
      return NextResponse.json({
        success: true,
        warning: "Search saved locally but not to database",
      })
    }
  } catch (error) {
    console.error("Error processing search request:", error)
    return NextResponse.json({ error: "Failed to process search" }, { status: 500 })
  }
}
